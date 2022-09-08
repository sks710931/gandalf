
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
const RPC_URLS: { [chainId: number]: string } = {
    1: "https://mainnet.infura.io/v3/8f5f536cb9d54ee1afa38e2fa9fb258a",
    4: "https://rinkeby.infura.io/v3/8f5f536cb9d54ee1afa38e2fa9fb258a"
  }
export const walletconnect = new WalletConnectConnector({
    rpc: RPC_URLS,
    chainId: 1,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true
  })