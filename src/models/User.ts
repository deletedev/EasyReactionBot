// Dependencies
import { prop, getModelForClass } from '@typegoose/typegoose'

export enum TelegramLanguage {
  en = 'en',
  ru = 'ru',
}

export class Session {
  @prop({ required: true, default: 'default' })
  stage: string
}

export class User {
  @prop({ required: true, index: true, unique: true })
  telegramId: number

  @prop({ required: true, index: true, default: false })
  sendoutDisabled: boolean

  @prop({ required: false })
  session: Session

  @prop({ enum: TelegramLanguage })
  telegramLanguage?: TelegramLanguage
}

// Get User model
export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})

// Get or create chat
export async function findUser(id: number) {
  let User = await UserModel.findOne({ telegramId: id })
  if (!User) {
    try {
      User = await new UserModel({
        telegramId: id,
        session: { stage: 0 },
        settings: { notify: false, timezone: 0 },
      }).save()
    } catch (err) {
      console.log(err)
      User = await UserModel.findOne({ telegramId: id })
    }
  }
  return User
}
