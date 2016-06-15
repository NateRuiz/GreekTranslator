function loadChapters() {

  var chapter = document.getElementById("chapter");
  var chapterList = document.createElement("select");
  chapterList.id = 'chapter-dropdown'
  chapterList.className = "form-control";
  chapterList.onchange= verseCount();
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
function verseCount(){
  var selected = document.getElementById("chapter-dropdown").value;
  console.log(chapters[-1].chapter.length);


}
