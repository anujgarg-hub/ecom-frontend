import React ,{ useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getData , postData, ServerURL} from '../FetchNodeSevices';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import {QtyCntrl} from './QtyCntrl'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import Header from './Header'




const useStyles = makeStyles((theme) => ({

  
    grow: {
      flexGrow: 1,
    },
         
      toproot: {
        // backgroundColor:'#81ecec',
        borderRadius:15,
        maxHeight:700,
        padding:8,
        width:180,
        height:350,
        margin:20,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        border:'1px solid #dcdde1'
      },
  
  
      media: {
        height: 120,
        width: 120
      },
  
      cardview:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'center',
      },
             
  
  }));
  

export default function ViewListofProducts(props)
{
    const classes = useStyles();
    const [getList , setList] = useState([]);
    const [getCount,setCount] = useState();

    const dispatch = useDispatch();
    const params   = useParams();                          ////use for fetching the value of parameters...

    const fetchProducts=async()=>{
        // alert(params.cid)
        let body  = {'categoryid':params.cid}
        let list  =await postData('product/productslistbycategory',body)
        setList(list)
      }

      useEffect(function(){
        fetchProducts()
    },[])

   

    const showProducts=()=>{
        return(
                getList.map((item,key)=>{       
                  var save  = item.price - item.offerprice ;      
  
        return(
          <div>
            
          <div className={classes.toproot} style={{display:'flex',flexDirection:'column'}} >
          
            <Avatar
              className={classes.media}
              src={`${ServerURL}/images/${item.picture}`}
              alt={item.productname} variant='rounded'
              
            />
            
            <div  style={{marginTop:20 }}>
             <b> {item.productname} </b>
            </div>
            <div>
               M.R.P. <s><span> &#8377; </span> {item.price}</s>
            </div>
            <div>
              Offer Price : <span> &#8377; </span><b>{item.offerprice}</b>
            </div>
            <small>
              <font color='green'><b> Save : <span> &#8377; </span>{save}</b></font>
            </small>
            <div>
               { item.cartstatus==0?(<Button variant='contained' color='primary' onClick={()=>addCart(item,key)} >
                       Add to Cart
                </Button>):(<QtyCntrl onChange={(value)=>handleQtyChange(value,item,key)} />) }      
            </div>
            
         </div>
               
        </div>
        )
      })
        )
      }

      
    const addCart=(item,key)=>{
        item['qtydemand'] = 1      /// for Showing 'Number Of Quantity' like :-  X 1 , X 2 .....
        var list=getList 
        list[key]['cartstatus']=1 
        setList(list)
        dispatch({type:"Add Cart" , payload:[item.productid,item]}) //// "dispatch" means   "To send Data from hear to Container"
        setCount(item.productid)   /// only for rendering..
        // setshowHideBtn(false)         /// for hiding add to cart button and showing +,- btn
        
    }
    
    const handleQtyChange=(value,item,key)=>{
      if(value==0)
      {
        item['qtydemand'] = 0      /// for Showing 'Number Of Quantity' like :-  X 1 , X 2 .....
        var list=getList 
        list[key]['cartstatus']=0 
        setList(list)
        dispatch({type:"Remove_item" , payload:[item.productid,item]}) //// "dispatch" means   "To send Data from hear to Container"
        setCount(list)   /// only for rendering..
  
  
      }
      else{
        item['qtydemand'] = value ;     
        dispatch({type:"Add Cart" , payload:[item.productid,item]}) 
        setCount(item.productid)  /// only for rendering..
    
      }
       }
  

    return(
        <div>
          <Header/>
            <div className={classes.cardview}>
            {showProducts()} 
        </div>
       </div>
    )
}