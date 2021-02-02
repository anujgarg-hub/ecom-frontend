import React ,{useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { getData , postData, ServerURL} from '../FetchNodeSevices';
import NavigationBar from './NavigationBar' 
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'

import ShoppingCartIcon from './ShoppingCartIcon'
import {QtyCntrl} from './QtyCntrl'
import Firstpage from './Firstpage'
import ViewListofProducts from './ViewListofProducts';






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
      style={{ ...style, display: "block", background: "blue" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,  background: "blue" }}
      onClick={onClick}
    />
  );
}



export default function MainPage(props) {


  const classes = useStyles();

  const ChangeView=(value , parameter)=>{
    if(value==1)
    {
      setContainer(<ViewListofProducts categoryid={parameter.categoryid}/>)
    }
    
  }

  const [getContainer,setContainer] = useState(<Firstpage  ChangeView={ChangeView} />);



  // const dispatch = useDispatch()

  // var settings = {
  //   autoPlay:true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />
  // };




  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      // transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      getContentAnchorEl={null}
      anchorOrigin={{vertical:'bottom', horizontal:'right'}}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}
     
      anchorOrigin={{vertical:'bottom', horizontal:'center'}}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          anchorEl

        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

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
    //     fetchDataAd()
    //     fetchTopProducts()
    //     fetchBrandAd()
    //     fetchTopbrands()
    //     fetchNewbrands()
    },[])




  return (
    <div className={classes.grow}>
       <div>
              <NavigationBar />
       </div>

      <AppBar position="static" color='inherit'>
        <Toolbar>       
       
            <div className={classes.mainmenu}>
            {DisplayMainMenu()}
            <Menu 
            id='simple menu'
            anchorEl={anchorMM}
            keepMounted
            open={Boolean(anchorMM)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{vertical:'bottom', horizontal:'left'}}
            >
              {displayBrandsMM()}
            </Menu>
            
            </div>               
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
         <div>
            {getContainer}
         </div>   
    </div>
  );
}