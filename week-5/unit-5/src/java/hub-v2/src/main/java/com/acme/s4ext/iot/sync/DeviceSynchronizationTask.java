package com.acme.s4ext.iot.sync;

import java.util.List;
import java.util.TimerTask;

import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.acme.s4ext.jpa.EntityManagerFactoryHandler;
import com.acme.s4ext.jpa.model.IoTDevice;

import com.sap.security.um.user.PersistenceException;
import com.sap.security.um.user.UnsupportedUserAttributeException;

/*
 * TimerTask to fetch available sensor devices from the SAP HCP IoT service
 * using a rest call and to persist them to ACME.T_IOT_DEVICE
 */
public class DeviceSynchronizationTask extends TimerTask {
	private static final Logger LOGGER = LoggerFactory.getLogger(DeviceSynchronizationTask.class);
	
	private static int failingReadDevicesAttempts=0;

	@Override
	public void run() {
		LOGGER.info(this.getClass().getSimpleName() + " method run() start....");
		if (failingReadDevicesAttempts > 0)
		{	
			// Stop the Device Synchronization after a failed attempt so that the user provided in Destination "iot-internet-http" will not be locked.
			LOGGER.error(this.getClass().getSimpleName() + " method run() stopped as last run failed. Devices are not synchronised. Please restart the application to reset the failed attempts.");
			return; 
		}
	
		try {
			
			// Get the devices
			List<IoTDevice> devices;
			try {
				devices = DeviceSynchronizationIoTApiRestClient.getDevices();
			} catch (IoTApiRestClientException e) {
				failingReadDevicesAttempts++;
				LOGGER.error("Could not get devices from IotServices: " + e.getMessage(), e);
				return;
			}

			// Get an EntityManagerFactory to persist the devices
			// As there is no good delta support and to keep this simple
			// all "old" entries are deleted before adding new entries to
			// avoid duplicate entries.
			EntityManagerFactory emf;
			try {
				emf = EntityManagerFactoryHandler.getEntityManagerFactory();
			} catch (Exception e) {
				LOGGER.error("could not get EntitiyManagerFactory: " + e.getMessage(), e);
				return;
			}
			EntityManager em = emf.createEntityManager();
			em.getTransaction().begin();
			try {
				deleteDevices(em);

				for (IoTDevice ioTDevice : devices) {
					em.persist(ioTDevice);
				}

				em.getTransaction().commit();
			} catch (Exception e) {
				em.getTransaction().rollback();
				LOGGER.error("Could not update the devices: " + e.getMessage(), e);
				return;
			}
		} catch (Exception e) {
			LOGGER.error("An unexpected problem occurred, could not update the synchronise devices: " + e.getMessage(), e);
		}
		LOGGER.info(this.getClass().getSimpleName() + " method run() successfully finished.");
	}

	/*
	 * Helper to delete all "old" entries before persisting new entries.
	 */
	private void deleteDevices(EntityManager em)
			throws PersistenceException, UnsupportedUserAttributeException, NamingException {
		em.createQuery("DELETE FROM " + IoTDevice.class.getSimpleName()).executeUpdate();
		em.clear(); // clear the cache
	}
}
