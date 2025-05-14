"use client"
import { useState } from "react";
import TabMenu from "./TabMenu";
import TabContent from "./TabContent";
import type { TabKey } from "./types";

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("currentHosting");

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
       <div className="space-y-2">
         <h2 className="text-lg sm:text-xl font-medium  md:mb-4">Your reservations </h2>
       </div>
      <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} />
    </div>
  );
};

export default TabContainer;
