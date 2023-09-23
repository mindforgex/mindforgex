import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import TaskItem from './TaskItem';
import { getUserInfo } from '../../../../utils/helpers';
import { claimNFT } from '../../../../services/postService';
import ClaimNFTButton from '../../../ClaimNFTButton';

const Task = ({ channelId, post }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState(post?.tasks || [])
  const [claimed, setClaimed] = useState(false)

  const userInfo = getUserInfo();
  const isFinished = useMemo(() => {
    if (userInfo?.user?.walletAddress) {
      return tasks.filter(t => {
        return t.userAddress?.includes(userInfo?.user?.walletAddress)
      }).length === tasks.length;
    }
  }, [tasks, userInfo?.user?.walletAddress]);
  const isClaimed = useMemo(() => {
    if (claimed) return claimed
    return Array.isArray(post?.userAddress) && post?.userAddress?.includes(userInfo?.user?.walletAddress)
  }, [claimed, post?.userAddress, userInfo?.user?.walletAddress])
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
      setClaimed(true)
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
      <Text as="h4" my={4}>Tasks</Text>
      {tasks.map((task, index) => (
        <TaskItem
          key={task._id}
          task={task}
          index={index}
          userInfo={userInfo}
          channelId={channelId}
          setTasks={setTasks}
        />
      ))}
      <ClaimNFTButton
        btnProps={{
          style: {
            cursor: isClaimable ? "pointer" : "not-allowed"
          },
          colorScheme: isClaimable ? "green" : "gray",
          onClick: () => {
            if (isClaimable) {
              claimNft()
            }
          },
          isLoading: isLoading,
        }}
        nftData={post.nftId}
      >
        {isClaimed ? "Claimed" : "Claim NFT"}
      </ClaimNFTButton>
    </Flex>
  )
}

export default React.memo(Task);
