function clipBoard(){
  function getSelectionText(){
      var selectedText = ""
      if (window.getSelection){ // all modern browsers and IE9+
          selectedText = window.getSelection().toString()
      }
      return selectedText
  }
}
