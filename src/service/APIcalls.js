import axios from "axios"

const URL="https://imdb-backend-1ya2.onrender.com/"

export const registerUser=async(userName,email,password)=>{
try {

    const res=await axios.post(URL+"users/user-signIn",{
     userName,email,password
    })
    return res
} catch (error) {
    console.log(error)
}
}

export const loginUser=async(email,password)=>{
    try {
        const response=await axios.post(URL+"users/user-login",{email,password})
        return response
    } catch (error) {
        console.log(error)
    }
}

export const createNewProducerAndActors=async(producer,actors)=>{
try {
    const response=await axios.post(URL+"producers-actors/create-producer/create-actors",{
        producer,
        actors
    })

    return response
} catch (error) {
    console.log(error)
}
  
    
}

export const getTheAllActorsAndProducers=async()=>{
    try {
        const res=await axios.get(URL+"producers-actors/all-actors/all-producers")
    return res
    } catch (error) {
        console.log(error)
    }
    
}

export  const createNewMovies=async(movieName, yearOfRelease, actors,producer,token)=>{
    try {
        const res=await axios.post(URL+"movies/create-movies",{
            movieName, yearOfRelease,actors,producer
        },{
            headers:{
                token
            }
        }
        
        );
        return res
    
    } catch (error) {
     console.log(error)   
    }
  
}

export const getAllMoviesLists=async()=>{
    try {
        const res=await axios.get(URL+"movies/get-allmovies")
    return res
    } catch (error) {
        console.log(error)
    }    
}

export const getThePerticularMoviesDetails=async(id)=>{
    try {
        const res=await axios.get(URL+`movies/getperticularmovie/${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
  
}

export const updateTheMovieDetails=async(token,movieId,movieName,yearOfRelease,actors,producer)=>{
    try {
        const res=await axios.put(URL+`movies/updatethemoviesdetails/${movieId}`,{
            movieName,yearOfRelease,actors,producer
        },
    {
        headers:{
            token
        }
    }
        )
    return res
    } catch (error) {
        console.log(error)
    }
   
}