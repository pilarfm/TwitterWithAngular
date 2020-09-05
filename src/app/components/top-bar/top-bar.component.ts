import { Component } from '@angular/core';

import { ROOT, SEARCH, CONFIGURATION } from '../../constants/routes';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  title: string = "Gwitter";
  ROOT = ROOT;
  SEARCH = SEARCH;
  CONFIGURATION = CONFIGURATION;

}