import mongoose, { ObjectId } from 'mongoose';

export interface UserI {
  _id?: string;
  email : string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stytchID?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Onboarded
  onboarded?: boolean;
}

export type UserId = string | ObjectId | UserI;

const UserSchema = new mongoose.Schema<UserI>(
  {

    email: {type: String, unique: false, required: true},
    stripeCustomerId: { type: String, unique: false, required: false },
    stripeSubscriptionId: { type: String, unique: false, required: false },
    stytchID: { type: String, unique: true, required: false },

    onboarded: {type: Boolean, required: false},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model('User', UserSchema);