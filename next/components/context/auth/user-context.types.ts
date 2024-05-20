/**
 * A Formatted client side user object based on data from the Stytch & the Stripe APIs.
 */
export type InstantPersonasUser = {
  /**
   * UUID that identifies a specific user.
   * Inherited from the Stytch API, used as primary index.
   */
  id: string;
  /**
   * The timestamp of the user's creation.
   * Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
   */
  created_at: string;
  /**
   * The `emails` array contains an array of `email` objects for the user.
   */
  emails: UserEmail[];
  name: {
    first_name: string;
    last_name: string;
    middle_name: string;
  };
  subscription: UserSubscription;
};

/**
 * The subscription is `incomplete` if the initial payment attempt fails.
 *
 * Once the first invoice is paid, the subscription moves into an `active` status.
 *
 * If the first invoice is not paid within 23 hours, the subscription transitions to `incomplete_expired`. This is a terminal status, the open invoice will be voided and no further invoices will be generated.
 *
 * A subscription that is currently in a trial period is `trialing` and moves to `active` when the trial period is over.
 *
 * A subscription can only enter a `paused` status [when a trial ends without a payment method](https://stripe.com/billing/subscriptions/trials#create-free-trials-without-payment). A `paused` subscription doesn't generate invoices and can be resumed after your customer adds their payment method. The `paused` status is different from [pausing collection](https://stripe.com/billing/subscriptions/pause-payment), which still generates invoices and leaves the subscription's status unchanged.
 *
 * If subscription `collection_method=charge_automatically`, it becomes `past_due` when payment is required but cannot be paid (due to failed payment or awaiting additional user actions). Once Stripe has exhausted all payment retry attempts, the subscription will become `canceled` or `unpaid` (depending on your subscriptions settings).
 *
 * If subscription `collection_method=send_invoice` it becomes `past_due` when its invoice is not paid by the due date, and `canceled` or `unpaid` if it is still not paid by an additional deadline after that. Note that when a subscription has a status of `unpaid`, no subsequent invoices will be attempted (invoices will be created, but then immediately automatically closed). After receiving updated payment information from a customer, you may choose to reopen and pay their closed invoices.
 *
 * Finally, the subscription is `inactive` if the user has yet to signup for an active subscription.
 */
export type UserSubscriptionStatus =
  // Inherited from the Stripe API
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "paused"
  | "trialing"
  | "unpaid"
  // Extended Status for internal use
  | "inactive";

export type UserSubscription = {
  status: UserSubscriptionStatus;
  /**
   * If the subscription has been canceled with the `at_period_end` flag set to `true`, `cancel_at_period_end` on the subscription will be true. You can use this attribute to determine whether a subscription that has a status of active is scheduled to be canceled at the end of the current period.
   */
  cancel_at_period_end: boolean;
  /**
   * The subscription plan interval.
   */
  interval: "month" | "year";
};

export type UserEmail = {
  /**
   * The email address.
   */
  email: string;
  /**
   * Globally unique UUID that identifies a specific email address in the Stytch API.
   * The `email_id` is used when you need to operate on a specific user's email address,
   * e.g. to delete the email address from the Stytch user.
   */
  email_id: string;
  /**
   * The `verified` boolean denotes whether or not this method has been successfully authenticated by the user.
   */
  verified: boolean;
};
