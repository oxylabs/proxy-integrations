# Oxylabs' Proxy Integration with Puppeteer

[<img src="https://img.shields.io/static/v1?label=&message=JavaScript&color=brightgreen" />](https://github.com/topics/javascript) [<img src="https://img.shields.io/static/v1?label=&message=Web%20Scraping&color=important" />](https://github.com/topics/web-scraping) [<img src="https://img.shields.io/static/v1?label=&message=Rotating%20Proxies&color=blueviolet" />](https://github.com/topics/rotating-proxies)
- [Requirements](#requirements)
- [Integrating Datacenter Proxies](#integrating-datacenter-proxies)
- [Integrating Residential Proxies](#integrating-residential-proxies)
## Requirements

### Puppeteer
```bash
npm install puppeteer
```

## Integrating Datacenter Proxies 

### Getting a List of Proxies

Open the following URL in the browser and enter your credentials. You will see a list of proxies in plain text:

```
https://proxy.oxylabs.io/all
```

### Using Proxies

If you wish to select any of the provided proxies, save the proxy IP, along with the port in a variable.

To use all these proxies, first, save these proxies as an array in your code:

```javascript
let proxies = [
    '127.0.0.1:60000',
    '127.0.0.2:60000',
    '127.0.0.3:60000',
    '127.0.0.4:60000'
  ]
```

To select one of these proxies randomly, use the following line of code:

```JavaScript
var proxy = proxies[Math.floor(Math.random() * proxies.length)];
```

The proxy server you will use needs to be supplied as `--proxy-server` argument.

Create a variable that can contain all the arguments in an array.

Additionally, `launchOptions` can also contain other information, such as `headless` mode as following:

```JavaScript
const launchOptions = {
  // Set the proxy server to the server variable
  args: ['--proxy-server=' + proxy],

  // Set additional launch options here
  headless: false
};
```

After creating the `launchOptions` variable, create a `puppeteer` instance and launch the browser.

```javascript
const browser = await puppeteer.launch(launchOptions);
```

Finally, to authenticate using your credentials, call the `page.authenticate` function after creating a `page`.

```javascript
// Create a new page
const page = await browser.newPage();

// Set the username and password provided by Oxylabs
await page.authenticate({
  username: 'USERNAME',
  password: 'PASSWORD'
});
```

For the complete code sample, see [this file](datacenter_random.js).


## Integrating Residential Proxies

### Random Proxy Using the Proxy API
To get a random proxy, use the proxy server `pr.oxylabs.io:7777`.

As mentioned above, the proxy server you will use needs to be supplied as `--proxy-server` argument.

Create a variable that can contain all the arguments in an array.

Additionally, `launchOptions` can also contain other information, such as `headless` mode as following:

```JavaScript
const launchOptions = {
  // Set the proxy server to the server variable
  args: ['--proxy-server=pr.oxylabs.io:7777']
};
```

After creating the `launchOptions` variable, create a `puppeteer` instance and launch the browser.

```javascript
const browser = await puppeteer.launch(launchOptions);
```

Finally, to authenticate using your credentials, call the `page.authenticate` function after creating a `page`.

```javascript
// Create a new page
const page = await browser.newPage();

// Set the username and password provided by Oxylabs
await page.authenticate({
  username: 'USERNAME',
  password: 'PASSWORD'
});
```

For the complete code sample, see [this file](residential_random.js).

### Country Specific Proxies

If you wish to use country-specific proxies, all you need to do is change the `proxy` server.

For example, if you want to use a proxy for the United States, you can use the following code:

```javascript
const launchOptions = {
  args: ['--proxy-server=us-pr.oxylabs.io:10001']
};

```

In this example, `us-pr.oxylabs.io:10000` is the country specific entry point for the United States.

Another example is `gb-pr.oxylabs.io:20000`, which is the country specific entry point for the United Kingdom.

For a complete list of all entry points, see [Country Specific Entry Nodes](https://oxy.yt/KrKF)
