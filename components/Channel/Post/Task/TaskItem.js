import { Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons'

const TaskItem = ({ task, index, userInfor }) => {
  const isSubcribed = useMemo(() => {
    return task.userAddress.find(address => address === userInfor?.user?.walletAddress);
  }, [task]);

  return (
    <Flex py={8} alignItems={'center'}>
      <CheckCircleIcon w={'40px'} height={'40px'} mr={6} color={isSubcribed && 'green.700'}/>
      <Flex direction={'column'}>
        <Text as={'h5'} mb={2}>{index+1}. {task.name}</Text>
        <Text as="p" mb={2}>{task.description}</Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(TaskItem);
