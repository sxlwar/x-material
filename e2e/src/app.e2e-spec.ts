import { browser, by, element, logging } from 'protractor';

import { routes } from '../../projects/demo/src/app/material/config/router.config';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display side nav list', () => {
    page.navigateTo();

    element(by.css('.side-nav a')).then(navList => {
      expect(navList.length).toBe(routes.length);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
