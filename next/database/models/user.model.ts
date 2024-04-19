import mongoose, { ObjectId } from 'mongoose';

export interface UserI {
  _id?: string;
  email: string;
  // firstName: string;
  // lastName: string;
  // password?: string;

  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stytchID?: string;

  credits: number;

  // Affiliate info.
  promoCode?: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Onboarded
  onboarded?: boolean;
}

export type UserId = string | ObjectId | UserI;

const UserSchema = new mongoose.Schema<UserI>(
  {
    email: {type: String, unique: true, required: true},
    // firstName: {type: String, required: true},
    // lastName: {type: String, required: true},
    // password: {type: String, required: true},

    stripeCustomerId: { type: String, unique: false, required: false },
    stripeSubscriptionId: { type: String, unique: false, required: false },
    stytchID: { type: String, unique: true, required: false },

    credits: { type: Number, required: true, default: 3, min: 0 },

    promoCode: { type: String, required: false},

    onboarded: {type: Boolean, required: false},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.model('User', UserSchema);