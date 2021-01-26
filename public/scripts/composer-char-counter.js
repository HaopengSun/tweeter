$(document).ready(function() {
  console.log('composer char counter');
  $('textarea').on('input', function(){
    const textLength = $(this).val().length;
    const textLeft = 140 - textLength;
    $('.counter').text(textLeft);
    if (textLeft < 0){
      $('.counter').css('color', 'red');
    }
  });
});