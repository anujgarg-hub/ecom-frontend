import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Header from './Header'


const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
      <>
      <Header />

    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} >
          <Paper className={classes.paper} style={{margin:'4% 4% 1% 4%',borderRadius:15}} elevation={0} >
          <Grid container spacing={0} >
                  <Grid item xs={12} sm={6}  style={{display:'flex',justifyContent:'space-between',overflow:'hidden',marginTop:0}}>
                       <img src="/images/banner.jpg"  />
                  </Grid>
                  <Grid item xs={12} sm={6} >
                        <Typography variant="h4" style={{textAlign:'left',color:'black',marginTop: 43,
                             marginLeft: 53}}>
                                Sign in
                        </Typography>
                        <p style={{textAlign:'left',marginLeft: 56}} > Sign in to access your Orders, Offers and Wishlist. </p>

                        <input type="text" placeholder="Enter your mobile no." style={{padding: '9px 0 9px 3rem',marginTop:30,width: 'calc(70% + 3.1rem)',marginLeft: 40}}/>
                        
                        <button style={{backgroundColor:'#0984e3',width:50,height:50,borderRadius:30,marginTop:20,fontSize:34,color:'#fff'}}>  </button>

                  </Grid>
                 
            </Grid>
          </Paper>
          <div><center><small> By continuing you agree to our <font color="red">Terms of service</font><br/>
and  <font color="red">Privacy & Legal Policy.</font></small></center></div>
        </Grid>
      </Grid>
    </div>
    </>
  )
}   

    // margin: 0;
    // width: calc(100% - 3.5rem)