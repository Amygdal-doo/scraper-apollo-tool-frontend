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

// Define the response structure for the API
interface IScrapedApolloData {
  technology_names: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  job_postings: any[];
  stringified: string;
}

// Define the context structure
interface IScrapeApolloContext {
  scrapedApolloData: IScrapedApolloData | null;
  setScrapedApolloData: (data: IScrapedApolloData | null) => void;
  loading: boolean;
  fetchScrapedData: (domain: string) => Promise<void>;
}

// Create a context for the Scrape Apollo provider
const ScrapeApolloContext = createContext<IScrapeApolloContext | undefined>(
  undefined
);

// Define the ScrapeApolloProvider component
export const ScrapeApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  const [scrapedApolloData, setScrapedApolloData] =
    useState<IScrapedApolloData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Function to fetch scraped data using the GET request
  const fetchScrapedData = async (domain: string): Promise<void> => {
    setLoading(true);

    try {
      const response: AxiosResponse<IScrapedApolloData> = await apiService.get(
        `apollo/enrich-organization?domain=${domain}`
      );

      if (response?.data) {
        setScrapedApolloData(response.data); // Save the scraped data
        console.log("scraped apollo data response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching scraped apollo data:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem fetching the data.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrapeApolloContext.Provider
      value={{
        scrapedApolloData,
        setScrapedApolloData,
        loading,
        fetchScrapedData,
      }}
    >
      {children}
    </ScrapeApolloContext.Provider>
  );
};

// Custom hook to use the ScrapeApolloContext
export const useScrapeApollo = (): IScrapeApolloContext => {
  const context = useContext(ScrapeApolloContext);
  if (!context) {
    throw new Error(
      "useScrapeApollo must be used within a ScrapeApolloProvider"
    );
  }
  return context;
};
