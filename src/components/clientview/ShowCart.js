import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import {useDispatch,useSelector} from 'react-redux';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {getData,postData,ServerURL}from '../FetchNodeSevices'
import {QtyCntrl} from './QtyCntrl'
// import {useDispatch , useSelector} from 'react-redux'



const useStyles = makeStyles((theme) => ({

    root:{
        display:'flex' ,
        // alignItems:'center',
        // justifyContent:'center'
    },
    maindiv:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },

  popover: {
    pointerEvents: 'none',
   
  },
  paper: {
    padding: theme.spacing(1),
    width:700,
    backgroundColor:'#FFFFFF',
    margin: '10px 10px 0px 10px'    
  },

  papercoupan: {
    padding: theme.spacing(1),
    width:400,
    backgroundColor:'#FFFFFF',
    padding:20  ,
    // marginLeft:50,
    margin: '10px 10px 0px 30px'

  },

  paperPayment: {
    padding: theme.spacing(1),
    width:400,
    backgroundColor:'#FFFFFF',
    padding:20 ,
    // marginLeft:30,
    margin: '10px 10px 0px 30px'
  },

}));



export default function ShowCart(props){
  
  const classes  = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getCount,setCount] = useState('');

  const dispatch = useDispatch()
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
   
                                                /// style={{display:'flex' , justifyContent:'flex-end'}} item xs={12} sm={6} is for 'starting content from the end'
    var savingtotal = cartdata.reduce(calculatesaving,0)

     function calculatesaving(a,b) {
      var price = b.price - b.offerprice ;
          price = price*b.qtydemand ;
      return  a+price ;
     }                                          
     
     
  const handleQtyChange=(value,item,key)=>{
    if(value==0)
    {
      item['qtydemand'] = 0      /// for Showing 'Number Of Quantity' like :-  X 1 , X 2 .....
    //   var list=getTopList 
    //   list[key]['cartstatus']=0 
    //   setTopList(list)
      dispatch({type:"Remove_item" , payload:[item.productid,item]}) //// "dispatch" means   "To send Data from hear to Container"
      setCount(value)   /// only for rendering..


    }
    else{
      item['qtydemand'] = value ;     
      dispatch({type:"Add Cart" , payload:[item.productid,item]}) 
      setCount(value)  /// only for rendering..
  
    }
     }

     const showCoupon=()=>{
       return(
         <div >
        <div className={classes.maindiv} style={{flexDirection:'column'}}>
              <div className={classes.papercoupan}>
                <div style={{fontSize:16}}>
                  <b>  Apply Coupon  </b>
                </div>

                <div style={{fontSize:14}}>
                  <a href="#"> Log </a> in to see best offers and cashback deals 
                </div>
              </div>

              <div className={classes.maindiv}>
              <div className={classes.paperPayment}>
                <div style={{fontSize:16}}>
                  <b> Payment Details </b>
                </div>

<div style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',flexDirection:'row',fontSize:14,padding:5}}>
                   <div style={{display:'flex',justifyContent:'flex-start',width:200}}>
                    M.R.P Total
                   </div> 

                   <div style={{display:'flex',justifyContent:'flex-end',width:200}}>
                   &#8377;    {total}
                   </div> 
                </div>

                <div style={{display:'flex',flexDirection:'row',fontSize:14,padding:5}}>
                   <div style={{display:'flex',justifyContent:'flex-start',width:200}}>
                    Product Discount
                   </div> 

                   <div style={{display:'flex',justifyContent:'flex-end',width:200}}>
                   &#8377;  {total}
                   </div> 
                </div>

                <div style={{display:'flex',flexDirection:'row',fontSize:14,padding:5}}>
                   <div style={{display:'flex',justifyContent:'flex-start',width:200}}>
                   Total Amount
                   </div> 

                   <div style={{display:'flex',justifyContent:'flex-end',width:200}}>
                &#8377;   {savingtotal}
                   </div> 
                </div>

                <div style={{display:'flex',flexDirection:'row',fontSize:14,padding:5}}>
                   <div style={{display:'flex',justifyContent:'flex-start',width:200}}>
                  &nbsp;
                   </div> 

                   <div style={{display:'flex',justifyContent:'flex-end',width:200}}>
               <b> <font color='green'>  You Save &#8377;{savingtotal}</font></b>
                   </div> 
                </div>
</div>
              </div>
              </div>
        </div>
        </div>
       )
     }

   
     const showCartData=()=>{

      return(
        <div className={classes.root}>   
            <div className={classes.maindiv}>
      <div className={classes.paper} >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
            <b>Order Summary( {length} item(s))</b>
        </Grid>
        <Grid style={{display:'flex' , justifyContent:'flex-end'}} item xs={12} sm={6}>
         <b><span> &#x20B9;</span>{total}</b>
        </Grid>
    

       {cartdata.map((item)=>(
         <>
            <Grid item xs={12} sm={4}>
                <img src={`${ServerURL}/images/${item.picture}`} width='60' height='60' />  
              </Grid>

              <Grid style={{display:'flex' , flexDirection:'column'}} item xs={12} sm={4}>
                 <div style={{padding:5}}> {item.productname} </div>
                 {item.offerprice!=0?(<div style={{padding:5}}><b><span> &#x20B9;</span> {item.offerprice*item.qtydemand}</b> <s>{item.price*item.qtydemand}</s>  <span><font color='#2ecc71'><strong> You save   </strong> &#x20B9; {(item.price-item.offerprice)*item.qtydemand}</font></span></div>):<b><span> &#x20B9;</span> {item.price}</b>}
              </Grid>
            
                  <Grid  style={{display:'flex' , justifyContent:'flex-end'}} item xs={4}  >
                      <QtyCntrl value={item.qtydemand} onChange={(value)=>handleQtyChange(value,item)}/> 
                 </Grid>

         </>
       ))}      

      </Grid>
      </div>
      </div>
      </div>
      )
    }

    
    return(
        <div>           
          <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                  {showCartData()}
              </Grid>

              <Grid item xs={12} sm={6}>
                  <Grid>
                      {showCoupon()}
                  </Grid>

                  <Grid>
                    
                  </Grid>
              </Grid>
            
         </Grid>     
                
         </div>
        
    )
}