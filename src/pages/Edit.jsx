import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { gettask, updatetask } from "../redux/appreducer/action";

const Edit = () => {
    const {id} = useParams()
    const {tasks} = useSelector((state)=>state.data)
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, setTasktags] = useState([]);
  const [current, setCurrent] = useState("");
  const [subTask, setSubtask] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  const dispatch = useDispatch()

  const updatehandler=(type)=>{
    if(type==="text&Description"){
        dispatch(updatetask(id,{
            title:taskTitle,
            description:taskDescription
        })).then((r)=>dispatch(gettask()))
    }
    
}

  useEffect(()=>{
    dispatch(gettask())
  },[])

useEffect(()=>{
    if(tasks){
        const currentTask = tasks.find((item)=>item.id===Number(id))
        if(currentTask){
            setTaskTitle(currentTask.title)
            setTaskDescription(currentTask.description)
            setTaskStatus(currentTask.status)
            setTasktags(currentTask.tags)
            setSubtask(currentTask.subTask)
            let data = currentTask.subTask.filter((item)=>{
                return item.status && item.subTitla
            }).map((item)=>item.subTitla)
            setCheckBox(data)
        }
    }
},[])


  return (
    <Box border={"1px solid green"} width="100%">
      <Flex justifyContent={"space-around"} height="100vh">
        <Box border={"1px solid red"} width="200px">
          <Box>
            <Stack>
              <Input
                placeholder="Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Editable value={taskDescription}>
                <EditablePreview />
                <EditableTextarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Editable>
              <Button onClick={()=>{updatehandler("text&Description")}}>Update</Button>
            </Stack>
          </Box>
          <Box>
            <RadioGroup
              onChange={(value) => setTaskStatus(value)}
              value={taskStatus}
            >
              <Stack direction="column">
                <Radio value="todo">Todo</Radio>
                <Radio value="in-progress">In-Progress</Radio>
                <Radio value="done">Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box>
            <Text>Tags</Text>
            <CheckboxGroup colorScheme="green" defaultValue={taskTags}>
              <Stack spacing={[1, 5]} direction={"column"}>
                <Checkbox value="Personal">Personal</Checkbox>
                <Checkbox value="Official">Official</Checkbox>
                <Checkbox value="Others">Others</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Box>

        <Box border={"1px solid blue"} width="350px">
          <form>
            <Flex>
              <Input
                placeholder="ADD NEW TASK"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              />
              <Button type="submit">ADD</Button>
            </Flex>
          </form>
          <Flex direction={"column"}>
            <CheckboxGroup
              value={checkBox}
              onChange={(value) => setCheckBox(value)}
            >
              {subTask.length > 0 &&
                subTask.map((el) => {
                  return (
                    <Flex justifyContent={"space-between"}>
                      <Checkbox value={el.subTitla} size="md">
                        {el.subTitla}
                      </Checkbox>
                      <DeleteIcon/>
                    </Flex>
                  );
                })}
            </CheckboxGroup>
          </Flex>
        </Box>

        <Box border={"1px solid black"} width="250px"></Box>
      </Flex>
    </Box>
  );
};

export default Edit;
