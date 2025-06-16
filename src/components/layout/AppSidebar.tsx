
import {
  Calendar,
  Home,
  FileText,
  Play,
  BarChart3,
  User,
  Settings,
  Target,
  TrendingUp,
  Trophy,
  Briefcase
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Career Command Center",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Job Target Setup",
    url: "/setup",
    icon: Settings,
  },
  {
    title: "Skill Builder",
    url: "/practice",
    icon: Play,
  },
  {
    title: "Interview Simulator",
    url: "/mock",
    icon: Target,
  },
  {
    title: "Achievement Archive",
    url: "/history",
    icon: Calendar,
  },
  {
    title: "Performance Insights",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Career Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-blue-100">
      <SidebarHeader className="p-6 border-b border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Target className="h-8 w-8 text-blue-600" />
            <TrendingUp className="h-4 w-4 text-amber-500 absolute -top-1 -right-1" />
          </div>
          <div>
            <span className="font-bold text-xl text-blue-900">PrepMaster Pro</span>
            <p className="text-xs text-muted-foreground">Career Success Platform</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-blue-50/50 to-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-700 font-semibold">Career Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className="hover:bg-blue-50 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-800"
                  >
                    <Link to={item.url}>
                      <item.icon className="text-blue-600" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6 border-t border-blue-100">
        <div className="flex items-center space-x-2">
          <Trophy className="h-4 w-4 text-amber-500" />
          <div className="text-xs text-blue-700 font-medium">
            AI-Powered Career Success
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
