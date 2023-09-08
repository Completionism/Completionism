import { Grid } from '@mui/material';
import React from "react";
import UnderNavigationBar from "../components/UnderNavigationBar";
import UpperNavigationBar from "../components/UpperNavigationBar";
import "./AccountBookPage.css";

const AccountBookPage = ()=>{
    const upper_navbar_name = "가계부"


    return(
        <Grid className='accountbook_page'>
            <Grid className="uppernavbar">
                <UpperNavigationBar props={upper_navbar_name}/>
            </Grid>

            <Grid className="progressive_bar">
            </Grid> 

            <Grid className = "upper_information_box" container>
            </Grid>


            <Grid className = "calander_container" container>
            </Grid>
            
            <Grid className="undernavbar">
                <UnderNavigationBar/>
            </Grid>
        </Grid>
    )
}

export default AccountBookPage