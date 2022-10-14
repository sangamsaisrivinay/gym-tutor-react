import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import {exerciseOptions, fetchData, youtubeOptions} from '../utils/fetchData'
import {Detail, ExerciseVideos, SimilarExercises} from '../components'
const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail]=useState({})
  const [exerciseVideos, setExerciseVideos]=useState([])
  const id= useParams()
  useEffect(()=>{
    const fetchExercisesData= async()=>{
      const exerciseDbUrl='https://exercisedb.p.rapidapi.com'
      const youtubeSearchUrl='https://youtube-search-and-download.p.rapidapi.com'
      
      const exerciseDetailData= await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions)
      console.log(exerciseDetailData)
      setExerciseDetail(exerciseDetailData)

      const exerciseVideoData= await fetchData(`${youtubeSearchUrl}/search?q=${exerciseDetailData.name}`, youtubeOptions)
      setExerciseVideos(exerciseVideoData.contents)
    }
  })
  return (
    <Box>
      <Detail ExerciseDetail={exerciseDetail}/>
      {/*console.log('in exerciseDetail', exerciseDetail)*/}
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
      <SimilarExercises/>
    </Box>
  )
}

export default ExerciseDetail