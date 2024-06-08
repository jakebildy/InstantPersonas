import React from "react";
import { globeConfig, sampleArcs } from "@/lib/config/globe";
import dynamic from "next/dynamic";
const World = dynamic(
  () =>
    import("@/components/ui/aceternity/globe").then((module) => module.World),
  { ssr: false },
);

type Props = {};

export default function ClientGlobe({}: Props) {
  return <World data={sampleArcs} globeConfig={globeConfig} />;
}
