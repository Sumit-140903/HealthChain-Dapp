import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { localhost, holesky } from "wagmi/chains";

const PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const config = getDefaultConfig({
  appName: "Health DApp",
  projectId: PROJECT_ID,
  chains: [localhost],
  ssr: true,
});
