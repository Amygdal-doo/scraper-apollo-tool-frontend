"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useScrapeLinks } from "@/providers/ScrapeLinksProvider";

// Zod schema for validation
const FormSchema = z.object({
  urls: z
    .array(z.string().url({ message: "Invalid URL format" }))
    .min(1, { message: "At least one URL is required" }),
});

// Infer the type from the schema
type FormSchemaType = z.infer<typeof FormSchema>;

export function ScrapeLinksForm() {
  const { toast } = useToast();
  const { scrapeLinks, loading } = useScrapeLinks();
  const [urlInput, setUrlInput] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      urls: [],
    },
  });

  const handleAddUrl = () => {
    const currentUrls = form.getValues("urls");

    // Validate URL format
    try {
      const parsedUrl = new URL(urlInput.trim());
      if (!parsedUrl) throw new Error();
    } catch {
      setError("Enter a valid URL");
      return;
    }

    // Check for duplicate URLs
    if (currentUrls.includes(urlInput.trim())) {
      setError("This URL has already been added");
      return;
    }

    // Add the URL and clear the input field and error
    const updatedUrls = [...currentUrls, urlInput.trim()];
    form.setValue("urls", updatedUrls);
    setUrlInput("");
    setError(null);
  };

  const handleDeleteUrl = (urlToDelete: string) => {
    const updatedUrls = form
      .getValues("urls")
      .filter((url) => url !== urlToDelete);
    form.setValue("urls", updatedUrls);
  };

  const onSubmit = async (data: FormSchemaType) => {
    // console.log("Submitted Data:", data);
    await scrapeLinks(data.urls);
    toast({
      title: "Success",
      description: "URLs submitted successfully!",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="urls"
          render={() => (
            <FormItem className="mt-2">
              <FormLabel>Enter URLs</FormLabel>
              <FormControl>
                <div>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="https://example.com"
                      value={urlInput}
                      onChange={(e) => {
                        setUrlInput(e.target.value);
                        setError(null); // Clear error on input change
                      }}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      className="font-bold text-md"
                      onClick={handleAddUrl}
                    >
                      Add URL
                    </Button>
                  </div>
                  {error && (
                    <p className="text-[0.8rem] font-medium text-destructive">
                      {error}
                    </p>
                  )}
                  <FormMessage />
                </div>
              </FormControl>
              {/* Display added URLs */}
              <div className="flex flex-wrap gap-2 mt-3">
                {form.getValues("urls").map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 border px-3 py-1 rounded-md bg-gray-200"
                  >
                    <span className="text-sm">{url}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteUrl(url)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </FormItem>
          )}
        />
        <div className="mt-8">
          <Button
            size="lg"
            className="w-full flex justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
            type="submit"
          >
            {loading ? "Scraping" : "Scrape"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
