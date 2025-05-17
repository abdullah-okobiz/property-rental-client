"use client";
import React, { useState } from "react";

const RentConfirmBtn = () => {
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  return (
    <div>
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          id="terms"
          className="mt-1"
        />
        <label htmlFor="terms" className="text-sm">
          By selecting the button below, I agree to the{" "}
          <span className="underline font-semibold hover:text-primary duration-300 cursor-pointer">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="underline font-semibold hover:text-primary duration-300 cursor-pointer">
            Refund Policy
          </span>
          .
        </label>
      </div>

      <div
        className={`mt-4 px-6 py-3 font-semibold tracking-wide rounded inline-flex ${
          agreed
            ? "bg-primary cursor-pointer"
            : "bg-[#D1D5DB] cursor-not-allowed"
        }`}
      >
        <button disabled={!agreed} className="text-white cursor-pointer">
          Confirm and Pay
        </button>
      </div>
    </div>
  );
};

export default RentConfirmBtn;
