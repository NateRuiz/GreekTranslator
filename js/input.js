var bookName = [];
var bibleText;
var chapters = [];
$.ajax({
  type: 'GET',
  url: '../files/Ephesians.json',
  success: function(text) {
    for (var book in text) {
      bookName.push(book);
        for(var chapter in text[book]) {
          var currentChapter = {};
          currentChapter.chapter = [];
            for (var verse in text[book][chapter]){
              currentChapter.chapter.push(verse);
            }
            chapters.push(currentChapter);
        }
    }
    console.log(chapters);

    bibleText = text;
    parseText(bibleText);
    document.title = bookName[0];
    document.getElementById('book').innerHTML = bookName[0];
    loadChapters();
    loadVerses();
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
    strongMap.currentStrong = letter;
  });
}

function parseText(text) {
  for(book in text){
    for(chapter in text[book]){
      $('#bible').append('<h4> Chapter' + chapter + '</h4>');
      for(verse in text[book][chapter]){

        var currentString = text[book][chapter][verse];
        var re = /{[^>]*}|(\w+)|[-]|[[]|[\]]/g;
        currentString = currentString.replace(re, '');
        $('#bible').append('<p><strong>' + verse  + '</strong> ' + currentString + '</p>');
      }
    }
  }
}
