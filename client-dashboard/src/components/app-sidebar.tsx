"use client"

import * as React from "react"
import { Users, PlusCircle } from "lucide-react"

import { useRouter } from "next/navigation"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Sajib Biswas",
    email: "sajib@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Add Service",
      url: "/dashboard/add-service",

      icon: PlusCircle,
      isActive: true,
      items: [],
    },
    {
      title: "Add Team Member",
      url: "/dashboard/add-team-member",
      icon: Users,
      items: [],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-2 items-start px-4 pb-4">
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
