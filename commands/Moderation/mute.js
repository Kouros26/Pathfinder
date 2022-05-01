const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const { CHANNEL } = require("../../config");
const fs = require("fs");
n=0

module.exports.run = async (client, message, args, channel) => {

  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const mute = new MessageAttachment('./assets/img/mute.png');

  let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find(r => r.name === "muted");
  let muteTime = (args[1] || '60s')

  if (!muteRole) {
    muteRole = await message.guild.roles.create({
      data: {
        name: 'muted',
        color: '#000',
        permissions: []
      }
    });

    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false
      });
    });
  }

  await user.roles.add(muteRole.id);
  message.channel.send(`<@${user.id}> has been muted for ${ms(ms(muteTime))}.`);

  setTimeout(() => {
    user.roles.remove(muteRole.id);
  }, ms(muteTime));

  n=n+1
const embed = new MessageEmbed()
  .attachFiles(mute)
  .setTitle(`CASE #${n}, Bot Pathfinder`)
  .setAuthor(`${message.mentions.users.first().username}`, `${message.mentions.users.first().avatarURL()}`)
  .setColor("#808080")
  .setDescription(`**Action**: Mute\n**Time**: ${muteTime}`)
  .setThumbnail('attachment://mute.png')
  .setTimestamp()
  .setFooter(`by : ${message.author.username}`, `${message.author.avatarURL()}`);

if(client.channels.cache.get(channel) != undefined) client.channels.cache.get(channel).send(embed);
};

module.exports.help = {
  name: 'mute',
  aliases: ['mute'],
  category: 'moderation',
  description: "mute a utilisateur",
  cooldown: 10,
  usage: '<@user> <time>',
  isUserAdmin: true,
  permissions : true,
  args: true
};