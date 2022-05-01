const { MessageEmbed } = require("discord.js");
const { CHANNEL } = require("../../config");
const fs = require("fs");
n = 0
module.exports.run = (client, message, args, channel) => {

  n = n+1
  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const ban = new MessageAttachment('./assets/img/ban.png');

  const user = message.mentions.users.first();
  const reason = args.splice(1).join(' ');
  user ? message.guild.member(user).ban(reason) + message.channel.send(`:fire: ${user.username} has been banned.`) : message.channel.send("The user does not exist.");

  const embed = new MessageEmbed()
  .setTitle(":fire: Bot Pathfinder")
  .setAuthor(`${user.username} (${user.id})`)
  .setColor("#000000")
  .setDescription(`**Action**: Ban\n**Reason**: ${reason}\n**Case #${n}**`)
  .setTimestamp()
  .setFooter(`by : ${message.author.username}`, message.author.avatarURL());
  
if(client.channels.cache.get(channel) != undefined) client.channels.cache.get(channel).send(embed);

};

module.exports.help = {
  name: 'ban',
  aliases: ['ban'],
  category: 'moderation',
  description: "Ban a user",
  cooldown: 10,
  usage: '<@user> <reason>',
  isUserAdmin: true,
  permissions : true,
  args: true //Faut des trucs apres ou pas
};