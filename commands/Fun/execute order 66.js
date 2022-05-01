module.exports.run = (client, message, args) => {
  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const order66 = new MessageAttachment('./assets/img/order66.PNG');

  const embed = new MessageEmbed()
    .setColor("#FF8C00")
    .setTitle("Yes my Lord")
    .setTimestamp()
    .attachFiles(order66)
    .setImage('attachment://order66.PNG')
     message.channel.send(embed);
};

module.exports.help = {
  name: 'execute-order-66',
  aliases: ['execute-order-66'],
  description: "Star Wars reference",
  category: 'fun',
  cooldown: 5,
  usage:'<execute-order-66',
  isUserAdmin: false,
  permissions: false,
  args: false
};