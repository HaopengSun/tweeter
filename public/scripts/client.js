$(document).ready(() => {

  const loadTweets = function(){
    const url = '/tweets';
    $.ajax(url, { method: 'GET' }).then(function(data){
      const $tweet = renderTweets(data);
      $('#tweet').append($tweet);
    }).catch((err) => console.log(err));
  }
  
  loadTweets();

  const renderTweets = function(tweets) {
    let result = '';
    const sortedTweets = tweets.sort((a, b) => b.created_at - a.created_at)
    for (const tweet of sortedTweets) {
      result += createTweetElement(tweet);
    }
    return result;
  }

  const newestTweet = function(tweets) {
    return createTweetElement(tweets[tweets.length - 1]);
  }

  const createTweetElement = function(tweet) {
    // const date = tweet.created_at;
    const date = new Date(parseInt(tweet.created_at));
    let $tweet = `
    <article>
      <header>
        <p><img src="${tweet.user.avatars}"> ${tweet.user.name}</p>
        <p class="user">${tweet.user.handle}</p>
      </header>
      <p>${tweet.content.text}</p>
      <hr>
      <footer>
        <p>${date}</p>
        <p>
          <i class="fas fa-flag"></i>
          <i class="fas fa-share"></i>
          <i class="fas fa-heart"></i>
        </p>
      </footer>
    </article>\n
    `;
    return $tweet;
  }

  $('.new-tweet').submit(function(event){
    event.preventDefault();

    const inputUser = $('#tweet-text').val();
    console.log(inputUser);
    // form submission validation check
    if (!inputUser) {
      $("#empty").slideDown(1000);
    } else if (inputUser.length > 140) {
      $("#long").slideDown(1000);
    } else {
      // get the user input
      const input = $('.new-tweet form').serialize();
      console.log(inputUser);

      // post user input to the db
      $.ajax({
        url: 'http://localhost:8080/tweets',
        type: 'POST',
        data: input,
      }).done(function(){
        console.log('finish post!');
      }).fail(function(){
        console.log('error!');
      }).always(function(){
        console.log('complete!');
      });

      // get the newest tweet and prepend the list
      $.ajax('/tweets', { method: 'GET' }).then(function(data){
        const $newest = newestTweet(data);
        $('#tweet').prepend($newest);
      }).catch((err) => console.log(err));

      // clear the input area and set counter back to 140
      $('#tweet-text').val('');
      $('.counter').val('140');
    };
  });

  $("#up1").click(function(){
    $("#empty").slideUp(1000);
  });

  $("#up2").click(function(){
    $("#long").slideUp(1000);
  });
})
