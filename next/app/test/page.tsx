"use client";

import { TemplateEditView } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-template-edit-view";
import React, { useEffect, useState } from "react";

type Props = {};

export default function PageTest({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen relative ">
      <TemplateEditView
        variant={"blue"}
        initialUrl={""}
        initialTitle={""}
        initialDescription={""}
        initialImage={""}
        selectedTemplate={"Instant Personas Blog"}
        setShowTemplateSelectModal={() => {}}
        setVariant={() => {}}
      />
    </div>
  );
}
