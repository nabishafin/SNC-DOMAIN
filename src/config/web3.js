import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, sepolia } from 'wagmi/chains';

// 1. Get projectId
// You can get a project ID at https://cloud.walletconnect.com
export const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'b56e467ecbd80293dbca037a508b981e';

// 2. Create wagmiConfig
const metadata = {
  name: 'ScandicFly Domains',
  description: 'Secure domain registration with SNC token payment',
  url: window.location.origin, // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const chains = [mainnet, sepolia];

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true, 
});
