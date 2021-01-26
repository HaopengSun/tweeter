$(document).ready(function() {
  $('textarea').on('input', function(){
    const textLength = $(this).val().length;
    const textLeft = 140 - textLength;
    $('.counter').text(textLeft);
    if (textLeft < 0){
      $('.counter').css('color', 'red');
    }
  });
  $("article").mouseover(function() {
    $(this).css("box-shadow", "5px 5px 5px #555");})
    .mouseleave(function(){
   $(this).css("box-shadow", "0px 0px 0px #555");
  });
});