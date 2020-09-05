import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ITweet } from '../../models/tweet';
import { ISearch } from '../../models/search';
import { ITweetListConfiguration } from '../../models/tweetListConfiguration';
import { ITrends } from '../../models/trends';

import { TWITTER_API_URL, WOEID_ARGENTINA, EXPIRATION_LS } from '../../constants/constants';

@Injectable({ providedIn: 'root' })
export class ApiTwitterService {

  private url = TWITTER_API_URL;

  tweetListConfiguration: ITweetListConfiguration;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.tweetListConfiguration = {
      hideNotVerified: false,
      hideNotFollowed: false,
      hideDefaultProfile: false,
      hideWithLink: false,
      hideTextTruncated: false
    }
  }

  getTimelineTweets(tweetCall: number, count: number, maxId: number = null): Observable<ITweet[]> {
    const storagedData: ITweet[] = JSON.parse(localStorage.getItem(tweetCall.toString()));
    if (storagedData && !this.ifExpired(tweetCall)) {
      return of(this.filterTweets(storagedData));
    }
    else {
      this.saveDateFirstCall(tweetCall);
      return this.http.get<ITweet[]>(this.url + `/timeline?count=${count}${maxId ? "&max_id=" + maxId : ""}`)
        .pipe(
          map((data) => {
            data.forEach(element => {
              element.created_at = new Date(element.created_at);
            });
            localStorage.setItem(tweetCall.toString(), JSON.stringify(data));
            return this.filterTweets(data);
          }),
          catchError(this.handleError<ITweet[]>('getTimelineTweets', []))
        );
    }
  }

  saveDateFirstCall(tweetCall) {
    if (tweetCall === 0) {
      localStorage.clear();
      localStorage.setItem("date", JSON.stringify({ date: new Date() }));
    }
  }

  ifExpired(tweetCall) {
    let condition = false;
    if (tweetCall === 0) {
      const objectLS = JSON.parse(localStorage.getItem("date"));
      if (objectLS) {
        const actualDate = new Date();
        const dateLS = new Date(objectLS.date);
        const difference = actualDate.getTime() - dateLS.getTime();
        if (difference > EXPIRATION_LS)
          condition = true;
      }
    }
    return condition;
  }

  searchTweets(term: string, count: number, maxId: number = null): Observable<ISearch> {
    return this.http.get<ISearch>(`${this.url}/search/?q=${encodeURIComponent(term)}&count=${count}${maxId ? "&max_id=" + maxId : ""}`)
      .pipe(
        map((data) => {
          data.statuses.forEach(element => {
            element.created_at = new Date(element.created_at);
          });
          return data;
        }),
        catchError(this.handleError<ISearch>('searchTweets'))
      );
  }

  filterTweet(tweet: ITweet) {
    let condition = true;
    if (this.tweetListConfiguration.hideNotVerified && !tweet.user.verified) {
      condition = false;
    }
    if (this.tweetListConfiguration.hideNotFollowed && !tweet.user.following) {
      condition = false;
    }
    if (this.tweetListConfiguration.hideDefaultProfile && tweet.user.default_profile) {
      condition = false;;
    }
    if (this.tweetListConfiguration.hideWithLink && tweet.entities.urls.length != 0) {
      condition = false;
    }
    if (this.tweetListConfiguration.hideTextTruncated && tweet.truncated) {
      condition = false;
    }
    return condition;
  }

  filterTweets(data: ITweet[]) {
    const newArray = data.filter(element => this.filterTweet(element));
    return newArray;
  }

  getTweetListConfiguration(): ITweetListConfiguration {
    return this.tweetListConfiguration;
  }

  getTweet(id: string): Observable<ITweet> {
    const url = `${this.url}/show?id=${id}`;
    return this.http.get<ITweet>(url)
      .pipe(
        catchError(this.handleError<ITweet>(`getTweet id=${id}`))
      );
  }

  getTrends(): Observable<ITrends[]> {
    return this.http.get<ITrends[]>(this.url + "/trends?id=" + WOEID_ARGENTINA)
      .pipe(
        catchError(this.handleError<ITrends[]>('getTrends', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}