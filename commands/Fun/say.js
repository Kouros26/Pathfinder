const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { isNumber } = require("util");

module.exports.run = (client, message, args, channel) => {
  if (message.author.id === "365530758007357441") return message.channel.send("Simon t un bg")
  listemessage = []
  listemessage = message.content.slice(5);
  if (message.member.hasPermission("BAN_MEMBERS")) message.channel.send(`**${listemessage}**`);
  if (!message.member.hasPermission("BAN_MEMBERS")) message.channel.send(`*${message.author.username}* :\n` + `**${listemessage}**`);
  message.delete()
  .then(msg => console.log(`Deleted message from ${msg.author.username} : 
  ${listemessage}`))
  .catch(console.error);

  const embed = new MessageEmbed()
  .setTitle("Bot Pathfinder")
  .setColor("#ffffff")
  .setDescription(`**Action**: Say\n**Texte**: ${listemessage}\n**Channel**: ${message.channel}\n**Serveur**: ${message.guild}`)
  .setTimestamp()
  .setFooter(`by : ${message.author.username}`, `${message.author.avatarURL()}`);

if(client.channels.cache.get(channel) != undefined) client.channels.cache.get(channel).send(embed);
};

module.exports.help = {
  name: 'say',
  aliases: ['dis'],
  category: 'fun',
  description: "Parler a travers le bot",
  cooldown: 10,
  usage: '<ton_message>',
  args: true
};