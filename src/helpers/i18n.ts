// Dependencies
import I18N from 'telegraf-i18n'
import Telegraf, { ContextMessage } from 'telegraf'
const dirtyI18N = require('telegraf-i18n')

export const i18n = new dirtyI18N({
  directory: `${__dirname}/../../locales`,
  defaultLanguage: 'en',
  sessionName: 'session',
  useSession: false,
  allowMissing: false,
}) as I18N

export function setupI18N(bot: Telegraf<ContextMessage>) {
  bot.use(i18n.middleware())
  bot.use((ctx, next) => {
    const anyI18N = ctx.i18n as any
    if (ctx?.dbuser?.telegramLanguage) {
      anyI18N.locale(ctx.dbuser.telegramLanguage)
      next()
      return
    }

    next()
  })
}
