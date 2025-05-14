// nav.utils.ts
export const TabMenuList = [
  {
    id: 1,
    title: "Today",
    link: "/host-dashboard/",
  },
  {
    id: 2,
    title: "Calender",
    link: "/host-dashboard/calender",
  },
  {
    id: 3,
    title: "Earnings",
    link: "/host-dashboard/earnings",
  },
  {
    id: 4,
    title: "Menu",
    link: "#",
    dropdownItems: [
      { key: "faq", label: "FAQs", href: "/host-dashboard/help/faq" },
      { key: "contact", label: "Contact Us", href: "/host-dashboard/help/contact" },
      { key: "support", label: "Support", href: "/host-dashboard/help/support" },
    ],
  },
];
