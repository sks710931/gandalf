/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Chip, IconButton, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Fragment, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { erc20Address, NFTContract } from "../connectors/address";
import abi from "../abi/abi.json";
import erc20 from "../abi/erc20.json";
import { formatUnits, parseUnits } from "@ethersproject/units";
import {toast} from "react-toastify";
import { Web3Provider } from "@ethersproject/providers";
interface Props{
  price: number;
}
export const Buy = ({price}: Props) => {
  const classes = UseStyle();
  const [value, setValue] = useState(1);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const { account, library } = useWeb3React<Web3Provider>();

  const getSalePriceValue = () => {
    const mintPrice = parseUnits(Number(price*value).toString(), 18);
    return mintPrice.toString();
  };

  const handleMint = async () => {
    if (account && library) {
      try {
        const signer = await library.getSigner();
        let overrides = {
          value: getSalePriceValue()
        }
          const contract = new Contract(NFTContract, abi, signer);
          const txResult = await contract.mint(overrides);
          await txResult.wait();
          toast.success(`${value} Kishiburno NFT minted successfully!`);
      } catch (err: any) {
        console.log(err)
        if (err) {
          if (err.code === -32000) {
            toast("Insufficient Funds", {type:"error"});
          } else {
            toast.error(err.message);
            console.log(err.code);
          }
        } else {
          if (err.code === 4001) {
            toast.error("User denied transaction signature.");
          } else toast.error("Transaction Error");
        }
      }
    }
  };
  

  
  useEffect(() => {
    const getMints = async () => {
      const signer = await library?.getSigner();
      const contract = new Contract(NFTContract, abi, signer);
      console.log("Contract", contract);
      const addrInWhitelist = await contract.addressInWhitelist(account);
      setIsWhitelisted(addrInWhitelist);
      if(addrInWhitelist){
        toast("Whitelisted Address", {type:"success"})   
         }
    };
    if (account && library) {
      getMints();
    }
  }, [account, library]);
  const increment = () => {
    
      if (value < 1) {
        setValue((value) => value + 1);
      }
  };

  const decrement = () => {
    if (value > 1) {
      setValue((value) => value - 1);
    }
  };
  return (
    <>
      <div className={classes.title1}>
        <span>
          <b>Your Address : </b>
          {account}{" "}
          {
            isWhitelisted && <Chip color="success" label="whitelisted"/>
          }
        </span>
      </div>
      <div className={classes.title}>Click buy to mint your NFT.</div>
      
          <Fragment>
            <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: " 12px",
        }}
      >
        <div onClick={decrement}>
          <IconButton>
            <RemoveCircleOutlinedIcon />
          </IconButton>
        </div>
        <div style={{ fontSize: "22px", width: "60px", textAlign: "center" }}>
          {value}
        </div>
        <div onClick={increment}>
          <IconButton>
            <AddCircleOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          paddingTop: "24px",
          paddingBottom: "16px",
        }}
      >
        
        <Button
          onClick={() => handleMint()}
          color="primary"
          sx={{
            fontSize: "12px",
            height: "36px",
            backgroundColor: "#000",
            borderRadius: "18px",
            marginLeft: "8px"
          }}
          variant="contained"
        >
          {" "}
          Mint NFT
        </Button>
      </div>
          </Fragment>
        
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
    },
    title1: {
      paddingTop: "24px",
      fontWeight: "400",
      fontSize: "16px",
      textAlign: "center",
    },
  })
);
