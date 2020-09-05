import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ITweet } from '../../models/tweet';
import { faRetweet, faHeart, faArrowLeft, faComment } from '@fortawesome/free-solid-svg-icons';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit {

  tweet: ITweet;
  faArrowLeft = faArrowLeft;
  faComment = faComment;
  faHeart = faHeart;
  faRetweet = faRetweet;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiTwitterService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTweet();
  }

  getTweet(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getTweet(id)
      .subscribe(tweet => this.tweet = tweet);
  }

  goBack(): void {
    this.location.back();
  }

}
