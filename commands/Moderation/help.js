const { MessageEmbed } = require("discord.js");
const { PREFIX } = require('../../config');
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');

module.exports.run = (client, message, args) => {
  n=1
  if (!args.length) {
    const embed = new MessageEmbed()
      .setTitle("**Commande Help**")
      .setColor("#8A2BE2")
      .addField("Command list", `All the available commands sorted by categories.\nNeed help for a command ? \`${PREFIX}help <command>\``)
      .setTimestamp()
      .setFooter(`by : ${message.author.username}`, `${message.author.avatarURL()}`); 
    
    for (const category of categoryList) {
      embed.addField(`**${n}-${category}**`,`Commands : *${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}*`);
      n++;
    };
    return message.channel.send(embed);
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
    if(!command) return message.reply("This command does not exist");

    const embed = new MessageEmbed()
    .setColor("#8A2BE2")
    .setTitle(`\`Command ${command.help.name}\``)
    .addField(`Description`, `${command.help.description} (cooldown: ${command.help.cooldown}s)`)
    .addField(`Usage`, command.help.usage ? `${PREFIX}${command.help.name} ${command.help.usage}` : `${PREFIX}${command.help.name}`, true)
    .setTimestamp()
    .setFooter(`by : ${message.author.username}`, `${message.author.avatarURL()}`); 
    
    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  category: 'moderation',
  description: "list of commands and how to use them",
  cooldown: 3,
  usage: '<command_name>',
  isUserAdmin: false,
  permissions: false,
  args: false
};