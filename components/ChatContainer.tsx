import Markdown from "markdown-to-jsx";
import { ChatForm } from "./ChatForm";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useChat } from "@/providers/ChatProvider";
import { ScrapeOptions } from "./ScrapeOptions";

const ChatContainer = () => {
  const { history } = useChat();

  return (
    <div>
      <div className="w-full flex justify-center items-center border-y px-5 flex-col">
        {/* <pre>{JSON.stringify(scrapedData, null, 2)}</pre> */}

        <ScrollArea className="h-auto w-full max-w-2xl overflow-y-auto">
          <ScrapeOptions />
          <div className="py-5">
            {/* <pre>{JSON.stringify(history, null, 2)}</pre> */}
            {history?.map((message, index) => (
              <div
                key={index}
                className={` ${
                  message.role === "user"
                    ? "my-3"
                    : "flex flex-col rounded-md justify-center pt-5 leading-8 bg-gray-300"
                }`}
              >
                <div
                  className={` ${
                    message.role === "user" ? "font-medium" : "px-5 pb-5"
                  }`}
                >
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex h-[10vh] w-full items-center justify-center p-5">
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatContainer;
