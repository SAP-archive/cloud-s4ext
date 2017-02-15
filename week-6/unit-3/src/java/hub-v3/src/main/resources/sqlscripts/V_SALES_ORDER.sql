/*
 * View returning all sales orders including the number of ordered equipment and the number of equipment that 
 * is registered to a sensor device. 
 * 
 * The data for the sales orders items that are considered as equipment has been replicated from the S/4HANA 
 * backend to the schema SLT_REPLICATION in the tables SNWD_SO_I(sales order item data). 
 */
CREATE VIEW "ACME"."V_SALES_ORDER" AS 
SELECT
    "SO"."NODE_KEY",				-- Unique key of the sales order
    "SO"."SO_ID",					-- ID of the sales order
    "SO"."DELIVERY_STATUS",			-- current delivery status of the sales order. Can be: Empty (Not Delivered), D (Delivered)
    "SO"."LIFECYCLE_STATUS",		-- current lifecycle status of the sales order. Can be: N (New), P (In Progress), C (Closed), X (Cancelled)
    "SO"."CREATED_AT",				-- Timestamp for sales order creation
    "SO"."CHANGED_AT",				-- Timestamp for last sales order change
    (								-- Number of equipment ordered with this sales order
    	SELECT count(*) FROM "SLT_REPLICATION"."SNWD_SO_I" "SO_I"
    	WHERE "SO_I"."PARENT_KEY"="SO"."NODE_KEY"
    ) AS "NUMBER_OF_ORDERED_EQUIPMENT",
    (								-- Number of ordered equipment tracked by an IoT device sensor:
    	SELECT count(*) FROM "SLT_REPLICATION"."SNWD_SO_I" "SO_I", "ACME"."T_EQUIPMENT2DEVICE" AS "E2D"
    	where "SO_I"."PARENT_KEY"="SO"."NODE_KEY" and "SO_I"."NODE_KEY"="E2D"."EQUIPMENT_KEY"
    ) AS "NUMBER_OF_REGISTERED_EQUIPMENT"
FROM "SLT_REPLICATION"."SNWD_SO" AS "SO"