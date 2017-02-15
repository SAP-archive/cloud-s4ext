package com.acme.s4ext.iot.sync;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.MalformedURLException;
import java.net.Proxy;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.olingo.odata2.api.commons.HttpStatusCodes;

import com.acme.s4ext.jpa.model.IoTDevice;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sap.core.connectivity.api.configuration.ConnectivityConfiguration;
import com.sap.core.connectivity.api.configuration.DestinationConfiguration;

public class DeviceSynchronizationIoTApiRestClient {

	private static final String IOT_HCP_SRV_DEST_NAME = "iot-internet-http";
	private static final String IOT_DEVICES_API_PATH = "v2/api/devices";

	/*
	 * GetDevicesRestCallHelper is fetching devices from the SAP HCP IoT service
	 * via an REST API offered by the service.
	 * 
	 * The rest calls go via an authenticated HTTP destination to the IoT service API.
	 */
	public static List<IoTDevice> getDevices() throws IoTApiRestClientException {

		try {
			// Look up the connectivity configuration API
			Context ctx = new InitialContext();
			ConnectivityConfiguration configuration = (ConnectivityConfiguration) ctx
					.lookup("java:comp/env/connectivityConfiguration");

			// Get destination configuration
			DestinationConfiguration destConfiguration = configuration.getConfiguration(IOT_HCP_SRV_DEST_NAME);
			if (destConfiguration == null) {
				throw new IoTApiRestClientException("Configuration Error detected: Destination " + IOT_HCP_SRV_DEST_NAME
						+ " could not be found. " + "Hint: Please check the destination configured.");
			}
			String authentication = destConfiguration.getProperty("Authentication");
			if (!("BasicAuthentication".equals(authentication))) {
				throw new IoTApiRestClientException(
						"Configuration Error detected: only Destination with 'Basic Authentication' is supported. "
								+ "Hint: please check in the Destination Configuration the property Authentication and set it to Basic");
			}

			// Create urlConnection and set requestProperties
			URL url = getUrlFromDestConfiguration(destConfiguration);

			String proxyType = destConfiguration.getProperty("ProxyType");
			Proxy proxy = getProxy(proxyType);

			HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection(proxy);

			urlConnection.setRequestProperty("Content-Type", "application/json; charset=utf-8");

			String userCredentials = destConfiguration.getProperty("User") + ":"
					+ destConfiguration.getProperty("Password");
			String basicAuth = "Basic " + new String(Base64.encodeBase64(userCredentials.getBytes()));
			urlConnection.setRequestProperty("Authorization", basicAuth);

			// Connect to the SAP HCP IoT service REST API
			urlConnection.connect();
			int responseCode = urlConnection.getResponseCode();
			if (responseCode != HttpStatusCodes.OK.getStatusCode()) {
				throw new IoTApiRestClientException(" Url <" + url.toString() + "> did not Response OK. Got: <"
						+ urlConnection.getResponseMessage() + ">");
			}

			String contentType = urlConnection.getContentType();
			if (contentType == null || contentType.indexOf("application/json") == -1) {
				// the resonseType ist not json, so somthing got wrong
				String responseMsg = "";
				if (contentType.indexOf("text") >= 0) {
					// only try to read the response in case its a text.
					responseMsg = IOUtils.toString(urlConnection.getInputStream(), "utf-8");
				}
				throw new IoTApiRestClientException("RestCall Url <" + url.toString() + "> return unexpected contentType: <"
						+ contentType + ">, expected was <application/json>. "
						+ "Wrong credentials in the destnation definition might be causing this proble. Please check your destination definiton."
						+ "\n Response was:" + responseMsg);
			}

			// Copy content from the incoming response to the outgoing response
			InputStream jsonInputStream = urlConnection.getInputStream();
			return getDevicesFromJsonInputStream(jsonInputStream);

		} catch (Exception e) {
			// Connectivity operation failed
			throw new IoTApiRestClientException("Could not succesfully read the Devices  via Rest Call using destination <"
					+ IOT_HCP_SRV_DEST_NAME + ">. Reason:" + e.getMessage(), e);
		}
	}

	/*
	 * Helper to get an URL for the destination configuration.
	 */
	private static URL getUrlFromDestConfiguration(DestinationConfiguration destConfiguration)
			throws MalformedURLException {
		String urlValue = destConfiguration.getProperty("URL");

		if (urlValue.charAt(urlValue.length() - 1) != '/') {
			urlValue += '/';
		}
		urlValue += IOT_DEVICES_API_PATH;
		return new URL(urlValue);
	}

	/*
	 * Helper to get a proxy for the destination configuration
	 */
	private static Proxy getProxy(String proxyType) {
		String proxyHost = System.getProperty("http.proxyHost");
		int proxyPort = Integer.parseInt(System.getProperty("http.proxyPort"));

		return new Proxy(Proxy.Type.HTTP, new InetSocketAddress(proxyHost, proxyPort));
	}

	/*
	 * Helper to extract a list of devices from the response of the SAP HCP IoT service REST API-
	 * This implementation is rather simplistic and should not be used for huge number of devices...
	 */
	private static List<IoTDevice> getDevicesFromJsonInputStream(InputStream jsonInputStream)
			throws UnsupportedEncodingException {
		
		Reader reader = new InputStreamReader(jsonInputStream, "UTF-8");

		Type iotDevicesListType = new TypeToken<ArrayList<IoTDevice>>() {
		}.getType();

		return new Gson().fromJson(reader, iotDevicesListType);
	}
}
