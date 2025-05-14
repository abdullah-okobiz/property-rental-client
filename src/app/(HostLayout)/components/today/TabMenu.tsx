import type { TabKey } from "./types";

interface TabMenuProps {
  activeTab: TabKey;
  setActiveTab: (key: TabKey) => void;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "currentHosting", label: "Current Hosting" },
  { key: "checking", label: "Checking" },
  { key: "checkout", label: "Checkout" },
  { key: "arriving", label: "Arriving" },
  { key: "upcoming", label: "Upcoming" },
  { key: "pending", label: "Pending" },
];

const TabMenu = ({ activeTab, setActiveTab }: TabMenuProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4  pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition ${
            activeTab === tab.key
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
