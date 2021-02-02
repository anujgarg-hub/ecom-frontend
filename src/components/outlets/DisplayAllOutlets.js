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

/// for drop down components..
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




const useStyles = makeStyles((theme)=>( {

    rootx : {

        display:'flex',
        marginTop:4 ,
        alignItems:'center',
        justifyContent:'center'    

    },

    tablediv:{
        width:1200,
        // height:'auto'
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

    heading :{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#00b894',
        margin:3,
        padding:20,
       
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

    paper:{
        backgroundColor:'#55efc4',
        width:450,
        padding:20,
        margin:5
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
}));

    /*
http://maps.google.com/maps?z=12&t=m&q=<lat>,<lng>
z is the zoom level (1-21)
t is the map type ("m" map, "k" satellite, "h" hybrid, "p" terrain, "e" GoogleEarth)
q is the search query
    */


export default function MaterialTableDemo() {
    const [state, setState] = React.useState({
      columns: [
        { title: 'Outlet Id', field: 'outletid' },
        { title: 'Firm Name', field: 'firmname' },
        { title: 'Owner Name', field: 'ownername' },
        { title: 'Address', render : rowData=><div>{rowData.address}<br/>{rowData.cityname}<br/>{rowData.statename}</div>},
        { title: 'Contact',  render : rowData=><div>{rowData.mobile}<br/>{rowData.phone}<br/>{rowData.emailid}</div> },
        { title: 'Status',field: 'status'},
        { title: 'Geo Location', render: rowData=> <div> <a href={`http://maps.google.com/maps?z=12&t=m&q=${rowData.lat},${rowData.lng}`}>Geo Location</a> </div>},
        { title: 'Photo',field: 'photograph',
            render: rowData=><div> <Avatar src={`${ServerURL}/images/${rowData.photograph}`}/> </div>
        },


    ]
    });

const [getStateId, setStateID] = useState('');

const [getOutletId,setOutletId] = useState('');
const [getFirmName,setFirmName] = useState('');
const [getOwnerName, setOwnerName] = useState('');
const [getMobile, setMobile] = useState('');
const [getPhone, setPhone] = useState('');
const [getRegNo, setRegNo] = useState('');
const [getGstNo, setGstNo] = useState('');
const [getAddress, setAddress] = useState('');
const [getStat, setStat] = useState('');
const [getCity, setCity] = useState('');
const [getLocation, setLocation] = useState('');
const [getPhotograph, setPhotograph] = useState({pic :'' , filepic:''});
const [getEmail, setEmail] = useState('');
const [getDescription, setDescription] = useState('');
const [getAveragePrice, setAveragePrice] = useState('');
const [getRatings, setRatings] = useState('');
const [getStatus, setStatus] = useState('');
const [getPassword, setPassword] = useState('');
const [getLat, setLat] = useState('');
const [getLng, setLng] = useState('');
const [getMsg, setMsg] = useState('');
/// for validatons..
const [getErrFirmName,setErrFirmName] = useState('');
const [getErrOwnerName, setErrOwnerName] = useState('');
const [getErrMobile, setErrMobile] = useState('');
const [getErrPhone, setErrPhone] = useState('');  
const [getErrRegNo, setErrRegNo] = useState('');
const [getErrGstNo, setErrGstNo] = useState('');
const [getErrAddress, setErrAddress] = useState('');
const [getErrState, setErrState] = useState('');
const [getErrCity, setErrCity] = useState('');
const [getErrLocation, setErrLocation] = useState('');
const [getErrPhotograph, setErrPhotograph] = useState({pic :'' , filepic:''});
const [getErrEmail, setErrEmail] = useState('');
const [getErrDescription, setErrDescription] = useState('');
const [getErrAveragePrice, setErrAveragePrice] = useState('');
const [getErrRatings, setErrRatings] = useState('');
const [getErrStatus, setErrStatus] = useState('');
const [getErrPassword, setErrPassword] = useState('');    
const [getErrLat, setErrLat] = useState('');
const [getErrLng, setErrLng] = useState('');
const [getErrMsg, setErrMsg] = useState('');

const [getList, setList] = useState([]);
const [getOpen, setOpen] = useState(false);

//// For State city
const [getListState, setListState] = useState([]);
const [getListCity, setListCity] = useState([]);





const handleIcon=(event)=>{
    setPhotograph({pic:event.target.files[0] , filepic:URL.createObjectURL(event.target.files[0])})
}   


const handleStatus=(event)=>{
    setStatus(event.target.value)
}





const handleEdit=async()=>{

    var err = false ;

    if (!checkRequire(getFirmName))
    {
        err = true
        setErrFirmName('/images/cross.jpg')
    }

    if (checkRequire(getFirmName))
    {
        err = false
        setErrFirmName('/images/tick.jpg')
    }

    if (!checkRequire(getOwnerName))
    {
        err = true
        setErrOwnerName('/images/cross.jpg')
    }

    if (checkRequire(getOwnerName))
    {
        err = false
        setErrOwnerName('/images/tick.jpg')
    }


    if (!checkRequire(getMobile))
    {
        err = true
        setErrMobile('/images/cross.jpg')
    }

    if (checkRequire(getMobile))
    {
        err = false
        setErrMobile('/images/tick.jpg')
    }


    
    if (!checkRequire(getPhone))
    {
        err = true
        setErrPhone('/images/cross.jpg')
    }

    if (checkRequire(getPhone))
    {
        err = false
        setErrPhone('/images/tick.jpg')
    }


    if (!checkRequire(getRegNo))
    {
        err = true
        setErrRegNo('/images/cross.jpg')
    }

    if (checkRequire(getRegNo))
    {
        err = false
        setErrRegNo('/images/tick.jpg')
    }


    if (!checkRequire(getGstNo))
    {
        err = true
        setErrGstNo('/images/cross.jpg')
    }

    if (checkRequire(getGstNo))
    {
        err = false
        setErrGstNo('/images/tick.jpg')
    }

    if (!checkRequire(getAddress))
    {
        err = true
        setErrAddress('/images/cross.jpg')
    }

    if (checkRequire(getAddress))
    {
        err = false
        setErrAddress('/images/tick.jpg')
    }

    if (!checkRequire(getStat))
    {
        err = true
        setErrState('/images/cross.jpg')
    }

    if (checkRequire(getStat))
    {
        err = false
        setErrState('/images/tick.jpg')
    }

    if (!checkRequire(getCity))
    {
        err = true
        setErrCity('/images/cross.jpg')
    }

    if (checkRequire(getCity))
    {
        err = false
        setErrCity('/images/tick.jpg')
    }

    if (!checkRequire(getLocation))
    {
        err = true
        setErrLocation('/images/cross.jpg')
    }

    if (checkRequire(getLocation))
    {
        err = false
        setErrLocation('/images/tick.jpg')
    }

    // if (!checkRequire(getPhotograph.pic))
    // {
    //     err = true
    //     setErrPhotograph('/images/cross.jpg')
    // }

    // if (checkRequire(getPhotograph.pic))
    // {
    //     err = false
    //     setErrPhotograph('/images/tick.jpg')
    // }

    if (!checkRequire(getEmail))
    {
        err = true
        setErrEmail('/images/cross.jpg')
    }

    if (checkRequire(getEmail))
    {
        err = false
        setErrEmail('/images/tick.jpg')
    }

    if (!checkRequire(getDescription))
    {
        err = true
        setErrDescription('/images/cross.jpg')
    }

    if (checkRequire(getDescription))
    {
        err = false
        setErrDescription('/images/tick.jpg')
    }

    if (!checkRequire(getAveragePrice))
    {
        err = true
        setErrAveragePrice('/images/cross.jpg')
    }

    if (checkRequire(getAveragePrice))
    {
        err = false
        setErrAveragePrice('/images/tick.jpg')
    }

    if (!checkRequire(getRatings))
    {
        err = true
        setErrRatings('/images/cross.jpg')
    }

    if (checkRequire(getRatings))
    {
        err = false
        setErrRatings('/images/tick.jpg')
    }

    if (!checkRequire(getStatus))
    {
        err = true
        setErrStatus('/images/cross.jpg')
    }

    if (checkRequire(getStatus))
    {
        err = false
        setErrStatus('/images/tick.jpg')
    }

    if (!checkRequire(getPassword))
    {
        err = true
        setErrPassword('/images/cross.jpg')
    }

    if (checkRequire(getPassword))
    {
        err = false
        setErrPassword('/images/tick.jpg')
    }

    if (!checkRequire(getLat))
    {
        err = true
        setErrLat('/images/cross.jpg')
    }

    if (checkRequire(getLat))
    {
        err = false
        setErrLat('/images/tick.jpg')
    }

    if (!checkRequire(getLng))
    {
        err = true
        setErrLng('/images/cross.jpg')
    }

    if (checkRequire(getLng))
    {
        err = false
        setErrLng('/images/tick.jpg')
    }

    if(!err)
    {
    const formData = new FormData();
    formData.append('outletid',getOutletId)
    formData.append('firmname',getFirmName)
    formData.append('ownername',getOwnerName)
    formData.append('mobile',getMobile)
    formData.append('phone',getPhone)
    formData.append('registrationno',getRegNo)
    formData.append('gstno',getGstNo)
    formData.append('address',getAddress)
    formData.append('state',getStat)
    formData.append('city',getCity)
    formData.append('location',getLocation)
    formData.append('photograph',getPhotograph.pic)
    formData.append('emailid',getEmail)
    formData.append('description',getDescription)
    formData.append('averageprice',getAveragePrice)
    formData.append('ratings',getRatings)
    formData.append('status',getStatus)
    formData.append('password',getPassword)
    formData.append('lat',getLat)
    formData.append('lng',getLng)

    var config = {headers : {'content-type':'multipart/form-data'}}
    const result = await postDataAndImage('outlet/editRecord',formData,config)

    if(result)
    {
        setMsg('Record Updated...')
    }
    else
    {
        setMsg('Failed to Update Record.')
    }
}

else
{
    alert('Please Fill the all fields...')
}
}

////// State City ///////

const fetchStates=async()=>{
    let list = await getData('statecity/displayall')
    setListState(list)

}

/// for state

const fillStatesItems=()=>{
    return(

        getListState.map((item,key)=>{
           return(
                   <MenuItem value={item.stateid}>{item.statename}</MenuItem>
        )})
    )
}

const handleStateChange=async(event)=>{
    setStat(event.target.value)
    fetchCities(event.target.value)
     }

/// For city

const handleCityChange=async(event)=>{
    setCity(event.target.value)
     }

const fetchCities=async(stateid)=>{
    var body = {'stateid' : stateid}
    var list = await postData('statecity/displayallcities',body)
    setListCity(list)
}



const fillCityItems=()=>{
    return(

        getListCity.map((item,key)=>{
           return(
                   <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
        )})
    )
}



////////////////////////


const fetchData = async()=>{
    let list = await getData('outlet/displayall')
    setList(list)
}

useEffect(function(){
    fetchData()
    fetchStates()
    
},[])

const classes = useStyles();

const handleClickOpen = (rowData) => {
    setOpen(true);
    // setRowData(rowData)
    fetchCities(rowData.state)
    setOutletId(rowData.outletid)
    setFirmName(rowData.firmname)
    setOwnerName(rowData.ownername)
    setMobile(rowData.mobile)
    setPhone(rowData.phone)
    setRegNo(rowData.registrationno)
    setGstNo(rowData.gstno)
    setAddress(rowData.address)    
    setStat(rowData.state)
    setCity(rowData.city)
    setLocation(rowData.location)
    setPhotograph({pic:'',filepic:`${ServerURL}/images/${rowData.photograph}`})
    setEmail(rowData.emailid)
    setDescription(rowData.description)
    setAveragePrice(rowData.averageprice)
    setRatings(rowData.ratings)
    setStatus(rowData.status)
    setPassword(rowData.password)
    setLat(rowData.lat)
    setLng(rowData.lng)
  };

  const handleClose = () => {
    setOpen(false);
    fetchData()
  };

  const handleDelete=async(oldData)=>{
      let body = {outletid : oldData.outletid}
      await postData('outlet/deleteRecord',body)
  }

  const editDialog=()=>{
    return(
    <Dialog
            open={getOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Outlet Registor [Edit Outlets]"}</DialogTitle>
            <DialogContent>

            <div className={classes.root}>
            <Paper className={classes.paper}>
            <Paper className={classes.heading}><Typography>Add Outlets</Typography></Paper>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <img src={getErrFirmName} width='10' height='10'/>
                        <TextField label='Firm Name' fullWidth  onChange={(event)=>setFirmName(event.target.value)} value={getFirmName}/>  
                    </Grid>

                    <Grid item xs={6}>
                        <img src={getErrOwnerName} width='10' height='10'/>
                        <TextField label='Owner Name' fullWidth  onChange={(event)=>setOwnerName(event.target.value)} value={getOwnerName}  />  
                    </Grid>

                    <Grid item xs={6}>
                        <img src={getErrMobile} width='10' height='10'/>
                        <TextField label='Mobile' fullWidth  onChange={(event)=> setMobile(event.target.value)} value={getMobile} />  
                    </Grid>

                    <Grid item xs={6}>
                        <img src={getErrPhone} width='10' height='10'/>
                        <TextField label='Phone' fullWidth onChange={(event)=> setPhone(event.target.value)} value={getPhone} />  
                    </Grid>

                    
                    <Grid item xs={6}>
                         <img src={getErrRegNo} width='10' height='10'/>
                         <TextField label='Registration No.' fullWidth onChange={(event)=> setRegNo(event.target.value)} value={getRegNo} />  
                    </Grid>

                    
                    <Grid item xs={6}>
                         <img src={getErrGstNo} width='10' height='10'/>
                         <TextField label='Gst No.' fullWidth onChange={(event)=>setGstNo(event.target.value)} value={getGstNo} />  
                    </Grid>

                    <Grid item xs={12}>
                         <img src={getErrAddress} width='10' height='10'/>
                         <TextField label='Address' fullWidth onChange={(event)=>setAddress(event.target.value)} value={getAddress} />  
                    </Grid>

                    <Grid item xs={6}>
                        <img src={getErrState} width='10' height='10'/>
                        <FormControl className={classes.formControl} fullWidth>
                             <InputLabel id="demo-simple-select-label">States</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // fullWidth
                            value={getStat}
                            onChange={(event)=>handleStateChange(event)}
                      >
                       {fillStatesItems()}
                       </Select>
                </FormControl>                      </Grid>

                    <Grid item xs={6}>
                        <img src={getErrCity} width='10' height='10'/>
                        <FormControl className={classes.formControl} fullWidth>
                             <InputLabel id="demo-simple-select-label">Cities</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // fullWidth
                            value={getCity}
                            onChange={(event)=>handleCityChange(event)}
                      >
                       {fillCityItems()}
                       </Select>
                </FormControl>                   </Grid>

                    <Grid item xs={12}>
                        <img src={getErrLocation} width='10' height='10'/>
                        <TextField label='Location' fullWidth onChange={(event)=> setLocation(event.target.value)} value={getLocation} />  
                    </Grid>

                    <Grid item xs={6} className={classes.container}>   
                    <img src={getErrPhotograph} width='10' height='10'/>
                          <input
                                accept="image/*"
                                onChange={(event)=>handleIcon(event)} 
                                className={classes.input}
                                id="contained-button-fileicon"
                                multiple
                                type="file"
                          />
                                <label htmlFor="contained-button-fileicon">
                                    <Button variant="contained" color="primary" 
                                      component="span" >
                                               Upload Photograph
                                   </Button>
                                </label>
                    </Grid>

                    <Grid item xs={6} className={classes.container}>
                        <Avatar src={getPhotograph.filepic} style={{width:80 , height:80}} />
                    </Grid>

                    
                    <Grid item xs={12}>
                            <img src={getErrEmail} width='10' height='10'/>
                             <TextField label='Email Id' fullWidth onChange={(event)=>setEmail(event.target.value)} value={getEmail}/>  
                    </Grid>

                    <Grid item xs={12}>
                            <img src={getErrDescription} width='10' height='10'/>
                            <TextField label='Description' fullWidth onChange={(event)=> setDescription(event.target.value)} value={getDescription} />  
                    </Grid>

                    <Grid item xs={6}>
                            <img src={getErrAveragePrice} width='10' height='10'/>
                             <TextField label='Average Price' fullWidth onChange={(event)=> setAveragePrice(event.target.value)} value={getAveragePrice} />  
                    </Grid>

                    <Grid item xs={6}>
                             <img src={getErrRatings} width='10' height='10'/>
                             <TextField label='Ratings' fullWidth onChange={(event)=> setRatings(event.target.value)} value={getRatings} />  
                    </Grid>

                    <Grid item xs={6}>
                             <img src={getErrStatus} width='10' height='10'/>
                        <div> Status </div>
                    <Radio
                        checked = {getStatus === 'Active'}
                        onChange={(event)=>handleStatus(event)}
                        value="Active"
                        name="radio-button-demo"
                />Active

                <Radio
                         checked = {getStatus === 'Inactive'}
                         onChange={(event)=>handleStatus(event)}
                         value="Inactive"
                         name="radio-button-demo"
                        
                        />Inactive
                        </Grid>

                    <Grid item xs={6}>
                            <img src={getErrPassword} width='10' height='10'/>
                            <TextField label='Password' fullWidth onChange={(event)=> setPassword(event.target.value)} value={getPassword} />  
                    </Grid>

                    <Grid item xs={6}>
                            <img src={getErrLat} width='10' height='10'/>
                            <TextField label='Latitude' fullWidth onChange={(event)=> setLat(event.target.value)} value={getLat} />  
                    </Grid>

                    <Grid item xs={6}>
                            <img src={getErrLng} width='10' height='10'/>
                            <TextField label='Longitude' fullWidth onChange={(event)=> setLng(event.target.value)} value={getLng} />  
                    </Grid>


                    <Grid item xs={12}>
                        <Button variant='contained' color='primary' fullWidth onClick={()=>handleEdit()} >
                           Edit
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                             Message : {getMsg}
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
                     title="Outlets List"
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
    