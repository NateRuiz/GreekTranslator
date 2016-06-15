var bookName = [];
var bibleText = {};
var chapters = [];
var verses = [];
$.ajax({
  type: 'GET',
  url: '../files/Ephesians.json',
  success: function(text) {
    for (var key in text) {
      bookName.push(key);
        for(var chapter in key) {
          var currentChapter = {};
          currentChapter.chapter = [];
            for (var verse in chapter){
              currentChapter.chapter.push(verse);
            }
            chapters.push(currentChapter);
        }
    }
    bibleText = text;
    document.title = bookName[0]; 
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
