const tally = require('../tally')
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Sets the Members Win or Loss score!')
        .addUserOption(option => 
            option.setName('member')
                .setDescription('Choose Member to Set Score.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('type')
                .setDescription('Choose Win or Loss.')
                .setRequired(true)
                .addChoices(
                    {name: 'Win', value: 'win'}, 
                    {name: 'Loss', value: 'loss'},
                ))
        .addIntegerOption(option => 
            option.setName('number')
                .setDescription('Set #.')
                .setRequired(true))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
        let target = interaction.options.getUser('member')
        let targName =  target.username
        let targ1 =  target.displayAvatarURL({ format: 'png', size: 256, dynamic: true })
        
        const guild = interaction.guild
        const guildId = guild.id
        const userId = target.id
        const number = interaction.options.getInteger('number')

        let type = interaction.options.getString('type')

        if (number < 0) {
            interaction.reply({
                content: 'You cannot set the Score below 0. Try again!',
                ephemeral: true,
            })

            return
        }

            if (type === 'loss') {
                await tally.setLoss(guildId, userId, number)
                const wins = await tally.getWin(guildId, userId)
                const losses = await tally.getLoss(guildId, userId)

                const scoreEmbed = new EmbedBuilder()
                .setTitle(`__${targName} Losses have been Set__`)
                .setColor('FFA500')
                .setThumbnail(`${targ1}`)
                .setDescription(`Wins: ${wins} | Losses: ${losses}`)
                .setTimestamp()

                interaction.reply({
                    embeds: [scoreEmbed],
                    ephemeral: false,
                    }) 

            } else if (type === 'win') {
                await tally.setWin(guildId, userId, number)
                const wins = await tally.getWin(guildId, userId)
                const losses = await tally.getLoss(guildId, userId)

                const scoreEmbed = new EmbedBuilder()
                .setTitle(`__${targName} Wins have been Set__`)
                .setColor('FFA500')
                .setThumbnail(`${targ1}`)
                .setDescription(`Wins: ${wins} | Losses: ${losses}`)
                .setTimestamp()

                interaction.reply({
                    embeds: [scoreEmbed],
                    ephemeral: false,
                    }) 
            } else { 
                interaction.reply({
                    content: 'Error! Please report this to the dev.',
                    ephemeral: true,
                })
    
                return
            }

         
          
    }
}