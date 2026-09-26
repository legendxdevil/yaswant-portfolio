export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  active: boolean;
  handle: string;
  actionText: string;
}

export const socialsData: SocialLink[] = [
  {
    id: "email",
    name: "Email",
    url: "mailto:yaswanthkumarsirimella@gmail.com",
    icon: "Mail",
    active: true,
    handle: "yaswanthkumarsirimella@gmail.com",
    actionText: "Send Direct Email"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yaswanthkumar-sirimella/",
    icon: "Linkedin",
    active: true,
    handle: "in/yaswanthkumar-sirimella",
    actionText: "Connect Professionally"
  },
  {
    id: "github",
    name: "GitHub Portfolio",
    url: "https://yaswanthkumaryadav.github.io/My-Portifolio/",
    icon: "Github",
    active: true,
    handle: "@yaswanthkumaryadav",
    actionText: "View Portfolio & Repos"
  }
];
