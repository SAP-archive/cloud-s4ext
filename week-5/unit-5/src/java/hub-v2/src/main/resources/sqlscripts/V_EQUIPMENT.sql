/* 
 * View that will return all ordered equipment along with some master data, information if there are 
 * sensor devices registered for the equipment and some master date for the sensor device.
 * 
 * The data for the sales orders and products has been replicated from the S/4HANA backend to the schema
 * SLT_REPLICATION in the tables SNWD_SO_I(sales order item data), SNWD_PD (product masterdata) and 
 * SWND_TEXTS (texts such as product names).
 * 
 * The data for sensor devices is provided by the table T_EQUIPMENT2DEVICE.
 * 
 * If no sensor device is registered the respective columns will be empty.
*/
CREATE VIEW "ACME"."V_EQUIPMENT" AS 
SELECT
    "SO_I"."NODE_KEY" AS "EQUIPMENT_KEY",					-- Unique key for the equipment. To keep it simple we use the already globally unique "SalesOrderItem NodeKey" and do not generate a new key
    "SO_I"."PARENT_KEY" AS "SO_NODE_KEY",					-- Unique key of the order with which the equipement was ordered
    "SO"."SO_ID",											-- ID of the sales order with which the equipment was ordered
    "SO_I"."SO_ITEM_POS",									-- Position of the equipment in the sales order
    "P"."PRODUCT_ID",										-- ID of the ordered product
    "PD"."TEXT" AS "PRODUCT_NAME",							-- Name of the ordered product
    CASE WHEN "E2D"."G_DEVICE" is null 						-- Indicator if this equipment has a device sensor registered
        THEN 
           0
        ELSE
           1
    END AS "IS_REGISTERED",
    "E2D"."G_DEVICE",										-- ID of the sensor device that is registered to the equipment
    "E2D"."G_DEVICE_NAME",									-- Name of the sensor device that is registerd to the equipment
    ( 														-- Number of calculated damage events for the equipment
    	SELECT COUNT (*) FROM  "ACME"."V_DAMAGE_DATA" AS "D" 
    	WHERE "SO_I"."NODE_KEY"="D"."EQUIPMENT_KEY"
     	GROUP by "D"."EQUIPMENT_KEY"
     ) AS "COUNT_DAMAGE"				
FROM "SLT_REPLICATION"."SNWD_SO_I" AS "SO_I"
       LEFT OUTER JOIN "ACME"."T_EQUIPMENT2DEVICE" AS "E2D" ON "SO_I"."NODE_KEY"="E2D"."EQUIPMENT_KEY"
       LEFT OUTER JOIN  "SLT_REPLICATION"."SNWD_PD" AS "P" ON "SO_I"."PRODUCT_GUID" = "P"."NODE_KEY"
       LEFT OUTER JOIN "SLT_REPLICATION"."SNWD_TEXTS" "PD" 	-- Join the name of the product for english language only
          ON "P"."NAME_GUID"="PD"."PARENT_KEY" 
          AND "PD"."LANGUAGE"='E',
     "SLT_REPLICATION"."SNWD_SO" AS "SO"
WHERE  "SO"."NODE_KEY" = "SO_I"."PARENT_KEY"   