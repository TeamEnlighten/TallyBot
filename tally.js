const profileSchema = require('./schema/score-data')

module.exports = (client) => {}

module.exports.addWin = async (guildId, userId, number) => {
    const result = await profileSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: {
          win: number,
          loss: 0,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )

    return result.win
} 

module.exports.addLoss = async (guildId, userId, number) => {
    const result = await profileSchema.findOneAndUpdate(
    {
        guildId,
        userId,
    },
    {
        guildId,
        userId,
        $inc: {
        win: 0,
        loss: number,
        },
    },
    {
        upsert: true,
        new: true,
    }
    )

    return result.loss
} 


module.exports.getWin = async (guildId, userId) => {
    const result = await profileSchema.findOne({
      guildId,
      userId,
    })

    let win = 0
    if (result) {
      win = result.win
    } 

    return win
}

module.exports.getLoss = async (guildId, userId) => {
    const result2 = await profileSchema.findOne({
      guildId,
      userId,
    })

    let loss = 0
    if (result2) {
      loss = result2.loss
    } 

    return loss
}

module.exports.resetScore = async (guildId, userId) => {
  const result = await profileSchema.findOneAndUpdate(
    {
        guildId,
        userId,
    },
    {
        guildId,
        userId,
        win: 0,
        loss: 0,
    },
    {
        upsert: true,
        new: true,
    }
    )

    return result
} 

module.exports.setWin = async (guildId, userId, number) => {
  await profileSchema.findOneAndUpdate(
    {
      guildId,
      userId,
    },
    {
      guildId,
      userId,
      $set: {
        win: number
      },
    },
    {
      upsert: true,
      new: true,
    }
  )

  return 
} 

module.exports.setLoss = async (guildId, userId, number) => {
  await profileSchema.findOneAndUpdate(
  {
      guildId,
      userId,
  },
  {
      guildId,
      userId,
      $set: {
      loss: number
      },
  },
  {
      upsert: true,
      new: true,
  }
  )

  return
} 