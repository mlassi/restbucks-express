const orderController = function (Order) {

    const post = function (req, res) {
        const order = new Order();
        order.save();
        res.status(201);
        res.send(order);
    }

    return {
        post: post
    }
}

module.exports = orderController;
