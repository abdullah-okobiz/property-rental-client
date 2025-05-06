type TabsProps = {
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
  };
  
  const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
    return (
      <div className="flex  justify-baseline md:gap-5 flex-wrap sm:flex-nowrap overflow-x-auto pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full cursor-pointer whitespace-nowrap transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default Tabs;
  