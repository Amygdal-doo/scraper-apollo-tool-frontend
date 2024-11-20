import AppSidebar from "@/components/AppSidebar";
import NewChatButton from "@/components/NewChatButton";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrapeApolloProvider } from "@/providers/ScrapeApolloProvider";
import { ScrapeLinksProvider } from "@/providers/ScrapeLinksProvider";
import { ScrapeTextProvider } from "@/providers/ScrapeTextProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrapeLinksProvider>
      <ScrapeTextProvider>
        <ScrapeApolloProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <div className="flex h-[10vh] w-full items-center justify-between p-6">
                <SidebarTrigger />
                <div className="flex space-x-5">
                  <NewChatButton />
                </div>
              </div>
              {children}
            </main>
          </SidebarProvider>
        </ScrapeApolloProvider>
      </ScrapeTextProvider>
    </ScrapeLinksProvider>
  );
}
