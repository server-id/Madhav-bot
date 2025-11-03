# ANURAG BOT V2 - Facebook Messenger Bot

## Overview
A comprehensive Facebook Messenger bot built with Node.js using the `@dongdev/fca-unofficial` npm package (v2.0.32 - latest). The bot supports 282+ commands and 8 event handlers, designed to respond to group messages with advanced features.

## Current Status
✅ **Bot is running and listening to group messages**
✅ **All dependencies installed successfully**
✅ **Fixed MQTT connection issues - bot now properly receives and responds to messages**
✅ **Upgraded to latest stable FCA package**

## Recent Changes (November 3, 2025)

### ⚡ Critical Fix: Replaced FCA Package (Latest)
- **Issue**: Old `@xaviabot/fca-unofficial` package had MQTT connection errors ("Cannot get MQTT region & sequence ID"), causing bot to crash after login and not respond to messages
- **Fix**: Upgraded to `@dongdev/fca-unofficial` v2.0.32 (most actively maintained and stable FCA package as of Nov 2025)
- **Changes Made**:
  - Uninstalled `@xaviabot/fca-unofficial`
  - Installed `@dongdev/fca-unofficial` and its dependency `uuid`
  - Updated `Anurag.js` line 6 to use new package
- **Impact**: 
  - ✅ No more MQTT errors
  - ✅ Bot successfully connects to Facebook server region (PNB - Pacific Northwest - Beta)
  - ✅ Real-time message listening working perfectly
  - ✅ Commands like `/help`, `/bot`, `/admin` now respond properly
  - ✅ Workflow stays RUNNING instead of crashing

### 1. Fixed Message Body Validation
- **Issue**: Bot was crashing silently when receiving messages with undefined or null body (stickers, reactions, special messages)
- **Fix**: Added proper body validation in `includes/handle/handleCommand.js` to check if body exists and is a string before processing
- **Impact**: Bot now gracefully handles all message types without crashing

### 2. Enhanced Error Handling
- **Issue**: Message processing errors were not being logged properly
- **Fix**: Added try-catch wrapper in `Anurag.js` listen callback to catch and log any errors during message processing
- **Impact**: Better debugging and bot stability - errors are logged but don't crash the bot

### 3. Enabled Developer Mode
- **Change**: Set `DeveloperMode: true` in `config.json`
- **Benefit**: Full message logging for debugging - you can see all incoming messages in the console

## How to Use

### Command Prefix
The bot uses **`/`** as the command prefix. All commands must start with this prefix.

### Example Commands
- `/help` - Shows help menu
- `/bot` - Bot information
- `/admin` - Admin commands (requires admin permission)
- `/ping` - Check bot response time
- `/menu` - Show command menu

### Testing in Groups
1. Add the bot to your Facebook Messenger group
2. Send a command with the `/` prefix (e.g., `/help`)
3. The bot will respond if:
   - The message starts with `/`
   - The command exists
   - You have the required permissions

## Important Notes

### Why Bot Wasn't Responding Before
1. **No body validation**: Messages without text body (stickers, reactions, images only) caused silent crashes
2. **Missing error handling**: Errors in message processing weren't being caught or logged
3. **Developer mode disabled**: Made it difficult to see what messages the bot was receiving

### Configuration
- **Prefix**: `/` (configurable in config.json)
- **Admin ID**: 61583096049461
- **Language**: English (en)
- **Allow Inbox**: false (bot only works in groups, not in private messages)

### Database
- Bot uses SQLite database: `Horizon_Database/SyntheticDatabase.sqlite`
- Auto-creates user and thread data
- Stores command usage, user stats, and more

## Troubleshooting

### If bot is not responding:
1. **Check the prefix**: Make sure your message starts with `/`
2. **Check the logs**: Run the workflow and check console output
3. **Verify command exists**: Use `/help` to see available commands
4. **Check permissions**: Some commands require admin or group admin permissions

### Common Issues
- **Bot only marks messages as "seen"**: You're not using the `/` prefix
- **"Command not found" error**: Check spelling or use `/help` to see available commands
- **Database errors**: Check if `Horizon_Database/SyntheticDatabase.sqlite` exists

## Technical Details

### Dependencies
- **@dongdev/fca-unofficial**: v2.0.32 (latest) - Facebook Chat API (upgraded from @xaviabot/fca-unofficial)
- **uuid**: Latest - Required dependency for new FCA package
- **Node.js**: v20.x
- **Database**: SQLite with Sequelize ORM
- **Other**: axios, moment-timezone, fs-extra, and 70+ other packages

### Architecture
```
ANURAG-BOT-V2/
├── Anurag.js                 # Main bot file
├── config.json               # Bot configuration
├── appstate.json            # Facebook session
├── Anurag/
│   ├── commands/            # 282+ command modules
│   └── events/              # 8 event handlers
├── includes/
│   ├── handle/              # Message handlers
│   ├── controllers/         # Database controllers
│   └── listen.js            # Main listener
├── Horizon_Database/        # SQLite database
└── utils/                   # Utility functions
```

### Listening Method
The bot uses `api.listenMqtt()` which is the latest and most reliable method for receiving Facebook messages, especially in groups. This is superior to the older `api.listen()` method.

## Next Steps

### Recommended
1. Test commands in your groups with `/help` or `/menu`
2. Monitor the logs for any errors
3. Customize commands as needed
4. Disable Developer Mode once everything is working: Set `DeveloperMode: false` in config.json

### Optional Improvements
1. Set up automatic reconnection if session expires
2. Add command cooldown to prevent spam detection
3. Implement admin-only command restrictions
4. Add custom commands for your specific needs

## Support
For issues with the @dongdev/fca-unofficial package, check:
- NPM: https://www.npmjs.com/package/@dongdev/fca-unofficial
- GitHub: https://github.com/XaviaTeam/fca-unofficial (community maintained)
