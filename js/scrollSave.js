function saveLocation() {
  var scroll = $(window).scrollTop();
  localStorage.setItem('lastlocation', scroll);
  var lastChapter = document.getElementById("chapter-dropdown").value;
  var lastVerse = document.getElementById("verseList").value;
  localStorage.setItem('lastChapter', lastChapter);
  localStorage.setItem('lastVerse', lastVerse);

}

window.onbeforeunload = function() {
  saveLocation();
}

function goToPrevious() {
  var location = localStorage.getItem('lastlocation');
  if (location != null) {
    scrollTo(0, location);
  }
}
