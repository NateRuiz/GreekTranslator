function clipBoard(){
  function getSelectionText(){
      var selectedText = ""
      if (window.getSelection){ // all modern browsers and IE9+
          selectedText = window.getSelection().toString()
      }
      return selectedText
  }
}
var newWindow = window.open("");
var body = newWindow.document.body;
var text = "innerText" in body ? "innerText" : "textContent";
body[text] = "YOUR STRING GOES HERE";
