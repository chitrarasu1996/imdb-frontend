import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Form,Label,Button,Input,FormGroup } from 'reactstrap'
import toast from 'react-hot-toast';
import { loginUser } from '../../service/APIcalls';
import { Link, useNavigate } from 'react-router-dom';
import { mycontext } from '../../App';
const Login = () => {

  const {token,setToken} = useContext(mycontext);
  const navigate=useNavigate()
  const [userDetails,setUserDetails]=useState({
    password:"",
    email:""
  }) 
  useEffect(() => {
      // Clear all toasts when the component unmounts
      toast.dismiss(); 
  }, []);
  const verifyFields = () => {
    if (userDetails.password.length < 3) {
      toast.error("Password length should be more than 3 characters");
      return false;
    }
    return true;
  };

     const submitted=async(e)=>{
      try {
        e.preventDefault()
        const verifiedDetails= verifyFields(userDetails)
        if(verifiedDetails){
          const response=await loginUser(userDetails.email,userDetails.password)

          if(response.data.result){
            localStorage.setItem("token",response.data.token)
            setToken(response.data.token)
            navigate("/") 
        }else if(!response.data.result){
          toast.error(response.data.message)
        } 

        }

      } catch (error) {
        console.log(error)


      }
        }
  return (
    <Layout>
      {!token?
    <div className='form-container'>
    <div className='imdb-tittle mb-2'>IMDb</div>
     <div style={{border:"1px solid #DDDDDD"}} className='ps-5 pe-5 pt-3 pb-3'>
      <div className='pb-2 text-center'><h3>Login</h3></div>
      <div>
      <Form onSubmit={submitted}>
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

  {' '}
  <Button type='submit' className='submit-btn' >
    Submit
  </Button>
  <div className='pt-2'>
 create account<span className='ps-2'><Link to={"/register"}>singIn</Link></span></div>
</Form>
</div>
</div>
    </div>:
    <div className='old-user'>your already logged</div>
    }
    </Layout> 
  )
}

export default Login