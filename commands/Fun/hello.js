module.exports.run = (client, message, args) => {
  message.channel.send("Hello World !");
};

module.exports.help = {
  name: 'hello',
  aliases: ['helloworld'],
  category: 'fun',
  cooldown: 5,
  description: "bah rien c'est juste le truc le plus emblematique de la programmation",
  usage: '<helloworld>',
  isUserAdmin: false,
  permissions: false,
  args: false
};
