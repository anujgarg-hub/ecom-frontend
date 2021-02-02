import React, { useEffect , useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import { getData , postData, ServerURL} from '../FetchNodeSevices';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {QtyCntrl} from './QtyCntrl'
import {useParams} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import Header   from './Header'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationCity from '@material-ui/icons/LocationCity';
import Footer from './Footer'
import { Divider } from '@material-ui/core';




const useStyles =   makeStyles((theme)=>({

    grow: {
        flexGrow: 1,
        backgroundColor:'#FFFFFF'
      },

      productpicturemedia:{
          display:'flex',
          width:'auto',
          height:'auto'
      },

      productpictureroot:{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          padding:2,
          width:120,
          height:'auto',
          margin:10
      }

}));


export default function ProductView(props){
    const classes  = useStyles();
    const [getList, setList] = React.useState(null)
    const [getListPictures, setListPictures] = React.useState([])
    

    const dispatch  = useDispatch()
    var cartitems=useSelector(state=>state.cart)
    const [getCount,setCount] = useState(cartitems.length);
    var params    =  useParams()                      ////use for fetching the value of parameters...

    const fetchProducts=async()=>{

        let body ={'productid':params.pid}
        let list = await postData ('product/displaybyid',body)
        setList(list[0])

    }

    const fetchProductPictures=async()=>{

        let body ={'productid':params.pid}
        let list = await postData ('productpicture/displaybyproductid',body)
        setListPictures(list)
    }

    useEffect(function(){

        fetchProducts();
        fetchProductPictures();
    },[])


    const addCart=(item)=>{
        item['qtydemand'] = 1      /// for Showing 'Number Of Quantity' like :-  X 1 , X 2 .....
        var list=getList 
        list['cartstatus']=1 
        setList(list)
        dispatch({type:"Add Cart" , payload:[item.productid,item]}) //// "dispatch" means   "To send Data from hear to Container"
        setCount(item.productid)   /// only for rendering..
        // setshowHideBtn(false)         /// for hiding add to cart button and showing +,- btn
        
    }
    
    const handleQtyChange=(value,item)=>{
      if(value==0)
      {
        item['qtydemand'] = value      /// for Showing 'Number Of Quantity' like :-  X 1 , X 2 .....
        var list=getList 
        list['cartstatus']=0 
        setList(list)
        dispatch({type:"Remove_item" , payload:[item.productid,item]}) //// "dispatch" means   "To send Data from hear to Container"
        setCount(value)   /// only for rendering..
  
  
      }
      else{
        item['qtydemand'] = value ;     
        dispatch({type:"Add Cart" , payload:[item.productid,item]}) 
        setCount(value)  /// only for rendering..
    
      }
       }
  



    const showProductPictures=()=>{
        // var colors =['#55efc4' , '#a29bfe','#ffeaa7' ,'#dfe6e9' ,'#fdcb6e'];
  
        return(
          getListPictures.map((item)=>{
            return(
              
                <div className={classes.productpictureroot} >
                  <img 
                    className={classes.productpicturemedia}
                    src={`${ServerURL}/images/${item.productpicture}`}
                    // variant='rounded'
                  />
                     
                </div>
                
              
            )
          })
        )
      }

      const showProduct=(item)=>{
        if(item!=null){
        console.log("mmmm",item)
             
      var save=item.price-item.offerprice ;
    return(
    
    <div style={{padding:5}}>
      <div style={{display:'flex',flexDirection:'column'}}>
  
          
          
        <div style={{fontSize:20,padding:5}}>
        <b>{item.productname.length>=40?(item.productname).toString().substring(0,20)+"...":item.productname}</b>
        </div>
        <div style={{fontSize:18,color:'#b2bec3',padding:5}}>
        {item.brandname} {item.modelname} 
        </div>
        <div style={{fontSize:20,padding:5}}>
          M.R.P <s><span>&#8377;</span> {item.price}</s>
        </div>
        <div style={{fontSize:20,padding:5}}>
   
        <b>Offer <span>&#8377;</span> {item.offerprice}</b>
        </div>  
        <div style={{fontSize:20,padding:5}}>
        <small><font color='#00b894' ><b>You Save <span>&#8377;</span> {save}</b></font> Inclusive of all taxes </small>
          
        </div>

        <div style={{fontSize:20,padding:5,color:''}}>
        <font color='#00b894' >
        {item.stock==0?<b>Not Availabe</b>:item.stock>=1 && item.stock<=3?<b>Limited Stock {item.stock} items Available </b>:<b>In Stock</b>}

        </font>
        </div>  
        <div style={{fontSize:20,padding:5}}>
         Inaugural Offer <b>Free Shipping</b>
         </div>

        <div>
      { item.cartstatus==0?(<Button style={{padding:5}} variant="contained" onClick={()=>addCart(item)} color="primary">
         Add to Cart
         </Button>):(<QtyCntrl value={1} onChange={(value)=>handleQtyChange(value,item)} />)}
        
        </div>
        <div style={{padding:15}}>
        <div style={{fontSize:16,paddingTop:15,paddingBottom:15}}>
          <b>Delivery</b>
        </div>
        <TextField
    className={classes.margin}
    id="input-with-icon-textfield"

    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <LocationCity />
        </InputAdornment>
      ),
     endAdornment:(
      <InputAdornment position="start">
        <div style={{fontSize:14,color:'red'}}>Check </div>
      </InputAdornment>
    ),
    }}
  />
  <div>
  Usually delivered in 2-3 days

  </div>
  <div>
  Enter pincode for exact delivery dates
  </div>
   
        </div>
   </div>
      
      
      
      </div>
  )
    
    
}
      }
   
      const showDescription=(item)=>{

        if(item!=null)
        {
        return(
          
              <div>

                   <Divider style={{marginLeft:40,marginRight:40}} />
                   <div style={{paddingLeft:40,fontSize:20}}><b>Description</b></div>
                   <div style={{paddingLeft:40,fontSize:16}}>{item.description}</div>

             </div>     
      )
    }
    }


    return(
        <div className={classes.grow}>
            <Header history={props.history}/>
            {/* {showProduct()} */}
            <Grid container >
                <Grid item xs={12} sm={6}>
                   <div style={{display:'flex',flexDirection:'row'}}>
                     <div style={{padding:5 , marginLeft:60 , width:'60%'}}>
                       <Carousel autoPlay shoArrows={true} infiniteLoop={true} showIndicators={true} showStatus={false} thumbWidth={60}>         
                           {showProductPictures()}
                           </Carousel>
                     </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      {showProduct(getList)}
                  </Grid>


            </Grid>
            {showDescription(getList)}
          <Footer/>
        </div>
    )
}