import { Tabs } from 'antd';
import RentSearchInputField from './RentSearchInputField';
import LandSearchInputField from './LandSearchInputField';
import FlatSearchInputField from './FlatSearchInputField';
const { TabPane } = Tabs;
const SearchTabs = () => {
    return (
        <div>
            <Tabs defaultActiveKey="rent" type="card">
                <TabPane tab="Rent" key="rent">
                    <RentSearchInputField/>
                </TabPane>
                <TabPane tab="Land" key="land">
                  <LandSearchInputField/>
                </TabPane>
                <TabPane tab="Flat" key="flat">
                   <FlatSearchInputField/>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default SearchTabs