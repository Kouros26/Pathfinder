const distube = require('distube')
const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let queue = await client.distube.getQueue(message);

  if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command')
  const music = args.join(" ");

  if (queue.length() > 3) return message.channel.send('You need to use the command ```&stop``` before using me again.')

  else {
    client.distube.play(message, music)
  }
};

module.exports.help = {
  name: 'play',
  aliases: ['play', 'p'],
  category: 'music',
  description: "Play a song",
  cooldown: 5,
  usage: '<song_name> or <song_link>',
  isUserAdmin: false, //si on peut utiliser la commande sur un admin, true = non
  permissions: false, //si il faut des permissions pour utiliser la commande
  args: true
};