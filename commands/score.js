const tally = require('../tally')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('Show the Current Members Score!')
        .addUserOption(option => 
            option.setName('member')
                .setDescription('Choose Member to show Score.')
                .setRequired(false))
        .setDMPermission(false),
	async execute(interaction) {
        let target = interaction.options.getUser('member')
        let targName;
            if (!target) { 
                target = interaction.user
                targName = "Your"
            } else {targName = `${target.username}'s` }
        let targ1 =  target.displayAvatarURL({ format: 'png', size: 256, dynamic: true })
        
        const guild = interaction.guild
        const guildId = guild.id
        const userId = target.id
        const wins = await tally.getWin(guildId, userId)
        const losses = await tally.getLoss(guildId, userId)

        const scoreEmbed = new EmbedBuilder()
        .setTitle(`__${targName} Score__`)
        .setColor('FFA500')
        .setThumbnail(`${targ1}`)
        .setDescription(`Wins: ${wins} | Losses: ${losses}`)
        .setTimestamp()

        interaction.reply({
            embeds: [scoreEmbed],
            ephemeral: false,
            })  
          
    }
}