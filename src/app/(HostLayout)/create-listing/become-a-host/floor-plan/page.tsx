"use client";

import { useState } from "react";
import FloorPlanStep from "../../components/floorPlan/FloorPlanStep";

function FloorPlan() {
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [beds, setBeds] = useState(3);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(0);
  return (
    <div>
      <FloorPlanStep
        bedrooms={bedrooms}
        setBedrooms={setBedrooms}
        bathrooms={bathrooms}
        setBathrooms={setBathrooms}
        beds={beds}
        setBeds={setBeds}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        infants={infants}
        setInfants={setInfants}
      />
    </div>
  );
}

export default FloorPlan;
