import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import {useDispatch,useSelector} from 'react-redux';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';




const useStyles = makeStyles((theme) => ({

  popover: {
    pointerEvents: 'none',
   
  },
  paper: {
    padding: theme.spacing(1),
    
    
  },

}));



export default function ShoppingCartIcon(props){
  
  const classes  = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
  setAnchorEl(event.currentTarget);
    };

  const handlePopoverClose = () => {
  setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
 
    var cart       = useSelector(state=>state.cart)   /// data is being fetched from container by useSelector
    var length     = Object.keys(cart).length ;      /// object.keys(cart) means the number of item in cart and length is for length of numbers.. 
    var cartdata   = Object.values(cart)           /// Object.values(cart) means the whole data of that item in cart
    var total      = cartdata.reduce(calculatetotal,0) // var total = cartdata.reduce((a,b)=>a+b.price,0) " a method for reduce func"
    
    function calculatetotal (a,b){
     var price = b.offerprice==0 ? (b.price*b.qtydemand) : (b.offerprice*b.qtydemand)
      return a+price ;
    }                                              
    // console.log('xxxxxx',total);
                                                /// style={{display:'flex' , justifyContent:'flex-end'}} item xs={12} sm={6} is for 'starting content from the end'
    var savingtotal = cartdata.reduce(calculatesaving,0)

     function calculatesaving(a,b) {
      var price = b.price - b.offerprice ;
          price = price*b.qtydemand ;
      return  a+price ;
     }                                 
     
     const handleClick=()=>{
       props.history.push({pathname:'/ShowCart'})
     }

     const showCartData=()=>{

      return(
      <div className={classes.paper} >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
            <b>Order Summary</b>
        </Grid>
        <Grid style={{display:'flex' , justifyContent:'flex-end'}} item xs={12} sm={6}>
         <b> {length} item(s)</b>
        </Grid>
    

       {cartdata.map((item)=>(
         <>
              <Grid item xs={12} sm={6}>
                  {item.productname}
              </Grid>
              <Grid style={{display:'flex' , justifyContent:'flex-end'}} item xs={12} sm={6}>  
             &#x20B9; {!item.offerprice==0 ? item.offerprice : item.price} X {item.qtydemand} 
              </Grid>

         </>
       ))}

            <Grid item xs={12}>  
             <span><b> Total :   &#x20B9; {total} </b></span>
              </Grid>
              {/* <Grid style={{display:'flex' , justifyContent:'flex-end'}} item xs={12} sm={6}>  
             &#x20B9; {total}  
              </Grid> */}

              <Grid item xs={12} sm={6}>  
               <span><font color='#2ecc71'><small> You save :  </small>  &#x20B9; {savingtotal}</font></span>
              </Grid>

              <Button color='primary' variant='contained'> 
                  Show Cart 
              </Button>
              


      </Grid>
      </div>
      )
    }

    return(
        <div>
            <IconButton aria-label="show 4 new mails" color="inherit" 
             aria-owns={open ? 'mouse-over-popover' : undefined}
             aria-haspopup="true"
             onMouseEnter={handlePopoverOpen}
             onMouseLeave={handlePopoverClose}
             onClick={()=>handleClick()}
             >
              
              <Badge badgeContent={length} color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>      
           {!length==0 ?
            <Popover
               id="mouse-over-popover"
               className={classes.popover}
        
               open={open}
               anchorEl={anchorEl}
               anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
             }}
              transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
             }}
             onClose={handlePopoverClose}
             disableRestoreFocus
      >
       {showCartData()}
      </Popover> : <div></div>}
            </div>

        
    )
}