"use client";

import { useState } from "react";
import { Calendar, Modal } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const CalendarWithModal: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDateSelect: CalendarProps<Dayjs>["onSelect"] = (date) => {
    if (date.isBefore(dayjs().startOf("day"))) return;
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const disabledDate = (current: Dayjs): boolean => {
    return current.isBefore(dayjs().startOf("day"));
  };

  return (
    <>
      <div className="w-full mx-auto py-4">
        <Calendar
          fullscreen={false}
          onSelect={handleDateSelect}
          disabledDate={disabledDate}
        />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Selected Date"
      >
        <p className="text-lg font-semibold text-center">
          {selectedDate?.format("dddd, MMMM D, YYYY")}
        </p>
      </Modal>
    </>
  );
};

export default CalendarWithModal;
