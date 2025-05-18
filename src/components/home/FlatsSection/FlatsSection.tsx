"use client";
import { poppins } from "@/app/font";
import RentCard from "@/components/card/RentCard/RentCard";
import { IRent } from "@/types";
import SectionTitle from "@/utilits/SectionTitle";
import Link from "next/link";
interface Props {
  flats: IRent[];
}

const FlatsSection: React.FC<Props> = ({ flats }) => {
  // const [rents, setRents] = useState([]);
  // useEffect(() => {
  //   fetch("flatData.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRents(data);
  //     });
  // }, []);

  console.log("find flats data", flats);
  return (
    <div className="Container pt-8">
      <div>
        <SectionTitle
          title="Choose From Our Diverse Range of Flats"
          subTitle="From individual stays to family getaways, our properties cater to all your accommodation needs."
        />
      </div>

      <div className="mt-8 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {flats?.slice(0, 8).map((flat) => (
          <RentCard key={flat._id} rent={flat}></RentCard>
        ))}
      </div>

      <div className="flex items-center justify-center py-8 text-[#fff]">
        <Link href="/flat">
          <button
            className={`bg-primary px-6 py-3 rounded font-medium cursor-pointer  ${poppins.className}`}
          >
            Load more..
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FlatsSection;
