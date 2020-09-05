import { Component } from '@angular/core';

import { ApiTwitterService } from '../../services/apitwitter/apitwitter.service';

import { ITweetListConfiguration } from '../../models/tweetListConfiguration';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {

  homeOptions: ITweetListConfiguration;

  constructor(private apiTwitterService: ApiTwitterService) {
    this.homeOptions = this.apiTwitterService.getTweetListConfiguration();
  }

}