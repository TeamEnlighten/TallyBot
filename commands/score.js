const tally = require('../tally')
const Discord = require('discord.js')

module.exports = {
    category: 'Tally',
    description: "Show the Current Members Score!",
    slash: true,
    testOnly: false,
    minArgs: 0,
    maxArgs: 1,
    permissions: ['MANAGE_MESSAGES'],
    expectedArgs: "<@user>",

    options: [
        {
          name: 'member',
          description: 'Choose Member to show Score.',
          required: false,
          type: Discord.Constants.ApplicationCommandOptionTypes.USER,
        },
    ],

    callback: async ({ interaction, guild }) => {

        let target = interaction.options.getUser('member')
        let targName;
            if (!target) { 
                target = interaction.user
                targName = "Your"
            } else {targName = `${target.username}'s` }
        let targ1 =  target.displayAvatarURL({ format: 'png', size: 256, dynamic: true })

        const guildId = guild.id
        const userId = target.id
        const wins = await tally.getWin(guildId, userId)
        const losses = await tally.getLoss(guildId, userId)

        const scoreEmbed = new Discord.MessageEmbed()
        .setTitle(`__${targName} Score__`)
        //.setAuthor({text: targ, iconURL:targ1})
        .setColor('ORANGE')
        .setThumbnail(`${targ1}`)
        .setDescription(`Wins: ${wins} | Losses: ${losses}`)
        .setTimestamp()

        interaction.reply({
            embeds: [scoreEmbed],
            ephemeral: false,
            })  
          
    }
}