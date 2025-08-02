import {
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { UsersService } from '../users/users.service';

@ApiTags('Stripe')
@Controller('checkout')
export class StripeController {
  private stripe: Stripe;
  constructor(
    private stripeService: StripeService,
    private usersService: UsersService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-07-30.basil',
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('session')
  @ApiResponse({ status: 200, description: 'Create Stripe checkout session', schema: { example: { id: 'cs_test_...', url: 'https://checkout.stripe.com/pay/cs_test_...' } } })
  async createSession(@Req() req: any) {
    // userId from JWT payload
    const userId = req.user?.userId;
    if (!userId) {
      return { error: 'User ID not found in token' };
    }
    return this.stripeService.createCheckoutSession(userId);
  }

  @Post('/webhook/stripe')
  @HttpCode(200)
  @ApiBody({ description: 'Stripe webhook event', schema: { example: {} } })
  @ApiResponse({ status: 200, description: 'Webhook received' })
  async handleStripe(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    let event;
    try {
      event = this.stripe.webhooks.constructEvent(
        (req as any).rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || '',
      );
    } catch (err) {
      console.error(`Webhook Error: ${(err as Error).message}`);
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      if (userId) {
        this.usersService.updateUser(Number(userId), {
          subscriptionStatus: 'active',
          subscribedAt: new Date(),
        });
      }
    }
    res.json({ received: true });
  }
}
