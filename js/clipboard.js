function addLink() {
  //Get the selected text and append the extra info
  var selection = window.getSelection(),
    copytext = selection,
    newdiv = document.createElement('div');
  var range = selection.getRangeAt(0);
  var paragraphId = selection.anchorNode;
  var htmlString = getHTMLOfSelection();

  var verses = parseHTML(htmlString);
  var verseToDisplay;
  if (verses.length == 1) {
    verseToDisplay = verses[0];
  } else {
    verseToDisplay = bookName[0] + " " + verses[0] + "-" + verses[verses.length - 1];
  }

  copytext += '<br /><br /> ' + verseToDisplay;
  //hide the newly created container
  newdiv.style.position = 'absolute';
  newdiv.style.left = '-99999px';

  //insert the container, fill it with the extended text, and define the new selection
  document.body.appendChild(newdiv);
  newdiv.innerHTML = copytext;
  selection.selectAllChildren(newdiv);

  window.setTimeout(function() {
    document.body.removeChild(newdiv);
    selection.removeAllRanges();
    selection.addRange(range);
  }, 100);
}

function getHTMLOfSelection() {
  var range;
  if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    return range.htmlText;
  } else if (window.getSelection) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
      var clonedSelection = range.cloneContents();
      var div = document.createElement('div');
      div.appendChild(clonedSelection);
      return div.innerHTML;
    } else {
      return '';
    }
  } else {
    return '';
  }
}
function parseHTML(input) {
  var inputSplit = input.split('<');
  for (var i = inputSplit.length - 1; i >= 0; i--) {
    if (inputSplit[i].charAt(0) != "p") {
      inputSplit.splice(i, 1);
    }
  }
  var finalResult = inputSplit.join("");
  finalResult = finalResult.replace(/[a-zA-Z]|=|"|>/g, "");
  var finalArray = finalResult.split(" ");
  finalArray.splice(0, 1);
  console.log(finalArray);
  return finalArray;
}
document.addEventListener('copy', addLink);
