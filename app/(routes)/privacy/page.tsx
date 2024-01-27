"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import React from 'react';
import { Bold, Italic } from 'lucide-react';


export const revalidate = 0;

const aboutuspage = () => {
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-bold text-4xl mb-8 text-center">PRIVACY POLICY</h1>
          <div className="text-lg mb-4">
                <strong>
                <p><u>Hackerspace Online Store Payment Processing Disclaimer</u></p>
                <br/><br/>
                <p>Payment Processing: Please note that Hackerspace Online Store does not store or process your payment details. 
                    All payment transactions are securely handled by Stripe, our payment processing partner.</p>
                <br/>
                <p>Stripe's Terms and Policies: By proceeding with your payment, you agree to be bound by Stripe’s Consumer Terms of Service, which includes 
                their privacy policy, data handling practices, arbitration agreement (applicable in the U.S.), and other relevant terms.</p>
                <br/>
                <p>Your Responsibility: You are responsible for the transactions made and for 
                    understanding the terms related to your purchases. Please review Stripe’s policies for more details.</p>
                <br/>
                <p>Data Security: While Hackerspace Online Store takes privacy and data security seriously, we do not have access to your payment details as they are managed by Stripe.
                </p><br/><p>
                Dispute Resolution: For any issues related to payment processing, please contact Stripe directly as per their dispute resolution policy.</p>
                <br/>
                <p>Consent: By clicking “Continue to Payment”, you acknowledge and agree to these terms.</p>

                                ⚡


                </strong>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default aboutuspage;