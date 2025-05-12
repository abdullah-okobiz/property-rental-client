import { CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const Loading = ()=>{
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center text-center">
        <FloatButton
        shape="square"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<CustomerServiceOutlined />}
      />
      </div>
    )
}
export default Loading