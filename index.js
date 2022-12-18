const { REST } = require('@discordjs/rest');
const { ActivityType, Client, Collection, GatewayIntentBits, Routes } = require('discord.js');
const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
  ]
})
const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('path');
const tally = require('./tally');
require('dotenv').config();

client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.once('ready', async () => {
  try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENTID),
	      { body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}

  console.log(`${client.user.tag} is keeping score!`)

  client.user.setPresence({ 
    activities: [{ 
      name: process.env.WATCHING, //WATCHING, PLAYING , LISTENING
      type: ActivityType.Watching //Watching, Playing, Listening (Also Streaming & Competing )
    }],
    status: 'online' });

    await mongoose.connect(
      process.env.DB || '', 
      {
          keepAlive: true,
      }
    )
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

  tally(client)

  const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
  
})

client.login(process.env.TOKEN)
