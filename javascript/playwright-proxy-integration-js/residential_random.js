// Import Chromium from Playwright
const { chromium } = require('playwright');

// Create an anonymous and asynchronous function and call it immediately
(async () => {
    // For residential proxy, set the API endpoint as the proxy server
    // For country-specific proxy, use different API endpoint
    // See https://developers.oxylabs.io/residential-proxies/#random-proxy-entry-nodes
    var proxy = 'pr.oxylabs.io:7777';

    // Create a variable for launch options
    // Set the proxy server to the server variable
    // Set the username and password provided by Oxylabs
    const launchOptions = {
        
        // Proxy server and credentials
        proxy: {
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
        await page.goto('https://ip.oxylabs.io/');

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
