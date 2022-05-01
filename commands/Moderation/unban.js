const { MessageEmbed } = require("discord.js");
const { CHANNEL } = require("../../config");
const fs = require("fs");

module.exports.run = async (client, message, args, channel) => {
 
  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const ban = new MessageAttachment('./assets/img/ban.png');

  let user = await client.users.fetch(args[0]);
  if (!user) return message.channel.send("The user does not exist"); 
  message.guild.members.unban(user);

  const embed = new MessageEmbed()
  .setTitle(":fire: Bot Pathfinder")
  .setAuthor(`${user.username} (${user.id})`)
  .setColor("#00FF00")
  .setDescription(`**Action**: Unban`)
  .setTimestamp()
  .setFooter(`by : ${message.author.username}`, message.author.avatarURL());
  
if(client.channels.cache.get(channel) != undefined) client.channels.cache.get(channel).send(embed);

};

module.exports.help = {
  name: 'unban',
  aliases: ['unban'],
  category: 'moderation',
  description: "Unban a user",
  cooldown: 10,
  usage: '<user_id>',
  isUserAdmin: false,
  permissions : true,
  args: true //Faut des trucs apres ou pas
};