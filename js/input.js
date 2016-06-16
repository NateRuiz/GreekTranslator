var bookName = [];
var bibleText;
var chapters = [];
$.ajax({
  type: 'GET',
  url: '../files/Ephesians.json',
  success: function(text) {
    for (var book in text) {
      bookName.push(book);
      for (var chapter in text[book]) {
        var currentChapter = {};
        currentChapter.chapter = [];
        for (var verse in text[book][chapter]) {
          currentChapter.chapter.push(verse);
        }
        chapters.push(currentChapter);
      }
    }

    bibleText = text;
    parseText(bibleText);
    document.title = bookName[0];
    document.getElementById('book').innerHTML = bookName[0];
    loadChapters();
    loadVerses();
    document.onmouseup = doSomethingWithSelectedText;
    document.keyup = doSomethingWithSelectedText;

  }
});

$.ajax({
  type: 'GET',
  url: '../files/lexicon-eph-english.json',
  success: function(text) {
    strongMapping(text);
  }
});
var strongMap = {};

function strongMapping(text) {
  text.forEach(function(letter) {
    var currentStrong = letter.strongs;
    strongMap[currentStrong] = letter;
  });
}

function parseText(text) {
  for (book in text) {
    for (chapter in text[book]) {
      $('#bible').append('<h4> Chapter ' + chapter + '</h4>');
      for (verse in text[book][chapter]) {
        var currentString = text[book][chapter][verse];
        currentString = currentString.replace(/{[^>]*}/g, "");
        currentString = currentString.replace(/[A-z]+|[-]|[[]|[\]]/g, "")
        currentString = currentString.replace(/  /g, " ")
        var stringArray = currentString.split(" ");
        var morphologyArray = morphologyArrayGen(text[book][chapter][verse]);
        for (var i = 0; i < stringArray.length; i++) {
          if (i % 2 == 0 && !isNaN(stringArray[i])) {
            stringArray.splice(i, 1);
            i = 0;
          }
        }
        var finalString = "";
        for (var i = 0; i < stringArray.length; i += 2) {
          finalString += "<span id='" + stringArray[i + 1] + "' morphology='" + morphologyArray[i / 2] + "'>" + stringArray[i] + " </span>";
        }
        $('#bible').append('<p id="p' + chapter + ":" + verse + '"><strong>' + verse + ' </strong>' + finalString + '</span></p>');
      }
    }
  }

}

function getSelectedText() {
  var text = "";
  if (typeof window.getSelection != "undefined") {
    text = window.getSelection()
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
    text = document.selection.createRange().text;
  }
  return text;
}

function doSomethingWithSelectedText() {
  var selectedText = getSelectedText();
  var greek;
  var english;
  if (selectedText) {
    try {
      var strongNumber = selectedText.anchorNode.parentElement.id;
      var morphology = document.getElementById(strongNumber).getAttribute("morphology"); //morphology is here
      english = strongMap[strongNumber].brief;
      greekk = selectedText.anchorNode.nodeValue
      document.getElementById("greekword").innerHTML = '<strong>' + greekk + '</strong>';
      document.getElementById("definition").innerHTML = 'Defintion: ' + english;
    } catch (err) {
      document.getElementById("greekword").innerHTML = '<strong>' + selectedText.anchorNode.nodeValue + '</strong>';
      document.getElementById("definition").innerHTML = 'Definition not found';
    } finally {
      document.getElementById("partsofspeech").innerHTML = morphology;
    }
  }
}
function morphologyArrayGen(currentString) {
  var input = currentString.replace(/{[^>]*}/g, "");
  input = input.replace(/[[]|[\]]/g, "");
  input = input.replace(/[^\u0000-\u007F]+/g, "");
  input = input.replace(/G[\d]{0,6}/g, "");
  var dirtyArray = input.split(" ");
  for (var i = dirtyArray.length - 1; i >= 0; i--) {
    if (dirtyArray[i] == "") {
      dirtyArray.splice(i, 1);
    }
  }
  return dirtyArray;
}
