import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import TaskItem from './TaskItem';
import { getUserInfo } from '../../../../utils/helpers';

const Task = ({ tasks, channelId }) => {
  const userInfo = getUserInfo();
  const isFinished = useMemo(() => {
    return userInfo?.user?.walletAddress && tasks.find(t => 
      t.userAddress.find(address => address === userInfo?.user?.walletAddress)
    );
  }, [tasks]);

  const claimNft = () => {
    console.log('On handle claim item')
  }

  return (
    <Flex direction={'column'}>
      <Text as="h4" mb={4}>Tasks</Text>
      { tasks.map((task, index) => (
        <TaskItem key={task._id} task={task} index={index} userInfo={userInfo} channelId={channelId} />
      ))}
      { isFinished && (
        <Button colorScheme='messenger' onClick={claimNft}>Claim NFT</Button>
      )}
    </Flex>
  )
}

export default React.memo(Task);
