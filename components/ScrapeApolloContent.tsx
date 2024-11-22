"use client";
import { useScrapeApollo } from "@/providers/ScrapeApolloProvider";
import { Copy, TextSelectIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

const ScrapeApolloContent = () => {
  const { scrapedApolloData } = useScrapeApollo();
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  // Toggle selection of a single technology
  const handleTechnologyClick = (technology: string) => {
    setSelectedTechnologies((prevSelected) => {
      if (prevSelected.includes(technology)) {
        return prevSelected.filter((item) => item !== technology);
      }
      return [...prevSelected, technology];
    });
  };

  // Toggle selection of a single job
  const handleJobClick = (job: string) => {
    setSelectedJobs((prevSelected) => {
      if (prevSelected.includes(job)) {
        return prevSelected.filter((item) => item !== job);
      }
      return [...prevSelected, job];
    });
  };

  // Select all technologies
  const handleSelectAllTechnologies = () => {
    if (!scrapedApolloData) return;

    if (
      selectedTechnologies.length === scrapedApolloData.technology_names.length
    ) {
      setSelectedTechnologies([]); // Unselect all
    } else {
      setSelectedTechnologies([...scrapedApolloData.technology_names]);
    }
  };

  // Select all jobs
  const handleSelectAllJobs = () => {
    if (!scrapedApolloData) return;

    if (selectedJobs.length === scrapedApolloData.job_postings.length) {
      setSelectedJobs([]); // Unselect all
    } else {
      setSelectedJobs(scrapedApolloData.job_postings.map((job) => job.title));
    }
  };

  // Copy selected technologies to clipboard
  const handleCopyTechnologies = () => {
    if (selectedTechnologies.length > 0) {
      navigator.clipboard
        .writeText(selectedTechnologies.join(", "))
        .then(() => {});
    }
  };

  // Copy selected jobs to clipboard
  const handleCopyJobs = () => {
    if (selectedJobs.length > 0) {
      navigator.clipboard.writeText(selectedJobs.join(", ")).then(() => {});
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col">
        {scrapedApolloData && scrapedApolloData.technology_names.length > 0 && (
          <div className="w-full my-5 flex flex-col">
            <div className="flex justify-between">
              <p className="font-bold text-base mb-2 pl-2">Technologies</p>
              <div className="flex space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-transparent"
                      variant="outline"
                      size="icon"
                      onClick={handleSelectAllTechnologies}
                    >
                      <TextSelectIcon className="w-16 h-16" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {selectedTechnologies.length ===
                      scrapedApolloData.technology_names.length
                        ? "Unselect all"
                        : "Select all"}
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-transparent"
                      variant="outline"
                      size="icon"
                      onClick={handleCopyTechnologies}
                      disabled={selectedTechnologies.length === 0}
                    >
                      <Copy className="w-16 h-16" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy selected</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <ul className="flex flex-wrap">
              {scrapedApolloData?.technology_names.map((item, key) => (
                <li
                  key={key}
                  className={`py-2 m-2 px-4 border text-base rounded-md hover:bg-black/[0.1] ${
                    selectedTechnologies.includes(item) ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleTechnologyClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {scrapedApolloData && scrapedApolloData.job_postings.length > 0 && (
          <div className="w-full my-5 flex flex-col">
            <div className="flex justify-between">
              <p className="font-bold text-base mb-2">Jobs</p>
              <div className="flex space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-transparent"
                      variant="outline"
                      size="icon"
                      onClick={handleSelectAllJobs}
                    >
                      <TextSelectIcon className="w-16 h-16" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {selectedJobs.length ===
                      scrapedApolloData.job_postings.length
                        ? "Unselect all"
                        : "Select all"}
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-transparent"
                      variant="outline"
                      size="icon"
                      onClick={handleCopyJobs}
                      disabled={selectedJobs.length === 0}
                    >
                      <Copy className="w-16 h-16" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy selected</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <ul className="flex flex-wrap">
              {scrapedApolloData?.job_postings.map((item, key) => (
                <li
                  key={key}
                  className={`py-2 m-2 px-4 border text-base rounded-md hover:bg-black/[0.1] ${
                    selectedJobs.includes(item.title) ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleJobClick(item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ScrapeApolloContent;
