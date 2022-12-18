const tally = require('../tally')
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('win')
		.setDescription('Adds a Win to the Members score!')
        .addUserOption(option => 
            option.setName('member')
                .setDescription('Choose Member to add Win.')
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

        const totalWin = await tally.addWin(guildId, userId, number)
        let winText;

        if (totalWin === 1) {
            winText = 'win'
        } else { winText = 'wins'}

        const winEmbed = new EmbedBuilder()
        .setTitle('You Won!')
        .setColor('00FF00')
        .setThumbnail(`${targ1}`)
        .setDescription(`**${targ}**, your win has been recorded! \n\n You now have ${totalWin} ${winText}.`)
        .setTimestamp()

        interaction.reply({
            embeds: [winEmbed],
            ephemeral: false,
            })  
          
    }
}