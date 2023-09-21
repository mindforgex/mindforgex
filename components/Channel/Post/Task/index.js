import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import TaskItem from './TaskItem';
import { getUserInfo } from '../../../../utils/helpers';

const Task = ({ tasks }) => {
  const userInfo = getUserInfo();
  const isFinished = useMemo(() => {
    return tasks.find(t => t.userAddress.find(address => address === userInfo?.user?.walletAddress));
  }, [tasks]);

  return (
    <Flex direction={'column'}>
      <Text as="h4" mb={4}>Tasks</Text>
      { tasks.map((task, index) => (<TaskItem key={task._id} task={task} index={index} userInfo={userInfo} />)) }
      { isFinished && (
        <Button>Claim NFT</Button>
      )}
    </Flex>
  )
}

export default React.memo(Task);
