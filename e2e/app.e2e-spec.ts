import { RedirectorAioPage } from './app.po';

describe('redirector-aio App', function() {
  let page: RedirectorAioPage;

  beforeEach(() => {
    page = new RedirectorAioPage();
  });

  it('should display title with Redirector', () => {
    page.navigateTo();
    expect(page.getLabelText()).toEqual('Search:');
  });
});
