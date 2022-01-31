const Discord = require("discord.js");
const Uwuifier = require("uwuifier");

const client = new Discord.Client({
	intents: 32767,
});
const uwuifier = new Uwuifier();

const servers = [
	{serverName: "Butternaan", serverChannel: "937231078408732772", serverWebhook: null},
];

client.on("ready", async () => {

	client.user.setStatus("invisible");

	for (let server of servers) {
		const channel = await client.channels.fetch(server.serverChannel);
		
		if (channel === undefined) {
			console.log(`Cannot access ${server.serverName}"s channel (${server.serverChannel}).`)	
		}

		const webhooks = await channel.fetchWebhooks();
		server.serverWebhook = webhooks.find(hook => hook.name === "UwU-ifier");
		if (!server.serverWebhook) server.serverWebhook = await channel.createWebhook("UwU-ifier");
	};

	console.log("The bot is ready.");
});

client.on("messageCreate", async (message) => {

	if (message.author.bot || !servers.map(i => i.serverChannel).includes(message.channel.id) || message.type !== "DEFAULT") return;
	
	for (let server of servers) {
		if (server.serverChannel === message.channel.id) {
			await server.serverWebhook.send({
				content: uwuifier.uwuifySentence(message.content),
				username: message.author.username,
				avatarURL: message.author.avatarURL(),
				disableMentions: "everyone",
				files: message.attachments.map(file => file.url)
			});
			await message.delete();
			return;
		};
	};

});

client.on("messageCreate", async (message) => {

	if (message.author.bot || !servers.map(i => i.serverChannel).includes(message.channel.id) || message.type !== "REPLY") return;
	
	for (let server of servers) {
		if (server.serverChannel === message.channel.id) {
			const reference = await message.fetchReference();
			embed = new Discord.MessageEmbed()
				.setColor("#303136")
				.setAuthor({ name: reference.author.username, iconURL: reference.author.avatarURL(), url: reference.url })
				.setDescription(reference.content)
				.setTimestamp(reference.createdTimestamp);
			await server.serverWebhook.send({
				content: uwuifier.uwuifySentence(message.content),
				username: message.author.username,
				avatarURL: message.author.avatarURL(),
				disableMentions: "everyone",
				embeds: [embed],
			});
			await message.delete();
		};
	};

});

client.login(process.env.TOKEN);