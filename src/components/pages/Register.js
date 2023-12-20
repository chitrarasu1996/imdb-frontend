import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { Form,Label,Button,Input,FormGroup } from 'reactstrap'
import toast from 'react-hot-toast';
import { registerUser } from '../../service/APIcalls';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
  const [userDetails,setUserDetails]=useState({
    userName:"",
    password:"",
    confirmPassword:"",
    email:""
  }) 

  const navigate=useNavigate()
  const verfiyFields=()=>{
 if(userDetails.password!==userDetails.confirmPassword||userDetails.confirmPassword.length<=3||userDetails.password<=3){
  
toast.error("password and confirm password shold be same or password length shold be more than 3 characters")
return false
 }else if(userDetails.userName.length<3){
 toast.error("username should be greater than three charactors")
 return false
 }
return true
  }
  const submitted=async(e)=>{
try {
  e.preventDefault()
  const verifiedDetails=await verfiyFields(userDetails)
  if(verifiedDetails){
    const response=await registerUser(userDetails.userName,userDetails.email,userDetails.password)
  if(response.data.result){
   
    navigate("/login")
    setTimeout(() => {
      toast.success(response.data.message)
    }, 2000);
  }else{
    toast.error(response.data.message)
  }
    
  }


} catch (error) {
  console.log(error)
}
  }
  return (
  <Layout>
    <div className='form-container'>
    <div className='imdb-tittle mb-2'>IMDb</div>
     <div style={{border:"1px solid #DDDDDD"}} className='ps-5 pe-5 pt-3 pb-3'>
      <div className='pb-2'><h3>Create account</h3></div>
      <div>
      <Form onSubmit={submitted}>
      <FormGroup>
    <Label
      for="firstName"
      hidden
    >
      first and last name
    </Label>
    <Input
    value={userDetails.userName}
    onChange={(e)=>setUserDetails({...userDetails,userName:e.target.value})}
      id="exampleEmail1"
      name="username"
      placeholder=" first and last name"
      type="text"
      required
    />
  </FormGroup>
  <FormGroup>
    <Label
      for="exampleEmail"
      hidden
    >
      Email
    </Label>
    <Input
       required
     value={userDetails.email}
     onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
      id="exampleEmail"
      name="email"
      placeholder="Email"
      type="email"
    />
  </FormGroup>
  {' '}
  <FormGroup>
    <Label
      for="examplePassword"
      hidden
    >
      Password
    </Label>
    <Input
       required
     value={userDetails.password}
     onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
      id="examplePassword"
      name="password"
      placeholder="Password"
      type="password"
    />
  </FormGroup>
  <FormGroup>
    <Label
      for="examplePassword"
      hidden
    >
      Confirm Password
    </Label>
    <Input
       required
     value={userDetails.confirmPassword}
     onChange={(e)=>setUserDetails({...userDetails,confirmPassword:e.target.value})}
      id="examplePassword1"
      name="password1"
      placeholder="Confirm Password"
      type="password"
    />
  </FormGroup>
  {' '}
  <Button  className="submit-btn" type='submit'>
    Submit
  </Button>
  <div className='pt-2'>
Already have an account? <span><Link to={"/login"}>login</Link></span>
</div>
</Form>
</div>
</div>
    </div>
    </Layout> 
  )
}

export default Register