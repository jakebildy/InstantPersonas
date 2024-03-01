import { useEffect, useState } from "react";
import { useBusiness } from "../../../contexts/BusinessContext";
import { Porters5Forces } from "../../../services/api.service";
import { cn, pascalCaseToNormalText } from "../../../lib/utilities";
import {
  IconAB2,
  IconArrowsShuffle2,
  IconDoorEnter,
  IconShoppingCartDollar,
  IconTruck,
} from "@tabler/icons-react";

export default function Porters5Forces({
  setChanges,
}: {
  setChanges: Function;
}) {
  const { selectedBusiness } = useBusiness();
  const [porters5Forces, setporters5Forces] = useState<
    ForceGridProps[] | null
  >();

  // When something changes, update the business object.
  useEffect(() => {
    if (selectedBusiness && selectedBusiness.porters5Forces) {
      const data = Object.keys(selectedBusiness.porters5Forces).map((key) => ({
        title: key,
        icon: getIconFor(key) as any, // Type assertion here
        color: getColorFor(key),
        value:
          (
            selectedBusiness.porters5Forces as unknown as {
              [key: string]: string;
            }
          )[key] || "", // Double Type assertion
        setValue: (title: string, newValue: string) =>
          setValue(title, newValue),
      }));

      setporters5Forces(data);
      setChanges(true);
      console.log("🔥🔥🔥🔥🔥5 Forces Analysis updated", porters5Forces);
    }
  }, []);

  useEffect(() => {
    console.log(porters5Forces);
  }, [porters5Forces]);

  if (!porters5Forces) {
    return null;
  }

  function getIconFor(key: string): React.FC | null {
    switch (key) {
      case "threatOfNewEntrants":
        return IconDoorEnter;
      case "bargainingPowerOfSuppliers":
        return IconTruck;
      case "bargainingPowerOfBuyers":
        return IconShoppingCartDollar;
      case "threatOfSubstitutes":
        return IconArrowsShuffle2;
      case "competitiveRivalry":
        return IconAB2;
      default:
        return null;
    }
  }

  function getColorFor(key: string) {
    switch (key) {
      case "threatOfNewEntrants":
        return "bg-[#064a81]";
      case "bargainingPowerOfSuppliers":
        return "bg-[#009a95]";
      case "bargainingPowerOfBuyers":
        return "bg-[#7cd100]";
      case "threatOfSubstitutes":
        return "bg-[#ffa500]";
      case "competitiveRivalry":
        return "bg-[#92006d]";
      default:
        return undefined;
    }
  }

  const setValue = (title: string, newValue: string) => {
    // 1. Update local state
    const updatedPorters5Forces = porters5Forces.map((force) =>
      force.title === title ? { ...force, value: newValue } : force
    );
    setporters5Forces(updatedPorters5Forces);

    // 2. Directly update `selectedBusiness.porters5Forces`
    if (
      selectedBusiness &&
      selectedBusiness.porters5Forces &&
      title in selectedBusiness.porters5Forces
    ) {
      // Type assertion to satisfy TypeScript
      (selectedBusiness.porters5Forces as unknown as { [key: string]: string })[
        title
      ] = newValue;
      setChanges(true);
    }
  };

  return (
    <div className="flex flex-wrap w-full justify-center">
      <h1 className="font-bold text-6xl my-6"> Porter's 5 Forces</h1>
      <div className="grid grid-cols-5 w-full justify-items-center h-fit  gap-4">
        {porters5Forces.map((force, index) => (
          <ForceGridCols {...force} setValue={setValue} key={index} />
        ))}
      </div>
    </div>
  );
}

type ForceGridProps = {
  title: string;
  icon: React.FC;
  color?: string;
  value: string;
  setValue: (title: string, newValue: string) => void;
};

const ForceGridCols = ({
  title,
  value,
  icon: Icon,
  color,
  setValue,
}: ForceGridProps) => {
  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-center my-2 relative">
        <div
          className={cn(
            "w-[100px] h-[100px] rounded-full bg-black relative shadow-md",
            color && color
          )}
        >
          <div className="absolute w-[100px] h-[100px] flex justify-center items-center text-white scale-150">
            <Icon />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-full text-center h-full ">
        <div className="font-semibold text-lg upper min-h-[75px] 2xl:min-h-[30px]">
          {pascalCaseToNormalText(title)}
        </div>
        <div className="bg-gray-50 rounded-md relative border border-gray-200 shadow-md self-stretch">
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-4 opacity-50",
              color && color
            )}
          />

          <textarea
            name=""
            id=""
            className="pt-8 px-4 text-left h-[500px] w-full scrollbar-hidden border-none bg-transparent"
            value={value}
            onChange={(e) => setValue(title, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
