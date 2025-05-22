// "use client";
// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { addDays } from "date-fns";

// interface DateRange {
//   startDate: Date | undefined;
//   endDate: Date | undefined;
// }

// interface GuestInfo {
//   adults: number;
//   younger: number;
//   infants: number;
//   totalGuest: number;
// }

// interface DateRangeContextType {
//   dateRange: DateRange;
//   setDateRange: (range: DateRange) => void;
//   guestInfo: GuestInfo;
//   setGuestInfo: (info: Omit<GuestInfo, "totalGuest">) => void;
// }

// const DateRangeContext = createContext<DateRangeContextType | undefined>(
//   undefined
// );

// export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
//   const [dateRange, setDateRange] = useState<DateRange>({
//     startDate: new Date(),
//     endDate: addDays(new Date(), 0),
//   });

//   const [guestInfoState, setGuestInfoState] = useState<
//     Omit<GuestInfo, "totalGuest">
//   >({
//     adults: 0,
//     younger: 0,
//     infants: 0,
//   });

//   const totalGuest =
//     guestInfoState.adults + guestInfoState.younger + guestInfoState.infants;

//   const setGuestInfo = (info: Omit<GuestInfo, "totalGuest">) => {
//     setGuestInfoState(info);
//   };

//   return (
//     <DateRangeContext.Provider
//       value={{
//         dateRange,
//         setDateRange,
//         guestInfo: { ...guestInfoState, totalGuest },
//         setGuestInfo,
//       }}
//     >
//       {children}
//     </DateRangeContext.Provider>
//   );
// };

// export const useDateRange = () => {
//   const context = useContext(DateRangeContext);
//   if (!context) {
//     throw new Error("useDateRange must be used within a DateRangeProvider");
//   }
//   return context;
// };

// "use client";
// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { addDays } from "date-fns";

// interface DateRange {
//   startDate: Date | undefined;
//   endDate: Date | undefined;
// }

// interface GuestInfo {
//   adults: number;
//   younger: number;
//   infants: number;
//   totalGuest: number;
// }

// interface DateRangeContextType {
//   dateRange: DateRange;
//   setDateRange: (range: DateRange) => void;
//   guestInfo: GuestInfo;
//   setGuestInfo: (info: Omit<GuestInfo, "totalGuest">) => void;
// }

// const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

// const LOCAL_STORAGE_KEY = {
//   DATE_RANGE: "reservation-date-range",
//   GUEST_INFO: "reservation-guest-info",
// };

// export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
//   // Read initial state from localStorage
//   const getInitialDateRange = (): DateRange => {
//     if (typeof window === "undefined") return { startDate: new Date(), endDate: addDays(new Date(), 0) };
//     const stored = localStorage.getItem(LOCAL_STORAGE_KEY.DATE_RANGE);
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       return {
//         startDate: parsed.startDate ? new Date(parsed.startDate) : undefined,
//         endDate: parsed.endDate ? new Date(parsed.endDate) : undefined,
//       };
//     }
//     return { startDate: new Date(), endDate: addDays(new Date(), 0) };
//   };

//   const getInitialGuestInfo = (): Omit<GuestInfo, "totalGuest"> => {
//     if (typeof window === "undefined") return { adults: 0, younger: 0, infants: 0 };
//     const stored = localStorage.getItem(LOCAL_STORAGE_KEY.GUEST_INFO);
//     if (stored) return JSON.parse(stored);
//     return { adults: 0, younger: 0, infants: 0 };
//   };

//   const [dateRange, setDateRangeState] = useState<DateRange>(getInitialDateRange);
//   const [guestInfoState, setGuestInfoState] = useState<Omit<GuestInfo, "totalGuest">>(getInitialGuestInfo);

//   const totalGuest = guestInfoState.adults + guestInfoState.younger + guestInfoState.infants;

//   // Setters with localStorage update
//   const setDateRange = (range: DateRange) => {
//     setDateRangeState(range);
//     localStorage.setItem(LOCAL_STORAGE_KEY.DATE_RANGE, JSON.stringify(range));
//   };

//   const setGuestInfo = (info: Omit<GuestInfo, "totalGuest">) => {
//     setGuestInfoState(info);
//     localStorage.setItem(LOCAL_STORAGE_KEY.GUEST_INFO, JSON.stringify(info));
//   };

//   return (
//     <DateRangeContext.Provider
//       value={{
//         dateRange,
//         setDateRange,
//         guestInfo: { ...guestInfoState, totalGuest },
//         setGuestInfo,
//       }}
//     >
//       {children}
//     </DateRangeContext.Provider>
//   );
// };

// export const useDateRange = () => {
//   const context = useContext(DateRangeContext);
//   if (!context) {
//     throw new Error("useDateRange must be used within a DateRangeProvider");
//   }
//   return context;
// };

"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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

const LOCAL_STORAGE_KEY = {
  DATE_RANGE: "reservation-date-range",
  GUEST_INFO: "reservation-guest-info",
};

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRangeState] = useState<DateRange | null>(null);
  const [guestInfoState, setGuestInfoState] = useState<Omit<
    GuestInfo,
    "totalGuest"
  > | null>(null);

  // Hydrate from localStorage on client
  useEffect(() => {
    const getInitialDateRange = (): DateRange => {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY.DATE_RANGE);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          startDate: parsed.startDate ? new Date(parsed.startDate) : undefined,
          endDate: parsed.endDate ? new Date(parsed.endDate) : undefined,
        };
      }
      return { startDate: new Date(), endDate: addDays(new Date(), 0) };
    };

    const getInitialGuestInfo = (): Omit<GuestInfo, "totalGuest"> => {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY.GUEST_INFO);
      if (stored) return JSON.parse(stored);
      return { adults: 0, younger: 0, infants: 0 };
    };

    setDateRangeState(getInitialDateRange());
    setGuestInfoState(getInitialGuestInfo());
  }, []);

  const setDateRange = (range: DateRange) => {
    setDateRangeState(range);
    localStorage.setItem(LOCAL_STORAGE_KEY.DATE_RANGE, JSON.stringify(range));
  };

  const setGuestInfo = (info: Omit<GuestInfo, "totalGuest">) => {
    setGuestInfoState(info);
    localStorage.setItem(LOCAL_STORAGE_KEY.GUEST_INFO, JSON.stringify(info));
  };

  if (!dateRange || !guestInfoState) {
    return null; // or <Loading /> component
  }

  const totalGuest =
    guestInfoState.adults + guestInfoState.younger + guestInfoState.infants;

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
