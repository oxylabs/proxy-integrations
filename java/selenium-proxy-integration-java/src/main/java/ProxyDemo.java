import io.github.bonigarcia.wdm.WebDriverManager;
import net.lightbody.bmp.BrowserMobProxyServer;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ProxyDemo {

    public static void main(String[] args) {
        randomIPDemo();
        countrySpecificIPDemo("DE");
    }

    private static void countrySpecificIPDemo(String countryCode) {

        WebDriverManager.chromedriver().setup();

        BrowserMobProxyServer proxy = ProxyHelper.getProxy(
                ProxySetup.ENDPOINT,
                ProxySetup.USERNAME,
                ProxySetup.PASSWORD,
                countryCode); // Returns random proxy in that country
        WebDriver driver = ProxyHelper.getDriver(proxy, true);

        try {
            // Selenium Code Here
            driver.get("https://ip.oxylabs.io/");

            // Parse the response and get IP from <pre>
            try {
                WebElement preElement = driver.findElement(By.cssSelector("pre"));
                System.out.println("Your IP is " + preElement.getText());
            } catch (NoSuchElementException e) {
                System.out.println("IP Not Found.\n" + driver.getPageSource());
            }

        } finally {
            driver.quit(); // Quit the driver
            proxy.stop(); // Quit local JVM proxy
        }

    }

    private static void randomIPDemo() {
        WebDriverManager.chromedriver().setup();

        BrowserMobProxyServer proxy = ProxyHelper.getProxy(
                ProxySetup.ENDPOINT,
                ProxySetup.USERNAME,
                ProxySetup.PASSWORD,
                null); // Return random proxy in any country
        WebDriver driver = ProxyHelper.getDriver(proxy, true);

        try {
            // Selenium Code Here
            driver.get("https://ip.oxylabs.io/");

            // Parse the response and get IP from <pre>
            try {
                WebElement preElement = driver.findElement(By.cssSelector("pre"));
                System.out.println("Your IP is " + preElement.getText());
            } catch (NoSuchElementException e) {
                System.out.println("IP Not Found.\n" + driver.getPageSource());
            }

        } finally {
            driver.quit(); // Quit the driver
            proxy.stop(); // Quit local JVM proxy
        }
    }

}