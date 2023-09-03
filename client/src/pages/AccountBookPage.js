import { Grid } from '@mui/material';
import React from "react";
import UnderNavigationBar from "../components/UnderNavigationBar";
import UpperNavigationBar from "../components/UpperNavigationBar";
import "./AccountBookPage.css";

const AccountBookPage = ()=>{
    return(
        <Grid>
            <Grid className="uppernavbar">
                <UpperNavigationBar/>
            </Grid>

            <Grid className="body">
                this is AccountBookPage
            </Grid>
            
            <Grid className="undernavbar">
                <UnderNavigationBar/>
            </Grid>
        </Grid>
    )
}

export default AccountBookPage