import { ContextMessage } from 'telegraf'
import { sendLanguage } from '../commands/language'

export function checkLanguage(ctx: ContextMessage, next) {
  if (ctx.dbuser.telegramLanguage) {
    return next()
  }
  return sendLanguage(ctx)
}
