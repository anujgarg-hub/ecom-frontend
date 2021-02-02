import React ,{ useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';
import { postDataAndImage , getData , postData} from '../FetchNodeSevices';
import {checkRequire,checkMobile,checkEmail,checkPassword} from '../checks';
/// For Select drop down
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const useStyles  = makeStyles((theme)=>({

root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
},

Paper:{
    backgroundColor:'#f1f2f6',
    width:1100,
    margin:10,
    padding:20
},

paperheading:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:5,
    padding:20,
    fontSize:24,
    backgroundColor:'#95a5a6'
},

input: {
    display: 'none',
  },

  button: {
    margin: theme.spacing(1),
    width:300
  },

  container: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
},

gridstyle : {
    display:'flex', flexDirection:'row'
}


}))


export default function ProductInterface(props){

    const classes   = useStyles();
    const [getVendorid , setVendorid]                = useState('')
    const [getCategoryid , setCategoryid]            = useState('')
    const [getCategoryList , setCategorylist]        = useState([])
    const [getBrandList , setBrandlist]              = useState([])
    const [getModelList , setModelList]              = useState([])
    const [getBrandid , setBrandid]                  = useState('')
    const [getModelid , setModelid]                  = useState('')
    const [getProductname , setProductname]          = useState('')
    const [getPrice , setPrice]                      = useState('')
    const [getOfferprice , setOfferprice]            = useState('')
    const [getDelievry , setDelievry]                = useState('')
    const [getRatings , setRatings]                  = useState('')
    const [getDescription , setDescription]          = useState('')
    const [getColor, setColor]                       = useState('')
    const [getOffertype , setOffertype]              = useState('')
    const [getStock , setStock]                      = useState('')
    const [getVendorstatus , setVendorstatus]        = useState('')
    const [getPicture , setPicture]                  = useState({pic:'' , filepic:''})
    const [getAd , setAd]                            = useState({ad:'' , filead:''})
    const [getAdstatus , setAdstatus]                = useState()
    const [getMsg , setMsg]                          = useState()

    /// For Validations..
    const [getErrVendorid , setErrVendorid]                = useState('')
    const [getErrCategoryid , setErrCategoryid]            = useState('')
    const [getErrBrandid , setErrBrandid]                  = useState('')
    const [getErrModelid , setErrModelid]                  = useState('')
    const [getErrProductname , setErrProductname]          = useState('')
    const [getErrPrice , setErrPrice]                      = useState('')
    const [getErrOfferprice , setErrOfferprice]            = useState('')
    const [getErrDelievry , setErrDelievry]                = useState('')
    const [getErrRatings , setErrRatings]                  = useState('')
    const [getErrDescription , setErrDescription]          = useState('')
    const [getErrColor, setErrColor]                       = useState('')
    const [getErrOffertype , setErrOffertype]              = useState('')
    const [getErrStock , setErrStock]                      = useState('')
    const [getErrVendorstatus , setErrVendorstatus]        = useState('')
    const [getErrPicture , setErrPicture]                  = useState({pic:'' , filepic:''})
    const [getErrAd , setErrAd]                            = useState({ad:'' , filead:''})
    const [getErrAdstatus , setErrAdstatus]                = useState()

 
     useEffect(function(){
         fetchCategory();
     },[])


    const handlePicture=(event)=>{

        setPicture({pic:event.target.files[0] , filepic:URL.createObjectURL(event.target.files[0])})
    }


    const handleAd=(event)=>{
        setAd({ad:event.target.files[0] , filead:URL.createObjectURL(event.target.files[0])})
    }

    const handleCategoryChange=async(event)=>{     
        setCategoryid(event.target.value)
        fetchBrands(event.target.value)
    }

    const handleBrandChange=async(event)=>{
        setBrandid(event.target.value)
        fetchModels(event.target.value)
    }

    const handleModelChange=(event)=>{
        setModelid(event.target.value)
    }


    const fetchCategory=async()=>{
        let list = await getData('category/displayall')
        setCategorylist(list)
    }

  const fillCategoryItems=()=>{
    return(
    getCategoryList.map((item,index)=>{
        return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )
    })
    )
  }

  const fetchBrands=async(categoryid)=>{
    var body = {'categoryid':categoryid}
    let list = await postData('brand/displayallbrands',body);
    setBrandlist(list)
  }

  const fillBrandItems=()=>{
      return(
      getBrandList.map((item,index)=>{
          return(
          <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
          )
      })
      ) 
  }

  const fetchModels=async(brandid)=>{
      var body = {'brandid':brandid}
      var list = await postData('model/displaymodels',body)
      setModelList(list)
  }

  const fillModelItems=()=>{
    return(
        getModelList.map((item,index)=>{
            return(
            <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
            )
        })
    )
  }

  const resetData=()=>{

      setVendorid('')
      setCategoryid('')
      setBrandid('')
      setModelid('')
      setProductname('')
      setPrice('')
      setOfferprice('')
      setDelievry('')
      setRatings('')
      setDescription('')
      setColor('')
      setOffertype('')
      setStock('')
      setVendorstatus('')
      setPicture('')
      setAd('')
      setAdstatus('')      
  }


    const handleSubmit=async()=>{

        var err = false;
        
        if(!checkRequire(getVendorid)){
            err = true;
            setErrVendorid('/images/cross.jpg')
        }
        if(checkRequire(getVendorid)){
            err = false;
            setErrVendorid('/images/tick.jpg')
        }

        if(!checkRequire(getCategoryid)){
            err = true;
            setErrCategoryid('/images/cross.jpg')
        }
        if(checkRequire(getCategoryid)){
            err = false;
            setErrCategoryid('/images/tick.jpg')
        }

        if(!checkRequire(getBrandid)){
            err = true;
            setErrBrandid('/images/cross.jpg')
        }
        if(checkRequire(getBrandid)){
            err = false;
            setErrBrandid('/images/tick.jpg')
        }
        

        if(!checkRequire(getModelid)){
            err = true;
            setErrModelid('/images/cross.jpg')
        }
        if(checkRequire(getModelid)){
            err = false;
            setErrModelid('/images/tick.jpg')
        }

        if(!checkRequire(getProductname)){
            err = true;
            setErrProductname('/images/cross.jpg')
        }
        if(checkRequire(getProductname)){
            err = false;
            setErrProductname('/images/tick.jpg')
        }

        if(!checkRequire(getPrice)){
            err = true;
            setErrPrice('/images/cross.jpg')
        }
        if(checkRequire(getPrice)){
            err = false;
            setErrPrice('/images/tick.jpg')
        }
        

        if(!checkRequire(getOfferprice)){
            err = true;
            setErrOfferprice('/images/cross.jpg')
        }
        if(checkRequire(getOfferprice)){
            err = false;
            setErrOfferprice('/images/tick.jpg')
        }

        if(!checkRequire(getDelievry)){
            err = true;
            setErrDelievry('/images/cross.jpg')
        }
        if(checkRequire(getDelievry)){
            err = false;
            setErrDelievry('/images/tick.jpg')
        }
        

        if(!checkRequire(getRatings)){
            err = true;
            setErrRatings('/images/cross.jpg')
        }
        if(checkRequire(getRatings)){
            err = false;
            setErrRatings('/images/tick.jpg')
        }

        if(!checkRequire(getDescription)){
            err = true;
            setErrDescription('/images/cross.jpg')
        }
        if(checkRequire(getDescription)){
            err = false;
            setErrDescription('/images/tick.jpg')
        }
        

        
        if(!checkRequire(getColor)){
            err = true;
            setErrColor('/images/cross.jpg')
        }
        if(checkRequire(getColor)){
            err = false;
            setErrColor('/images/tick.jpg')
        }
        
          
        if(!checkRequire(getOffertype)){
            err = true;
            setErrOffertype('/images/cross.jpg')
        }
        if(checkRequire(getOffertype)){
            err = false;
            setErrOffertype('/images/tick.jpg')
        }

        if(!checkRequire(getStock)){
            err = true;
            setErrStock('/images/cross.jpg')
        }
        if(checkRequire(getStock)){
            err = false;
            setErrStock('/images/tick.jpg')
        }

        if(!checkRequire(getVendorstatus)){
            err = true;
            setErrVendorstatus('/images/cross.jpg')
        }
        if(checkRequire(getVendorstatus)){
            err = false;
            setErrVendorstatus('/images/tick.jpg')
        }

        if(!checkRequire(getPicture.pic)){
            err = true;
            setErrPicture('/images/cross.jpg')
        }
        if(checkRequire(getPicture.pic)){
            err = false;
            setErrPicture('/images/tick.jpg')
        }

        if(!checkRequire(getAd.ad)){
            err = true;
            setErrAd('/images/cross.jpg')
        }
        if(checkRequire(getAd.ad)){
            err = false;
            setErrAd('/images/tick.jpg')
        }

        if(!checkRequire(getAdstatus)){
            err = true;
            setErrAdstatus('/images/cross.jpg')
        }
        if(checkRequire(getAdstatus)){
            err = false;
            setErrAdstatus('/images/tick.jpg')
        }
        
        if(!err)
        {        
        var formData    =   new FormData();
        formData.append('vendorid',getVendorid)
        formData.append('categoryid',getCategoryid)
        formData.append('brandid',getBrandid)
        formData.append('modelid',getModelid)
        formData.append('productname',getProductname)
        formData.append('price',getPrice)
        formData.append('offerprice',getOfferprice)
        formData.append('delievery',getDelievry)
        formData.append('ratings',getRatings)
        formData.append('description',getDescription)
        formData.append('color',getColor)
        formData.append('offertype',getOffertype)
        formData.append('stock',getStock)
        formData.append('vendorstatus',getVendorstatus)
        formData.append('picture',getPicture.pic)
        formData.append('ad',getAd.ad)       
        formData.append('adstatus',getAdstatus)
        var  config = {headers:{'content-type':'multipart/form-data'}}
        const result= postDataAndImage('product/addproduct',formData,config)

        if(result)
        {
            setMsg(<h3>'Record Submitted...😄!!'</h3>)
        }
        else
        {
            setMsg('Failed to Submit Record..☹️')

        }
    }
    else
    {
        alert('Please Fill All The fields..!!!')
    }
    }


    return(
        <div className={classes.root}>
            <Paper className={classes.Paper}>
                <Paper className={classes.paperheading} style={{marginBottom:15}}>Product Register</Paper>
                <Grid container spacing={1}>
                <Grid item xs={12} className={classes.gridstyle}>
                    <img src={getErrVendorid} width='10' height='10'/>
                    <TextField fullWidth variant='filled' label="Vendor Id" onChange={(event)=>setVendorid(event.target.value)}/>
                </Grid>
                
                <Grid item xs={4} className={classes.gridstyle}>
                <img src={getErrCategoryid} width='10' height='10'/>

                <FormControl variant="outlined" className={classes.formControl}  fullWidth spacing={3}>
                    Category:
                   {/* <label> Category: </label> */}
                     {/* <InputLabel id="demo-simple-select-label">Category:</InputLabel> */}
                         <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={getCategoryid}
                             onChange={(event)=>handleCategoryChange(event)}
                   >
                         {fillCategoryItems()}
                         </Select>
              </FormControl>
                </Grid>

                <Grid item xs={4} className={classes.gridstyle}>
                <img src={getErrBrandid} width='10' height='10'/>

                <FormControl variant="outlined" className={classes.formControl}  fullWidth spacing={3}>
                    Brand:
                     {/* <InputLabel id="demo-simple-select-label">Brand:</InputLabel> */}
                         <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={getBrandid}
                            onChange={(event)=>handleBrandChange(event)}

                   >    {fillBrandItems()}
                         </Select>
              </FormControl>
                </Grid>

                <Grid item xs={4} className={classes.gridstyle}>
                <img src={getErrModelid} width='10' height='10'/>
                <FormControl variant="outlined" className={classes.formControl}  fullWidth >
                    Model:
                     {/* <InputLabel id="demo-simple-select-label">Model:</InputLabel> */}
                         <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={getModelid}
                            onChange={(event)=>handleModelChange(event)}

                   >
                         {fillModelItems()}
                         </Select>
              </FormControl>
                </Grid>

                <Grid item xs={12} className={classes.gridstyle}>
                <img src={getErrProductname} width='10' height='10'/>
                    <TextField fullWidth variant='filled' label='Product Name'  onChange={(event)=>setProductname(event.target.value)} />
                </Grid>

                <Grid item xs={6} className={classes.gridstyle}>
                <img src={getErrPrice} width='10' height='10'/>
                    <TextField  fullWidth label='Price'  onChange={(event)=>setPrice(event.target.value)} />
                </Grid>

                <Grid item xs={6} className={classes.gridstyle}>
                <img src={getErrOfferprice} width='10' height='10'/>
                    <TextField fullWidth label='Offer Price'  onChange={(event)=>setOfferprice(event.target.value)} />
                </Grid>

                <Grid item xs={6} className={classes.gridstyle}>
                <img src={getErrDelievry} width='10' height='10'/>
                    <TextField fullWidth label='Delievry'  onChange={(event)=>setDelievry(event.target.value)} />
                </Grid>

                <Grid item xs={6} className={classes.gridstyle}>
                <img src={getErrRatings} width='10' height='10'/>
                    <TextField  fullWidth label='Ratings'  onChange={(event)=>setRatings(event.target.value)} />
                </Grid>

                <Grid item xs={12} className={classes.gridstyle}>
                <img src={getErrDescription} width='10' height='10'/>
                    <TextField variant='filled' fullWidth label='Description'  onChange={(event)=>setDescription(event.target.value)} />
                </Grid>

                <Grid item xs={6} className={classes.gridstyle}>
                <img src={getErrColor} width='10' height='10'/>
                    <TextField  fullWidth label='Color'  onChange={(event)=>setColor(event.target.value)} />
                </Grid>

                <Grid item xs={6} className={classes.gridstyle}>
                <img src={getErrOffertype} width='10' height='10'/>
                    <FormControl className={classes.formControl} fullWidth >
                        <InputLabel>Offer Type:</InputLabel> 
                        <Select
                            onChange={(event)=>setOffertype(event.target.value)}
                            value={getOffertype}
                        >

                            <MenuItem value="No Offer">No Offer</MenuItem>
                            <MenuItem value="Discounted">Discounted</MenuItem>
                            <MenuItem value="Cash back">Cash back</MenuItem>
                            <MenuItem value="Upgraded">Upgraded</MenuItem>


                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} className={classes.gridstyle}>
                <img src={getErrStock} width='10' height='10'/>
                    <TextField  fullWidth label='Stock' onChange={(event)=>setStock(event.target.value)}/>
                </Grid>

                <Grid item xs={6} className={classes.gridstyle}>
                <img src={getErrVendorstatus} width='10' height='10'/>
                    <TextField  fullWidth label='Vendor Status' onChange={(event)=>setVendorstatus(event.target.value)} />
                </Grid>

                 <Grid item xs={6} >
                 <img src={getErrPicture} width='10' height='10'/>
                    <Grid  className={classes.container}>
                    <Avatar src={getPicture.filepic} style={{width:100 , height:100}}/>
                    </Grid>
                    <input 
                    accept="images/*"
                    className={classes.input}
                    id="contained-button-fileicon"
                    multiple
                    type="file"
                    onChange={(event)=>handlePicture(event)}

                    />                  
                    
                    <label htmlFor="contained-button-fileicon">
                    &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button  variant="contained" color="primary"  component="span" className={classes.button} >
                            Product Picture
                        </Button>
                    </label>
                </Grid> 

                <Grid item xs={6}>
                <img src={getErrAd} width='10' height='10'/>
                    <Grid className={classes.container}>
                         <Avatar src={getAd.filead}  style={{width:100 , height:100}} />
                    </Grid>
                    <input 
                        accept="images/*"
                        type="file"
                        multiple
                        className={classes.input} 
                        id="contained-button-filead"     
                        onChange={(event)=>handleAd(event)}                  
                    />

                    <label  htmlFor="contained-button-filead"> 
                    &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Button fullWidth color="primary" variant="contained" component="span" className={classes.button}  >
                            Product AD
                        </Button>
                    </label>
                </Grid>

                <Grid item xs={12} className={classes.gridstyle}>
                <img src={getErrAdstatus} width='10' height='10'/>
                    <FormControl fullWidth  variant='filled'>
                    <InputLabel>Ad Status</InputLabel>
                        <Select onChange={(event)=>setAdstatus(event.target.value)}>
                            <MenuItem value="Yes">
                                Yes
                            </MenuItem>
                            <MenuItem value="No">
                                No 
                            </MenuItem>
                        </Select>
                        </FormControl>                                
                </Grid>
                <Grid item xs={4}>
                    <Grid className={classes.container}>
                    <Button style={{backgroundColor:'green' , color:'white' ,borderRadius:15 , padding:10}}    
                        onClick={()=>handleSubmit()}
                    >Submit</Button>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                        {getMsg}
                 </Grid>       
                <Grid item xs={4}>
                    <Grid className={classes.container}>
                    <Button style={{backgroundColor:'red' , color:'white' , borderRadius:15,padding:10}} 
                    onClick={()=>resetData()}>
                        Reset
                    </Button>
                    </Grid>
               </Grid>
               </Grid>
            </Paper>
        </div>
    )
}