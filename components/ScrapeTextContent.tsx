"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useScrapeLinks } from "@/providers/ScrapeLinksProvider";
import { useScrapeText } from "@/providers/ScrapeTextProvider";
import { CheckCheckIcon, Copy } from "lucide-react";

const ScrapeTextContent = () => {
  const { scrapedLinksData } = useScrapeLinks();
  const { scrapedText, loading, scrapeText } = useScrapeText();
  const [copyMessages, setCopyMessages] = useState<{ [key: number]: boolean }>(
    {}
  );

  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

  const handleLinkClick = (link: string) => {
    setSelectedLinks((prevSelectedLinks) =>
      prevSelectedLinks.includes(link)
        ? prevSelectedLinks.filter((selectedLink) => selectedLink !== link)
        : [...prevSelectedLinks, link]
    );
  };

  const handleScrapeTextClick = async () => {
    // console.log("Selected Links: ", selectedLinks);
    await scrapeText(selectedLinks);
  };

  const handleCopy = (id: number, content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopyMessages((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopyMessages((prev) => ({ ...prev, [id]: false }));
      }, 2000); // Clear message after 2 seconds
    });
  };

  return (
    <div>
      <div className="w-full flex justify-center border-y py-5 flex-col">
        <div className="flex justify-between items-center">
          <p className="font-medium text-base">
            Select from which options do you want to scrape text?
          </p>
          <Button
            className="font-bold text-md"
            onClick={handleScrapeTextClick}
            disabled={loading}
          >
            {loading ? "Scraping..." : "Scrape Text"}
          </Button>
        </div>
        <div>
          {scrapedLinksData.map((item, key) => (
            <div key={key} className="w-full my-5 flex flex-col">
              <p className="font-bold text-base mb-2 pl-2">
                Links from <span className="text-blue-600">{item.url}</span>
              </p>

              <ul className="flex flex-wrap">
                {item.links.map((link, key) => (
                  <li
                    key={key}
                    className={`py-2 m-2 px-4 border text-base rounded-md hover:bg-black/[0.1] ${
                      selectedLinks.includes(link.href) ? "bg-blue-100" : ""
                    }`}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.text === "" ? "Home" : link.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* <pre>{JSON.stringify(scrapedLinks, null, 2)}</pre> */}
        {scrapedText.map((item, key) => (
          <div
            key={key}
            className="bg-gray-300 flex flex-col rounded-md justify-center pb-3 mt-5 leading-8 relative"
          >
            <div className="h-12 bg-gray-900 rounded-t-md flex justify-between items-center pl-5 pr-3">
              <p className="text-white font-bold text-base">text</p>
              {copyMessages[key] ? (
                <button className="text-white px-2 py-1 rounded hover:text-black flex items-center">
                  <p className="text-md pr-2 font-bold">Copied to clipboard!</p>
                  <CheckCheckIcon />
                </button>
              ) : (
                <button
                  className="text-white px-2 py-1 rounded hover:text-black flex items-center"
                  onClick={() => handleCopy(key, item.textContent)}
                >
                  <p className="text-md pr-2 font-bold">Copy text</p>
                  <Copy />
                </button>
              )}
            </div>
            <p className="px-5 pt-3">{item.textContent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrapeTextContent;
