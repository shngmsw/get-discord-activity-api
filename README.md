# Discord Bot with Presence API

This is a Discord bot using the Discord.js library to fetch the activity (presence information) of a user in a server.

## Installation

1. Clone the repository or download the code
2. Install dependencies using `npm install` command
3. Create a `.env` file at the root directory of the project and add your Discord app's bot token as `DISCORD_BOT_TOKEN=your-token-here`

## Usage

1. Start the bot and server using `node index.js`
2. The bot will log into Discord and listen for incoming events
3. Send GET requests to `http://localhost:3000/activity/user-id-here` to get the activity (presence information) of a user. Replace `user-id-here` with the ID of the user you want to fetch the activity of.
