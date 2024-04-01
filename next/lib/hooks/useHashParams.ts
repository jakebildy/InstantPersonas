import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * A custom React hook for parsing the hash parameters from the URL.
 *
 * This hook extracts the hash fragment from the current URL, parses it into key-value pairs,
 * and returns these pairs as an object. It is designed to run once on component mount.
 * This is useful for single page applications (SPAs) where parameters are passed in the hash fragment.
 *
 * @return {HashParams} An object representing the parsed key-value pairs from the URL hash.
 */
export const useHashParams = (): HashParams => {
  // State for storing the parsed parameters
  const [params, setParams] = useState<HashParams>({});

  useEffect(() => {
    // This effect only runs once on component mount due to the empty dependency array.
    if (typeof window !== "undefined") {
      // Using 'slice' to remove the '#' and then parsing the hash into key-value pairs.
      const hash = window.location.hash.slice(1);

      const hashParams = hash.split("&").reduce<HashParams>((result, item) => {
        const [key, value] = item.split("=").map(decodeURIComponent);
        // Correctly handle space characters encoded as '+'
        result[key] = value?.replace(/\+/g, " ") ?? "";
        return result;
      }, {});

      setParams(hashParams); // Update the state with the parsed parameters
    }
  }, []);

  return params; // Return the parsed parameters
};

// TypeScript type for the hash parameters object
type HashParams = { [key: string]: string };
