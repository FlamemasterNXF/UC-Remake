/*
CREDIT TO ANTIMATTER DIMENSIONS
https://github.com/IvarK/IvarK.github.io/blob/master/javascripts/core/newsticker.js
 */

let newsArray;

function updateNewsArray() {
    newsArray = [
        "I wonder how you activate the news ticker...", "What does UC stand for???", "Sweet.", "rickroll goes here", 'five update 5 5, five five 5 five',
        'ALL 11 DERIVATIVES', 'there should be more jokes about the game in this', `Derivative ${data.derivs.length**data.derivs.length} soon!`,
        'Logical numerical progression: 1, 2, 3, 4, ⬥', 'Florida man discovers what Oddities actually are, dies of mysterious causes',
        "gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa gwa",
        "So, lets sit down and actually think about this. What's the purpose here? From Derivatives to Theories to another Derivative to Circles??? Where is this going? What's the point? Is it ever going to end?",
        "New Stairs coming next update!", "(softcapped)... I mean ENTROPY!! Entropy, am I right guys???", "This news ticker seems like it's biased towards certain messages -A Liar",
        "Try importing 'ourgwa' into the import save area... ;)", 'The Theory of Lost Theories of Circle Derivative Legends',
        'Are Oddities just Derivative Zeros?', 'Dream and Derivative Particles get all the attention :( #AncientParticleLove', 
    ]
}

let s = DOM('news');
document.addEventListener("visibilitychange", function() {if (!document.hidden) {scrollNextMessage();}}, false);
let scrollTimeouts = [];
let nextMsgIndex;
function scrollNextMessage() {
    //don't run if hidden to save performance
    if(DOM('ticker').style.display === 'none') return
    updateNewsArray();
    //select a message at random

    try {
        do {nextMsgIndex = Math.floor(Math.random() * newsArray.length)} while (!eval('true'))
    } catch(e) {
        console.log("Newsarray doesn't work at idx " + nextMsgIndex)
    }

    scrollTimeouts.forEach(function(v) {clearTimeout(v);});
    scrollTimeouts = [];

    //set the text
    s.innerHTML = newsArray[nextMsgIndex];

    //get the parent width so we can start the message beyond it
    let parentWidth = s.parentElement.clientWidth;

    //set the transition to blank so the move happens immediately
    s.style.transition = '';
    //move div_text to the right, beyond the edge of the div_container
    s.style.transform = 'translateX('+parentWidth+'px)';

    //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
    scrollTimeouts.push(setTimeout( function() {
        //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
        //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
        let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
        let rate = 100; //change this value to change the scroll speed
        let transformDuration = dist / rate;
        /*
        if (!player.options.newsHidden && !player.newsArray.includes(newsArray[nextMsgIndex][2])) {
            player.newsArray.push(newsArray[nextMsgIndex][2]);
            if (player.newsArray.length>=50) giveAchievement("Fake News")
        }
        */

        //set the transition duration
        s.style.transition = 'transform '+transformDuration+'s linear';
        let textWidth = s.clientWidth;
        //we need to move it to -(width+parent padding) before it won't be visible
        s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
        //automatically start the next message scrolling after this one finishes
        //you could add more time to this timeout if you wanted to have some time between messages
        scrollTimeouts.push(setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000)));
    }, 100));
}