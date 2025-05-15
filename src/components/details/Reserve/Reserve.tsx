import { DateRangePicker } from "react-date-range";
import React from "react";
import { PiCalendarCheckThin } from "react-icons/pi";
import { poppins } from "@/app/font";

const Reserve = ({ dateRange, setDateRange }) => {
  //   const [showPicker, setShowPicker] = useState(false);
  return (
    <div className="mt-20  w-2/6">
      <div className="border rounded p-4">
        <p className="text-primary bg-primary/20 rounded px-4 py-2 inline-flex font-medium">
          ৳1400 night
        </p>

        <div className={`border rounded p-2 mt-4 ${poppins.className}`}>
          <div className="flex items-center justify-between px-12 gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 text-primary  p-2 rounded">
                <PiCalendarCheckThin />
              </div>
              <div>
                <p className="text-[12px] uppercase text-[#262626]/50">
                  Check in
                </p>
                <p className="font-medium">Add Dates</p>
              </div>
            </div>

            <p className="">Check in</p>
          </div>
        </div>

        <div>
          <DateRangePicker
            onChange={(item) => {
              const { startDate, endDate } = item.selection;
              setDateRange({ startDate, endDate });
              console.log("Start Date:", startDate);
              console.log("End Date:", endDate);
            }}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[{ ...dateRange, key: "selection" }]}
            direction="horizontal"
            preventSnapRefocus={true}
            staticRanges={[]}
            inputRanges={[]}
            className="w-[60%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Reserve;
