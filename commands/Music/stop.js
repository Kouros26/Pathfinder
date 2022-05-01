module.exports.run = async (client, message, args) => {
  
  let queue = await client.distube.getQueue(message);

  if(queue) {
    client.distube.stop(message)

    message.channel.send('Music stopped')
  } else if (!queue) {
    return
  };
};

module.exports.help = {
  name: 'stop',
  aliases: ['stop', 'clear', 'leave'],
  category: 'music',
  description: "Stop the music",
  cooldown: 5,
  usage: '',
  isUserAdmin: false, //si on peut utiliser la commande sur un admin, true = non
  permissions: false, //si il faut des permissions pour utiliser la commande
  args: false
};