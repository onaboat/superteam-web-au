export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export const PARTNERS: Partner[] = [
  {
    id: "solana",
    name: "Solana",
    logo: "/partners/solana.svg",
    url: "https://solana.com",
  },
  {
    id: "superteam",
    name: "Superteam",
    logo: "/partners/superteam.svg",
    url: "https://superteam.fun",
  },
  {
    id: "helius",
    name: "Helius",
    logo: "/partners/helius.svg",
    url: "https://helius.dev",
  },
  {
    id: "phantom",
    name: "Phantom",
    logo: "/partners/phantom.svg",
    url: "https://phantom.app",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    logo: "/partners/jupiter.svg",
    url: "https://jup.ag",
  },
  {
    id: "magic-eden",
    name: "Magic Eden",
    logo: "/partners/magic-eden.svg",
    url: "https://magiceden.io",
  },
];
