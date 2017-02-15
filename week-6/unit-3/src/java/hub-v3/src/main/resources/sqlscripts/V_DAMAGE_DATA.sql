/*
 * View that will calculate and return equipment that have acceleration sensor values recorded with
 * values higher than +3g or smaller -3g along the X, Y or Z axis. Such values are considered as damage so 
 * that the returned data is the list of all equipment with a potential damage.
 * 
 * The sensor device master data is provided by table T_EQUIPMENT2DEVICE, the recorded acceleration values 
 * are provided by table T_IOT_MESSAGE.
 * 
 * If there is no sensor device registered to an equipment and if no sensor acceleration values >3 are recorded,
 * then this view will return no values.
 */
CREATE VIEW "ACME"."V_DAMAGE_DATA" As
SELECT
    "E2D"."G_DEVICE" as "G_DEVICE",				-- ID of the sensor device that is registered to the equipment
    "E2D"."G_DEVICE_NAME" as "G_DEVICE_NAME",	-- Name of the sensor device that is registerd to the equipment
    "E2D"."EQUIPMENT_KEY" as "EQUIPMENT_KEY",	-- Unique key for the equipment. To keep it simple we use the already globally unique "SalesOrderItem NodeKey" and do not generate a new key
    "M"."C_TIMESTAMP",							-- Timestamp of a recorded acceleration value
    SQRT(  POWER("M"."C_ACCX", 2) 				-- Calculation of the maximum acceleration on the X, Y, Z axis
    	 + POWER("M"."C_ACCY", 2) 
    	 + POWER("M"."C_ACCZ", 2)
    ) as "ACC_MAGNITUDE"
FROM "ACME"."T_IOT_MESSAGE" as "M",
     "ACME"."T_EQUIPMENT2DEVICE" "E2D" 
WHERE "M"."G_DEVICE" = "E2D"."G_DEVICE"
AND SQRT( 										-- If the maximum acceleration is >3 it is considered a potential damage.
		   POWER("M"."C_ACCX", 2) 
		 + POWER("M"."C_ACCY", 2) 
		 + POWER("M"."C_ACCZ", 2)
		) > 3 