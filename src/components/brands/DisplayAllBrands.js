import React ,{useState , useEffect} from 'react';
import {getData, postData ,ServerURL } from '../FetchNodeSevices';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Radio from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';
import { postDataAndImage } from '../FetchNodeSevices';
import {checkRequire,checkMobile,checkEmail,checkPassword} from '../checks';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';




const useStyles = makeStyles((theme)=>( {

    rootx : {

        display:'flex',
        marginTop:40 ,
        alignItems:'center',
        justifyContent:'center'    

    },

    tablediv:{
        width:1200,
        height:'auto'
    },

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
    }
}));


export default function MaterialTableDemo() {
    const [state, setState] = React.useState({
      columns: [
        { title: 'Brand Id', field: 'brandid' },
        { title: 'Category Id', field: 'categoryname' },
        { title: 'Name', field: 'brandname' },
        { title: 'Description', field: 'description'},
        { title: 'Icon',field: 'picture',
            render: rowData=><div> <Avatar src={`${ServerURL}/images/${rowData.picture}`}/> </div>
        },
        { title: 'Ad',field: 'ad',
            render : rowData=><div><Avatar src={`${ServerURL}/images/${rowData.ad}`}/>  </div>
        },
        { title: 'Status',field: 'adstatus'},
        { title: 'Top Brands',field: 'topbrands'},
        { title: 'New Brands',field: 'newbrands'},
    ]
    });

    const [getList , setList]=React.useState([])
    const [getOpen,setOpen]=useState(false)
    const [getRowData,setRowData]=useState([])
    const [getBrandId,setBrandId] = useState('')
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
    formData.append('brandid',getBrandId)
    formData.append('categoryid',getCategoryId)
    formData.append('brandname',getBrandName)
    formData.append('description',getDescription)
    formData.append('picture',getPicture.pic)
    formData.append('ad',getAd.ad)
    formData.append('adstatus',getAdStatus)
    formData.append('topbrand',getTopBrands)
    formData.append('newbrand',getNewBrands)

    var config = {headers:{'content-type':'multipart/form-data'}}

    let result = await postDataAndImage('brand/editRecord',formData,config)

    if(result)
    {
        setMsg('Record updated');
    }

    else
    {
        setMsg('Failed to update Record');
    }

}
else
{
    alert(' Wrong input ')
}
}



  

    const fetchData=async()=>{
        let list = await getData('brand/displayall');
        setList(list)
    }

    useEffect(function(){
        fetchData()
    },[])

    const classes = useStyles();


    const handleClickOpen = (rowData) => {
        setOpen(true);
        // setRowData(rowData)
        setBrandId(rowData.brandid)
        setCategoryId(rowData.categoryid)
        setBrandName(rowData.brandname)
        setDescription(rowData.description)
        setPicture({pic:'' , filepic:`${ServerURL}/images/${rowData.picture}`})
        setAd({ad:'' , filead: `${ServerURL}/images/${rowData.ad}`})
        setAdStatus(rowData.adstatus)
        setTopBrands(rowData.topbrands)
        setNewBrands(rowData.newbrands)        

      };
      
      const handleClose = () => {
        setOpen(false);
        fetchData()
      };
      

    const handleDelete=async(oldData)=>{
        let body={brandid : oldData.brandid}
        await postData('brand/deleterecord',body)
    }


    const editDialog=()=>{
        return(
        <Dialog
                open={getOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Brands Registor [Edit Brands]"}</DialogTitle>
                <DialogContent>
                <div className={classes.root}>
        <Paper className={classes.ourpaper}>
            <Paper className={classes.subpaper}>Brand</Paper>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.gridstyle}>
                <img src={getErrCategoryid}  width='10' height='10' />
                <TextField label='Category Id' fullWidth value={getCategoryId} onChange={(event)=>setCategoryId(event.target.value)}/>
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

            <Grid item xs={12} >
                <Button variant="contained"  onClick={()=>handleSubmit()} fullWidth  color="primary" >Edit Record</Button>
            </Grid>
{/* 
            <Grid item xs={6} >
                <Button variant="contained" onClick={()=>clearData()} color="primary" className={classes.button} >Reset</Button>
            </Grid> */}

            <Grid item xs={12}>
                <div>
                    Message :{getMsg}
                </div>
            </Grid>
        </Grid>
       </Paper>
        </div>
                </DialogContent>
                <DialogActions>
                 
                  <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
        
        
        )
        
        
        } 


    return(

        <div className={classes.rootx}>
            <div className={classes.tablediv}>
            <MaterialTable
                 title="Brands List"
                 columns={state.columns}
                  data={getList}
                  actions={[
                    {
                      icon: 'edit',
                      tooltip: 'Edit',
                      onClick: (event, rowData) => handleClickOpen(rowData)
                    }
                  ]}
            
        editable={{
        // onRowAdd: (newData) =>
        //   new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve();
        //       setState((prevState) => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }),
        // onRowUpdate: (newData, oldData) =>
        //   new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve();
        //       if (oldData) {
        //         setState((prevState) => {
        //           const data = [...prevState.data];
        //           data[data.indexOf(oldData)] = newData;
        //           return { ...prevState, data };
        //         });
        //       }
        //     }, 600);
        //   }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
             
                const data = [...getList];
                data.splice(data.indexOf(oldData), 1);
                setList(data)
                handleDelete(oldData)
               
            
            }, 600);
          }),
      }}
    />
    </div>
    {editDialog()}
 </div>   
  );

}
