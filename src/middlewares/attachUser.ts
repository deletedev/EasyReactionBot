// Dependencies
import { findUser } from '../models'
import { ContextMessage } from 'telegraf'

export async function attachUser(ctx: ContextMessage, next) {
  const dbuser = await findUser(ctx.from.id)

  if (!dbuser) {
    return ctx.reply('Auth error.')
  }

  ctx.dbuser = dbuser

  next()
}
