export type TBanner = {
  _id: string;
  bannerImage: string;
  createdAt: string;
  updatedAt: string;
};


export type TAmenity = {
  _id: string;
  amenitiesLabel: string;
  amenitiesImage: string;
};

export type TFloorPlan = {
  bedRoomCount: number;
  bathCount: string;
  bedCount: number;
  guestCount: number;
};

export type TRoomDetails = {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  amenities: TAmenity[];
  floorPlan: TFloorPlan;
  price: number;
  location: string;
};
