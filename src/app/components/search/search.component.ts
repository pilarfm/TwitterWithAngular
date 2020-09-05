import { Component } from '@angular/core';
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
  searchTweet: ISearch;
  show: boolean;
  maxId: number;
  tweetCalls: number =0;


  constructor(private apiTwitterService: ApiTwitterService, private spinner: NgxSpinnerService) {
    this.show = true;
  }

  searchedTerm(term: string): boolean {
    if (term != "") {
      (<HTMLInputElement>document.getElementById("search-input")).value = term;
      this.show = false;
      this.apiTwitterService.searchTweets(term, this.tweetCalls, TWEET_LIMIT_PAGE)
        .subscribe(searchTweet => {
          this.resetPagination();
          searchTweet.statuses.forEach((e) => this.tweets.push(e));
          this.getMoreTweets(term);
        });
    }
    return false;
  }

  resetPagination() {
    this.tweets = [];
    this.tweetCalls = 0;
  }
  
  getMoreTweets(term: string) {
    if (this.tweetCalls == 0) {
      this.apiTwitterService.searchTweets(term, TWEET_LIMIT_PAGE)
        .subscribe(search => {
          const tweets = search.statuses;
          this.tweets = tweets;
          this.maxId = tweets[tweets.length - 1].id;
        });
    }
    else if (this.tweetCalls < TWEET_CALLS_LIMIT) {
      this.apiTwitterService.searchTweets(term, TWEET_LIMIT_PAGE, this.maxId)
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