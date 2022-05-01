const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command')
  
  let queue = await client.distube.getQueue(message);
  const embed = new MessageEmbed()
    .setTitle(`:track_next: Song skipped`)
    .setColor("#7f00ff")
  if(queue) {
    client.distube.skip(message)

    message.channel.send(embed)
  } else if (!queue) {
    return
  };
};

module.exports.help = {
  name: 'skip',
  aliases: ['skip'],
  category: 'music',
  description: "skip a song",
  cooldown: 5,
  usage: '',
  isUserAdmin: false, //si on peut utiliser la commande sur un admin, true = non
  permissions: false, //si il faut des permissions pour utiliser la commande
  args: false
};