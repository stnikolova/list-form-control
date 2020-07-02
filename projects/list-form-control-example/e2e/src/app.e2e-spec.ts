import { browser, logging, protractor } from 'protractor';
import { AppPage } from './app.po';

describe('List Control Component', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display an input and upon enter should add it to the list', async () => {
    page.navigateTo();

    const textToPopulate = 'coco jumbo';
    const inputElement = page.getInputElement();
    const listElements = page.getListElements();

    await browser.sleep(200);

    inputElement.sendKeys(textToPopulate);

    await browser.sleep(200);

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    expect(listElements.first().getAttribute('ng-reflect-value')).toEqual(textToPopulate);
  });

  it('should display an input and should be able to highlight element using up and down arrow', async () => {
    page.navigateTo();

    const textToPopulate = 'coco jumbo';
    const inputElement = page.getInputElement();
    const listElements = page.getListElements();

    await browser.sleep(500);

    inputElement.click();

    await browser.sleep(500);

    browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();

    await browser.sleep(200);

    expect(listElements.first().getAttribute('ng-reflect-value')).toEqual(
      browser.driver.switchTo().activeElement().getAttribute('ng-reflect-value'),
    );
  });

  it('should display an input and remove the last item when a new one is added', async () => {
    page.navigateTo();

    const textToPopulate = 'coco jumbo';
    const inputElement = page.getInputElement();
    const listElements = page.getListElements();

    await browser.sleep(200);

    inputElement.sendKeys(textToPopulate);

    const lastElement = listElements.last().getAttribute('ng-reflect-value');

    await browser.sleep(200);

    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    expect(lastElement).not.toEqual(listElements.last().getAttribute('ng-reflect-value'));
  });

  it('should clear the input when the `x` button is clicked', async () => {
    page.navigateTo();

    const textToPopulate = 'coco jumbo';
    const inputElement = page.getInputElement();
    const clearIcon = page.getClearIcon();

    await browser.sleep(200);

    inputElement.sendKeys(textToPopulate);

    await browser.sleep(200);

    clearIcon.click();

    await browser.sleep(200);

    expect(inputElement.getAttribute('ng-reflect-value')).toEqual(null);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry),
    );
  });
});
