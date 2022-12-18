const tally = require('../tally')
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Resets a Members score!')
        .addUserOption(option => 
            option.setName('member')
                .setDescription('Choose Member to Reset Score.')
                .setRequired(true))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
        let target = interaction.options.getUser('member')
        let targ =  target.username
        let targ1 =  target.displayAvatarURL({ format: 'png', size: 256, dynamic: true })

        const guild = interaction.guild
        const guildId = guild.id
        const userId = target.id

        await tally.resetScore(guildId, userId)

        const resetEmbed = new EmbedBuilder()
        .setTitle('Score Reset!')
        .setColor('FFFF00')
        .setThumbnail(`${targ1}`)
        .setDescription(`**${targ}**, your score has been reset!`)
        .setTimestamp()

        interaction.reply({
            embeds: [resetEmbed],
            ephemeral: false,
            })  
          
    }
}