export interface JoinButton {
  id: string;
  label: string;
  href: string;
  external: boolean;
}

export const JOIN_CTA = {
  headline: "Ready to join",
  subheadline: "Everything you need to know about Superteam Australia.",
  buttons: [
    {
      id: "get-involved",
      label: "Get Involved",
      href: "/get-involved",
      external: false,
    },
    {
      id: "telegram",
      label: "Join Telegram",
      href: "https://t.me/SuperteamAU",
      external: true,
    },
    {
      id: "twitter",
      label: "Follow on X",
      href: "https://x.com/SuperteamAU",
      external: true,
    },
  ] satisfies JoinButton[],
} as const;
