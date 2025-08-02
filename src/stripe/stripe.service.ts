import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  }

  async createCheckoutSession(userId: number) {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID || '',
          quantity: 1,
        },
      ],
      success_url:
        process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/success',
      cancel_url:
        process.env.STRIPE_CANCEL_URL || 'http://localhost:3000/cancel',
      client_reference_id: String(userId),
    });
  }
}
