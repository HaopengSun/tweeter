/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

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
    for (const tweet of tweets) {
      result += createTweetElement(tweet);
    }
    return result;
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
    const userName = $('#user-name').text();
    // const userPortrait = $('#user-portrait').attr('src');
    const date = new Date();
    const datestamp = Date.parse(date);
    const input =   {
      "user": {
        "name": userName,
        "avatars": "https://i.imgur.com/DVpDmdR.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": inputUser
      },
      "created_at": datestamp
    };

    // form submission validation check
    if (!inputUser) {
      alert('cannot submit an empty tweet!');
    } else if (inputUser.length > 140) {
      alert('your tweet is too long!');
    }

    const element = createTweetElement(input);
    console.log(element);
    $('#tweet').prepend(element);

    // const url = '';
    // $.ajax({
    //   url: url,
    //   type: 'POST',
    //   data: input
    // }).done(function(data){
    //   $('#tweet').prepend(data);
    // });

    $('#tweet-text').val('');
    $('.counter').val('140');
  })
})
