import React from "react";

interface ContactHostModelProps {
  setShowContact: (value: boolean) => void;
}

const ContactHostModel: React.FC<ContactHostModelProps> = ({
  setShowContact,
}) => {
  return (
    <div className="bg-white p-6 rounded-md w-full max-w-md mx-auto">
      <div className="flex items-center justify-between border-b border-[#262626]/20 pb-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">Contact Rabiul Islam Rana</h2>
          <p className="text-base text-[#262626]/60">
            Typically responds as early as possible
          </p>
        </div>
        <div className="w-10 h-10 bg-[#D1D5DB] rounded-full text-white text-center flex items-center justify-center">
          <p className="font-medium">R</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-medium">
          Still have questions? Message the Host
        </h2>
        <form className="mt-2">
          <textarea
            className="border border-[#262626]/20 w-full rounded px-4 py-2 outline-none"
            placeholder="Type your message here..."
            cols={30}
            rows={6}
          ></textarea>

          <button
            type="submit"
            className="text-primary text-sm border border-primary hover:bg-primary hover:text-white rounded px-4 py-2 mt-2 duration-300"
          >
            Send message
          </button>
        </form>
      </div>
      <button
        onClick={() => setShowContact(false)}
        className="mt-4 text-primary font-medium"
      >
        Close
      </button>
    </div>
  );
};

export default ContactHostModel;
