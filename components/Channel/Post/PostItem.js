import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import Task from "./Task";

const PostItem = ({ post, avatar, channelName }) => {
  const { images } = post;
  const [thumbnail] = images;

  return (
    <Flex
      direction={'column'}
      mt={8}
      borderBottom={2}
      borderBottomColor={'teal.500'}
      borderBottomStyle={'solid'}
      py={8}
    >
      <Flex w={`100%`}>
        <Image
          height={800}
          src={thumbnail}
          alt={post?.title}
          title={post?.title}
        />
      </Flex>
      <Flex alignItems={'center'}>
        <Avatar src={avatar} title="avatar"/>
        <Text as="span" ml={4}>By</Text>
        <Text as="span" ml={2} fontWeight={'bold'} color={'red'}>{channelName}</Text>
        <Text as="span" ml={2}>in {moment(post.createdAt).format('MMMM D, Y')}</Text>
      </Flex>
      <Text as="p" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}></Text>
      <Task tasks={post.tasks} />
    </Flex>
  )
}

export default React.memo(PostItem);
