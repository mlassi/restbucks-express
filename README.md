This is an implementation of the Restbucks application.

It assumes that you are using Node.js 4.1.x or later.

curl -i -H "Content-Type: application/json" -X POST -d '{"location":"starbucks","items":[{"name":"latte", "quantity":2, "size":"small"}, {"name":"milk", "quantity": 1, "size":"medium"}]}' http://localhost:8000/api/order
