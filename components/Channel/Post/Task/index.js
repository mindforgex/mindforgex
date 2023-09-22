import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import TaskItem from './TaskItem';
import { getUserInfo } from '../../../../utils/helpers';
import { claimNFT } from '../../../../services/postService';

const Task = ({ tasks, channelId, post }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false)
  const userInfo = getUserInfo();
  const isFinished = useMemo(() => {
    return userInfo?.user?.walletAddress && tasks.find(t =>
      t.userAddress.find(address => address === userInfo?.user?.walletAddress)
    );
  }, [tasks, userInfo?.user?.walletAddress]);
  const isClaimed = useMemo(() => (Array.isArray(post?.userAddress) && post?.userAddress?.includes(userInfo?.user?.walletAddress)), [post?.userAddress, userInfo?.user?.walletAddress])
  const isClaimable = isFinished && !isClaimed


  const claimNft = async () => {
    setIsLoading(true)
    const receipt = await claimNFT(post._id)
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
          cursor: isClaimable ? "pointer" : "not-allowed"
        }}
        colorScheme={isClaimable ? "green" : "gray"}
        onClick={() => {
          if (isClaimable) {
            claimNft()
          }
        }}
        isLoading={isLoading}
      >
        {isClaimed ? "Claimed" : "Claim NFT"}
      </Button>
    </Flex>
  )
}

export default React.memo(Task);
