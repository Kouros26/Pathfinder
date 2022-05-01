const { MessageEmbed } = require("discord.js");
const { CHANNEL } = require("../../config");
const fs = require("fs");

module.exports.run = async (client, message, args, channel) => {
 
  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const poubelle = new MessageAttachment('./assets/img/poubelle2.png');

  if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.reply('Specify the ***number*** of messages (1 to 100)');

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  message.delete();
  await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
  .attachFiles(poubelle)
  .setTitle("Bot Pathfinder")
  .setColor("#FFFF00")
  .setDescription(`**Action**: Purge\n**Nbr of Msg**: ${args[0]}\n**Channel**: ${message.channel}`)
  .setThumbnail('attachment://poubelle2.png')
  .setTimestamp()
  .setFooter(`by : ${message.author.username}`, message.author.avatarURL());
  
if(client.channels.cache.get(channel) != undefined) client.channels.cache.get(channel).send(embed);

};

module.exports.help = {
  name: 'purge',
  aliases: ['purge'],
  category: 'moderation',
  description: "Delete a set number of messages",
  cooldown: 10,
  usage: '<number_of_messages>',
  isUserAdmin: false,
  permissions : true,
  args: true //Faut des trucs apres ou pas
};