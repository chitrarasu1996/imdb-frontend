import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Form, Label, Button, Input, FormGroup } from 'reactstrap'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { createNewMovies, createNewProducerAndActors, getTheAllActorsAndProducers} from '../../service/APIcalls';
import { Modal } from "antd"
import { Select } from "antd"
import { mycontext } from '../../App';

const { Option } = Select
const Addmovies = () => {


  const {token,setToken} = useContext(mycontext);
  const [visibleBtn,setVisibleBtn]=useState(false)

  useEffect(() => {
if(!token){
  setVisibleBtn(false)
}else{
  setVisibleBtn(true)
}
  }, [token]);
const navigate=useNavigate()
  const [visible, setVisible] = useState(false)
  const [allActors,setAllActors]=useState([]);
  const [allProducer,setAllProducers]=useState([])
  const [imageName,setImageName]=useState('')
const [newProducer,setNewProducer]=useState("")
const [newActors,setNewActors]=useState("")
  const [moviesDetails, setMoviesDetails] = useState({
    movieName: "",
    imageBase64:"",
    yeasOfRealease:undefined,
    actors:[],
    producer: ""
  })


  useEffect(() => {
    // Clear all toasts when the component unmounts
    return () => {
      toast.dismiss();
    };
  }, []);

  useEffect(()=>{
 
getAllActors()
  },[])

  const getAllActors=async()=>{
    try {
      const response=await getTheAllActorsAndProducers()
      setAllProducers(response.data.allProducer)
      setAllActors(response.data.allActorsName)
    } catch (error) {
      console.log(error)
    }
  }
  const submitted = async (e) => {
    try {
      e.preventDefault()
      if(moviesDetails.actors.length===0||moviesDetails.producer.length===0){
       return toast.error("Please enter valid producer or actors")
      }
      if(!moviesDetails.imageBase64){
        toast.error("movie image required")
      }
      const response = await createNewMovies(moviesDetails.movieName, moviesDetails.yeasOfRealease, moviesDetails.actors,moviesDetails.producer,token,moviesDetails.imageBase64)

      if (response.data.result) {
        
        toast.success(response.data.message)
navigate('/')

      } else {
       
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addnewActorsAndProducer=async()=>{
    try {
      setVisible(false)
      const response=await createNewProducerAndActors(newProducer,newActors)
  setNewProducer("")
  setNewActors("")
      if(response.data.result){
      toast.success(response.data.message)
   getAllActors()
    }else{

      toast.error(response.data.message)
    }
    } catch (error) {
      console.log(error)
    }
  }
  const uploadImage=(image)=>{
    setImageName(image.name)
    const reader=new FileReader;
reader.readAsDataURL(image)
    reader.onload=()=>{
      console.log(reader.result,"result")
         setMoviesDetails({...moviesDetails,imageBase64:reader.result})
    }
reader.onerror=(error)=>{
  console.log("ERROR",error)
}
    
    
  }
  return (
    <Layout>
      <div className='form-container'>
        <div style={{ border: "1px solid #DDDDDD" }} className='ps-5 pe-5 pt-3 pb-3'>
          <div className='pb-2 text-center'><h3>Add movies</h3></div>
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
                  value={moviesDetails.movieName}
                  onChange={(e) => setMoviesDetails({ ...moviesDetails, movieName: e.target.value })}
                  id="exampleEmail1"
                  name="username"
                  placeholder="movie name"
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
                  value={moviesDetails.yeasOfRealease}
                  onChange={(e) => setMoviesDetails({ ...moviesDetails, yeasOfRealease: e.target.value })}
                  id="exampleEmail"
                  name="text"
                  placeholder="Year of release"
                  type="date"
                />
              </FormGroup>
              {' '}
              <FormGroup>

<label  onChange={(e)=>uploadImage(e.target.files[0])} style={{width:"100%"}} className='btn btn-outline-primary'>
  {imageName?imageName: "upload Image"}
<Input 

placeholder='upload Img'
type='file'
hidden
/>
</label>
              </FormGroup>
           
              <FormGroup>
                <Label
                  for="examplePassword"
                  hidden
                >
                  Password
                </Label>
                <Select style={{maxWidth:"250px",maxHeight:"60px",overflow:"auto"}} className='form-select mb-3'
                 bordered={false} 
                 size='large'
                 
                 mode="multiple"  // Set mode to 'multiple' for selecting multiple values
                 placeholder={"Select actors"}
                
                 onChange={(values) => {
                   setMoviesDetails({ ...moviesDetails, actors: values });
                 }}>
                {allActors.length>0 && allActors.map((actor) => (
                  <Option key={actor._id} value={actor._id}>
                    {actor.actorsName}

                  </Option>
                ))}

              </Select>
              </FormGroup>
              <Select className='form-select mb-3' bordered={false} size='large'
                placeholder={"Select a producer"} 
                 onChange={(value) =>setMoviesDetails({...moviesDetails,producer:value})}>
                {allProducer.length>0 && allProducer.map((producer) => (
                  <Option key={producer._id} value={producer._id}>
                    {producer.producerName}

                  </Option>
                ))}

              </Select>
              {' '}
              <div>
                {visibleBtn?
                <button  type="button"className='btn mb-2 text-white' onClick={() => setVisible(true)} style={{ backgroundColor: "#121212" }}>add new Producer or actors</button>
                :
              
               <Link to={"/login"}> <button type="button" className='btn mb-2 text-white'  style={{ backgroundColor: "#121212" }}>Login to add new producer and actor</button></Link>
                
              }
</div>
              <Modal style={{ background: "transperant" }} onCancel={() => setVisible(false)} footer={null} visible={visible}  >
                <div className='d-flex flex-column gap-2'>
                  <Input placeholder='add new producer' value={newProducer} onChange={(e) => setNewProducer(e.target.value) }/>
                  <Input placeholder='add new actors' value={newActors} onChange={(e)=>setNewActors(e.target.value)}/>
               <div><button  className="btn" style={{backgroundColor:"#E2B616"}}onClick={addnewActorsAndProducer}>submit</button></div>
                </div>
              </Modal>

              <Button className="submit-btn" type='submit'>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Addmovies