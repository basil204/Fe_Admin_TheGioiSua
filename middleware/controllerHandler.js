// middleware/controllerHandler.js
const createRouteHandler = (controller, method) => (req, res) => {
    controller[method](req, res);
};

module.exports = createRouteHandler;
