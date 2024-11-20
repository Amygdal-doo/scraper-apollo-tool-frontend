"use client";

import {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
} from "react";
import { AxiosResponse } from "axios";
import { apiService } from "../core/services/apiService";
import { useToast } from "@/hooks/use-toast";

// Interfaces for the scraped links data
interface ILink {
  text: string;
  href: string;
}

interface IScrapedData {
  url: string;
  links: ILink[];
}

interface IScrapeLinksContext {
  scrapedLinksData: IScrapedData[];
  setScrapedLinksData: (data: IScrapedData[] | []) => void;
  loading: boolean;
  scrapeLinks: (urls: string[]) => Promise<void>;
}

// Create a context for the Scrape Links provider
const ScrapeLinksContext = createContext<IScrapeLinksContext | undefined>(
  undefined
);

// Define the ScrapeLinksProvider component
export const ScrapeLinksProvider: FC<PropsWithChildren> = ({ children }) => {
  const [scrapedLinksData, setScrapedLinksData] = useState<IScrapedData[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Handles loading state
  const { toast } = useToast();

  // Function to scrape links from the given URLs
  const scrapeLinks = async (urls: string[]): Promise<void> => {
    setLoading(true);

    try {
      const response: AxiosResponse<IScrapedData[]> = await apiService.post(
        `pages/scrape-links/array`,
        { urls }
      );

      if (response?.data) {
        setScrapedLinksData(response.data); // Save the scraped links data
        console.log("scrape links response data", response.data);
      }
    } catch (error) {
      console.error("Error scraping links:", error);
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
    <ScrapeLinksContext.Provider
      value={{
        scrapedLinksData,
        setScrapedLinksData,
        loading,
        scrapeLinks,
      }}
    >
      {children}
    </ScrapeLinksContext.Provider>
  );
};

// Custom hook to use the ScrapeLinksContext
export const useScrapeLinks = (): IScrapeLinksContext => {
  const context = useContext(ScrapeLinksContext);
  if (!context) {
    throw new Error("useScrapeLinks must be used within a ScrapeLinksProvider");
  }
  return context;
};
