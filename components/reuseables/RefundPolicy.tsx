"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function RefundPolicyPage() {
  return (
    <section className="bg-amber-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            Return / Refund Policy
          </h1>
          <p className="text-sm text-amber-700">Last updated June, 2022</p>
        </div>
        <Card className="bg-white border border-amber-200 shadow-lg rounded-2xl">
          <CardContent className="space-y-6 p-6 text-amber-800 text-base leading-relaxed">
            <p>
              Thank you for your patronage. We hope you are happy with your
              purchase. However, if you are not completely satisfied with your
              purchase for any reason, you may return it to us for a full
              refund/store credit /exchange only. Please see below for more
              information on our return policy.
            </p>

            <h2 className="text-lg font-semibold text-amber-900">RETURNS</h2>
            <p>
              All returns must be postmarked within 7 days of the . All returned
              items must be in new and unused condition, with all seals and
              packaging intact.
            </p>

            <h2 className="text-lg font-semibold text-amber-900">
              RETURN PROCESS
            </h2>
            <p>
              To return an item, please email customer service at{" "}
              <a
                href="mailto:kimscoffee24@gmail.com"
                className="text-amber-700 underline"
              >
                kimscoffee24@gmail.com
              </a>{" "}
              to obtain a Return Merchandise Authorization (RMA) number. After
              receiving a RMA number, place the item securely in its original
              packaging and include your proof of purchase/and the return form
              provide and your return;
            </p>
            <p className="pl-4 border-l-4 border-amber-300 text-amber-900">
              Kim’s Coffee
              <br />
              Plot 5176, Usman Turaki Close, Rantya
              <br />
              Jos, Plateau State
            </p>
            <p>
              Please note, you will be responsible for all return shipping
              charges. We strongly recommend that you use a trackable method to
              mail your return.
            </p>

            <h2 className="text-lg font-semibold text-amber-900">REFUNDS</h2>
            <p>
              After receiving your return and inspecting the condition of your
              item, we will process your return/exchange. Please allow at least
              7 days from the receipt of your item to process your
              return/exchange. We will notify you by email when your return has
              been processed.
            </p>

            <h2 className="text-lg font-semibold text-amber-900">EXCEPTIONS</h2>
            <p>The following items cannot be returned [or exchanged]</p>
            <ul className="list-disc list-inside ml-4">
              <li>Items with broken seals</li>
              <li>Items stored in poor conditions</li>
            </ul>
            <p>
              For defective or damaged products, please contact us at the
              customer service number below to arrange a refund or exchange.
            </p>

            <h2 className="text-lg font-semibold text-amber-900">QUESTIONS</h2>
            <p>
              If you have any questions concerning our return policy, please
              contact us at
              <br />
              <strong>Phone number:</strong> +234 8069569863
              <br />
              <strong>Customer service email:</strong>{" "}
              <a
                href="mailto:kimscoffee24@gmail.com"
                className="text-amber-700 underline"
              >
                kimscoffee24@gmail.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
