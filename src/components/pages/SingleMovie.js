
import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { getThePerticularMoviesDetails, getTheSingleMovieDetails } from '../../service/APIcalls'
import { MdEdit } from "react-icons/md";

const SingleMovie = () => {

    const [singleMovieDetail, setSingleMovieDetail] = useState({});

    const { movieId } = useParams()
    useEffect(() => {

        if (movieId) {
            getTheMovieDeatail(movieId)
        }

    }, [movieId])
    const getTheMovieDeatail = async () => {
        const res = await getThePerticularMoviesDetails(movieId)
        setSingleMovieDetail(res.data.singleMovieDetails)
    }

    return (
        <Layout>

        
            {singleMovieDetail &&
                <div style={{height:"100vh",overflow:"hidden"}} className='singlemoviesdetails ps-5 '>

                    <div  style={{paddingBottom:"56px",height:"98vh",overflow:"auto"}} >
                        <div className='card mt-2' style={{ width: "80vw" }}>
                            <img style={{ height: "180px" }} className="card-img-top" src={singleMovieDetail.image}  alt="movie image" />
                            <div style={{ backgroundColor: "#2F2B29", color: "white" }} className="card-body">
                                <p style={{ fontWeight: "500", lineHeight: "25px" }} className="card-title">{singleMovieDetail.movieName}</p>
                                <hr />
                                <p style={{ fontWeight: "500", lineHeight: "25px" }}>yearOfRelease <span className='details'>{singleMovieDetail.yearOfRelease}</span> </p>
                                <hr />
                                <p style={{ fontWeight: "500", lineHeight: "25px" }} className='d-flex gap-2'>stars <span> {singleMovieDetail.actors && singleMovieDetail.actors.map((star, i) => (
                               
                                   <span key={i} className='details'> {star.actorsName} .</span>
                                ))} </span>
                                </p>
                                <hr/>

                                <p style={{ fontWeight: "500", lineHeight: "25px" }}>producer <span className='details'> {singleMovieDetail && singleMovieDetail.producer && singleMovieDetail.producer.producerName}</span></p>
                                <p className='mb-0'><Link to={`/editmovie-details/${singleMovieDetail._id}`}> <button className='btn btn-primary'><MdEdit /> edit</button></Link> </p>
                            </div>
                        </div>
                    </div>
                
                </div>
            }
        </Layout>

    )
}

export default SingleMovie