$(document).ready(() => {
  $(window).scroll(function() {
    if ($(document).scrollTop() > 20) {
      $("#top").css("display", "block");
    } else {
      $("#top").css("display", "none");
    }
  });
  $('#top').click(function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  })
})