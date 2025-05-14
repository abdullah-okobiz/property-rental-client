import { Table, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import type { RowData } from "./types";

interface TabTableProps {
  data: RowData[];
}

const TabTable: React.FC<TabTableProps> = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<RowData | null>(null);

  const showModal = (record: RowData) => {
    setSelected(record);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelected(null);
  };



const columns: ColumnsType<RowData> = [
  { dataIndex: "guest", key: "guest", },
  { dataIndex: "date", key: "date",  },
  { dataIndex: "room", key: "room",  },
  { dataIndex: "status", key: "status",  },
  {
    key: "action",
    render: (_, record) => (
      <Button
        type="link"
        icon={<EyeOutlined />}
        onClick={() => showModal(record)}
      />
    ),
  },
];


  return (
    <>
      <Table<RowData>  columns={columns} dataSource={data} rowKey="key" />

      <Modal title="Booking Details" open={visible} onCancel={handleCancel} footer={null}>
        {selected && (
          <div className="space-y-2">
            <p><strong>Guest:</strong> {selected.guest}</p>
            <p><strong>Date:</strong> {selected.date}</p>
            <p><strong>Room:</strong> {selected.room}</p>
            <p><strong>Status:</strong> {selected.status}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TabTable;
