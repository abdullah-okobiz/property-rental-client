import { Tabs } from 'antd';
import RentSearchInputField from './RentSearchInputField';
import LandSearchInputField from './LandSearchInputField';
import FlatSearchInputField from './FlatSearchInputField';
import { Fragment } from 'react';
const { TabPane } = Tabs;
const SearchTabs = () => {
    return (
        <Fragment>
            <Tabs defaultActiveKey="rent" type="card">
                <TabPane
                    tab={<div className="text-white bg-[#F2693C] px-4 py-2 rounded">Rent</div>}
                    key="rent"
                >
                    <RentSearchInputField />
                </TabPane>
                <TabPane
                    tab={<div className="text-white bg-[#F2693C] px-4 py-2 rounded">Land</div>}
                    key="land"
                >
                    <LandSearchInputField />
                </TabPane>
                <TabPane
                    tab={<div className="text-white bg-[#F2693C] px-4 py-2 rounded">Flat</div>}
                    key="flat"
                >
                    <FlatSearchInputField />
                </TabPane>
            </Tabs>
        </Fragment>
    )
}
export default SearchTabs