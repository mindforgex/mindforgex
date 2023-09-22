import React from 'react';
import { Flex } from '@chakra-ui/react';
import PostItem from './PostItem';

const ChannelPost = ({ posts, avatar, channelName, channelId }) => {
  return (
    <>
      <Flex alignContent={'center'} w={`100%`} direction={'column'} mt={4}>
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} avatar={avatar} channelName={channelName} channelId={channelId} />
        ))}
      </Flex>
    </>
  )
}

export default React.memo(ChannelPost);
