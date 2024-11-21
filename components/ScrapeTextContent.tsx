"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useScrapeLinks } from "@/providers/ScrapeLinksProvider";
import { useScrapeText } from "@/providers/ScrapeTextProvider";
import { Copy } from "lucide-react";

const text = [
  { id: 1, content: "text 1" },
  { id: 2, content: "2 text" },
  { id: 3, content: "3 text" },
];

const ScrapeTextContent = () => {
  const { scrapedLinksData } = useScrapeLinks();
  const { loading, scrapeText } = useScrapeText();
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
    console.log("Selected Links: ", selectedLinks);
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
            className="font-medium text-base"
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
        {text.map((item) => (
          <div
            key={item.id}
            className="bg-gray-300 flex flex-col rounded-md justify-center py-2 px-5 mt-5 leading-8 relative"
          >
            <p>{item.content}</p>
            <button
              className="absolute top-2 right-2 text-white px-2 py-1 rounded hover:text-black"
              onClick={() => handleCopy(item.id, item.content)}
            >
              <Copy />
            </button>
            {copyMessages[item.id] && (
              <span className="absolute top-12 right-2 text-green-600 text-sm">
                Copied to clipboard!
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrapeTextContent;
