function loadBooks() {
  var book = document.getElementById("book");
  var bookList = document.createElement("select");
  bookList.id = 'book-dropdown'
  bookList.className = "form-control";
  book.appendChild(bookList);
  // finds the values of the chapter and
  // verses by their ID
  //Create and append the options
  for (var i = 0; i < bookName.length; i++) {
    var option = document.createElement("option");
    option.value = bookName[i];
    option.text = bookName[i];
    bookList.appendChild(option);
    // This makes it so when the user clicks on a chapter the correct number of
    // verses match up.
  }
}
function loadChapters() {

  var chapter = document.getElementById("chapter");
  var chapterList = document.createElement("select");
  chapterList.id = 'chapter-dropdown'
  chapterList.className = "form-control";
  chapter.appendChild(chapterList);
  // finds the values of the chapter and
  // verses by their ID
  //Create and append the options
  for (var i = 1; i <= chapters.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = "Chapter " + i;
    chapterList.appendChild(option);
    // This makes it so when the user clicks on a chapter the correct number of
    // verses match up.
  }
  chapterList.onchange = verseCount;
  var lastChapter = localStorage.getItem('lastChapter');
  $('#chapter-dropdown').val(lastChapter);
  var verse = document.getElementById("verse");
  var verseList = document.createElement("select");
  verseList.className = "form-control";
  verse.appendChild(verseList);
  verseList.id = "verseList";
  verseCount();
  var lastVerse = localStorage.getItem('lastVerse');
  $('#verseList').val(lastVerse);
} // this counts the number of verses and sees the change in the drop down box
// when the user clicks on a new value

function loadVerses(total) {
  var verse = document.getElementById("verse");
  var verseList = document.getElementById("verseList");
  //Create and append the options
  for (var i = 1; i <= total; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = "Verse " + i;
    verseList.appendChild(option); // shows the different options of the verses
  }
}
function verseCount() {
  var selected = document.getElementById("chapter-dropdown").value;
  var total = (chapters[selected - 1].chapter.length);
  var verseList = document.getElementById("verseList");
  while (verseList.firstChild != null) {
    verseList.removeChild(verseList.firstChild); // when the user switches
    //chapter using the drop box the correct verses are displayed with out issue
  }
  loadVerses(total);

}
function goButton() {
  var selected = document.getElementById("chapter-dropdown").value;
  var chosenVerse = document.getElementById("verseList").value;
  var total = selected + ":" + chosenVerse;
  var rect = document.getElementById(total).offsetTop;
  scrollTo(0, rect);
}

$('#goButton').click(function() {
  goButton(); // this is what happens when the button is clicked
});
