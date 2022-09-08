import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect } from "./connectors/use-eager-connector";
import { Home } from "./pages/Home";
import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
function App() {
  useEagerConnect();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastContainer />
      <Home />
    </Web3ReactProvider>
  );
}

export default App;
