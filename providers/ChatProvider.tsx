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
import { IMessage } from "@/core/interfaces/message.interface";
import { useToast } from "@/hooks/use-toast";

interface IChatContext {
  history: IMessage[];
  setHistory: (history: IMessage[]) => void;
  loading: boolean;
  sendMessage: (content: string) => Promise<void>;
}

const ChatContext = createContext<IChatContext | undefined>(undefined);

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [history, setHistory] = useState<IMessage[]>([]); // Stores all messages
  const [loading, setLoading] = useState<boolean>(false); // Handles loading state during message posting
  const { toast } = useToast();
  // Function to send a message
  const sendMessage = async (content: string) => {
    setLoading(true);

    // Prepare the initial message structure
    const newMessage: IMessage = { role: "user", content };

    try {
      // Send the user's message to the API
      const response: AxiosResponse = await apiService.put(`openai/chat`, {
        history: history, // Send the chat history
        message: newMessage, // Include the new message
      });

      const { history: updatedMessages } = response.data;

      setHistory(updatedMessages); // Set the messages from the response
    } catch (error) {
      console.error("Error sending message:", error);
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
    <ChatContext.Provider
      value={{
        history,
        setHistory,
        loading,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the ChatContext
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
