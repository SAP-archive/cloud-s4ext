/*
 * View that will return all sensor devices registered at the SAP IoT Service and that are not yet
 * registered to an equipment, i.e. that have no entry in T_EQUIPMENT2DEVICE.
 * 
 * The view is supplied by T_EQUIPMENT2DEVICE that holds all registered devices and T_IOT_DEVICES
 * that are registered at the HCP IoT service. 
 * 
 * If T_IOT_DEVICES is empty this view will return no value. If T_EQUIPMENT2DEVICES holds all devices
 * in T_IOT_DEVICES, the view will also return no value.
 */
CREATE VIEW "ACME"."V_FREE_DEVICE" AS 
SELECT * FROM "ACME"."T_IOT_DEVICE" AS D 
WHERE NOT EXISTS (SELECT * FROM "ACME"."T_EQUIPMENT2DEVICE" AS E2D where E2D.G_DEVICE=D.ID) 