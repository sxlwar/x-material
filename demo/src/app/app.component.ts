import { Component } from '@angular/core';

import { routes } from './material/config';

@Component({
  selector: 'x-mat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  configs = routes.map(item => item.path);
}
