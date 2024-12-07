require('dotenv').config();

const fastify = require('fastify')({
  logger: true,
});
fastify.register(require('./routes/send-message'))

const PORT = process.env.PORT || 3000;

const init = async () => {
  try {
    await fastify.listen({
      port: PORT,
      host: '0.0.0.0'
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

init();