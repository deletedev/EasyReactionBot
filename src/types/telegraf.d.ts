// Dependencies
import { User } from '../models'
import { DocumentType } from '@typegoose/typegoose'
import { Context } from 'telegraf'

declare module 'telegraf' {
  export class ContextMessage extends Context {
    dbuser: DocumentType<User>
    i18n: any
  }
}
