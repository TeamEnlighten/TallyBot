const tally = require('../tally')
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loss')
		.setDescription('Adds a Loss to the Members score!')
        .addUserOption(option => 
            option.setName('member')
                .setDescription('Choose Member to add Loss.')
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
        const number = 1

        const totalLoss = await tally.addLoss(guildId, userId, number)
        let lossText;

        if (totalLoss === 1) {
            lossText = 'loss'
        } else { lossText = 'losses'}

        const lossEmbed = new EmbedBuilder()
        .setTitle('You Lost!')
        //.setAuthor({text: targ, iconURL:targ1})
        .setColor('ff0000')
        .setThumbnail(`${targ1}`)
        .setDescription(`**${targ}**, your loss has been recorded! \n\n You now have ${totalLoss} ${lossText}.`)
        .setTimestamp()

        interaction.reply({
            embeds: [lossEmbed],
            ephemeral: false,
            })  
          
    }
}