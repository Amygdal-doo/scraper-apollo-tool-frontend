"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { ChevronUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { CustomizeChatAIDialog } from "./CustomizeChatAIDialog";
import { useAuth } from "@/providers/AuthProvider";
import { ROUTES } from "@/core/const/routes.enum";
import Link from "next/link";

const AppSidebar = () => {
  const { logout, user } = useAuth();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link href={ROUTES.DASHBOARD}>
            <SidebarGroupLabel className="h-[8vh] text-xl bg-gray-300 px-5">
              Chat AI
            </SidebarGroupLabel>
          </Link>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* <SidebarMenuItem className="mt-2">
                <SidebarMenuButton className="text-lg font-bold">
             
                    <span>Scrape Extra Info</span>
          
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {user?.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>{user?.email}</span>
                </DropdownMenuItem>
                <CustomizeChatAIDialog />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
