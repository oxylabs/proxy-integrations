import net.lightbody.bmp.BrowserMobProxyServer;
import net.lightbody.bmp.client.ClientUtil;
import net.lightbody.bmp.proxy.auth.AuthType;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.net.InetSocketAddress;

public class ProxyHelper {
    static WebDriver getDriver(BrowserMobProxyServer proxy, boolean headless) {
        ChromeOptions options = new ChromeOptions();

        // Required to work with https URLS
        options.addArguments("--ignore-certificate-errors");

        // Visibility of the browser is controlled by the parameter headless
        options.setHeadless(headless);

        // Enable proxy for Selenium
        options.setProxy(ClientUtil.createSeleniumProxy(proxy));

        WebDriver driver = new ChromeDriver(options);
        return driver;
    }

    static BrowserMobProxyServer getProxy(String endpoint, String username, String password, String countryCode) {
        // The endpoint contains host and port. Split it for further use.
        String[] endpointParts = endpoint.split(":");
        if (endpointParts.length != 2)
            throw new IllegalArgumentException("Endpoint should include host and port. For example, pr.oxylabs.io:7777");
        String updatedUser = updateUserForCountry(username, countryCode);
        // BrowserMobProxyServer makes it easy to communicate with Chrome.
        BrowserMobProxyServer proxy = new BrowserMobProxyServer();

        // Handling http and https URLs
        proxy.setTrustAllServers(true);

        // Oxylabs proxy as added to the chain of locally running proxy server
        proxy.setChainedProxy(new InetSocketAddress(endpointParts[0], Integer.parseInt(endpointParts[1])));
        proxy.chainedProxyAuthorization(updatedUser, password, AuthType.BASIC);
        // This is local proxy in JVM. Port is assinged automatically.
        // It must be stopped using stop() method before exiting.
        proxy.start(0);
        return proxy;
    }

    private static String updateUserForCountry(String userName, String countryCode) {
        if (countryCode == null) {
            return userName;
        }
        return String.format("customer-%s-cc-%s", userName, countryCode);
    }
}
