function loadChapters() {

  var chapter = document.getElementById("chapter");
  var chapterList = document.createElement("select");
  chapterList.id = 'chapter-dropdown'
  chapterList.className = "form-control";
  chapter.appendChild(chapterList);
  //Create and append the options
  for (var i = 1; i <= chapters.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = "Chapter " + i;
    chapterList.appendChild(option);
  }
  chapterList.onchange = verseCount;
  var verse = document.getElementById("verse");
  var verseList = document.createElement("select");
  verseList.className = "form-control"
  verse.appendChild(verseList);
  verseList.id = "verseList";
  verseCount();
}

function loadVerses(total) {
  var verse = document.getElementById("verse");
  var verseList = document.getElementById("verseList");
  //Create and append the options
  for (var i = 1; i <= total; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = "Verse " + i;
    verseList.appendChild(option);

  }
}
function verseCount() {
  var selected = document.getElementById("chapter-dropdown").value;
  var total = (chapters[selected - 1].chapter.length);
  var verseList = document.getElementById("verseList");
  while (verseList.firstChild != null) {
    verseList.removeChild(verseList.firstChild);
  }
  loadVerses(total);

}
function goButton() {
  var selected = document.getElementById("chapter-dropdown").value;
  var chosenVerse = document.getElementById("verseList").value;
  var total = 'p' + selected + ":" + chosenVerse;
  var el = document.getElementById(total);
  $(el).scrollTo($(".nav"), 800);

}

$('#goButton').click(function() {
  goButton();
});
