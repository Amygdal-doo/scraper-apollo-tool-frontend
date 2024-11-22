import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrapeLinksForm } from "./ScrapeLinksForm";
import ScrapeTextContent from "./ScrapeTextContent";
import { ScrapeApolloForm } from "./ScrapeApolloForm";
import ScrapeApolloContent from "./ScrapeApolloContent";

export function ScrapeOptions() {
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
          <ScrapeApolloContent />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
