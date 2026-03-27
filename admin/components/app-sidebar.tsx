"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Settings, Van, GalleryHorizontalEnd } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function AppSidebar() {
  const pathName = usePathname();
  const result = pathName.replaceAll("/", "");
  const test = [
    {
      id: 1,
      logo: <GalleryHorizontalEnd />,
      name: "Food Menu",
    },
    {
      id: 2,
      logo: <Van />,
      name: "Order",
    },
    {
      id: 3,
      logo: <Settings />,
      name: "Settings",
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="flex py-9 flex-col items-center">
        <div className="flex gap-2 items-center">
          <img src="/logo.png" alt="" className="w-12 h-10" />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">BatBat </h1>
            <p className="text-[#71717A] text-ms ">Swift delivery</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-6 items-center">
          {test.map((e) => {
            const lower = e.name.toLowerCase().replaceAll(" ", "-");
            const isOn = lower == result;
            return (
              <Link key={e.id} href={`/${lower}`}>
                <Button
                  className="h-10 text-lg hover:border-[#9f9f9f] flex justify-start rounded-full p-4 w-40 hover:border-2"
                  variant={`${isOn ? `default` : `ghost`}`}
                >
                  {e.logo}
                  {e.name}
                </Button>
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
