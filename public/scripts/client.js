/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

$(document).ready(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    let result = '';
    for (const tweet of tweets) {
      result += createTweetElement(tweet);
    }
    return result;
  }

  const createTweetElement = function(tweet) {
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

  const $tweet = renderTweets(data);

  // console.log($tweet);
  $('#tweet').append($tweet);
})
