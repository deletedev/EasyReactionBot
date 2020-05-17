// Dependencies
import { ContextMessage } from 'telegraf'

export function checkIfPrivate(ctx: ContextMessage, next) {
  if (ctx.chat.type === 'private') {
    return next()
  }
}
