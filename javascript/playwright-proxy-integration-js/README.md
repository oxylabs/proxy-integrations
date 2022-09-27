# Oxylabs' Proxy Integration with Playwright 

[<img src="https://img.shields.io/static/v1?label=&message=JavaScript&color=brightgreen" />](https://github.com/topics/javascript) [<img src="https://img.shields.io/static/v1?label=&message=Web%20Scraping&color=important" />](https://github.com/topics/web-scraping) [<img src="https://img.shields.io/static/v1?label=&message=Rotating%20Proxies&color=blueviolet" />](https://github.com/topics/rotating-proxies)
- [Requirements](#requirements)
- [Integrating Datacenter Proxies](#integrating-datacenter-proxies)
- [Integrating Residential Proxies](#integrating-residential-proxies)
## Requirements

### Playwright
```bash
npm install playwright
```

## Integrating Datacenter Proxies 

### Getting a List of Proxies

Open the following URL in the browser and enter your credentials. You will see a list of proxies in plain text:

```
https://proxy.oxylabs.io/all
```

### Using Proxies

If you wish to select any of the provided proxies, you need to save the proxy IP, along with the port, in a variable.

To use all these proxies, first, save these proxies as an array in your code:

```javascript
let proxies = [
    '127.0.0.1:60000',
    '127.0.0.2:60000',
    '127.0.0.3:60000',
    '127.0.0.4:60000'
  ]
```

To select one of the proxies randomly, use the following line of code:

```JavaScript
var proxy = proxies[Math.floor(Math.random() * proxies.length)];
```

Create a variable called `launchOptions` and assign the proxy information to it.

Don't forget to replace `USERNAME` and `PASSWORD` with your proxy user credentials.

```javascript
const launchOptions = {
        proxy: {
            server: proxy,
            username: 'USERNAME',
            password: 'PASSWORD'
        }
    };
```

After creating the `launchOptions` variable, create a `playwright` instance and launch the browser.

```javascript
const browser = await chromium.launch(launchOptions);
```

For the complete code sample, see [this file](datacenter_random.js).


## Integrating Residential Proxies

### Random Proxy Using the Proxy API
Proxy information can be supplied as a parameter to the `launch` method of `playwright` instance. 

Alternatively, create a variable called `launchOptions` and assign the proxy information to it.

Don't forget to replace `USERNAME` and `PASSWORD` with your proxy user credentials.

```javascript
const launchOptions = {
        proxy: {
            server: 'pr.oxylabs.io:7777',
            username: 'USERNAME',
            password: 'PASSWORD'
        },
        headless: false
    };
```

The additional benefit of using lauchOptions variable is that other information such as `headless` can be supplied to the `launch` method.:

After creating the `launchOptions` variable, create a `playwright` instance and launch the browser.

```javascript
const browser = await chromium.launch(launchOptions);
```

For the complete code sample, see [this file](residential_random.js).

### Country Specific Proxies

If you wish to use country-specific proxies, all you need to do is change the proxy server.

For example, if you wish to use the proxy for the United States, you can use the following code:

```javascript
const launchOptions = {
        proxy: {
            server: 'us-pr.oxylabs.io:10001',
            username: 'USERNAME',
            password: 'PASSWORD'
        },
        headless: false
    };

```

In this example, us-pr.oxylabs.io:10000 is the country specific entry point for the United States.

Another example is `gb-pr.oxylabs.io:20000`, which is the country specific entry point for United Kingdom.

For a complete list of all entry points, see [Country Specific Entry Nodes](https://oxy.yt/zrG0).
