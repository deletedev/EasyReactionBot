// Dependencies
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import Telegraf from 'telegraf'
import './models'
import { handleLanguage, localesFiles, sendLanguage } from './commands/language'
import { checkIfPrivate } from './middlewares/checkIfPrivate'
import { checkLanguage } from './middlewares/checkLanguage'
import { checkTime } from './middlewares/checkTime'
import { setupI18N } from './helpers/i18n'
import { attachUser } from './middlewares/attachUser'
import { sendHelp } from './commands/help'

const bot = new Telegraf(process.env.BOT_TOKEN)

// Check if the message needs to be handled
bot.use(checkTime)

// Attach user with db
bot.use(attachUser)
// Localization
setupI18N(bot as any)

bot.use(checkIfPrivate)
// Check if the language keyboard is pressed
bot.action(
  localesFiles().map((file) => file.split('.')[0]),
  handleLanguage,
)

// Check if user has set the language
bot.use(checkLanguage)

bot.command(['start', 'help'], sendHelp)
bot.command('language', sendLanguage)

bot.startPolling()
