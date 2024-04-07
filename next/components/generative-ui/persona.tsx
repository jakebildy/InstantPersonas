"use client";

import React, { RefObject } from "react";
import UserPersona from "../persona";
import { generateTimestamp } from "@/lib/utils";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HexColorPicker } from "react-colorful";

const downloadImage = (elementRef: RefObject<HTMLElement>) => {
  const element = elementRef.current;
  if (!element) return console.error("😭 No element to print");
  const timeStamp = generateTimestamp();
  toPng(element, { cacheBust: true }).then(function (dataUrl: any) {
    download(dataUrl, "Persona-" + timeStamp + ".png");
  });
};

// An example of a persona component
//@ts-ignore
export function PersonaCard({ persona }) {
  const personaRef = React.useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = React.useState("#000000");
  const [showPicker, setShowPicker] = React.useState(false);

  return (
    <div>
      <h2 style={{ fontWeight: "bold" }}>{persona.productOrService}</h2>
      <div ref={personaRef}>
        <UserPersona
          name={persona.name}
          gender={persona.gender}
          pictureURL={persona.pictureURL}
          personalAttributes={persona.shortDescriptors}
          sections={persona.sections}
        />
      </div>
      <div className="flex flex-row pl-5 space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={() => setShowPicker(!showPicker)}
              className="rounded-md"
            >
              {"Change Colour"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => {
            const newPicture = `https://instantpersonas.com/profiles/${persona.gender.toLowerCase()}/${Math.ceil(
              Math.random() * 78
            )}.jpg`;

            // updatePicture(newPicture);
            // setPersona({
            //   ...persona,
            //   pictureURL: newPicture,
            // });
          }}
          className="rounded-md"
        >
          {"Change Picture"}
        </Button>
        <Button
          onClick={() => downloadImage(personaRef)}
          className="rounded-md"
        >
          {"Download Image"}
        </Button>
      </div>
    </div>
  );
}
