import { Component, Input } from '@angular/core';
import { ITweet } from 'src/app/models/tweet';
import { faRetweet, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {

  faRetweet = faRetweet;
  faHeart = faHeart;
  @Input() tweet: ITweet;

}