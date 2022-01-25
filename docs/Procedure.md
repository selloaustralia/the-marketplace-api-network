Procedure 
* For Collecting Orders
The orders will be synced into the system via RabbitMQ
The Api Will load the credentials into the system via the request from the payload. 
The API immediatly responds with and unique id to trace the orders from rabbit mq. 
Once the request is made into the system, a assert queue will be immediatly inserted and queued into the mq with the tracable id as subject. 
the application can consume the data from the tracable id via rabbit mq. 
the system will push data into the system.
