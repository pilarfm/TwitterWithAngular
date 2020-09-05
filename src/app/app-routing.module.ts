import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { SearchComponent } from './components/search/search.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { TweetDetailsComponent } from './components/tweet-details/tweet-details.component';

import { ROOT, TWEET_DETAIL, SEARCH, CONFIGURATION } from './constants/routes';

const routes: Routes = [
  { path: ROOT, component: TweetListComponent },
  { path: SEARCH, component: SearchComponent },
  { path: CONFIGURATION, component: ConfigurationComponent },
  { path: TWEET_DETAIL, component: TweetDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }