import { Avatar, Flex, Heading, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import Task from "./Task";
import { useTranslation } from "next-i18next";

const PostItem = ({ post, avatar, channelName, channelId }) => {
  const { images } = post;
  const [thumbnail] = images;
  const { t } = useTranslation('common');
  return (
    <Flex
      direction={'column'}
      mt={8}
      borderBottom={2}
      borderBottomColor={'teal.500'}
      borderBottomStyle={'solid'}
      py={8}
    >
      <Heading as='h3' size='lg' mb={4}>{post?.title}</Heading>
      <Flex w={`100%`}>
        <Image
          height={800}
          src={thumbnail}
          alt={post?.title}
          title={post?.title}
        />
      </Flex>
      <Flex alignItems={'center'} my={4}>
        <Avatar src={avatar} title="avatar" />
        <Text as="span" ml={4}>{t('channel.post.by')}</Text>
        <Text as="span" ml={2} fontWeight={'bold'} color={'red'}>{channelName}</Text>
        <Text as="span" ml={2}>{t('channel.post.by', {time: moment(post.createdAt).format('MMMM D, Y')})}</Text>
      </Flex>
      <Text as="p" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}></Text>
      <Task post={post} channelId={channelId} />
    </Flex>
  )
}

export default React.memo(PostItem);
