import React from 'react';
import { 
  LayoutDashboard, FolderOpen, Compass, Map, Wrench, FileStack, 
  BookOpen, GraduationCap, BarChart3, Settings, LogOut, ChevronLeft
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';

const mainItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'My Projects', url: '/projects', icon: FolderOpen },
  { title: 'Research Tracks', url: '/tracks', icon: Compass },
  { title: 'Stage Guide', url: '/stages', icon: Map },
];

const resourceItems = [
  { title: 'Tools', url: '/tools', icon: Wrench },
  { title: 'Templates', url: '/templates', icon: FileStack },
  { title: 'Glossary', url: '/glossary', icon: BookOpen },
  { title: 'Learning Center', url: '/learning', icon: GraduationCap },
];

const trackItems = [
  { title: 'Progress', url: '/progress', icon: BarChart3 },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === 'collapsed';
  const { logout } = useAuth();

  const renderItems = (items: typeof mainItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink to={item.url} end={item.url === '/'} className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="text-sm">{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-4">
        <div className="px-4 pb-4 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <Compass className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <span className="font-heading text-base font-semibold text-sidebar-foreground">ResearchPath</span>
            </div>
          )}
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground">
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 px-3">Main</SidebarGroupLabel>}
          <SidebarGroupContent>{renderItems(mainItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 px-3">Resources</SidebarGroupLabel>}
          <SidebarGroupContent>{renderItems(resourceItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 px-3">Account</SidebarGroupLabel>}
          <SidebarGroupContent>{renderItems(trackItems)}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <button onClick={logout} className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
