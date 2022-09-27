import mechanicalsoup

# Credentials of Oxylabs Residential Proxy access.
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
