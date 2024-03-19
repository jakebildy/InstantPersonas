import { useLocation } from "react-router-dom";

export default function useGetPersonaPathId() {
  const location = useLocation();

  const pathSegments = location.pathname.split("/");
  // Checks if the path follows the exact structure ["", "persona", id]
  const id: string | undefined =
    pathSegments.length === 3 && pathSegments[1] === "persona"
      ? pathSegments[2]
      : undefined;

  return { id };
}
