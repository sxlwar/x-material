import { async, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { XMatMessageComponent, XMatMessageContainerDirective } from './message.component';

describe('XMatMessageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, BrowserAnimationsModule],
      declarations: [XMatMessageComponent, XMatMessageContainerDirective],
    }).compileComponents();
  }));

  test('should create the app', () => {
    const fixture = TestBed.createComponent(XMatMessageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
