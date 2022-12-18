const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const scoreData = require('../schema/score-data')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Shows the Top 10 in your guild!')
        .setDMPermission(false),
	async execute(interaction) {
        const guildId = interaction.guild.id
        const data = await scoreData.find(guildId)

        console.log(data)

        if (!data) {
            const lbembed = new EmbedBuilder()
              .setTitle(`Failed!`)
              .setThumbnail(guild.iconURL())
              .setColor('000000')
              .setDescription(`There are no members registered!`)

          interaction.reply({
              embeds: [lbembed],
              ephemeral: true,
            })
        } else {

            let ratio;
            let arr = [];

            for (i=0; i<data.length;i++) {

                ratio = data[i].win / (data[i].win + data[i].loss) * 100

                arr.push({ id: `${data[i].userId}`, ratio: `${ratio}`, win: `${data[i].win}`, loss: `${data[i].loss}` })
            
            }

            arr.sort(function (a, b) {   
                return b.win - a.win || b.ratio - a.ratio;
            });

        let filtered = arr.filter(m => guild.members.cache.get(m.id) != true).slice(0, 10 || arr.length);
        const rank = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        let final = filtered.map((m, j) => `${rank[j]} - **${m.win.toLocaleString()}**/**${m.loss.toLocaleString()}** - ${guild.members.cache.get(m.id) || `<@${m.id}>` || 'User_TBD'}`);
    
        const embed = new EmbedBuilder()
        .setTitle(`🏆 Leaderboard of ${guild.name} 🏆`)
        .setThumbnail(guild.iconURL())
        .setColor('FFD700')
        .setDescription(`__**Rank - W/L - Member**__\n${final.join('\n')}`)

            interaction.reply({
                embeds: [embed],
                ephemeral: false,
            }) 
        }
    }
}
