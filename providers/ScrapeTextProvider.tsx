"use client";

import {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
} from "react";
import { AxiosResponse } from "axios";
import { apiService } from "../core/services/apiService"; // Ensure this is correctly configured to make API calls
import { useToast } from "@/hooks/use-toast";

// Interfaces for the scraped data
interface IScrapedLink {
  url: string;
  textContent: string;
}

interface IScrapeTextContext {
  scrapedText: IScrapedLink[];
  setScrapedText: (text: IScrapedLink[] | []) => void;
  loading: boolean;
  scrapeText: (urls: string[]) => Promise<void>;
}

// Create a context for the Scrape Text provider
const ScrapeTextContext = createContext<IScrapeTextContext | undefined>(
  undefined
);

// Define the ScrapeTextProvider component
export const ScrapeTextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [scrapedText, setScrapedText] = useState<IScrapedLink[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Function to scrape text from the given URLs
  const scrapeText = async (urls: string[]): Promise<void> => {
    setLoading(true);

    try {
      const response: AxiosResponse<IScrapedLink[]> = await apiService.put(
        `pages/scrape-text/multiple`,
        { urls }
      );

      if (response?.data) {
        setScrapedText(response.data); // Save the scraped data
        console.log("Scraped text response data", response.data);
      }
    } catch (error) {
      console.error("Error scraping text:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrapeTextContext.Provider
      value={{
        scrapedText,
        setScrapedText,
        loading,
        scrapeText,
      }}
    >
      {children}
    </ScrapeTextContext.Provider>
  );
};

// Custom hook to use the ScrapeTextContext
export const useScrapeText = (): IScrapeTextContext => {
  const context = useContext(ScrapeTextContext);
  if (!context) {
    throw new Error("useScrapeText must be used within a ScrapeTextProvider");
  }
  return context;
};
