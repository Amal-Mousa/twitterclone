
//* declare variables:
let authorInput = document.querySelector('#tweeters-name');
let tweetContentInput = document.querySelector('#add-tweets');
let addTweetBtn = document.querySelector('.add-tweet-btn');
let tweetsContainer = document.querySelector('.news-feed');
let tweets = [];
let tweetsObj = {};
let isClicked = false;
let copiedTweets =[]


window.onload = function () {
    authorInput.focus();
};

// Add new tweet
function createTweet() {

    // tweets object
    tweetsObj = {
        author: authorInput.value,
        content: tweetContentInput.value,
        isLiked: false,
        isRetweet: false,
    }

    // the main div
    let singleTweet = document.createElement('div');
    singleTweet.className = "feed-tweet";

    singleTweet.isClicked = false;
    singleTweet.copiedTweet = null;
    
    // author div
    let authorName = document.createElement('div');
    authorName.classList.add('author-name');
    authorName.style.marginBottom = '12px';
    authorName.innerHTML = authorInput.value;
    tweetsObj.author = authorInput.value;
    singleTweet.appendChild(authorName);

    // tweet content div
    let tweetContent = document.createElement('div');
    tweetContent.className = 'tweet-text';
    tweetContent.innerHTML = tweetContentInput.value;
    tweetsObj.content = tweetContentInput.value;
    singleTweet.appendChild(tweetContent);

    // buttons div
    let buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('tweet-icons');
    
    // buttons
    // reply button
    let replyBtn = document.createElement('button');
    let replyIcon = document.createElement("i");
    replyIcon.classList="ri-chat-1-line";
    replyBtn.appendChild(replyIcon);
    buttonsDiv.appendChild(replyBtn);

    // retweet button
    let retweetBtn = document.createElement('button');
    let retweetIcon = document.createElement("i");
    retweetIcon.classList.add("ri-repeat-2-fill") ;
    retweetBtn.appendChild(retweetIcon);
    buttonsDiv.appendChild(retweetBtn);
     
    retweetBtn.addEventListener('click', function() {
        if (!singleTweet.isClicked) {
            retweetIcon.classList.add('retweet');
            let copiedTweet = singleTweet.cloneNode(true);
            tweetsContainer.prepend(copiedTweet);
            singleTweet.isClicked = true;
            singleTweet.copiedTweet = copiedTweet;
        } else {
            retweetIcon.classList.remove('retweet');
            tweetsContainer.removeChild(singleTweet.copiedTweet);
            singleTweet.isClicked = false;
            singleTweet.copiedTweet = null;
        }
    });

    // heart button
    let heartBtn = document.createElement('button');
    let heartIcon = document.createElement("i");
    heartIcon.classList = "ri-heart-3-line";
    heartBtn.appendChild(heartIcon);
    buttonsDiv.appendChild(heartBtn);

    singleTweet.isLiked = false;

    heartBtn.addEventListener('click', function () {
        if (!singleTweet.isLiked)
            {
                tweetContent.style.color = 'rgba(29,155,240,.9)';
                heartIcon.classList.add('heart-clicked');
                heartIcon.classList.add('like');
                singleTweet.isLiked = true;
                if (singleTweet.isClicked && singleTweet.copiedTweet) {
                    singleTweet.copiedTweet.querySelector('.tweet-text').style.color = 'rgba(29,155,240,.9)';
                    singleTweet.copiedTweet.querySelector('.ri-heart-3-line').classList.add('heart-clicked');
                    singleTweet.copiedTweet.querySelector('.ri-heart-3-line').classList.add('like');
                }
            } else {
                tweetContent.style.color = 'white';
                heartIcon.classList.remove('heart-clicked');
                heartIcon.classList.remove('like');
                singleTweet.isLiked = false;
                if (singleTweet.isClicked && singleTweet.copiedTweet) {
                    singleTweet.copiedTweet.querySelector('.tweet-text').style.color = 'white';
                    singleTweet.copiedTweet.querySelector('.ri-heart-3-line').classList.remove('heart-clicked');
                    singleTweet.copiedTweet.querySelector('.ri-heart-3-line').classList.remove('like');
                }
            }
    });
    
    // object values
    tweetsObj.isRetweeted = singleTweet.isClicked;
    tweetsObj.isLiked = singleTweet.isLiked;

    // share button
    let shareBtn = document.createElement('button');
    let shareIcon = document.createElement("i");
    shareIcon.classList="ri-upload-2-line";
    shareBtn.appendChild(shareIcon);
    buttonsDiv.appendChild(shareBtn);
    
    // append buttons to singleTweet div
    singleTweet.appendChild(buttonsDiv);

    // push tweetObj to tweets array 
    tweets.push(tweetsObj);
    
    // append singleTweet div to newsfeed
    tweetsContainer.appendChild(singleTweet);

};

// reset inputs
function resetInputs() {
    authorInput.value = '';
    tweetContentInput.value = '';
};

// check the inputs
function CheckInputs() {
    if (authorInput.value.length === 0 || tweetContentInput.value.length === 0 ) {
        console.log('Fill this two fields');
    }
    else {
        createTweet();
        console.log(tweets);
        resetInputs();
        authorInput.focus();
    }
};

// click btn action
addTweetBtn.addEventListener('click', function () {
    CheckInputs();
    
});