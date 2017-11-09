import { AppPage } from './app.po';

describe('angulartics2 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display home page header', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angulartics2');
  });
});
