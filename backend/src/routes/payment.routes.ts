import { Router } from 'express';
import Stripe from 'stripe';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2023-10-16' as any,
});

router.post('/create-payment-intent', authenticate, async (req: AuthRequest, res) => {
  try {
    const { amount } = req.body; // Amount should be calculated on server in real app based on items
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
