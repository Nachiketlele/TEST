import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import {useSearchParams} from "react-router-dom"
import { logoutAPI } from "../redux/authreducer/action";

const Sidebar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const {tasks} = useSelector((state)=>state.data)
  const PersonalTask = tasks.filter((item)=>item.tags.includes("Personal"))
  const OfficialTask = tasks.filter((item)=>item.tags.includes("Official"))
  const OtherTask = tasks.filter((item)=>item.tags.includes("Others"))
  const [search, setSearch] = useSearchParams()
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAPI());
  };
  
  const [select, setSelect] = useState(search.getAll("tags")||[])
  
  
  const handleTagchange = (tag) =>{
      let newTags = [...select]
      if(select.includes(tag)){
        newTags.splice(newTags.indexOf(tag),1)
      }else{
        newTags.push(tag)
      }
      setSelect(newTags)
  }
  useEffect(()=>{
    if(select){
      setSearch({tags:select})
    }
  },[select,search])
  return (
    <Box border="1px solid red" width="250px" height="100vh">
      <Stack direction="column">
        <Box border="1px solid red" height="15vh"></Box>
        <Box border="1px solid blue" height="70vh">
          <Flex direction="column" margin="5px" gap={"5px"}>
            <Box border="1px solid blue" padding="5px 0" onClick={()=>handleTagchange("All")} backgroundColor={select.includes("All")?"blue.400":"blue.100"}>
              <Flex justifyContent="space-between">
                <Text>ALL</Text>
                <Text>4</Text>
              </Flex>
            </Box>
            <Box border="1px solid blue" onClick={()=>handleTagchange("Personal")} backgroundColor={select.includes("Personal")?"yellow.400":"yellow.100"}>
              <Flex justifyContent="space-between">
                <Text>Personal</Text>
                <Text>{PersonalTask.length}</Text>
              </Flex>
           </Box>
            <Box border="1px solid blue" onClick={()=>handleTagchange("Official")} backgroundColor={select.includes("Official")?"purple.400":"purple.100"}>
              <Flex justifyContent="space-between">
                <Text>Official</Text>
                <Text>{OfficialTask.length}</Text>
              </Flex>
            </Box>
            <Box border="1px solid blue" onClick={()=>handleTagchange("Others")} backgroundColor={select.includes("Others")?"green.400":"green.100"}>
              <Flex justifyContent="space-between">
                <Text>Others</Text>
                <Text>{OtherTask.length}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box border="1px solid black" height="10vh">
          <Button width="100%" onClick={handleLogout}>
            {isAuth ? "LOGOUT" : "LOGIN"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
