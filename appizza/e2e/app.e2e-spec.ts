import { AppizzaPage } from './app.po';

describe('appizza App', () => {
  let page: AppizzaPage;

  beforeEach(() => {
    page = new AppizzaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
