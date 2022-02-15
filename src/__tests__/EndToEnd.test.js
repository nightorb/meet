import puppeteer from 'puppeteer';

describe('show/hide an event\'s details', () => {
  let browser, page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();

    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250,
    //   ignoreDefaultArgs: ['--disable-extensions'] // ignores default settings that cause timeout errors
    // });

    page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('an event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });

  test('user can expand an event to see its details', async () => {
    await page.click('.event .toggle-details');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeDefined();
  });

  test('user can collapse an event to hide its details', async () => {
    await page.click('.event .toggle-details');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });
});
