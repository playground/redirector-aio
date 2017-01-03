import { browser, element, by } from 'protractor';

export class RedirectorAioPage {
  navigateTo() {
    return browser.get('/');
  }

  getLabelText() {
    let el = element(by.css('.redirect-urls label'));
    return el.getText();
  }
}
