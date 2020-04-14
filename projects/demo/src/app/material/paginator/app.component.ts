import { IPageChangeEvent } from 'x-material/paginator';

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
  eventPageSize: IPageChangeEvent;

  pageSize: FormControl = new FormControl(50);

  eventLinks: IPageChangeEvent;

  eventInput: IPageChangeEvent;

  changeInput(event: IPageChangeEvent): void {
    this.eventInput = event;
  }

  changePageSize(event: IPageChangeEvent): void {
    this.eventPageSize = event;
  }

  changeLinks(event: IPageChangeEvent): void {
    this.eventLinks = event;
  }
}
