function saveLocation() {
  var scroll = $(window).scrollTop();
  localStorage.setItem('lastlocation', scroll);
  console.log(scroll);
  console.log(localStorage.getItem('lastlocation'));
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
