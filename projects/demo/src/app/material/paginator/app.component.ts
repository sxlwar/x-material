import { XMatPageChangeEvent } from 'x-material/paginator';

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'x-mat-app-example',
  templateUrl: './app.component.html',
  styles: [
    `
      section {
        margin: 2em 0;
      }
    `,
  ],
})
export class AppComponent {
  eventPageSize: XMatPageChangeEvent;

  pageSize: FormControl = new FormControl(50);

  eventLinks: XMatPageChangeEvent;

  eventInput: XMatPageChangeEvent;

  changeInput(event: XMatPageChangeEvent): void {
    this.eventInput = event;
  }

  changePageSize(event: XMatPageChangeEvent): void {
    this.eventPageSize = event;
  }

  changeLinks(event: XMatPageChangeEvent): void {
    this.eventLinks = event;
  }
}
