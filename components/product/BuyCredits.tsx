"use client";

import { useState } from "react";
import { metering } from "@/content/pledge";

/**
 * Credit purchase — DELIBERATELY NON-TRANSACTING.
 *
 * There is no payment processor behind this and no backend to record a purchase. It
 * collects no card details, shows no checkout, and says plainly that nothing is charged.
 * A realistic-looking payment form that silently does nothing would be the most damaging
 * thing on this page the moment a prospect tried it. When this becomes real it needs
 * payment processing, state sales tax, invoices, receipts, failed-payment handling and
 * refunds — none of which are in scope here.
 */
export default function BuyCredits() {
  const [packs, setPacks] = useState(5);
  const [ack, setAck] = useState(false);

  const creditsAdded = packs * metering.packSize;
  const total = packs * metering.packPriceUsd;

  const clamp = (n: number) => Math.max(1, Math.min(500, n));

  return (
    <div className="buy">
      <p className="h">Add credits</p>

      <div className="buy-row">
        <div className="stepper">
          <button
            type="button"
            onClick={() => setPacks((p) => clamp(p - 1))}
            aria-label="One pack fewer"
            disabled={packs <= 1}
          >
            −
          </button>
          <span className="n" aria-live="polite">
            {packs}
          </span>
          <button
            type="button"
            onClick={() => setPacks((p) => clamp(p + 1))}
            aria-label="One pack more"
            disabled={packs >= 500}
          >
            +
          </button>
        </div>
        <span className="buy-meta">
          {packs === 1 ? "pack" : "packs"} ×{" "}
          {metering.packSize.toLocaleString("en-US")} credits
        </span>
      </div>

      <div className="buy-total">
        <span>{creditsAdded.toLocaleString("en-US")} credits</span>
        <b>${total.toLocaleString("en-US")}</b>
      </div>

      <button type="button" className="btn" onClick={() => setAck(true)}>
        Add {creditsAdded.toLocaleString("en-US")} credits, ${total}
      </button>

      {ack && (
        <p className="buy-ack" role="status">
          Nothing was charged. This build has no payment processing, the purchase flow is
          illustrative.
        </p>
      )}

      <p className="buy-note">
        1 credit = ${(metering.centsPerCredit / 100).toFixed(2)}. Sold in packs of{" "}
        {metering.packSize.toLocaleString("en-US")} at ${metering.packPriceUsd}. Purchased
        credits roll over; the monthly allowance does not.
      </p>
    </div>
  );
}
