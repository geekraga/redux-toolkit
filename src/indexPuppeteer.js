const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.example.com');

    // Get an element by its CSS selector
    const element = await page.$('#element-id');

    // Get the text content of the element
    const text = await page.evaluate(el => el.textContent, element);

    console.log(`The text content of the element is: ${text}`);

    await browser.close();
}

run();
