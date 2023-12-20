import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { Form,Label,Button,Input,FormGroup } from 'reactstrap'
import { Modal } from "antd"
import { Select } from "antd"
import { createNewMovies, createNewProducerAndActors, getTheAllActorsAndProducers, getThePerticularMoviesDetails, updateTheMovieDetails } from '../../service/APIcalls'


const { Option } = Select
const Editmovies = () => {
const {movieid}=useParams()

const [visible, setVisible] = useState(false)
const [allActors,setAllActors]=useState([]);
const [allProducer,setAllProducers]=useState([])
const [newProducer,setNewProducer]=useState("")
const [newActors,setNewActors]=useState("")
const [moviesDetails, setMoviesDeatils] = useState({
  movieName: "",
  yeasOfRealease:"",
  actors:[],
  producer: ""
})


useEffect(()=>{
getTheMovieDetails()
},[movieid])



useEffect(() => {
    // Clear all toasts when the component unmounts
    return () => {
      toast.dismiss();
    };
  }, []);

  const getTheMovieDetails=async()=>{
    try {
        const res=await getThePerticularMoviesDetails(movieid)
if(res.data.result){
    setMoviesDeatils({
        ...moviesDetails,
        movieName: res.data.singleMovieDetails.movieName,

        yeasOfRealease: res.data.singleMovieDetails.yearOfRelease,
        actors: res.data.singleMovieDetails.actors.map((actor)=>actor._id),
        producer: res.data.singleMovieDetails.producer._id,
    })
}
    } catch (error) {
        console.log(error)
    }
  }
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


const navigate=useNavigate()
    useEffect(()=>{
const data=localStorage.getItem("token")
if(!data) navigate("/login")
    },[])
    const submitted = async (e) => {
        try {
          e.preventDefault()
          if(moviesDetails.actors.length===0||moviesDetails.producer.length===0){
           return toast.error("Please enter valid producer or actors")
          }
          const token=await localStorage.getItem("token")
          const response = await updateTheMovieDetails(token,movieid,moviesDetails.movieName,moviesDetails.yeasOfRealease,moviesDetails.actors,moviesDetails.producer)
          if (response.data.result) {    
            navigate("/")         
          } else {
           
            toast.error(response.data.message)
          }
        } catch (error) {
          console.log(error)
        }
      }
      const addnewActorsAndProducer=async(e)=>{
        try {
            e.preventDefault()
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

  return (
    <Layout>
    <div className='form-container'>
      <div className='imdb-tittle mb-2'>IMDb</div>
      <div style={{ border: "1px solid #DDDDDD" }} className='ps-5 pe-5 pt-3 pb-3'>
        <div className='pb-2'><h3>Edit movies</h3></div>
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
                onChange={(e) => setMoviesDeatils({ ...moviesDetails, movieName: e.target.value })}
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
                
              </Label>
              <Input
                required
   
                value={moviesDetails.yeasOfRealease}
                onChange={(e) =>{
                    const onlyNum=e.target.value.replace(/\D/g, '')
                
                    setMoviesDeatils({...moviesDetails,yeasOfRealease:onlyNum})
                    
                }}
                id="exampleEmail"
                name="text"
                placeholder="Year of release"
           
              />
            </FormGroup>
            {' '}
            <FormGroup>
              <Label
                for="examplePassworda"
                hidden
              >
              </Label>
              <Select
        style={{  maxWidth:"200px", maxHeight: "60px", overflow: "auto" }}
        className='form-select mb-3'
        bordered={false}
        size='large'
        mode="multiple"
        placeholder="Select actors"
     value={moviesDetails.actors}
        onChange={(values) => {
          setMoviesDeatils({ ...moviesDetails,actors:values });
        }}
      >

        {allActors.length > 0 &&
          allActors.map((actor) => (
            <Option key={actor._id}  value={actor._id}>
              {
                actor.actorsName
              }
            </Option>
          ))}
      </Select>
            </FormGroup>
            <Select className='form-select mb-3' bordered={false} size='large'
              placeholder={"Select a producer"} 
              value={moviesDetails.producer}
               onChange={(value) =>setMoviesDeatils({...moviesDetails,producer:value})}>
              {allProducer.length>0 && allProducer.map((producer) => (
                <Option key={producer._id} value={producer._id}>
                  {producer.producerName}

                </Option>
              ))}

            </Select>
            {' '}
            <div>
              <button type='button' className='btn mb-2 text-white' onClick={() => setVisible(true)} style={{ backgroundColor: "#121212" }}>add new Producer or actors</button>
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

export default Editmovies