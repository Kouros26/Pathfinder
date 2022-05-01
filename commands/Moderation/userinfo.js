module.exports.run = (client, message, args) => {
  const user_mention = message.mentions.users.first();
  message.channel.send(`Here's the tag : ${user_mention.tag}.`);
};

module.exports.help = {
  name: "userinfo",
  aliases: ['userinfo'],
  category: 'moderation',
  description: "Return the user's tag",
  usage: "<@user>",
  args: true
};