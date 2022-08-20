import { EditIcon } from "@chakra-ui/icons";
import { Badge, Box, Checkbox, CheckboxGroup, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TaskCard = ({
  id,
  title,
  description,
  tags,
  subTask,
  colorScheme = "green",
}) => {

  const [checkBox, setCheckBox] = useState(()=>{
    let data = subTask.filter((item)=>{
      return item.status && item.subTitla
    }).map((item)=>{
      return item.subTitla
    })
    return data
  })
  return (
    <Box
      border="1px solid red"
      width="230px"
      padding={"10px"}
      marginLeft="10px"
    >
      <Flex justifyContent="space-between">
        <Text>{title}</Text>
       <Link to={`/task/${id}`}><EditIcon /></Link> 
      </Flex>
      <Box>
        <Stack>
          {tags.length > 0 &&
            tags.map((el) => <Badge colorScheme={colorScheme}>{el}</Badge>)}
        </Stack>
      </Box>
      <Text>{description}</Text>
      <Box>
        <CheckboxGroup value={checkBox}>
          {subTask.length>0 && subTask.map((el)=>{
            return <Checkbox value={el.subTitla} size="md">{el.subTitla}</Checkbox>
          })}
        </CheckboxGroup>
      </Box>
    </Box>
  );
};

export default TaskCard;
