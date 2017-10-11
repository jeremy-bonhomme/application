import { Highview.FrPage } from './app.po';

describe('highview.fr App', () => {
  let page: Highview.FrPage;

  beforeEach(() => {
    page = new Highview.FrPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
