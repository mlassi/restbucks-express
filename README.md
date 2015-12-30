This is an implementation of the Restbucks application.

It assumes that you are using Node.js 4.1.x or later.

Create Order Request: <br/>
curl -i -H "Content-Type: application/json" -X POST -d '{"location":"starbucks","items":[{"name":"latte", "quantity":2, "size":"small"}, {"name":"milk", "quantity": 1, "size":"medium"}]}' http://localhost:8000/api/order

Create Payment Request: <br/>
curl -i -H "Content-Type: application/json" -X POST -d '{"amount":"5","cardHolderName":"John Doe", "cardNumber":"4111111111111111", "expiryMonth":"06", "expiryYear":"2016", "cardType": "VISA"}' http://localhost:8000/api/payment/{orderId}

Retrieve order: <br/>
curl -i -H "Content-Type: application/json" http://localhost:8000/api/order/{orderId}
