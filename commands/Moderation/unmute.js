const { MessageEmbed } = require("discord.js");
const { CHANNEL } = require("../../config");
const fs = require("fs");

module.exports.run = (client, message, args, channel) => {

  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const mute = new MessageAttachment('./assets/img/mute.png');

  let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find(r => r.name === "muted");

  if(!user.roles.cache.has(muteRole.id)) return message.reply("The user isn't muted");
  user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> has been unmuted.`);

  const embed = new MessageEmbed()
  .attachFiles(mute)
  .setTitle("Bot Pathfinder")
  .setAuthor(`${message.mentions.users.first().username}`, `${message.mentions.users.first().avatarURL()}`)
  .setColor("#00FF00")
  .setDescription(`**Action**: Unmute`)
  .setThumbnail('attachment://mute.png')
  .setTimestamp()
  .setFooter(`by : ${message.author.username}`, `${message.author.avatarURL()}`);

if(client.channels.cache.get(channel) != undefined) client.channels.cache.get(channel).send(embed);
};

module.exports.help = {
  name: 'unmute',
  aliases: ['unmute'],
  category: 'moderation',
  description: "unmute a user",
  cooldown: 10,
  usage: '<@user>',
  isUserAdmin: true,
  permissions : true,
  args: true
};