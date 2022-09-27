// Import Chromium from Playwright
const puppeteer = require('puppeteer');


// Create an anonymous and asynchronous function and call it immediately
(async () => {
    
    // For residential proxy, set the API endpoint as the proxy server
    // For country-specific proxy, use different API endpoint
    // See https://developers.oxylabs.io/residential-proxies/#random-proxy-entry-nodes
    var proxy = 'pr.oxylabs.io:7777';

    // Create a variable for launch options
    const launchOptions = {
        // Set the proxy server to the server variable
        args: ['--proxy-server=' + proxy],

        // Set additional launch options here
        headless: true
    };

    // Lauch the browser with the launch options
    const browser = await puppeteer.launch(launchOptions);

    // Use a try-catch-finally to close the browser
    try {
        // Create a new page
        const page = await browser.newPage();

        await page.authenticate({
            username: 'USERNAME',
            password: 'PASSWORD'
        });

        // This page simply returns the IP address
        await page.goto('https://ip.oxylabs.io/');

        // Print the response from the page
        // This will print the IP address of the proxy 
        const extractedText = await page.$eval('*', (el) => el.innerText);
        console.log(extractedText);
    } catch (e) {
        // print the error to the console
        console.log(e);
    }
    finally {
        // Close the browser
        await browser.close();
    }

})();
