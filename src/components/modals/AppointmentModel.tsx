import React from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { createFlat } from "@/services/flats";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, y: -30 },
};

interface Props {
  title: string;
  flatId: string;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const AppointmentModel: React.FC<Props> = ({ onClose, title, flatId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      await createFlat({ flat: flatId, ...data }, accessToken);
      toast.success("Appointment created successfully!");
      onClose();
      router.push(`/flat`);
    } catch (error) {
      toast.error("Failed to create appointment");
      console.error("Failed to create appointment", error);
    }
  });

  return (
    <AnimatePresence>
      <motion.div
        className=""
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <div className="flex items-center justify-center w-full h-full">
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fff] w-[600px] rounded shadow relative top-60"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="p-1 rounded-full border absolute top-4 left-4 text-[#262626]/60 cursor-pointer"
              onClick={onClose}
            >
              <HiMiniXMark className="text-xl" />
            </div>
            <div className="px-10 pt-16">
              <h2 className="text-lg font-medium capitalize">{title}</h2>
              <p className="text-base font-medium pt-1 text-[#262626]/50">
                To book this appointment, please fill out the form
              </p>

              <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="border border-[#262626]/40 outline-none rounded w-full px-2 py-2"
                    type="text"
                    placeholder="Your Name *"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 w-full">
                  <div className="w-full">
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      className="border border-[#262626]/40 outline-none rounded w-full px-2 py-2"
                      type="text"
                      placeholder="Your Number *"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <input
                      {...register("email")}
                      className="border border-[#262626]/40 outline-none rounded w-full px-2 py-2"
                      type="email"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    className="border border-[#262626]/40 outline-none rounded w-full px-2 py-2"
                    placeholder="Your message"
                    cols={30}
                    rows={4}
                  />
                </div>

                <div className="pb-12">
                  <input
                    className="px-6 py-3 rounded bg-primary text-[#fff] cursor-pointer"
                    type="submit"
                    value="Appointment"
                  />
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppointmentModel;
