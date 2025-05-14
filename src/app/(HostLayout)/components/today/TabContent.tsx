import TabTable from "./TabTable";
import type { TabKey } from "./types";
import type { RowData } from "./types";

interface TabContentProps {
  activeTab: TabKey;
}

const mockData = (label: string): RowData[] =>
  Array.from({ length: 5 }).map((_, i) => ({
    key: i,
    guest: `${label} Guest ${i}`,
    date: `2025-05-${10 + i}`,
    room: `Room ${i + 1}`,
    status: label,
  }));

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const labelMap: Record<TabKey, string> = {
    currentHosting: "Current Hosting",
    checking: "Checking",
    checkout: "Checkout",
    arriving: "Arriving",
    upcoming: "Upcoming",
    pending: "Pending",
  };

  return <TabTable data={mockData(labelMap[activeTab])} />;
};

export default TabContent;

