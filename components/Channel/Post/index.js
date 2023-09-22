import React from 'react';
import { Flex } from '@chakra-ui/react';
import PostItem from './PostItem';

const ChannelPost = ({ posts, avatar, channelName, channelId }) => {
  return (
    <>
      <h3>Post</h3>
      <Flex alignContent={'center'} w={`100%`} direction={'column'} mt={4}>
        {posts?.map((post) => (
          <PostItem post={post} avatar={avatar} channelName={channelName} key={post.title} channelId={channelId} />
        ))}
      </Flex>
    </>
  )
}

export default React.memo(ChannelPost);
