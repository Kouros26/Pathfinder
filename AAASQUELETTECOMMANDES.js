module.exports.run = (client, message, args) => {
  message.channel.send("");
};

module.exports.help = {
  name: '',
  aliases: [''],
  category: '',
  description: "",
  cooldown: 5,
  usage: '',
  isUserAdmin: true, //si on peut utiliser la commande sur un admin, true = non
  permissions: true, //si il faut des permissions pour utiliser la commande
  args: false
};