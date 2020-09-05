import { Component, HostListener } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import { ITweet } from '../../models/tweet';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

import { TWEET_LIMIT_PAGE, TWEET_CALLS_LIMIT } from '../../constants/constants';

import { ISearch } from '../../models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  tweets: ITweet[] = [];
  term: string;
  searchTweet: ISearch;
  maxId: number;
  tweetCalls: number = 0;
  showGoUpButton: boolean;

  constructor(private apiTwitterService: ApiTwitterService, private spinner: NgxSpinnerService) {
    this.showGoUpButton = false;
  }

  searchedTerm(term: string): void {
    if (term != "") {
      this.term = term;
      this.apiTwitterService.searchTweets(term, TWEET_LIMIT_PAGE)
        .subscribe(searchTweet => {
          this.resetPagination();
          searchTweet.statuses.forEach((e) => this.tweets.push(e));
          this.getTweets();
        });
    }
  }

  resetPagination() {
    this.tweets = [];
    this.tweetCalls = 0;
  }

  getTweets() {
    if (this.tweetCalls == 0) {
      this.apiTwitterService.searchTweets(this.term, TWEET_LIMIT_PAGE)
        .subscribe(search => {
          const tweets = search.statuses;
          this.tweets = tweets;
          this.maxId = tweets[tweets.length - 1].id;
        });
    }
    else if (this.tweetCalls < TWEET_CALLS_LIMIT) {
      this.apiTwitterService.searchTweets(this.term, TWEET_LIMIT_PAGE, this.maxId)
        .subscribe(search => {
          this.spinner.show();
          const tweets = search.statuses;
          this.maxId = tweets[tweets.length - 1].id;
          tweets.shift();
          this.tweets = this.tweets.concat(tweets);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        });
    }
    this.tweetCalls += 1;
  }

}