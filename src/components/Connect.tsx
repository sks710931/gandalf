import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Theme,
  Box,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import {  injectedConnector } from "../connectors/injected-connector";
import mm from "../assets/metamask.svg";
import wc from "../assets/wallet.svg"
import { walletconnect } from "../connectors/wallet-connect";
import {toast} from "react-toastify";
import { chainId } from "../connectors/address";
declare global{
  interface Window{
    ethereum: any;
  }
}
export const Connect = () => {
  const classes = UseStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [switchNet, setSwitchNet] = useState(false);
  const { activate, error, account, library} = useWeb3React();
  const handleMetamaskClick = async () => {
      const result = await activate(injectedConnector);
      console.log("dhjhff",result);
      setIsOpen(false);
  }

  const handleWalletConnectClick = async () => {
    await activate(walletconnect);
    setIsOpen(false);
}
useEffect(()=> {
  console.log(account)
  if(account && account !=="" && account.length > 0){
    toast(`Wallet connected! \n ${account}`,{type:"success"});
  }
}, [account]);

const switchNetwork = async () => {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: chainId }],
  });
}

useEffect(() => {
  if (error) {
    console.log(error)
    switch (error.name) {
      case "UnsupportedChainIdError":
        toast("Unsupported network, Switch to ethereum", {type: "error"})
        setSwitchNet(true);
        break;
      case "NoEthereumProviderError":
        toast("Please Install metamask.", {type:"error"})
        break;
      case "UserRejectedRequestError":
          toast("Connection request rejected.", { type: "warning"})
        break;
      default:
        
        break;
    }
  }
}, [error]);
  
  return (
    <>
      <div className={classes.title}>Connect to the Ethereum Network.</div>
      <div style={{ textAlign: "center", paddingTop: "24px" }}>
        {
          !switchNet ? (<Button
            sx={{
              borderRadius: 15,
              backgroundColor: "#000",
            }}
            onClick={() => setIsOpen(true)}
            color="primary"
            variant="contained"
          >
            Connect{" "}
          </Button>) : (<Button
          sx={{
            borderRadius: 15,
            backgroundColor: "#000",
          }}
          onClick={switchNetwork}
          color="primary"
          variant="contained"
        >
          Switch Network{" "}
        </Button>)
        }
      </div>
      <Dialog open={isOpen}>
        <DialogTitle>Select Wallet</DialogTitle>
        <Divider />
        <DialogContent className={classes.dlg}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              startIcon={<img src={mm} alt="Metamask" width={40} />}
              className={classes.btn}
              fullWidth
              variant="text"
              onClick={handleMetamaskClick}
            >
              Metamask
            </Button>
            <Button
              startIcon={<img src={wc} alt="Metamask" width={40} />}
              className={classes.btn}
              fullWidth
              variant="text"
              onClick={handleWalletConnectClick}
            >
              Wallet Connect
            </Button>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <div>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

const UseStyle = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      paddingTop: "24px",
      fontWeight: "400",
      fontSize: "16px",
      textAlign: "center",
      color: "#ffffff !important",
    },
    dlg: {
      width: 450,
      padding: 15,
    },
    btn: {
      color: "black !important" as any,
      fontSize: "22px !important" as any,
    },
  })
);


