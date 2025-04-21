// /components/Menu/app-sidebar.tsx

"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  TentTree,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Projeto Mais Vida",
    email: "site@projetomaisvida.com.br",
    avatar:
      "https://images.prismic.io/projetomaisvida/Z5JPe5bqstJ99yTn_icon.png?auto=format,compress",
  },
  teams: [
    {
      name: "Projeto Mais Vida",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Acampa Corpus Christi",
      url: "#",
      icon: TentTree,
      isActive: true,
      items: [
        {
          title: "Inscrições no Acampa",
          url: "/acampa-corpus-christi",
        },
        {
          title: "Graficos",
          url: "/acampa-corpus-christi/graficos",
        },
      ],
    },
    // {
    //   title: "Eventos",
    //   url: "#",
    //   icon: SquareTerminal,
    //   items: [
    //     {
    //       title: "Eventos",
    //       url: "/eventos",
    //     },
    //     {
    //       title: "Presença",
    //       url: "/eventos/inscricoes",
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "Perfil",
    //       url: "/perfil",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Formulario Acampa",
      url: "https://www.projetomaisvida.com.br/inscricoes-acampa1-corpus-christi",
      icon: Frame,
    },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
