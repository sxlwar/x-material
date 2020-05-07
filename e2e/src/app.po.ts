import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getNavList() {
    return element(by.css('side-nav')).all(by.tagName('a'));
  }
}
