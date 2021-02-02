import React,{createRef,useRef,useCallback,useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DropzoneComponent from 'react-dropzone-component'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import {postDataAndImage,postData,getData,ServerURL} from '../FetchNodeSevices';
const useStyles = makeStyles((theme) => ({
    root: {
      
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginTop:10 
    },
    paperstyle:{
      width:900,
      height:600,
      backgroundColor:'#f5f6fa',
      marginTop:40,
      border:'1px',
      borderRadius:10,
      borderColor: 'black',
    },
    headstyle:{
      width:700,
      height:60,
      backgroundColor:'#f5f6fa',
      marginTop:15,
      marginLeft:95,
      marginBottom:8
        },

        formControl: {
          margin: theme.spacing(1),
          minWidth: 250,
        },
    button: {
        margin: theme.spacing(1),
        width:160,
      },
      input: {
        display: 'none',
      },
      container:{
     justifyContent:'center',
     alignItems:'center',
     display:'flex',
      },
      gridStyle:{display:'flex',flexDirection:'row'},
     

  }));

export default function ProductPicture(props){
 // var dropzone = null;
  var dref=createRef()

    const classes = useStyles();
    const [getCategoryId,setCategoryId]=useState('')
    const [getBrandId,setBrandId]=useState('')
    const [getModelId,setModelId]=useState('')
    const [getProductId,setProductId]=useState('')
    
    
    const[getCategoryList,setCategoryList]=useState([])
    const[getBrandList,setBrandList]=useState([])
    const[getModelList,setModelList]=useState([])
    const[getProductList,setProductList]=useState([])

    const [getMsg,setMsg]=useState('')

    const fetchCategory=async()=>{

      const categorylist =await getData('category/displayall')
      
      setCategoryList(categorylist)
      
      }
      
      const fetchBrands=async(categoryid)=>{
      
      var body={'categoryid':categoryid}
       
      var brandlist=await postData('brand/fetchBrandsforMainMenu',body)
      
      setBrandList(brandlist)
      
      }
      
      const fetchModels=async(brandid)=>{
      
        var body={'brandid':brandid}
         
        var modelList=await postData('model/displaymodels',body)
        
        setModelList(modelList)
        
        }
        const fetchProducts=async(modelid)=>{

          var body={'modelid':modelid}
          var productlist =await postData('product/displayproduct',body)
          
           setProductList(productlist)
          // alert(productlist)
          }
      const fillCategoryItem=()=>{
      
        return(
        
          getCategoryList.map((item,key)=>{
          
          return(
          
          <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
          
          )}
      
          ))
      
      
      }
      
      
      const fillBrandItem=()=>{
      
        return(
        
          getBrandList.map((item,key)=>{
          
          return(
          
          <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
          
          )}
          ))
      }
      
      
      const fillModelItem=()=>{
      
        return(
        
          getModelList.map((item,key)=>{
          
          return(
          
          <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
          
          )}
          ))
      }

      const fillProductItem=()=>{
      
        return(
        
          getProductList.map((item,key)=>{
          
          return(
          
          <MenuItem value={item.productid}>{item.productname}</MenuItem>
          
          )}
          ))
      }
      
      useEffect(() => {
       
        fetchCategory();
        // fetchBrands();
        // fetchModels();
        // fetchProducts();
        
      }, [])

      const handleCategoryId=(event)=>{
        setCategoryId(event.target.value)
        fetchBrands(event.target.value)
        }
        
      const handleBrandId=(event)=>{
        setBrandId(event.target.value)
        fetchModels(event.target.value)
      }
      
      const handleModelId=(event)=>{
        setModelId(event.target.value)
        fetchProducts(event.target.value)
      }
      
      const handleProductId=(event)=>{

        setProductId(event.target.value)
        
      }
      
    var djsConfig = {
      addRemoveLinks:true,
   
      acceptedFiles: "image/jpeg,image/png,image/gif",
      autoProcessQueue: false,
      uploadMultiple:true,
      
      
     
  };
  
 
    var componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: `${ServerURL}/productpicture/addpic`,
        
  };
  const sending=async(file,x,formData) =>{
 
}
const success=(file) =>{}

const removedfile = file => console.log('removing...', file);
const callback = () => console.log('Hello!');

var callbackArray = [
  function () {
      console.log('Look Ma, I\'m a callback in an array!');
  },
  function () {
      console.log('Wooooow!');
  }
];


async function handlePost() {
 // alert(dref.current.files)
  console.log(dref)
  console.log(dref.current.files)
  const formData=new FormData()
  formData.append('productid',getProductId)
  dref.current.state.files.map((file,index)=>{//alert(file+","+index)
  formData.append('pictures'+index,file)

  
  
})
   
   
  const config={headers:{'content-type':'multipart/form-data'}}
  let result=await postDataAndImage('productpicture/addpicinfo',formData,config)
  // console.log(result)
 //dref.current.t.processQueue()
 //dropzone.processQueue();

 if(result){
  setMsg('Record Submitted Successfully...')
}
else{
  setMsg('Failed to Submit Record...')
}


}

const eventHandlers = {
 // init:dz =>dropzone = dz,
  drop: callbackArray,
  addedfile:callback,
  success:success,
  removedfile:removedfile,
  sending:sending,
   
  }
        return (
          <div className={classes.root}>
                <Paper className={classes.paperstyle}>
            <Grid container spacing={1}>
            <Grid item xs={12}>
     
     <Paper className={classes.headstyle}> <img src='images/cart.jpg' alt="Logo" style={{width:50,height:50,marginLeft:215}}/><h3 style={{marginTop:-50,marginLeft:270}}>"Product Pictures Interface"</h3></Paper>
      
  </Grid>

  <Grid item xs={6} className={classes.gridstyle}>

{/* <img src={getErrCategoryId} alt='checks' width='10' height='10' /> */}

<FormControl className={classes.formControl}>
<InputLabel shrink id="demo-simple-select-placeholder-label-label">
  Category
</InputLabel>
<Select
  labelId="demo-simple-select-placeholder-label-label"
  id="demo-simple-select-placeholder-label"
  value={getCategoryId}
  onChange={(event)=>handleCategoryId(event)}
  displayEmpty
  className={classes.selectEmpty}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
{fillCategoryItem()}
</Select>

</FormControl>
</Grid>

 <Grid item xs={6} className={classes.gridstyle}>

{/* <img src={getErrBrandId} alt='checks' width='10' height='10' /> */}

<FormControl className={classes.formControl}>
<InputLabel shrink id="demo-simple-select-placeholder-label-label">
  Brands
</InputLabel>
<Select
  labelId="demo-simple-select-placeholder-label-label"
  id="demo-simple-select-placeholder-label"
  value={getBrandId}
  onChange={(event)=>handleBrandId(event)}
  displayEmpty
  className={classes.selectEmpty}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
 { fillBrandItem()}
</Select>

</FormControl>
</Grid>
<Grid item xs={6} className={classes.gridstyle}>
{/* <img src={getErrModelId} alt='checks' width='10' height='10' /> */}

<FormControl className={classes.formControl}>
<InputLabel shrink id="demo-simple-select-placeholder-label-label">
  Models
</InputLabel>
<Select
  labelId="demo-simple-select-placeholder-label-label"
  id="demo-simple-select-placeholder-label"
  value={getModelId}
  onChange={(event)=>handleModelId(event)}
  displayEmpty
  className={classes.selectEmpty}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
{fillModelItem()}
</Select>

</FormControl>
</Grid>
        <Grid item xs={6} className={classes.gridStyle}>
        
        <FormControl className={classes.formControl}>
<InputLabel shrink id="demo-simple-select-placeholder-label-label">
  Product Name
</InputLabel>
<Select
  labelId="demo-simple-select-placeholder-label-label"
  id="demo-simple-select-placeholder-label"
  value={getProductId}
  onChange={(event)=>handleProductId(event)}
  displayEmpty
  className={classes.selectEmpty}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
 { fillProductItem()}
</Select>

</FormControl>
        </Grid>
         
        </Grid>
            
            
            <DropzoneComponent config={componentConfig}
                       ref={dref}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig}
                       />
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Button 
             variant="contained"
             color="default"
             className={classes.button}
             startIcon={<CloudUploadIcon />}
            onClick={()=>handlePost()}>Upload</Button>
              </div>   
              <Grid item xs={12} style={{marginLeft:200}}>

           <b>Message:&nbsp;&nbsp;&nbsp;&nbsp;{getMsg}</b>

        </Grid>        
              </Paper>
          </div>
        )
      }
    

    
 