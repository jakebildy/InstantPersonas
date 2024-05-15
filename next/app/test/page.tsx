"use client";
import React, { useState } from "react";

import {
  mapUrlBackgroundColorParamToVariant,
  PersonaArchetype,
  PersonaAvatarPopover,
} from "@/components/page-specific/generative-ui/persona-avatar-popover";
import { GuestPostFinderTool } from "@/components/toolfolio/guest-post-finder";
import { PersonaSelectFromHistorySidebar } from "@/components/toolfolio/selected-personas/select-from-sidebar/persona-select-from-history-sidebar";

type Props = {};

export default function PageTest({}: Props) {
  const [openSubscriptionPopup, setOpenSubscriptionPopup] =
    React.useState(true);
  const [selectedPersonas, setSelectedPersonas] = useState<PersonaArchetype[]>(
    []
  );
  const [personaString, setPersonaString] = useState<string>("");

  return (
    <div className="flex flex-col items-center h-screen w-screen relative">
      <PersonaSelectFromHistorySidebar
        selectedPersonas={selectedPersonas}
        setSelectedPersonas={setSelectedPersonas}
        className="absolute top-4 right-4"
      />
      <h1 className="text-3xl text-gray-700 text-center pt-10 font-bold">
        Guest Post Opportunity Finder
      </h1>
      <h2 className="text-center mt-4 text-xs text-slate-400 mb-16">
        Writing Guest Posts is a great way to build backlinks and authority.
        <br />
        Find the best opportunities for your niche here.
      </h2>
      {selectedPersonas.map((persona, i) => (
        <PersonaAvatarPopover
          key={i}
          archetype={persona}
          size={"sm"}
          variant={mapUrlBackgroundColorParamToVariant({
            url: persona.pictureURL,
          })}
        />
      ))}
      {/* 
      {
        personas: selectedPersonas,
        details: personasString,
        paid: true

      } */}

      <div className="flex flex-col items-center w-full mb-10">
        {/* <label className="text-sm text-gray-700">Enter your persona:</label> */}
        <input
          type="text"
          className="border border-gray-300 rounded-md w-1/2 p-2"
          placeholder="e.g. a marketing manager"
          onChange={(e) => {
            setPersonaString(e.target.value);
          }}
          value={personaString}
        />
      </div>
      <GuestPostFinderTool input={personaString} isSubscribed={false} />
    </div>
  );
}
