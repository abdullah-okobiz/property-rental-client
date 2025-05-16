'use client';

import { usePathname, useRouter } from 'next/navigation';
import { stepRoutes } from '../listing-utils/steps';

type StepNavigationProps = {
  onNextSubmit?: () => Promise<void>; 
};

export default function StepNavigation({ onNextSubmit }: StepNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentIndex = stepRoutes.findIndex(route => pathname === route);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === stepRoutes.length - 1;

  const handleBack = () => {
    if (!isFirst) router.push(stepRoutes[currentIndex - 1]);
  };

  const handleNext = async () => {
    if (onNextSubmit) {
      await onNextSubmit();
    }
    if (!isLast) router.push(stepRoutes[currentIndex + 1]);
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={handleBack}
        disabled={isFirst}
        className="px-4 py-2 bg-gray-200 text-gray-800 cursor-pointer rounded disabled:opacity-50"
      >
        Back
      </button>

      <span className="text-md font-medium text-gray-900">
        Step {currentIndex + 1} / {stepRoutes.length}
      </span>

      <button
        onClick={handleNext}
        disabled={isLast}
        className="px-4 md:px-6 py-2  cursor-pointer bg-primary text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
