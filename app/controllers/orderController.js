const orderController = function () {

    const post = function (req, res) {
        res.status(201);
    }

    return {
        post: post
    }
}

module.exports = orderController;
