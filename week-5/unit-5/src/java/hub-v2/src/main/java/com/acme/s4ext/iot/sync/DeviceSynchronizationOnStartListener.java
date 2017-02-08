package com.acme.s4ext.iot.sync;

import java.util.Timer;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.LoggerFactory;

/*
 * Listener to trigger a scheduled job to fetch available device sensors from the SAP HCP IoT service.
 */
public class DeviceSynchronizationOnStartListener implements ServletContextListener {

	@Override
	public final void contextInitialized(final ServletContextEvent sce) {
		scheduleIoTDeviceSynchronization();
	}

	@Override
	public final void contextDestroyed(final ServletContextEvent sce) {

	}

	/*
	 * Helper to start a scheduled job to fetch device sensors.
	 */
	private void scheduleIoTDeviceSynchronization() {
		Timer timer = new Timer();
		long delay = 10 * 1000; // delay in milliseconds before task is to be executed.
		long period = 2 * 1000; // time in milliseconds between successive task executions.
		timer.schedule(new DeviceSynchronizationTask(), delay, period);
		LoggerFactory.getLogger(this.getClass()).info(DeviceSynchronizationTask.class.getSimpleName() + " schedule.");
	}
}
