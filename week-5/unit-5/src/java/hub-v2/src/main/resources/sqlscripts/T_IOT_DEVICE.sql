/*
 * Table that will hold a synchronized copy of all sensor devices that are registered at the HCP IoT service.
 * 
 * The table will be filled with a synchronization job com.acme.s4ext.iot.sync that will poll the HCP IoT service
 * for all available devices and write them in this table.
 * 
 * As long there are no sensor devices registered in the HCP IoT service or the synchronization of sensor devices is
 * not implemented this table will be empty.
 */ 
CREATE TABLE "ACME"."T_IOT_DEVICE" (
    "ID" NVARCHAR(255) NOT NULL PRIMARY KEY, -- ID of a sensor device as fetched from the HCP IoT Service
    "NAME" NVARCHAR(255) NOT NULL )			 -- Name of a sensor device as fetched from the HCP IoT Service