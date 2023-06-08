const { Router } = require('express');
const platformsRouter = Router();
const { platformsHandler } = require('../handlers/platformsHandler');


platformsRouter.get('/platforms',platformsHandler);

module.exports = platformsRouter;
