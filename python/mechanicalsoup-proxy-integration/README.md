# Oxylabs’ Residential Proxies integration with MechanicalSoup

[<img src="https://img.shields.io/static/v1?label=&message=Python&color=brightgreen" />](https://github.com/topics/python) [<img src="https://img.shields.io/static/v1?label=&message=Mechanical%20Soup&color=orange" />](https://github.com/topics/mechanicalsoup) [<img src="https://img.shields.io/static/v1?label=&message=Web-Scraping&color=yellow" />](https://github.com/topics/web-scraping) [<img src="https://img.shields.io/static/v1?label=&message=Rotating%20Proxies&color=blueviolet" />](https://github.com/topics/rotating-proxies)

[Mechanical Soup](https://github.com/MechanicalSoup/MechanicalSoup) is a Python library designed
for automating web interactions such as submitting forms, following links and redirects. Since it
is built on using Python `requests` and `BeautifulSoup` libraries, `MechanicalSoup` 
is often used as a library to perform some web-scraping operations, such as image extraction,
due to the powerful integrated functions that comes in with it. In this tutorial, we're going
to cover how you can integrate [Oxylabs' Residential Proxies](https://oxy.yt/urSrl) with 
MechanicalSoup and share a code sample for submitting an HTML form while using proxies.

## Requirements

For the integration to work, you'll need to install it on your system. 
You can do it using `pip` command:
```bash
pip install mechanicalsoup
```

`Python 3` or higher

Residential Proxies: https://oxy.yt/urSrl

## Proxy Authentication

For proxies to work, you'll need to specify your Oxylabs Residential Proxy access credentials inside the 
[main.py](https://github.com/oxylabs/mechanicalsoup-proxy-integration/blob/main/main.py) file.

```python
USERNAME = "your_username"
PASSWORD = "your_password"
ENDPOINT = "pr.oxylabs.io:7777"
```
Adjust the `your_username` and `your_password` values with the username and password 
of your Oxylabs Residential Proxy access credentials.

## Testing Proxy Connection

To see if the proxy is working, try visiting [ip.oxylabs.io/location](https://ip.oxylabs.io/location). <br>If everything is working correctly, 
it will return an IP address of a proxy that you're using.

## Locating an HTML Form

Locating an HTML form in MechanicalSoup is relatively easy - all you have to do is to select it
via CSS selector using a `select_form` method. It returns a `soup` object that can be later 
retrieved using `form` attribute. Here's an example of locating a form and printing its values in
the input fields.

```python
import mechanicalsoup

# Credentials of Oxylabs' Residential Proxy access.
USER = "your_username"
PASSWORD = "your_password"
ENDPOINT = "pr.oxylabs.io:7777"

proxies = {
    "http": f"http://{USER}:{PASSWORD}@{ENDPOINT}",
    "https": f"http://{USER}:{PASSWORD}@{ENDPOINT}",
}

def get_html_form(proxies):
    # Initiate a MechanicalSoup object.
    browser = mechanicalsoup.StatefulBrowser()
    browser.session.proxies = proxies 
    browser.open("https://httpbin.org/forms/post") 
    
    # Select a form in HTML using a CSS Selector.
    form = browser.select_form('form[action="/post"]')
    # Print the form field data.
    return form.print_summary()


if __name__ == "__main__":
    print(get_html_form(proxies))
```

## Full Code: Submitting an HTML Form with Proxies

```python
import mechanicalsoup

# Credentials for Oxylabs' Residential Proxy access.
USER = "your_username"
PASSWORD = "your_password"
ENDPOINT = "pr.oxylabs.io:7777"

proxies = {
    "http": f"http://{USER}:{PASSWORD}@{ENDPOINT}",
    "https": f"http://{USER}:{PASSWORD}@{ENDPOINT}",
}

def get_html_form(proxies):
    # Initiate a MechanicalSoup object.
    browser = mechanicalsoup.StatefulBrowser()
    browser.session.proxies = proxies 
    browser.open("https://httpbin.org/forms/post") 

    # Select a form in HTML using a CSS Selector.
    form = browser.select_form('form[action="/post"]')

    form_info = {
        "custname": "John",
        "custtel": "123",
        "custemail": "info@example.com",
        "size": "small",
        "topping": ("bacon", "cheese", "onion"),
        "delivery": "18:30",
        "comments": "I like pizza",
    }

    # Populate the form with values from the `form_info` dict.
    for key, value in form_info.items():
        form.set(key, value)

    # Launch a Browser.
    browser.launch_browser()
    response = browser.submit_selected()
    return response.text


if __name__ == "__main__":
    print(get_html_form(proxies))
```
If you're having any trouble integrating proxies with MechanicalSoup and this guide didn't help 
you - feel free to contact Oxylabs customer support at support@oxylabs.io.
