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
        for (var i = 0; i < stringArray.length; i++) {
          if (i % 2 == 0 && !isNaN(stringArray[i])) {
            stringArray.splice(i, 1);
            i = 0;
          }
        }
        var finalString = "";
        for (var i = 0; i < stringArray.length; i += 2) {
          finalString += "<span id='" + stringArray[i + 1] + "'>" + stringArray[i] + " </span>";
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

/*
<li> </li>
<li> </li>

*/

function doSomethingWithSelectedText() {
  var selectedText = getSelectedText();
  var greek;
  var english;
  if (selectedText) {
    var strongNumber = selectedText.anchorNode.parentElement.id;
    try {
      english = strongMap[strongNumber].brief;
      greekk = selectedText.anchorNode.nodeValue
      document.getElementById("greekword").innerHTML = '<strong>' + greekk + '</strong>';
	  var englishWords = english.split(", ");
	   var list = document.getElementById('listOfSpeech');
	   list.innerHTML = "";
	  for (var el in englishWords) {
		var word = englishWords[el];
		var entry = document.createElement('li');
		entry.appendChild(document.createTextNode(word));
		list.appendChild(entry);
	}
	
	document.getElementById("partsofspeech").innerHTML = 'Noun';
	  
    } catch (err) {
      document.getElementById("greekword").innerHTML = '<strong>' + selectedText.anchorNode.nodeValue + '</strong>';
      document.getElementById("listOfSpeech").innerHTML = 'Definition not found';
    }
  }
}
