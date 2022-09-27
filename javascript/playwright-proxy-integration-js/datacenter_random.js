// Import Chromium from Playwright
const { chromium } = require('playwright');

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
    // Set the proxy server to the proxy variable
    // Set the username and password provided by Oxylabs
    const launchOptions = {
        proxy: {

            // Proxy server and credentials
            server: proxy,
            username: 'USERNAME',
            password: 'PASSWORD'
        },

        // Set additional launch options here
        headless: false
    };

    // Lauch the browser with the launch options
    const browser = await chromium.launch(launchOptions);

    // Use a try-catch-finally to ensure that browser is closed
    try {
        // Create a new page
        const page = await browser.newPage();

        // This page simply returns the IP address
        await page.goto('https://httpbin.org/ip');

        // Print the response from the page
        // This will print the IP address of the proxy 
        console.log(await page.textContent("*"));
    } catch (e) {
        // print the error to the console
        console.log(e);
    }
    finally {
        // Close the browser
        await browser.close();

    }

})();
