import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrapeLinksForm } from "./ScrapeLinksForm";
import ScrapeTextContent from "./ScrapeTextContent";
import { ScrapeApolloForm } from "./ScrapeApolloForm";
import { useScrapeApollo } from "@/providers/ScrapeApolloProvider";

export function ScrapeOptions() {
  const { scrapedApolloData } = useScrapeApollo();
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold text-lg">
          Scrape Links
        </AccordionTrigger>
        <AccordionContent>
          <ScrapeLinksForm />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-bold text-lg">
          Scrape Text
        </AccordionTrigger>
        <AccordionContent>
          <ScrapeTextContent />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-bold text-lg">
          Scrape Apollo
        </AccordionTrigger>
        <AccordionContent>
          <ScrapeApolloForm />
          <div className="flex flex-col space-x-5">
            {scrapedApolloData &&
              scrapedApolloData.technology_names.length > 0 && (
                <div className="w-full my-5 flex flex-col">
                  <p className="font-bold text-base mb-2 pl-2">Technologies</p>

                  <ul className="flex flex-wrap">
                    {scrapedApolloData?.technology_names.map((item, key) => (
                      <li
                        key={key}
                        className={`py-2 m-2 px-4 border text-base rounded-md hover:bg-black/[0.1] 
                      }`}
                        onClick={() => {}}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {scrapedApolloData && scrapedApolloData.job_postings.length > 0 && (
              <div className="w-full my-5 flex flex-col">
                <p className="font-bold text-base mb-2 pl-2">Jobs</p>

                <ul className="flex flex-wrap">
                  {scrapedApolloData?.job_postings.map((item, key) => (
                    <li
                      key={key}
                      className={`py-2 m-2 px-4 border text-base rounded-md hover:bg-black/[0.1] 
                      }`}
                      onClick={() => {}}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
