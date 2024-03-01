import { useEffect, useState } from "react";
import { useBusiness } from "../../../contexts/BusinessContext";
import { ValueProposition } from "../../../services/api.service";

export default function ValueProposition({
  setChanges,
}: {
  setChanges: Function;
}) {
  const { selectedBusiness } = useBusiness();
  const [valueProposition, setValueProposition] =
    useState<ValueProposition | null>();

  // When something changes, update the business object.
  useEffect(() => {
    if (selectedBusiness) {
      setValueProposition(selectedBusiness.valueProposition);
      setChanges(true);
      console.log("🔥🔥🔥🔥🔥Value Proposition updated");
    }
  }, [selectedBusiness, valueProposition]);

  const updateValueProposition = (
    field: keyof ValueProposition,
    newValue: string
  ) => {
    // Directly update `selectedBusiness.valueProposition`
    if (selectedBusiness && selectedBusiness.valueProposition) {
      const updatedValueProposition = {
        ...valueProposition,
        [field]: newValue,
      };
      if (updatedValueProposition[field] !== undefined) {
        setValueProposition(updatedValueProposition as ValueProposition); // update local state
        selectedBusiness.valueProposition[field] = newValue; // update business context
        setChanges(true);
      }
    }
  };

  if (!valueProposition) {
    return null;
  }

  //! Change valueprop-rect to the new image, current has margin left in image
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 w-full my-10 place-items-center">
      <div className="w-[600px] h-[600px] relative grid place-items-center">
        <img src="/templates/valueprop-rect.svg" />

        <div className="absolute top-20 right-4">
          <TemplateInfoPanel
            title={"Gain Creators"}
            description={valueProposition.gainCreators}
            setValue={(newValue) =>
              updateValueProposition("gainCreators", newValue)
            }
          />
        </div>
        <div className="absolute top-1/3 left-4">
          <TemplateInfoPanel
            title={"Products & Services"}
            description={valueProposition.productsAndServices}
            setValue={(newValue) =>
              updateValueProposition("productsAndServices", newValue)
            }
          />
        </div>
        <div className="absolute bottom-16 right-4">
          <TemplateInfoPanel
            title={"Pain Relievers"}
            description={valueProposition.painRelievers}
            setValue={(newValue) =>
              updateValueProposition("painRelievers", newValue)
            }
          />
        </div>
      </div>
      <div className="w-[600px] h-[600px] relative grid place-items-center">
        <img src="/templates/valueprop-circle.svg" />
        <div className="absolute top-16 left-28">
          <TemplateInfoPanel
            title={"Customer Gains"}
            description={valueProposition.customerGains}
            setValue={(newValue) =>
              updateValueProposition("customerGains", newValue)
            }
          />
        </div>
        <div className="absolute top-1/3 right-10">
          <TemplateInfoPanel
            title={"Customer Jobs"}
            description={valueProposition.customerJobs}
            setValue={(newValue) =>
              updateValueProposition("customerJobs", newValue)
            }
          />
        </div>
        <div className="absolute bottom-14 left-28">
          <TemplateInfoPanel
            title={"Customer Pains"}
            description={valueProposition.customerPains}
            setValue={(newValue) =>
              updateValueProposition("customerPains", newValue)
            }
          />
        </div>
      </div>
    </div>
  );
}

const TemplateInfoPanel = ({
  title,
  description,
  setValue,
}: {
  title: string;
  description: string;
  setValue: (newValue: string) => void;
}) => {
  return (
    <div className="w-[200px] text-gray-100 font-semibold bg-black/25 p-4 rounded-lg">
      <div className="font-bold">{title}</div>
      <textarea
        className="text-xs text-left h-[150px] w-full resize-none scrollbar-hidden border-none rounded-md bg-transparent"
        value={description}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
