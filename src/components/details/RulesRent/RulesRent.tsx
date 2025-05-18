import React from "react";
import { CgCheck } from "react-icons/cg";

interface Props {
  allowableThings: string[];
  cancellationPolicy: string[];
  houseRules: string[];
}
const RulesRent: React.FC<Props> = ({
  allowableThings,
  cancellationPolicy,
  houseRules,
}) => {
  return (
    <div className="">
      <h2 className="text-2xl font-medium">Need to know</h2>

      <div className="py-6 px-20 bg-[#FBFCFC] border border-[#262626]/10 rounded mt-6 grid lg:grid-cols-3">
        <div className="">
          <h2 className="text-xl font-medium">House rules</h2>
          <ul className="flex flex-col gap-2 mt-4">
            {houseRules.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-baseline gap-2 text-[#262626]/70"
              >
                <span className="rounded-full bg-primary text-[#fff]">
                  <CgCheck />
                </span>
                <span className="text-base">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 mt-4 lg:ml-[-20px]">
          <h2 className="text-xl font-medium">Allowable things</h2>
          {allowableThings.map((allow, idx) => (
            <li
              key={idx}
              className="flex items-baseline gap-2 text-[#262626]/70"
            >
              <span className="rounded-full bg-primary text-[#fff]">
                <CgCheck />
              </span>
              <span className="text-base">{allow}</span>
            </li>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-medium">Cancellation policy</h2>

          <ul className="flex flex-col gap-2 mt-4">
            {cancellationPolicy.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-baseline gap-2 text-[#262626]/70"
              >
                <span className="rounded-full bg-primary text-[#fff]">
                  <CgCheck />
                </span>
                <span className="text-base">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RulesRent;
