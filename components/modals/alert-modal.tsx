import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/mod";
import { Bttn } from "@/components/ui/but";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const termsAndConditions = (
    <div>
      <p>
        Payment Processing: Please note that Hackerspace Online Store does not
        store or process your payment details. All payment transactions are
        securely handled by Stripe, our payment processing partner.
      </p>
      <br />
      <p>
        Stripe&#39;s Terms and Policies: By proceeding with your payment, you
        agree to be bound by Stripe&#39;s Consumer Terms of Service, which
        includes their privacy policy, data handling practices, arbitration
        agreement (applicable in the U.S.), and other relevant terms.
      </p>
      <br />
      <p>
        Your Responsibility: You are responsible for the transactions made and
        for understanding the terms related to your purchases. Please review
        Stripe&#39;s policies for more details.
      </p>
      <br />
      <p>
        Data Security: While Hackerspace Online Store takes privacy and data
        security seriously, we do not have access to your payment details as
        they are managed by Stripe.
      </p>
      <br />
      <p>
        Dispute Resolution: For any issues related to payment processing, please
        contact Stripe directly as per their dispute resolution policy.
      </p>
      <br />
      <p>
        Consent: By clicking “Continue to Payment”, you acknowledge and agree to
        these terms.
      </p>
    </div>
  );
return (
    <Modal
      title="Hackerspace Online Store Payment Processing Disclaimer"
      isOpen={isOpen}
      onClose={onClose}
      description="Please read through the following disclaimer."
    >
      <div className="max-h-60 overflow-y-auto p-4 text-sm">
        <p>{termsAndConditions}</p>
      </div>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Bttn disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Bttn>
        <Bttn disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue to Payment
        </Bttn>
      </div>
    </Modal>
  );
};