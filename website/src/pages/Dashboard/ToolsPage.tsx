import Sidebar from "../../components/Sidebar";
// import PromptArea from "../../components/Templates/ToolsPage/PromptArea/index.tsx";

export default function ToolsPage() {
  return (
    <>
      <Sidebar currentSelectedPage="Persona Creator">
        <h1 className="py-10 text-3xl font-bold tracking-tight text-gray-900 text-center">
          Persona Creator
        </h1>
        {/* <PromptArea /> */}
      </Sidebar>
    </>
  );
}
