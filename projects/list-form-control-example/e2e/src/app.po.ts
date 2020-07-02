import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getInputElement(): any {
    return element(by.css('.lib-list__input-field'));
  }

  getListElements(): any {
    return element.all(by.css('lib-list-control-item'));
  }

  getClearIcon(): any {
    return element(by.css('.lib-list__input--clear'));
  }
}
