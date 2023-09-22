import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import TaskItem from './TaskItem';
import { getUserInfo } from '../../../../utils/helpers';
import { claimNFT } from '../../../../services/postService';

const Task = ({ tasks, channelId, postId }) => {
  const toast = useToast();
  const userInfo = getUserInfo();
  const isFinished = useMemo(() => {
    return userInfo?.user?.walletAddress && tasks.find(t =>
      t.userAddress.find(address => address === userInfo?.user?.walletAddress)
    );
  }, [tasks]);

  const claimNft = async () => {
    const receipt = await claimNFT(postId)
    const msg = {
      title: "",
      status: "",
      description: ""
    }
    if (!receipt) {
      msg.title = "Claim NFT failed"
      msg.status = "error"
    } else {
      msg.title = "Claim NFT successful"
      msg.status = "success"
      msg.description = receipt.txHash
    }
    toast({
      ...msg,
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <Flex direction={'column'}>
      <Text as="h4" mb={4}>Tasks</Text>
      {tasks.map((task, index) => (
        <TaskItem key={task._id} task={task} index={index} userInfo={userInfo} channelId={channelId} />
      ))}
      {isFinished && (
        <Button colorScheme="green" onClick={claimNft}>Claim NFT</Button>
      )}
    </Flex>
  )
}

export default React.memo(Task);
