import React, { useState } from 'react'
import { Typography,Box,Stack,TextField,Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import {Link} from "react-router-dom";

const BMI = () => {
  
  const[ firstName, setFirstName] = useState("");
  const[ lastName, setLastName] = useState("");
  const[ validfirstName, setValidFirstName] = useState(true);
  const[ validlastName, setValidLastName] = useState(true);
  const[ age, setAge] = useState("");
  const[ validAge, setValidAge] = useState(true);
  const[ gender, setGender] = useState("male");
  const[ height, setHeight] = useState("");
  const[ validHeight, setValidHeight] = useState(true);
  const[ weight, setWeight] = useState("");
  const[ validWeight, setValidWeight] = useState(true);
  const[calcu,setCalcu]= useState("");
  
  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  const[validimage,setValidImage]= useState(true);

  const[userData, setUserData] = useState([]);
  const[validUserData, setValidUserData] = useState(true);

  const changeHandler = (e,name)=>{
    
    let integer = /^[-+]?[0-9]+\.[0-9]+$/;
    let letters = /^[A-Za-z]+$/;
    if(name === "firstName"){
      setFirstName(e.target.value);
      if(!e.target.value.match(letters)){
      
      console.log("enter valid name")
      setValidFirstName(false)
    }
    else{
      setValidFirstName(true);
    }
    }
    else if(name === "age"){
      setAge(e.target.value);
      if(isNaN(e.target.value)){
        setValidAge(false);
      }
      else{
        setValidAge(true);
      }
    }
    else if(name === "gender"){
      setGender(e.target.value);
    }
    else if(name === "height"){
      setHeight(e.target.value);
      if(!e.target.value.match(integer)){
       setValidHeight(false);
    }
    else{
      setValidHeight(true);
    }
    }
    else if(name === "weight"){
      setWeight(e.target.value);
      if(!e.target.value.match(integer)){
       setValidWeight(false);
    }
    else{
      setValidWeight(true);
    }
    }
    else{
      setLastName(e.target.value);
      if(!e.target.value.match(letters)){
       setValidLastName(false);
    }
    else{
      setValidLastName(true);
    }
    }
  };

  
  const isValidFileUploaded=(file)=>{
    const validExtensions = ['png']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }

	const imageHandler = (event) => {
		setSelectedFile(URL.createObjectURL(event.target.files[0]));
    const file = event.target.files[0];
    if(isValidFileUploaded(file)){
      setValidImage(true);
      
    }
    else{
      setValidImage(false);
      console.log("invalid png");
      //file is invalid
    }
		setIsSelected(true);
	};

  const calculateBmi = () => {
    let h=Number((height*0.304)*(height*0.304));
    let bmi=Number(weight)/h;
       
    setCalcu(bmi);

    if(firstName && lastName && age && gender && height && weight){
      

      let user = {id: userData.length,
        firstName: firstName, 
        lastName:lastName,
        age:age,
        gender:gender,
        bmi: bmi};
      
        setUserData([...userData,user]);
        setValidUserData(true);
        // let finalData=[...userData,user];
        const data = localStorage.getItem("userData");

       const finalData= JSON.parse(data);

        console.log(finalData);
        localStorage.setItem("userData",JSON.stringify([...finalData,user]));
    }
    else{
        setValidUserData(false);
    }
        
        
  }
  


  return (
  
    
   <>
   <Link to="UserData">User Data</Link>

    <Stack gap="25px" sx={{flexDirection : {lg: 'row'}, pb:'30px', pt:'10px',
            alignItems:'center'}}>
            {!validfirstName && <h6>Enter Valid First Name</h6> }
<TextField
          required
          id="outlined-required"
          label="First Name" value={firstName} onChange={(e) => changeHandler(e,"firstName")}/>
    {!validlastName && <h6>Enter Valid Last Name</h6> }
    <TextField
          required
          id="outlined-required"
          label="Last Name" value={lastName} onChange={(e) => changeHandler(e,"lastName")}/>
</Stack>
<Stack gap="25px" sx={{flexDirection : {lg: 'row'}, pb:'30px', pt:'10px',
            alignItems:'center'}}>
            {!validAge && <h6>Enter Valid Age</h6> }
<TextField
          required
          id="outlined-required"
          label="Age"  value={age} onChange={(e) => changeHandler(e,"age")} />
 <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
    value={gender} onChange={(e) => changeHandler(e,"gender")} 
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
  </RadioGroup>
</FormControl>

<label htmlFor="raised-button-file">
  <Button variant="contained"
  component="span" >
    Profile Pic
  <input
  accept="image/*"
  style={{ display: 'none' }}
  id="raised-button-file"
  multiple
  type="file"
  onChange={imageHandler}
/>
  </Button>
  {isSelected ? (
				<div>
          {validimage ? 
          <img style={{maxWidth: "100px"}} src={selectedFile} /> : 
          <h1 style={{color: "red"}}> Please upload valid PNG image</h1>
}
				
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
</label> 
</Stack>
        <Stack sx={{ gap: {lg:'35px', xs:"20px"}}}>
            <Typography variant='h4' textTransform="capitalize" style={{ fontWeight: 400 }}>Please Enter Below Details:</Typography>
            <Box position="relative" mb="20px">
            <span>Your Height:</span>
            <Stack gap="25px" sx={{flexDirection : {lg: 'row'}, pb:'30px', pt:'10px',
            alignItems:'center'}}>
        
          
          <TextField 
           required id="outlined-required" label="Feet" value={height} onChange={(e) => changeHandler(e,"height")}/>
          {!validHeight && <h6>Enter Valid Height</h6> }
          </Stack>
          
          
          <Stack gap="25px" sx={{flexDirection : {lg: 'row'}, pb:"100px",
            alignItems:'center'}}>
        <Stack>
        <span>Your Weight:</span> 
          <TextField 
           required id="outlined-required" label="Kg" value={weight} onChange={(e) => changeHandler(e,"weight")}/>
           {!validWeight && <h6>Enter Valid Weight</h6> }
          </Stack>
          </Stack>
          
          <Stack spacing={7} direction="row">
          <Button className='search-btn' sx={{ bgcolor: '#FF2625',
          color: '#fff', textTransform: 'none', width:{
            lg: '175px', xs: '80px'},
            fontSize:{ lg: '20px' ,xs: '14px'}, height: '56px',
          }} onClick={calculateBmi}> Calculate Now </Button>
          {!validUserData && <h6>Enter All Details</h6> }
        
          
         
          <Stack>
          <h4>Your BMI result : {firstName }{` `}{lastName}</h4>
          <Slider disabled value={Number(calcu)} aria-label="Disabled slider" />
          <Typography style={{ fontWeight: 600,borderRadius: 2,fontSize: '0.875rem' }}>{`   `}{calcu}</Typography>
          </Stack>
          
          </Stack>
          </Box>
      </Stack>
      </>
  )
}

export default BMI

