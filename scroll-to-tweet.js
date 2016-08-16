(() => {
	'use strict';

	window.scrollToTweet = event => {
		const $ = document.querySelector.bind(document);
		const tweets = document.querySelectorAll('._222QxFjc[role="row"]');
		const currentTop = window.scrollY;
		const bufferTop = 5; // added because somtimes the scrolling is off by a few px
		const key = event.key;

		// calculate the height of the navigation/header to use for scrolling
		const calculatedNavHeight = $('header').clientHeight + ($('header').clientHeight - $('nav').clientHeight);

		// this padding has to be applied to factor in the padding that's added to the container
		const tweetsContainerPadding = Math.ceil(parseInt($('._1nQuzuNK').style.paddingTop.replace('px', ''), 10));

		const offsetToNotShowTweetTopBorder = 2;

		// shortcut for getting the total offset from the top of the document of a particular tweet
		const totalOffset = tweetOffset => tweetOffset + calculatedNavHeight + tweetsContainerPadding + offsetToNotShowTweetTopBorder;

		// takes a tweet's offsetTop and checks if it's below the navigation bar
		const tweetIsBelowNav = offset => totalOffset(offset) > currentTop + bufferTop;

		let scrollTarget = 0;

		for (const [index, tweet] of tweets.entries()) {
			// if we're scrolling down, grab the offset of the tweet below the nav
			if (key === 'j') {
				scrollTarget = totalOffset(tweet.offsetTop);
			}

			// if we're scrolling up and on the first two items scroll to 0
			if (key === 'k' && index <= 1) {
				scrollTarget = 0;
			}

			// if we're scrolling up, grab the offset of the tweet before last
			if (key === 'k' && index > 1) {
				scrollTarget = totalOffset(tweets[index - 2].offsetTop);
			}

			if (tweetIsBelowNav(tweet.offsetTop)) {
				break;
			}
		};

		window.scrollTo(0, scrollTarget);
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = window.scrollToTweet;
	}
})();
