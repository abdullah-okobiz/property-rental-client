"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";

const RentDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (paragraphRef.current) {
      const hasOverflow =
        paragraphRef.current.scrollHeight > paragraphRef.current.clientHeight;
      setShouldShowToggle(hasOverflow);
    }
  }, []);

  return (
    <div className="py-6 border-b border-[#262626]/30 pb-4 lg:w-[60%]">
      <h2 className="text-xl font-medium">Description</h2>

      <p
        ref={paragraphRef}
        className={`py-6 text-[#262626]/70 ${
          !isExpanded ? "line-clamp-2" : ""
        }`}
      >
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here, content here, making it look
        like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search
        for lorem ipsum will uncover many web sites still in their infancy.
        Various versions have evolved over the years, sometimes by accident,
        sometimes on purpose (injected humour and the like).
      </p>

      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-2 font-medium cursor-pointer flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              Show Less <IoIosArrowForward />
            </>
          ) : (
            <>
              Show More <IoIosArrowForward />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default RentDetails;
