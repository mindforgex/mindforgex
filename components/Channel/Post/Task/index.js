import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import TaskItem from './TaskItem';
import { getUserInfo } from '../../../../utils/helpers';
import { claimNFT } from '../../../../services/postService';

const Task = ({ tasks, channelId, postId }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false)
  const userInfo = getUserInfo();
  const isFinished = useMemo(() => {
    return userInfo?.user?.walletAddress && tasks.find(t =>
      t.userAddress.find(address => address === userInfo?.user?.walletAddress)
    ).length === tasks.length);
}, [tasks]);

const claimNft = async () => {
  setIsLoading(true)
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
    msg.description = <a target='_blank' rel='nofollow' href={`https://translator.shyft.to/tx/${receipt.txnSignature}?cluster=devnet`}>{receipt.txnSignature}</a>
  }
  toast({
    ...msg,
    isClosable: true,
    position: 'top',
  })
  setIsLoading(false)
}

return (
  <Flex direction={'column'}>
    <Text as="h4" mb={4}>Tasks</Text>
    {tasks.map((task, index) => (
      <TaskItem key={task._id} task={task} index={index} userInfo={userInfo} channelId={channelId} />
    ))}
    <Button
      size='lg'
      style={{
        cursor: isFinished ? "pointer" : "not-allowed"
      }}
      colorScheme={isFinished ? "green" : "gray"}
      onClick={() => {
        isFinished && claimNft()
      }}
      isLoading={isLoading}
    >Claim NFT</Button>
  </Flex>
)
}

export default React.memo(Task);
