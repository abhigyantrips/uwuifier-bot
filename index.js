const Discord = require('discord.js');
const Uwuifier = require('uwuifier');

const client = new Discord.Client();
const uwuifier = new Uwuifier();

const servers = [
	{serverName: 'Butternaan', serverChannel: '937231078408732772', serverWebhook: null},
	{serverName: 'Parzival', serverChannel: '931033409831182377', serverWebhook: null}
];

client.on('ready', async () => {

	client.user.setStatus('invisible');

	for (let server of servers) {
		const channel = client.channels.cache.get(server.serverChannel);
		const webhooks = await channel.fetchWebhooks();
		server.serverWebhook = webhooks.find(hook => hook.name === 'UwU-ifier');
		if (!server.serverWebhook) server.serverWebhook = await channel.createWebhook('UwU-ifier');
	};

	console.log('The bot is ready.');
});

client.on('message', async (msg) => {

	if (msg.author.bot || !servers.map(i => i.serverChannel).includes(msg.channel.id) || msg.type !== 'DEFAULT') return;
	
	for (let server of servers) {
		if (server.serverChannel === message.channel.id) {
			await server.serverWebhook.send(uwuifier.uwuifySentence(msg.content), {
				username: msg.author.username,
				avatarURL: msg.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }),
				disableMentions: 'everyone',
				files: msg.attachments.map(i => i.url)
			});
			await msg.delete();
			return;
		};
	};

});

client.login(process.env.TOKEN);