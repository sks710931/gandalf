import { Button, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { Buy } from "./Buy";
import { Connect } from "./Connect";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useWeb3React } from "@web3-react/core";
import {NFTContract, rpc} from "../connectors/address";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import abi from "../abi/abi.json";
import { formatUnits } from "@ethersproject/units";
export const Salecard = () => {
  const [mints, setMints] = useState(0);
  const { account  } = useWeb3React<Web3Provider>();
  const [price, setPrice] = useState(0);

    useEffect(() => {
        const getMints = async () => {
          const provider = new JsonRpcProvider(rpc);
            const contract = new Contract(NFTContract, abi, provider );
            contract.on("CreateLeetoriNFT", async () => {
                const mint2 = await contract.totalSupply();
                setMints(Number(formatUnits(mint2, 0)));
            });
            const mint1 = await contract.totalSupply();
            const sp = await contract.salePrice(1);
            setPrice(Number(formatUnits(sp, "ether")));
            setMints(Number(formatUnits(mint1, 0)));
        }
            getMints();
        
    }, [])
  const classes = UseStyle();
  return (
    <div className={classes.main}>
      <div className={classes.title}>{mints} / 29</div>
      <div className={classes.address}>
        <Button
          className={classes.contractButton}
          variant="text"
          color="primary"
          endIcon={<OpenInNewIcon />}
          onClick={() => window.open(`https://etherscan.io/token/${NFTContract}`, "_blank")}
        >
          NFT Contract
        </Button>
      </div>
      <div className={classes.cost}>1 Leetori NFT costs {price} ETH.</div>

     {!account &&  <Connect />}
      {account && <Buy />}
    </div>
  );
};

const UseStyle = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      minHeight: "360px",
      boxShadow: "rgba(0, 0, 0, 0.75) 0px 5px 15px;",
    },
    title: {
      paddingTop: "32px",
      fontWeight: "600",
      fontSize: "48px",
      textAlign: "center",
    },
    address: {
      paddingTop: "24px",
      fontWeight: "400",
      fontSize: "16px",
      textAlign: "center",
      textTransform: "capitalize",
    },
    cost: {
      paddingTop: "24px",
      fontWeight: "600",
      fontSize: "18px",
      textAlign: "center",
    },
    contractButton: {
      textTransform: "capitalize !important" as any,
      color: "black",
    },
  })
);
