const express = require('express');
const router = express.Router();
const cookieRotuer = require('./cookies/cookies.router');
const sessionsRouter = require('./sessions/sessions.router');

/**
 * @swagger
 * /health:
 *  get:
 *   description: Health check
 *  responses:
 *  200:
 * 
 */
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: true,
    healt: 'up', 
    enviroment: process.env.ENVIROMENT || 'Not found'
  });
})
  .use('/cookies', cookieRotuer)
  .use('/session', sessionsRouter)

module.exports = router;