const orderController = function (Order) {

    const post = function (req, res) {
        var order = new Order();

        order.save(function (err) {
            if(err) {
                res.status(500);
            }
            else {
                res.status(201);
            }
        });
        res.send(order);
    }

    return {
        post: post
    }
}

module.exports = orderController;
