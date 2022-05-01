const { MessageEmbed } = require("discord.js");
const { CHANNEL } = require("../../config");
const fs = require("fs");

module.exports.run = async (client, message, args, channel) => {
 
  let user = message.guild.member(message.mentions.users.first());
  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const poubelle = new MessageAttachment('./assets/img/poubelle.png');

  if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.reply('Specify the ***number*** of messages (1 to 100)');

  const messages = (await message.channel.messages.fetch({
    limit: 100,
    before: message.id,
  })).filter(a => a.author.id === user.id).array();

  messages.length = Math.min(args[1], messages.length);

  if (messages.length === 0 || !user) return message.reply('Nothing can be deleted (or the user does not exist).');

  if  (messages.length === 1) await messages[0].delete();
  else await message.channel.bulkDelete(messages);

  message.delete();
  await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
  .attachFiles(poubelle)
  .setTitle("Bot Pathfinder")
  .setAuthor(`${message.mentions.users.first().username}`,`${message.mentions.users.first().avatarURL()}`)
  .setColor("#FFFF00")
  .setDescription(`**Action**: Prune\n**Nbr of Msg**: ${args[1]}\n**Channel**: ${message.channel}`)
  .setThumbnail('attachment://poubelle.png')
  .setTimestamp()
  .setFooter(`by : ${message.author.username}`, message.author.avatarURL());
  
if(client.channels.cache.get(channel) != undefined) client.channels.cache.get(channel).send(embed);

};

module.exports.help = {
  name: 'prune',
  aliases: ['prune'],
  category: 'moderation',
  description: "Purge a set number of messages from a specified user",
  cooldown: 10,
  usage: '<@user> <number_of_messages>',
  isUserAdmin: true,
  permissions : true,
  args: true //Faut des trucs apres ou pas
};