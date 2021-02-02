import React ,{useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
import { useEffect } from 'react';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import { getData , postData, ServerURL} from '../FetchNodeSevices';
// import NavigationBar from './NavigationBar' 
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {useDispatch} from 'react-redux'
import {QtyCntrl} from './QtyCntrl'
import ViewListofProducts from './ViewListofProducts';
import Header from './Header'
import Footer from './Footer'





const useStyles = makeStyles((theme) => ({

  
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  titlemenu: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

    mainmenu:{
        display:'flex',
        flexDirection:'row',
        // marginRight:100
    },
    
    mainmenuitems:{
        marginRight:25
    },

    cardroot: {
      // backgroundColor:'#81ecec',
      borderRadius:15,
      maxHeight:400,
      padding:8,
      width:200,
      height:220,
      margin:20,
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
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

    scardview:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
    },
    
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1500,
      height: 800,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  

   

}));

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}



export default function FirstPage(props) {


  const classes = useStyles();

  const [getCount,setCount] = useState();


  const dispatch = useDispatch()

  var settings = {
    autoPlay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };




  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  //////////////// For Main Menu Implementation..
    const [getList , setList] = useState([]);
    const [getBrandList , setBrandList] = useState([]);
    const [getListBrandAd , setListBrandAd] = useState([]);
    const [getTopList , setTopList] = useState([]);
    const [getListTopbrands , setListTopbrands] = useState([]);
    const [getListNewbrands , setListNewbrands] = useState([]);
    const [getCategoryAd , setCategoryAd] = useState([]);
    const [anchorMM , setAnchorMM]  = useState(null)

    const fetchBrands=async(categoryid)=>{
      let body  = {'categoryid':categoryid}
      let list  =await postData('brand/fetchBrandsforMainMenu',body)
      setBrandList(list)
    }

    const displayBrandsMM=()=>{
        return(
          getBrandList.map((item,key)=>{
            return(
              <MenuItem onClick={handleClose}>
                {item.brandname}
              </MenuItem> 
             
            )
          })
        )
    }
    const handleClose=()=>{
      setAnchorMM(null)
    }

     const handleClick=(event)=>{
      
      fetchBrands(event.currentTarget.value)
      setAnchorMM(event.currentTarget)
    
     }

    const fetchData=async()=>{
        let list =await getData('category/fetchCategory');
        setList(list);
    }

    const DisplayMainMenu=()=>{
        return(
            getList.map((item,key)=>{
                return(
                    <div className={classes.mainmenuitems}>
                        
                       <Button aria-controls="simple menu" aria-haspopup="true" value={item.categoryid} onClick={(event)=>handleClick(event)}> {item.categoryname} </Button>
                    
                       
                    </div>    
                )
            }   
            )
        )        
    }

    useEffect(function(){
        fetchData()
        fetchDataAd()
        fetchTopProducts()
        fetchBrandAd()
        fetchTopbrands()
        fetchNewbrands()
    },[])

   

    const fetchDataAd=async()=>{
      let list =await getData('category/fetchCategorybystatus');
      setCategoryAd(list);

    }

    const fetchTopbrands=async()=>{
      let list  = await getData('brand/displaytopbrands');
      setListTopbrands(list)
    }


    const fetchNewbrands=async()=>{
      let list  = await getData('brand/displaynewbrands');
      setListNewbrands(list)
    }

    const  handleShowProducts=(categoryid)=>{
        // alert(categoryid)
       // props.ChangeView(1,{categoryid:categoryid}) this was for container based programming
       props.history.push({pathname:`/viewlistofproducts/${categoryid}`})
      } 

      const handleProduct=(productid)=>{

        props.history.push({pathname:`/ProductView/${productid}`})
  
      }


    const showNewBrands=()=>{
      var colors =['#55efc4' , '#a29bfe','#ffeaa7' ,'#dfe6e9' ,'#fdcb6e'];

      return(
        getListNewbrands.map((item)=>{
          return(
            <div>
              <div className={classes.toproot} style={{display:'flex' , flexDirection:'column' ,  backgroundColor:colors[Math.floor(Math.random()*4)]}}>
                <Avatar 
                  className={classes.media}
                  src={`${ServerURL}/images/${item.picture}`}
                  alt={item.brandname} variant='rounded'
                />
                    <div> <h4>{item.brandname}</h4> </div>
              </div>
              
            </div>
          )
        })
      )
    }

    const showTopBrands=()=>{
      var colors =['#55efc4' , '#a29bfe','#ffeaa7' ,'#dfe6e9' ,'#fdcb6e'];

      return(
        getListTopbrands.map((item)=>{
          return(
            <div>
              <div className={classes.toproot} style={{display:'flex' , flexDirection:'column',  backgroundColor:colors[Math.floor(Math.random()*4)]}} >
                <Avatar 
                  className={classes.media}
                  src={`${ServerURL}/images/${item.picture}`}
                  alt={item.brandname} variant='rounded'
                />
                    <div> <h4>{item.brandname}</h4> </div>
              </div>
              
            </div>
          )
        })
      )
    }

    const showCategoryDiv=()=>{
      var colors =['#55efc4' , '#a29bfe','#ffeaa7' ,'#dfe6e9' ,'#fdcb6e','#ff7979','#6ab04c'];
      return(
              getCategoryAd.map((item,key)=>{              
      return(
        <div onClick={()=>handleShowProducts(item.categoryid)}>
        <div className={classes.cardroot} style={{backgroundColor:`${colors[Math.floor((Math.random()*7))]}`}}>
        
          <Avatar
            className={classes.media}
            src={`${ServerURL}/images/${item.icon}`}
            alt={item.categoryname} variant='rounded'
            
          />
                
       </div>
       <div align='center'>
            {item.categoryname}
          </div>
      </div>
      )
    })
      )
    }


    const showTopProductsDiv=()=>{
      return(
              getTopList.map((item,key)=>{       
                var save  = item.price - item.offerprice ;      

      return(
        <div>
        <div className={classes.toproot} style={{display:'flex',flexDirection:'column'}} >
        
          <Avatar
            className={classes.media}
            src={`${ServerURL}/images/${item.picture}`}
            alt={item.productname} variant='rounded'
            onClick={()=>handleProduct(item.productid)}
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
              </Button>):(<QtyCntrl value={1} onChange={(value)=>handleQtyChange(value,item,key)} />) }      
          </div>
          
       </div>
             
      </div>
      )
    })
      )
    }
        //// onChange is the 'Event' made by us for using as props in QtyCntrl component////



    const carousel=()=>{
      
        return(
          getCategoryAd.map((item)=>{
            return(
             
               
                  <div>
                    <img src={`${ServerURL}/images/${item.ad}`} width='500' height='200'/>
                  </div>
               
         
            )
          })
        )

        //  <Carousel showArrows={true} autoPlay={true} showThumbs={false}>

           

           

           
                {/* <div>
                    <img src={`${ServerURL}/images/carosal4.jpg`} />
                   
                </div>
                <div>
                    <img src={`${ServerURL}/images/carosal5.jpg`} />
                </div>
                <div>
                    <img src={`${ServerURL}/images/carosal4.jpg`} />
                </div>
                <div>
                    <img src={`${ServerURL}/images/carosal5.jpg`} />
                </div> */}
            // </Carousel>

       
    }


    ////////////////////////////

    const fetchTopProducts=async()=>{

      let list  = await getData('product/displayalltopproducts')
      setTopList(list)
    }

    const fetchBrandAd=async()=>{
      let list  = await getData('brand/displayallbrandsAd');
      setListBrandAd(list)
    }



    const BrandADlist=()=>{
      return( 
      <div className={classes.root}>
      <GridList cellHeight={400} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        </GridListTile>
        {getListBrandAd.map((tile) => (
          <GridListTile key={tile.img}>
            <img src= {`${ServerURL}/images/${tile.ad}`} />
          </GridListTile>
        ))}
      </GridList>
    </div>
      );
    }

    
    const addCart=(item,key)=>{
      item['qtydemand'] = 1      /// for Showing 'Number Of Quantity' like :-  X 1 , X 2 .....
      var list=getTopList 
      list[key]['cartstatus']=1 
      setTopList(list)
      dispatch({type:"Add Cart" , payload:[item.productid,item]}) //// "dispatch" means   "To send Data from hear to Container"
      setCount(item.productid)   /// only for rendering..
      // setshowHideBtn(false)         /// for hiding add to cart button and showing +,- btn
      
  }
  
  const handleQtyChange=(value,item,key)=>{
    if(value==0)
    {
      item['qtydemand'] = 0      /// for Showing 'Number Of Quantity' like :-  X 1 , X 2 .....
      var list=getTopList 
      list[key]['cartstatus']=0 
      setTopList(list)
      dispatch({type:"Remove_item" , payload:[item.productid,item]}) //// "dispatch" means   "To send Data from hear to Container"
      setCount(list)   /// only for rendering..


    }
    else{
      item['qtydemand'] = value ;     
      dispatch({type:"Add Cart" , payload:[item.productid,item]}) 
      setCount(item.productid)  /// only for rendering..
  
    }
     }


  return (
    <div className={classes.grow}>
      <Header history={props.history}/>
         <div>
              <Carousel  autoPlay={true} showThumbs={false}  infiniteLoop={true} stopOnHover={true} interval={2000}> 
                    {carousel()}                  
                    </Carousel>                     
              </div>
              <Typography  style={{marginLeft:50 , paddingTop:20}} >
                <h3>Shop From Top Categories</h3>
              </Typography>
      <div className={classes.cardview}>
              {showCategoryDiv()}
      </div>
      <Typography  style={{marginLeft:50 , paddingTop:20}}>
           <h3> Show from Top Products </h3>
          </Typography>
      <div className={classes.scardview}>
        <div style={{width:'95%'}}>
      <Slider {...settings}>
        
              {showTopProductsDiv()}
              {showTopProductsDiv()}
       
      </Slider>
      </div>
      </div>

      <div>
        {BrandADlist()}
      </div>
      
      <Typography  style={{marginLeft:50 , paddingTop:20}} >
                <h3>Shop From Top Brands</h3>
              </Typography>
      <div className={classes.cardview}>
        <div style={{width:'95%'}}>
          <Slider {...settings}>
        {showTopBrands()}
        </Slider>
        </div>
      </div>
      <Typography  style={{marginLeft:50 , paddingTop:20}}>
              <h3>Shop From New Brands</h3>
      </Typography>
      <div className={classes.cardview}>
        <div style={{width:'95%'}}>
          <Slider {...settings} >
        {showNewBrands()}
      </Slider>
      </div>
      </div>
      <Footer />
     
    </div>
  );
}