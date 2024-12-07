function sendMessageRoutes(fastify, options, done) {
  fastify.register(require('fastify-axios'), {
    baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`,
  });

  const postSendMessageOpts = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
            },
          },
        },
      },
    },
    handler: async function (req, res) {
      const receiverChatIds = process.env.CHAT_IDS.split(',');

      for (const chatId of receiverChatIds) {
        const { data, status } = await fastify.axios.post('/sendMessage', {
            chat_id: chatId,
            text: req.body.text
          },
        );
        fastify.log.info(data);
        fastify.log.info(status);
      }
      res.send({
        status: 'success',
      });
    },
  };

  fastify.post('/send-messages', postSendMessageOpts);

  done();
}

module.exports = sendMessageRoutes;
