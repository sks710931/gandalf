import { Button, Chip, IconButton, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Fragment, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { NFTContract } from "../connectors/address";
import abi from "../abi/abi.json";
import { formatUnits, parseUnits } from "@ethersproject/units";
interface Props {
  freeClaimed: boolean;
}
export const Buy = ({freeClaimed}: Props) => {
  const classes = UseStyle();
  const [value, setValue] = useState(1);
  const [salePrice, setSalePrice] = useState(0);
  const { account, library } = useWeb3React();

  const getSalePriceValue = () => {
    const price = value * salePrice;
    return price.toString();
  };
  const handleMint = async () => {
    if (account && library) {
      try {
        const signer = await library.getSigner();
        
          const contract = new Contract(NFTContract, abi, signer);
          let overRides = {
            value: parseUnits(getSalePriceValue(), "ether"),
          };
          const txResult = await contract.mint(value, overRides);
          await txResult.wait();
          alert(`${value} E.R.V Gandalf NFT's minted successfully!`);
        
      } catch (err: any) {
        console.log(err)
        if (err.error) {
          if (err.error.code === -32000) {
            alert("Insufficient Funds");
          } else {
            alert(err.error.message);
            console.log(err.code);
          }
        } else {
          if (err.error.code === 4001) {
            alert("User denied transaction signature.");
          } else alert("Transaction Error");
        }
      }
    }
  };
  const claimFreeMint = async () => {
    if (account && library) {
      try {
        const signer = await library.getSigner();
        
          const contract = new Contract(NFTContract, abi, signer);
          const txResult = await contract.mint(value);
          await txResult.wait();
          alert(`Free E.R.V Gandalf NFT's claimed successfully!`);
        
      } catch (err: any) {
        console.log(err)
        if (err.error) {
          if (err.error.code === -32000) {
            alert("Insufficient Funds");
          } else {
            alert(err.error.message);
            console.log(err.code);
          }
        } else {
          if (err.error.code === 4001) {
            alert("User denied transaction signature.");
          } else alert("Transaction Error");
        }
      }
    }
  };
  useEffect(() => {
    const getMints = async () => {
      console.log(library);
      const signer = await library?.getSigner();
      const contract = new Contract(NFTContract, abi, signer);
      const sp = await contract.salePrice(1);
      setSalePrice(Number(formatUnits(sp, "ether")));
    };
    if (account && library) {
      getMints();
    }
  }, [account, library]);
  const increment = () => {
    
      if (value < 10) {
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
        </span>
      </div>
      <div className={classes.title}>{freeClaimed ? "Click buy to mint your NFT." : "Click to claim your free NFT."}</div>
      {
        freeClaimed ? (
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
          }}
          variant="contained"
        >
          {" "}
          Mint E.R.V Gandalf NFT
        </Button>
      </div>
          </Fragment>
        ) : (
          <div
        style={{
          textAlign: "center",
          paddingTop: "24px",
          paddingBottom: "16px",
        }}
      >
        <Button
          onClick={() => claimFreeMint()}
          color="primary"
          sx={{
            fontSize: "12px",
            height: "36px",
            backgroundColor: "#000",
            borderRadius: "18px",
          }}
          variant="contained"
        >
          {" "}
          Claim Free NFT
        </Button>
      </div>
        )
      }
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
