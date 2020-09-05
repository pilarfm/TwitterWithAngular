import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import { ITweet } from '../../models/tweet';
import { ITweetListConfiguration } from 'src/app/models/tweetListConfiguration';

import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

import { TWEET_LIMIT_PAGE, TWEET_CALLS_LIMIT } from '../../constants/constants';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent {

  tweets: ITweet[] = [];
  maxId: number;
  tweetCalls: number = 0;
  tweetListConfiguration: ITweetListConfiguration;

  constructor(private apiTwitterService: ApiTwitterService, private spinner: NgxSpinnerService) {
    this.getTweets();
    this.tweetListConfiguration = apiTwitterService.getTweetListConfiguration();
  }

  checkFilterOn() {
    for (const key in this.tweetListConfiguration) {
      if (this.tweetListConfiguration.hasOwnProperty(key) && this.tweetListConfiguration[key]) {
        return true;
      }
    }
  }

  getTweets() {
    if (this.tweetCalls == 0) {
      this.apiTwitterService.getTimelineTweets(this.tweetCalls, TWEET_LIMIT_PAGE)
        .subscribe(tweets => {
          this.tweets = tweets;
          this.maxId = tweets[tweets.length - 1].id;
        });
    }
    else if (this.tweetCalls < TWEET_CALLS_LIMIT) {
      this.apiTwitterService.getTimelineTweets(this.tweetCalls, TWEET_LIMIT_PAGE, this.maxId)
        .subscribe(tweets => {
          this.checkFilterOn() ? "" : this.spinner.show();
          this.maxId = tweets[tweets.length - 1].id;
          tweets.shift();
          this.tweets = this.tweets.concat(tweets);
          this.checkFilterOn() ? "" : setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        });
    }
    this.tweetCalls += 1;
  }

}