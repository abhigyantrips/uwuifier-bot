const Discord = require('discord.js');
const Uwuifier = require('uwuifier');

const client = new Discord.Client();
const uwuifier = new Uwuifier();
const uwuchat = '937231078408732772';

let uwuhook;

client.on('ready', async () => {
	console.log('Ready.');
	const channel = client.channels.cache.get(uwuchat);
	const webhooks = await channel.fetchWebhooks();
	uwuhook = webhooks.find(hook => hook.name === 'UwUifier');
	if (!uwuhook) uwuhook = await channel.createWebhook('UwUifier');
});

client.on('message', async (msg) => {
	if (msg.author.bot || msg.channel.id !== uwuchat || msg.type !== 'DEFAULT') return;
	await uwuhook.send(uwuifier.uwuifySentence(msg.content), {
		username: msg.author.username,
		avatarURL: msg.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }),
		disableMentions: 'everyone',
		files: msg.attachments.map(i => i.url)
	});
    await msg.delete();
});

client.login(process.env.TOKEN);