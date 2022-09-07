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
import React, { useState } from "react";
import {  injectedConnector } from "../connectors/injected-connector";
import mm from "../assets/metamask.svg";
export const Connect = () => {
  const classes = UseStyle();
  const [isOpen, setIsOpen] = useState(false);
  const { activate} = useWeb3React();
  const handleMetamaskClick = async () => {
      await activate(injectedConnector);
      setIsOpen(false);
  }
  
  return (
    <>
      <div className={classes.title}>Connect to the Ethereum Network.</div>
      <div style={{ textAlign: "center", paddingTop: "24px" }}>
        <Button
          sx={{
            borderRadius: 15,
            backgroundColor: "#000",
          }}
          onClick={() => setIsOpen(true)}
          color="primary"
          variant="contained"
        >
          Connect{" "}
        </Button>
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


