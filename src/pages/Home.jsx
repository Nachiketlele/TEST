
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { gettask } from "../redux/appreducer/action";
import TaskCard from "./TaskCard";


const Home = () => {
  const {tasks} = useSelector((state)=>state.data)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()


  const getHandler = useCallback(()=>{
       dispatch(gettask())
  },[dispatch])
  useEffect(()=>{
    if(tasks.length === 0){
      getHandler()
    }
  },[])

  const filterTags = (task) =>{
    const parmsTag = searchParams.getAll("tags")
  if(parmsTag.includes("All")|| parmsTag.length===0){
    return task
  }
    let data = task.tags.filter((tag)=>{
      if(parmsTag.includes(tag)){
        return true
      }
       return false
    })
   if(data.length){
    return task
   }else{
    return false
   }
  }
  return (
       <Box border="1px solid green" width="100%">
        <Flex justifyContent="space-around">
           <Box border="1px solid black"  width="250px"  height="95vh">
              <Box>
                <Text textAlign="center">TODO</Text>
              </Box>
              {tasks.length>0 && tasks.filter((item)=>item.status==="todo").filter(filterTags).map((item)=>{
                return <TaskCard  colorScheme="red" key={item.id} {...item}/>
              })}
           </Box>

           <Box border="1px solid black"  width="250px"  height="95vh">
           <Box>
                <Text textAlign="center">IN-PROGESS</Text>
              </Box>
              {tasks.length>0 && tasks.filter((item)=>item.status==="in-Progress").filter(filterTags).map((item)=>{
                return <TaskCard colorScheme="yellow" key={item.id} {...item}/>
              })}
           </Box>

           <Box border="1px solid black"  width="250px"  height="95vh">
           <Box>
                <Text textAlign="center">DONE</Text>
              </Box>
              {tasks.length>0 && tasks.filter((item)=>item.status==="done").filter(filterTags).map((item)=>{
                return <TaskCard colorScheme="green" key={item.id} {...item}/>
              })}
           </Box>
        </Flex>
       </Box>
  );
};

export default Home;
