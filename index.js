const Discord = require('discord.js');
const GatewayIntentBits = require('discord.js').GatewayIntentBits;
const client = new Discord.Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
]});
require('dotenv').config();
client.login(process.env.DISCORD_BOT_TOKEN);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function getActivity(userId)  {
  return new Promise((resolve, reject) => {
    client.guilds.cache.forEach(async (guild) => {
      const member = await guild.members.fetch(userId);
      if (member) {
        resolve(member.presence.activities);
      } else {
        reject(new Error('User not found'));
      }
    });
  });
}

// expressをインポート
const express = require('express');
// expressアプリケーションを生成
const app = express();

// GETリクエスト用のエンドポイント
app.get('/activity/:userId', async (req, res) => {
  try {
    const activity = await getActivity(req.params.userId);
    res.json(activity);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// ポート番号3000で待機
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

