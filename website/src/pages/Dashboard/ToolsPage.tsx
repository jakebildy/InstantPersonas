import Sidebar from "../../components/Sidebar";
import PromptArea from "../../components/Templates/ToolsPage/PromptArea/index.tsx";

export default function ToolsPage() {
  return (
    <>
      <Sidebar currentSelectedPage="Consulting Tools">
        <h1 className="my-10 text-3xl font-bold tracking-tight text-gray-900 text-center">
          Consulting Tools
        </h1>
        <PromptArea />
      </Sidebar>
    </>
  );
}
