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





const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex' ,
      alignItems : 'center',
      justifyContent:'center',
      

    },
    button: {
        margin: theme.spacing(1),
        width:250
      },

    mypaper :{
        backgroundColor:'#f5f6fa',
        width : 450,
         margin: 10,
        padding:20,
        
    },

    headingStyle : {
        backgroundColor:'#f1f2f6',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        margin:3,
        padding:20

    },

    input: {
        display: 'none',
      },

      container: {
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


  }));

  
  export default function ModelInterface(props){

    const classes = useStyles();
    
    const [getCategoryList,setCategoryList]= useState([]);
    const [getBrandId,setBrandId]= useState('');
    const [getBrandList,setBrandList]= useState([]);
    const [getModelName,setModelName]= useState('');
    const [getDescription,setDescription]= useState('');
    const [getMsg,setMsg]= useState('');
    const [getCategoryId,setCategoryId]= useState('');
    /// for validations

    const [getErrCategoryId,setErrCategoryId]= useState('');
    const [getErrBrandId,setErrBrandId]= useState('');
    const [getErrModelName,setErrModelName]= useState('');
    const [getErrDescription,setErrDescription]= useState('');





    useEffect(function(){
        fetchCategory();
    },[])

    const handleCategoyChange=async(event)=>{
        setCategoryId(event.target.value)
        fetchBrands(event.target.value)
    }


    const handleBrandChange=async(event)=>{

        setBrandId(event.target.value)   
    
    }



    const fetchCategory=async()=>{
        let list = await getData('category/displayall')
        setCategoryList(list)
        }

    const fillCategoryItems=()=>{
        return(

            getCategoryList.map((item,key)=>{
                return(

                    <MenuItem value={item.categoryid}>{item.categoryname} </MenuItem>

                )
            })
            
        )
    }    


    const fetchBrands=async(categoryid)=>{
        var body = {'categoryid':categoryid}
        let list = await postData('brand/displayallbrands',body);
        setBrandList(list)
       
    }

    const fillBrandsItems=()=>{
        return(
            getBrandList.map((item,key)=>{
                return(
                    <MenuItem value={item.brandid}>{item.brandname} </MenuItem>

                )
            })
        )
    }

    // Submit Data
    const handleSubmit=async()=>{

        var err=false;

        if (!checkRequire(getCategoryId))
        {
            err = true;
            setErrCategoryId('/images/cross.jpg')
        }

        if(checkRequire(getCategoryId))
        {
            err = false;
            setErrCategoryId('images/tick.jpg')
        }

        if (!checkRequire(getBrandId))
        {
            err = true;
            setErrBrandId('/images/cross.jpg')
        }

        if(checkRequire(getBrandId))
        {
            err = false;
            setErrBrandId('images/tick.jpg')
        }

        if (!checkRequire(getModelName))
        {
            err = true;
            setErrModelName('/images/cross.jpg')
        }

        if(checkRequire(getModelName))
        {
            err = false;
            setErrModelName('images/tick.jpg')
        }

        if (!checkRequire(getDescription))
        {
            err = true;
            setErrDescription('/images/cross.jpg')
        }

        if(checkRequire(getDescription))
        {
            err = false;
            setErrDescription('images/tick.jpg')
        }


        if(!err)

     {

       var body={ 'brandid':getBrandId , 'modelname':getModelName , 'description':getDescription }
        let result = await postData('model/addrecord',body) 

        if(result)
        {
            setMsg('Record submitted')
        }

        else
        {
            setMsg('Failed to submit record')
        }
    }

    else
    {
        alert('Please Fill All Fields..')
    }
}




    return(

        <div className={classes.root}>
            <Paper  className={classes.mypaper}>
                <Paper  className={classes.headingStyle}><Typography>Add Model</Typography></Paper>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.gridstyle}>
                        <img   src={getErrCategoryId} width='10' height='10' />
                       <FormControl className={classes.formControl} fullWidth spacing={3} >
                         <InputLabel id="demo-simple-select-label">Category </InputLabel>
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

                    <Grid item xs={6} className={classes.gridstyle}>
                    <img   src={getErrBrandId} width='10' height='10' />
                       <FormControl className={classes.formControl} fullWidth spacing={3}>
                         <InputLabel id="demo-simple-select-label">Brand </InputLabel>
                         <Select
                           labelId="demo-simple-select-label"
                             id="demo-simple-select"
                            fullWidth
                                value={getBrandId}
                               onChange={(event)=>handleBrandChange(event)}
                         >
                                {fillBrandsItems()}
                         </Select>
                       </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.gridstyle}>
                    <img   src={getErrModelName} width='10' height='10' />
                        <TextField fullWidth  label='Model Name' onChange={(event)=>setModelName(event.target.value)}/>
                    </Grid>

                    <Grid item xs={12} className={classes.gridstyle}>
                    <img   src={getErrDescription} width='10' height='10' />
                        <TextField fullWidth  label='Description' onChange={(event)=>setDescription(event.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button fullWidth color='primary'
                         variant='contained' 
                         label='Description'
                         onClick={()=>handleSubmit()}
                         >
                            Submit Record
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <div>Message : <font color='brown'><b>{getMsg}</b></font></div>
                            
                    </Grid>

                </Grid>

            </Paper>

        </div>




    )
    



  }