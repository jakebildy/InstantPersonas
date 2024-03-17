import { useState, useEffect } from "react";

// Defining a hook for fetching and setting a base64 encoded image
export const useFetchBase64Image = (
  imageURL: string
): [string, boolean, any] => {
  const [base64, setBase64] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!imageURL) {
      console.log("No image URL provided 😭");
      return;
    }

    const fetchBase64 = async () => {
      setIsLoading(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/image-to-base64`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ src: imageURL }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBase64(data.base64);
      } catch (error) {
        console.error("Failed to fetch base64 image:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBase64();
  }, [imageURL]);

  return [base64, isLoading, error];
};
