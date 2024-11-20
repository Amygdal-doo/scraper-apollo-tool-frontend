"use client";
import React from "react";
import { Button } from "./ui/button";
import { useChat } from "@/providers/ChatProvider";
import { useScrapeApollo } from "@/providers/ScrapeApolloProvider";
import { useScrapeLinks } from "@/providers/ScrapeLinksProvider";

const NewChatButton = () => {
  const { setHistory } = useChat();
  const { setScrapedApolloData } = useScrapeApollo();
  const { setScrapedLinksData } = useScrapeLinks();
  return (
    <Button
      onClick={() => {
        setHistory([]);
        setScrapedApolloData(null);
        setScrapedLinksData([]);
      }}
      size="lg"
      className="flex justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
    >
      New Chat
    </Button>
  );
};

export default NewChatButton;
