import { ContextMessage, Markup as m } from 'telegraf'

export async function sendHelp(ctx: ContextMessage) {
  if (ctx.from.id !== ctx.chat.id) {
    return
  }
  return ctx.replyWithHTML(ctx.i18n.t('help'))
}
