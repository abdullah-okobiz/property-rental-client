export const getStepsForFeatureType = (featureType: string | null) => {
  const baseSteps = [
    "/create-listing/become-a-host",
    "/create-listing/become-a-host/feature",
    "/create-listing/become-a-host/category",
  ];

  const sharedSteps = [
    "/create-listing/become-a-host/location",
    "/create-listing/become-a-host/title",
    "/create-listing/become-a-host/description",
    "/create-listing/become-a-host/upload-image",
    "/create-listing/become-a-host/price",
    "/create-listing/become-a-host/review",
  ];

  const landSizeStep = "/create-listing/become-a-host/land-size";
  const amenitiesStep = "/create-listing/become-a-host/animities";
  const floorPlanStep = "/create-listing/become-a-host/floor-plan";

  const type = featureType?.toLowerCase();

  if (type === "land") {
    return [
      ...baseSteps,
      "/create-listing/become-a-host/location",
      landSizeStep,
      ...sharedSteps.slice(1),
    ];
  }

  if (type === "rent" || type === "flat") {
    return [...baseSteps, amenitiesStep, floorPlanStep, ...sharedSteps];
  }

  return baseSteps;
};
