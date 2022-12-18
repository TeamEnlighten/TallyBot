const tally = require('../tally')
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('void')
		.setDescription('Voids a Win / Loss from the Members score.')
        .addUserOption(option => 
            option.setName('member')
                .setDescription('Choose Member to Void Score.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('type')
                .setDescription('Choose Win or Loss.')
                .setRequired(true)
                .addChoices(
                    {name: 'Win', value: 'win'}, 
                    {name: 'Loss', value: 'loss'},
                ))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
        let target = interaction.options.getUser('member')
        let targ =  target.username
        let targ1 =  target.displayAvatarURL({ format: 'png', size: 256, dynamic: true })
        let type = interaction.options.getString('type') 
        let number = 1

        const guild = interaction.guild
        const guildId = guild.id
        const userId = target.id
        const wins = await tally.getWin(guildId, userId)
        const losses = await tally.getLoss(guildId, userId)

        if (type === 'win' && wins === 0) {
            interaction.reply({
                content: 'You cannot Void any more Wins. Score is now 0.',
                ephemeral: true,
            })

            return
        }

        if (type === 'loss' && losses === 0) {
            interaction.reply({
                content: 'You cannot Void any more Losses. Score is now 0.',
                ephemeral: true,
            })

            return
        }
  
            if (type === 'win') {
                number = `-${number}`
                const totalWin = await tally.addWin(guildId, userId, number)
                const winEmbed = new EmbedBuilder()
                .setTitle('Win Retracted!')
                .setThumbnail(`${targ1}`)
                .setColor('0000FF')
                .setDescription(`${targ}, your score has been updated! \n\nYou now have ${totalWin} wins.`)
                .setTimestamp()
    
                interaction.reply({
                    embeds: [winEmbed],
                    ephemeral: false,
                    }) 
    
            } else if (type === 'loss') {
                number = `-${number}`
                const totalLoss = await tally.addLoss(guildId, userId, number)
                const lossEmbed = new EmbedBuilder()
                .setTitle('Loss Retracted!')
                .setThumbnail(`${targ1}`)
                .setColor('6a0dad')
                .setDescription(`${targ}, your score has been updated! \n\nYou now have ${totalLoss} losses.`)
                .setTimestamp()
    
                interaction.reply({
                    embeds: [lossEmbed],
                    ephemeral: false,
                    }) 
            } else {
                interaction.reply({
                    text: 'Something went Wrong! Report to Bot Owner.',
                    ephemeral: true
                 })
            }
          
    }
}