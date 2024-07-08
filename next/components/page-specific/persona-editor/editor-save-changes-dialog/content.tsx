// "use client";
// import { Separator } from "@/components/ui/fcs/fcs-separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { SaveAll } from "lucide-react";
// import {
//   avatarVariants,
//   ButtonInnerHover,
//   ColorVariant,
//   gradientLightVariants,
//   textColorVariants,
// } from "@/components/variants";
// import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
// import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { cx, VariantProps } from "class-variance-authority";
// import {
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { PopupSection } from "@/components/popups/template/popup";
// import { GradientButton } from "@/components/ui/gradient-button";
// import { usePersonaChat } from "@/components/context/persona/chat-context";
// import { usePersonaEditor } from "@/components/context/persona/persona-editor-context";

// // Chat ID as Prop since parent handles null check
// export function EditorSaveChangesDialogContent({
//   archetypeChanges,
// }: {
//   archetypeChanges: {
//     [archetypeName: string]: PersonaArchetype;
//   };
// }) {
//   const { personas } = usePersonaChat();
//   const { unsavedPersonas, savePersona, saveAllPersonas } = usePersonaEditor();

//   const filteredPersonas = personas.filter((p) =>
//     unsavedPersonas.includes(p.archetype_name),
//   );

//   return (
//     <DialogContent className="w-full sm:max-w-[90vw]">
//       <DialogHeader>
//         <DialogTitle>Let&apos;s Save Those Changes!</DialogTitle>
//         <DialogDescription>
//           Please Select the Button Below to Save Your Changes
//         </DialogDescription>
//       </DialogHeader>
//       <div className="flex flex-col gap-10">
//         <PopupSection className="flex h-full gap-2 p-2">
//           {filteredPersonas.map((archetype: PersonaArchetype, i: number) => {
//             return (
//               <SavePersonaCard
//                 archetype={archetype}
//                 changedArchetype={archetypeChanges[archetype.archetype_name]}
//                 savePersona={savePersona}
//                 key={i}
//               />
//             );
//           })}
//         </PopupSection>
//         {/* Save All Changes Button */}
//         {unsavedPersonas.length > 1 ? (
//           <div className="flex flex-col">
//             <Separator text="Or Save All Changes" className="mb-4" />
//             <GradientButton
//               Icon={SaveAll}
//               variant="green"
//               onClick={() => saveAllPersonas()}
//             >
//               Save All Changes
//             </GradientButton>
//           </div>
//         ) : null}
//       </div>
//     </DialogContent>
//   );
// }

// function SavePersonaCard({
//   archetype,
//   changedArchetype,
//   savePersona,
// }: {
//   archetype: PersonaArchetype;
//   changedArchetype: PersonaArchetype;
//   savePersona: (name: string) => void;
// }) {
//   const variant = mapUrlBackgroundColorParamToVariant({
//     url: archetype.pictureURL,
//   });

//   return (
//     <div
//       className={gradientLightVariants({
//         variant,
//         className:
//           "group grid h-full flex-1 place-items-center rounded-2xl border border-gray-300 bg-gray-100 p-2 shadow-sm transition-all duration-500 ease-out hover:px-6 hover:shadow-lg",
//       })}
//     >
//       <div className="flex flex-1 flex-col items-center gap-1 transition-all duration-500 ease-out group-hover:scale-105">
//         <PersonaAvatar archetype={archetype} variant={variant} />
//         <span
//           className={textColorVariants({
//             variant,
//             className: "text-center font-jost text-sm font-semibold",
//           })}
//         >
//           {changedArchetype.archetype_name || archetype.archetype_name}
//         </span>
//         <SaveButton
//           variant={variant}
//           onClick={() => savePersona(archetype.id)}
//         />
//       </div>
//     </div>
//   );
// }

// function PersonaAvatar({
//   archetype,
//   variant,
// }: {
//   archetype: PersonaArchetype;
//   variant?: ColorVariant;
// }) {
//   const avatarColorVariant =
//     variant ||
//     mapUrlBackgroundColorParamToVariant({
//       url: archetype.pictureURL,
//     });

//   const avatarFallbackName = archetype.archetype_name
//     .split(" ")
//     .map((word) => word.charAt(0))
//     .join("");

//   return (
//     <Avatar
//       className={avatarVariants({ variant: avatarColorVariant, size: "sm" })}
//     >
//       <AvatarImage
//         src={archetype.pictureURL}
//         alt={[
//           archetype.archetype_name.toLocaleLowerCase(),
//           "persona avatar",
//         ].join(" ")}
//       />
//       <AvatarFallback>{avatarFallbackName}</AvatarFallback>
//     </Avatar>
//   );
// }

// function SaveButton({
//   variant,
//   onClick,
// }: {
//   variant: ColorVariant;
//   onClick: () => void;
// }) {
//   return (
//     <Button
//       variant="outline"
//       className="group h-fit w-fit rounded-full p-0.5 shadow-md hover:scale-100"
//       onClick={onClick}
//     >
//       <span
//         className={cx(
//           ButtonInnerHover({ variant }),
//           gradientLightVariants({
//             variant,
//             className: cn(
//               "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl p-1 px-2 text-xs",
//             ),
//           }),
//         )}
//       >
//         Click to Save
//       </span>
//     </Button>
//   );
// }
