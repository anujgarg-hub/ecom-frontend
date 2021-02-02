import React ,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';
import { postDataAndImage, getData } from '../FetchNodeSevices';
import {checkRequire,checkMobile,checkEmail,checkPassword} from '../checks';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme)=>({

    root : {
        display:'flex',
        alignItems :'center',
        justifyContent:'center'
    },

    ourpaper :{
        margin:10,
        padding:20,
        width:450,
        backgroundColor:'#55efc4'
    },

    input : {
        display : 'none'
    },

    subpaper:{
        margin:3,
        padding:10,
        backgroundColor:'#00b894',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
      
    },

    button:{
        width:200
    },

    container :{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },

    gridstyle : {
        display:'flex', flexDirection:'row'
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },

}))


export default function BrandInterface(props){

    const classes = useStyles()

    const [getCategoryId,setCategoryId] = useState('')
    const [getBrandName,setBrandName] = useState('')
    const [getDescription,setDescription] = useState('')
    const [getPicture,setPicture] = useState({pic:'' , filepic:''})
    const [getAd,setAd] = useState({ad:'' , filead:'' })
    const [getAdStatus,setAdStatus] = useState('')
    const [getTopBrands,setTopBrands] = useState('')
    const [getNewBrands,setNewBrands] = useState('')
    const [getMsg, setMsg] = useState('')
    const [getErrCategoryid,setErrCategoryid] = useState('')
    const [getErrBrandName,setErrBrandName] = useState('')
    const [getErrDescription,setErrDescription] = useState('')
    const [getErrPicture,setErrPicture] = useState('')
    const [getErrAd,setErrAd] = useState('')
    const [getErrAdStatus,setErrAdStatus] = useState('')
    const [getErrTop,setErrTop] = useState('')
    const [getErrNewBrand,setErrNewBrand] = useState('')
    const [getList,setList] = useState([])

    


    const handlePicture=(event)=>{
        setPicture({pic:event.target.files[0] , filepic:URL.createObjectURL(event.target.files[0])})
    }

    const handleAd=(event)=>{
        setAd({ad:event.target.files[0] , filead:URL.createObjectURL(event.target.files[0])})
    }

    const handleAdStatus=(event)=>{
     
        setAdStatus(event.target.value) 
    }

    const handleTopBrand=(event)=>{
        setTopBrands(event.target.value)
    }

    const handleNewBrand=(event)=>{
        setNewBrands(event.target.value)
    }

    const handleCategoyChange=(event)=>{
        alert(event.target.value)
        setCategoryId(event.target.value)
    }

    const fetchAllCategory=async()=>{

        var list = await getData('category/displayall')
        setList(list)

    }

    useEffect(function(){
        fetchAllCategory()
    },[])


    const fillCategoryItems=()=>{
        return(

            getList.map((item,key)=>{
               return(
                       <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )})
        )
    }


    const handleSubmit= async()=>{


        // for Validations...

    var err ;

    if(!checkRequire(getCategoryId))
    {
        err = true;
        setErrCategoryid('/images/cross.jpg')
    }

    if(checkRequire(getCategoryId))
    {
       
        setErrCategoryid('/images/tick.jpg')
    }


    if(!checkRequire(getBrandName))
    {
        err = true;
        setErrBrandName('/images/cross.jpg')
    }

    if(checkRequire(getBrandName))
    {
        
        setErrBrandName('/images/tick.jpg')
    }


    if(!checkRequire(getDescription))
    {
        err = true;
        setErrDescription('/images/cross.jpg')
    }

    if(checkRequire(getDescription))
    {
       
        setErrDescription('/images/tick.jpg')
    }


    if(!checkRequire(getPicture.pic))
    {
        err = true;
        setErrPicture('/images/cross.jpg')
    }

    if(checkRequire(getPicture.pic))
    {
        
        setErrPicture('/images/tick.jpg')
    }


    if(!checkRequire(getAd.ad))
    {
        err = true;
        setErrAd('/images/cross.jpg')
    }

    if(checkRequire(getAd.ad))
    {
       
        setErrAd('/images/tick.jpg')
    }


    if(!checkRequire(getAdStatus))
    {
        err = true;
        setErrAdStatus('/images/cross.jpg')
    }

    if(checkRequire(getAdStatus))
    {
       
        setErrAdStatus('/images/tick.jpg')
    }


    if(!checkRequire(getTopBrands))
    {
        err = true;
        setErrTop('/images/cross.jpg')
    }

    if(checkRequire(getTopBrands))
    {
        
        setErrTop('/images/tick.jpg')
    }

    
    if(!checkRequire(getNewBrands))
    {
        err = true;
        setErrNewBrand('/images/cross.jpg')
    }

    if(checkRequire(getNewBrands))
    {
        
        setErrNewBrand('/images/tick.jpg')
    }

   if(!err)
   {
        const formData = new FormData()

        formData.append('categoryid',getCategoryId)
        formData.append('brandname',getBrandName)
        formData.append('description',getDescription)
        formData.append('picture',getPicture.pic)
        formData.append('ad',getAd.ad)
        formData.append('adstatus',getAdStatus)
        formData.append('topbrand',getTopBrands)
        formData.append('newbrand',getNewBrands)

        var config = {headers:{'content-type':'multipart/form-data'}}

        let result = await postDataAndImage('brand/addnewbrands',formData,config)

        if(result)
        {
            setMsg('Record Submitted');
        }

        else
        {
            setMsg('Failed to Submit Record');
        }

    }
    else
    {
        alert(' Wrong input ')
    }
}



    const clearData=()=>{

        setCategoryId('')
        setBrandName('')
        setDescription('')
        setPicture('')
        setAd('')
        setAdStatus('')
        setTopBrands('')
        setNewBrands('')
        setErrCategoryid('')
        setErrBrandName('')
        setErrDescription('')
        setErrPicture('')
        setErrAd('')
        setErrAdStatus('')
        setErrTop('')
        setErrNewBrand('')
        setMsg('')

    }

    return (

    <div className={classes.root}>
        <Paper className={classes.ourpaper}>
            <Paper className={classes.subpaper}>Brand</Paper>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.gridstyle}>
                <img src={getErrCategoryid}  width='10' height='10' />
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                      <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         fullWidth
                         value={getCategoryId}
                         onChange={(event)=>handleCategoyChange(event)}
                      >
                       {fillCategoryItems()}
                       </Select>
                </FormControl>       
           </Grid>

            <Grid item xs={12} className={classes.gridstyle}>
            <img src={getErrBrandName}  width='10' height='10' />
                <TextField label='Brand Name' fullWidth value={getBrandName}  onChange={(event)=>setBrandName(event.target.value)} />
            </Grid>

            <Grid item xs={12} className={classes.gridstyle}>
            <img src={getErrDescription}  width='10' height='10' />
                <TextField label='Description' fullWidth value={getDescription} onChange={(event)=>setDescription(event.target.value)}/>
            </Grid>

            <Grid item xs={6} className={classes.gridstyle}>
            <img src={getErrPicture}  width='10' height='10' />
            <input
                   accept="image/*"
                   onChange={(event)=>handlePicture(event)}
 
                   className={classes.input}
                   id="contained-button-fileicon"
                   multiple
                   type="file"
                />
                <label htmlFor="contained-button-fileicon">
                    <Button variant="contained" color="primary" 
                       component="span" className={classes.button}>
                            Upload Brand icon
                    </Button>
                 </label>
            </Grid>

            <Grid item xs={6} className={classes.container} >  
                <Avatar alt="shyam"  src={getPicture.filepic} style={{width:80,height:80}} />
            </Grid>

            <Grid item xs={6} className={classes.gridstyle}>
            <img src={getErrAd}  width='10' height='10' />
            <input
                   accept="image/*"
                  onChange={(event)=>handleAd(event)}
 
                  className={classes.input}
                   id="contained-button-filead"
                   multiple
                   type="file"
                />
                <label htmlFor="contained-button-filead">
                    <Button variant="contained" color="primary" 
                       component="span" className={classes.button}>
                            Upload Brand Ad
                    </Button>
                 </label>
            </Grid>

            <Grid item xs={6} className={classes.container}>  
                <Avatar alt="shyam"  src={getAd.filead} style={{width:80,height:80}} />
            </Grid>

            <Grid item xs={12} className={classes.gridstyle}>
            <img src={getErrAdStatus}  width='10' height='10' />
                <div>Ad status</div>
            <Radio
                        checked = {getAdStatus === 'Yes'}
                        onChange={(event)=>handleAdStatus(event)}
                        value="Yes"
                        name="radio-button-demo"
                />     Yes

                <Radio
                         checked = {getAdStatus === 'No'}
                         onChange={(event)=>handleAdStatus(event)}
                         value="No"
                         name="radio-button-demo"
                        
                />     No

            </Grid>

            <Grid item xs={6} className={classes.gridstyle}>
            <img src={getErrTop}  width='10' height='10' />
            <div>Top Brand</div>
            <Radio
                        checked = {getTopBrands === 'Yes'}
                        onChange={(event)=>handleTopBrand(event)}
                        value="Yes"
                        name="radio-button-demo"
                />     Yes

                <Radio
                         checked = {getTopBrands === 'No'}
                         onChange={(event)=>handleTopBrand(event)}
                         value="No"
                         name="radio-button-demo"
                        
                />    No

            </Grid>

            <Grid item xs={6} className={classes.gridstyle}>
            <img src={getErrNewBrand}  width='10' height='10' />
                <div>New Brand</div>
            <Radio
                        checked = {getNewBrands === 'Yes'}
                        onChange={(event)=>handleNewBrand(event)}
                        value="Yes"
                        name="radio-button-demo"
                />     Yes

                <Radio
                         checked = {getNewBrands === 'No'}
                         onChange={(event)=>handleNewBrand(event)}
                         value="No"
                         name="radio-button-demo"
                        
                />     No

            </Grid>

            <Grid item xs={6}>
                <Button variant="contained" onClick={()=>handleSubmit()}  color="primary" className={classes.button}>Save</Button>
            </Grid>

            <Grid item xs={6} >
                <Button variant="contained" onClick={()=>clearData()} color="primary" className={classes.button} >Reset</Button>
            </Grid>

            <Grid>
                <div>
                    Message :{getMsg}
                </div>
            </Grid>
        </Grid>
       </Paper>
        </div>









    )

}