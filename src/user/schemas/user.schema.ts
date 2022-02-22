import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'bson';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id?: ObjectId;
}

// eslint-disable-next-line @typescript-eslint/typedef
export const UserSchema = SchemaFactory.createForClass(User);
