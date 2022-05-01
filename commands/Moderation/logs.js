const fs = require ("fs");
const { VoiceChannel } = require("discord.js");
module.exports.run = async (client, message, args) => {
  
  variable = []
  let logserveurs = JSON.parse(fs.readFileSync("./logserveur.json", "utf8"));
  console.log(logserveurs);
  console.log(args[0])
  variable = args[0].slice(2, 20)
  console.log(variable)
  if (message.guild.channels.cache.has(args[0]) == false) {
    if (message.guild.channels.cache.has(variable) == false || client.channels.cache.get(variable).type != "text") return message.channel.send ("Ce channel n'existe pas ou n'est pas disponible.");
  };
  if (message.guild.channels.cache.has(args[0]) == true && client.channels.cache.get(args[0]).type != "text") return message.channel.send ("Ce channel n'existe pas ou n'est pas disponible.");
  logserveurs[message.guild.id] = {
    logserveurs: args[0]
  }
  fs.writeFile("./logserveur.json", JSON.stringify(logserveurs), err => {
    if (err) console.log(err)
  })
  message.channel.send (":white_check_mark: Logs channel has been set !")
};

module.exports.help = {
  name: 'logs',
  aliases: ['log'],
  category: 'moderation',
  description: "Change the logs channel",
  cooldown: 5,
  usage: '<channel> or <channel_id>',
  permissions: true, //si il faut des permissions pour utiliser la commande
  args: true
};