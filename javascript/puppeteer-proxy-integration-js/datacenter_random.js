// Import Chromium from Playwright
const puppeteer = require('puppeteer');


// Array that contains the proxy servers
let proxies = [
    '20.94.229.106:80',
    '209.141.55.228:80',
    '103.149.162.194:80',
    '206.253.164.122:80'
];

// Create an anonymous and asynchronous function and call it immediately
(async () => {

    // Randomly select a proxy from the array
    var proxy = proxies[Math.floor(Math.random() * proxies.length)];

    // Create a variable for launch options
    const launchOptions = {
        // Set the proxy server to the proxy
        args: ['--proxy-server=' + proxy],

        // Set additional launch options here
        headless: false
    };

    // Lauch the browser with the launch options
    const browser = await puppeteer.launch(launchOptions);

    // Use a try-catch-finally to ensure that browser is closed
    try {
        // Create a new page
        const page = await browser.newPage();

        // Set the username and password provided by Oxylabs
        await page.authenticate({
            username: 'USERNAME',
            password: 'PASSWORD'
        });

        // This page simply returns the IP address
        await page.goto('https://httpbin.org/ip');

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
