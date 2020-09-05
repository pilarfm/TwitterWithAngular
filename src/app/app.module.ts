import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { SearchComponent } from './components/search/search.component';
import { TweetDetailsComponent } from './components/tweet-details/tweet-details.component';
import { TrendsComponent } from './components/trends/trends.component';
import { ScrollButtonComponent } from './components/scroll-button/scroll-button.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TopBarComponent,
    TweetListComponent,
    ConfigurationComponent,
    SearchComponent,
    TweetDetailsComponent,
    TrendsComponent,
    TweetComponent,
    ScrollButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    MatIconModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
