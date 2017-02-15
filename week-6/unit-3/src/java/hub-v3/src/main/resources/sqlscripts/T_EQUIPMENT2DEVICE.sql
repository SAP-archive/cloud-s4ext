/*
 * Table linking equipment to sensor device to indicate that the sensor is registered for the equipment.
 * If a sensor device is registered for an equipment this indicates that there might be acceleration data and
 * with this also damage data recorded for the equipment. 
 * 
 * The data for this table is inserted via the OData service /hub/odata.svc/Equipment2Devices
 * 
 * As long no sensor device is registered to any device this table will be empty.
 */
 CREATE TABLE "ACME"."T_EQUIPMENT2DEVICE"( 
    "EQUIPMENT_KEY" VARBINARY(16)  NOT NULL PRIMARY KEY,  -- Unique key for the equipment. To keep it simple we use the already globally unique "SalesOrderItem NodeKey" and do not generate a new key
	"G_DEVICE" NVARCHAR(255) NOT NULL,					  -- ID of the sensor device that is registered to the equipment
    "G_DEVICE_NAME" NVARCHAR(255) NOT NULL) 			  -- Name of the sensor device that is registerd to the equipment