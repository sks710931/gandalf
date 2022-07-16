import { Grid, Theme} from '@mui/material';
import {  makeStyles } from '@mui/styles';

import logo from '../assets/logo.png';
import icons from '../assets/icons.gif';
import { Salecard } from '../components/Salecard';
import bgImage from "../assets/bg.jpg";
export const Home = () => {
    const classes = UseStyle();
    return (
        <div className={classes.main}>
            <Grid container spacing={2}>
                <Grid item className="top" xs={12}>
                    <div className={classes.center}>
                        <img src={logo} alt="logo" className={classes.logo}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className={classes.center}>
                        <img src={icons} alt="logo" className={classes.icons}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Salecard />
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className={classes.center}>
                        <img src={icons} alt="logo" className={classes.iconsInvert}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.center}>
                        <div style={{color:"red"}} className={classes.footer}>Please make sure you are connected to the right network (Ethereum Mainnet) and the correct address. Please note: Once you make the purchase, you cannot undone the action.</div>
                        </div>
                </Grid>
            </Grid>
        </div>
    )
}

const UseStyle = makeStyles((theme: Theme) =>
   ({
        main: {
            width: '100%',
            minHeight: '100vh',
            background: `url(${bgImage}) center center`,
            objectFit: "contain",
            marginTop: 16
        },
        center: {
            width: '100%', textAlign: 'center'
        },
        logo: {
            width: '270px',
            height: '270px',
            borderRadius: '50%',
            marginTop: '48px',
            marginBottom: '40px',
            border: '1px solid #a47573',
            boxShadow: 'rgba(0, 0, 0, 0.75) 0px 5px 15px;'
        },
        icons: {
            maxWidth: '260px',
            height: 'auto',
            borderRadius: '50%',
            marginTop: '40px',
            border: '1px solid #a47573',
            backgroundColor:"white",
            boxShadow: 'rgba(0, 0, 0, 0.75) 0px 5px 15px;'
        },
        iconsInvert:{
            maxWidth: '260px',
            height: 'auto',
            borderRadius: '50%',
            marginTop: '40px',
            border: '1px solid #a47573',
            transform: "scaleX(-1)",
            backgroundColor:"white",
            boxShadow: 'rgba(0, 0, 0, 0.75) 0px 5px 15px;'
        },
        footer: {
            maxWidth: '840px',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '16px',
        }
    })
)