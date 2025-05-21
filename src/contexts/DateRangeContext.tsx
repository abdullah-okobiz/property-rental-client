"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { addDays } from "date-fns";

interface DateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

interface GuestInfo {
  adults: number;
  younger: number;
  infants: number;
  totalGuest: number;
}

interface DateRangeContextType {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  guestInfo: GuestInfo;
  setGuestInfo: (info: Omit<GuestInfo, "totalGuest">) => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: addDays(new Date(), 0),
  });

  const [guestInfoState, setGuestInfoState] = useState<
    Omit<GuestInfo, "totalGuest">
  >({
    adults: 0,
    younger: 0,
    infants: 0,
  });

  const totalGuest =
    guestInfoState.adults + guestInfoState.younger + guestInfoState.infants;

  const setGuestInfo = (info: Omit<GuestInfo, "totalGuest">) => {
    setGuestInfoState(info);
  };

  return (
    <DateRangeContext.Provider
      value={{
        dateRange,
        setDateRange,
        guestInfo: { ...guestInfoState, totalGuest },
        setGuestInfo,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};
