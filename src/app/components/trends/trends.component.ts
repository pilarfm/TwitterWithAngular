import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ITrend } from '../../models/trends';
import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  
  trends: ITrend[] = [];
  @Output() trendTerm: EventEmitter<string> ;

  constructor(private apiService: ApiTwitterService) {
    this.trendTerm = new EventEmitter;
   }

  ngOnInit(): void {
    this.getTrends();
  }

  sendTrend(index:number):void{
    this.trendTerm.emit(this.trends[index].name);
  }

  getTrends(): void {
    this.apiService.getTrends()
      .subscribe(trends => {
        this.trends = trends[0].trends.slice(0, 10);
      });
  }

}