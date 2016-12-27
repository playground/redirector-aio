import { RedirectorAioPage } from './app.po';

describe('redirector-aio App', function() {
  let page: RedirectorAioPage;

  beforeEach(() => {
    page = new RedirectorAioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
