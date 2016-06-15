function loadChapters() {

  var chapter = document.getElementById("chapter");
  var chapterList = document.createElement("select");
  chapterList.className = "form-control";
  chapter.appendChild(chapterList);
  //Create and append the options
  for (var i = 1; i <= chapters.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = "Chapter " + i;
    chapterList.appendChild(option);
  }
}

function loadVerses() {
  var verse = document.getElementById("verse");
  var verseList = document.createElement("select");
  verseList.className = "form-control"
  verse.appendChild(verseList);
  //Create and append the options
  for (var i = 1; i <= chapters.length; i++) {
    var option = document.createElement("option");
    option.value = "Verse " + i;
    option.text = "Verse " + i;
    verseList.appendChild(option);
  }
}
