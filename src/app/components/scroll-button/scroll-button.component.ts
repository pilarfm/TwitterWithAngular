import { Component, HostListener } from '@angular/core';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { SHOW_SCROLL_HEIGHT, HIDE_SCROLL_HEIGHT } from '../../constants/constants';

@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.css']
})
export class ScrollButtonComponent {

  showGoUpButton: boolean;
  faAngleUp = faAngleUp;
  
  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > SHOW_SCROLL_HEIGHT) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < HIDE_SCROLL_HEIGHT) {
      this.showGoUpButton = false;
    }
  }

}
