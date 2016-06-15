function clipBoard(){
  alert('Your Selection has been copied');
  function getSelectionText(){
      var selectedText = ""
      if (window.getSelection){ // all modern browsers and IE9+
          selectedText = window.getSelection().toString()
      }
      return selectedText
  }
}
function addLink() {
    //Get the selected text and append the extra info
    $('span').on('mousedown' , function(){
    alert("success");
    });

    var selection = window.getSelection(),
        pagelink = '<br /><br />  ' + document.location.href,
        copytext = selection + pagelink,
        newdiv = document.createElement('div');
    var range = selection.getRange(0);

    //hide the newly created container
    newdiv.style.position = 'absolute';
    newdiv.style.left = '-99999px';

    //insert the container, fill it with the extended text, and define the new selection
    document.body.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);

    window.setTimeout(function () {
        document.body.removeChild(newdiv);
        selection.removeAllRanges();
        selection.addRange(range);
    }, 100);
}

document.addEventListener('copy', addLink);
