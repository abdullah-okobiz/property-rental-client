export const getStepsForFeatureType = (
  featureType: "rent" | "flat" | "land" | null
) => {
  const baseSteps = [
    "/create-listing/become-a-host",
    "/create-listing/become-a-host/feature",
    "/create-listing/become-a-host/category",
  ];

  const sharedSteps = [
    "/create-listing/become-a-host/location",
    "/create-listing/become-a-host/land-size",
    "/create-listing/become-a-host/title",
    "/create-listing/become-a-host/description",
    "/create-listing/become-a-host/upload-image",
    "/create-listing/become-a-host/price",
    "/create-listing/become-a-host/review",
  ];

  const amenitiesStep = "/create-listing/become-a-host/animities";
  const floorPlanStep = "/create-listing/become-a-host/floor-plan";

  if (featureType === "land") {
    return [...baseSteps, ...sharedSteps];
  }

  if (featureType === "rent" || featureType === "flat") {
    return [...baseSteps, amenitiesStep, floorPlanStep, ...sharedSteps];
  }

  return baseSteps;
};
