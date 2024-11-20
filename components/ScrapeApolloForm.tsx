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
import { useScrapeApollo } from "@/providers/ScrapeApolloProvider"; // Assuming you have a provider for scraping

// Zod schema for validation
const FormSchema = z.object({
  domain: z.string().url({ message: "Please enter a valid domain URL" }),
});

// Infer the type from the schema
type FormSchemaType = z.infer<typeof FormSchema>;

export function ScrapeApolloForm() {
  const { fetchScrapedData, loading } = useScrapeApollo(); // Custom hook from your provider
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      domain: "",
    },
  });

  async function onSubmit(data: FormSchemaType) {
    console.log("apollo link", data);
    await fetchScrapedData(data.domain); // Invoke scraping logic
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {/* Domain Input */}
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <div className="mt-8">
          <Button
            size="lg"
            className="w-full flex justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Scraping..." : "Scrape"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
