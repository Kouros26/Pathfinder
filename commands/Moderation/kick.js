const { MessageEmbed } = require("discord.js");
const { CHANNEL } = require("../../config");
const fs = require("fs");
n = 0

module.exports.run = (client, message, args, channel) => {
  n=n+1

  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const porte = new MessageAttachment('./assets/img/porte.png');

  let user = message.mentions.users.first();
  const reason = args.splice(1).join(' ') || "no reason";
  user ? message.guild.member(user).kick(reason) : message.channel.send("The user does not exist");

  const embed = new MessageEmbed()
    .attachFiles(porte)
    .setTitle("CASE #",n ,"Bot Pathfinder")
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#FF0000")
    .setDescription(`**Action**: Kick\n**Reason**: ${reason}`)
    .setThumbnail('attachment://porte.png')
    .setTimestamp()
    .setFooter(`by : ${message.author.username}`, message.author.avatarURL());

  if(client.channels.cache.get(channel) != undefined) client.channels.cache.get(channel).send(embed);
};

module.exports.help = {
  name: 'kick',
  aliases: ['kick'],
  category: 'moderation',
  description: "kick a user",
  cooldown: 10,
  usage: '<@user> <reason>',
  isUserAdmin: true,
  permissions : true,
  args: true
};