import { Flex, Text, Tooltip, useToast } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { userVerifyTask } from '../../../../services';

const TaskItem = ({ task, index, userInfor }) => {
  const toast = useToast();
  const isSubcribed = useMemo(() => {
    return task.userAddress.find(address => address === userInfor?.user?.walletAddress);
  }, [task]);

  const verifyTask = async() => {
    if (isSubcribed) return;
    let status = true;
    let message = "Verify task success!"
    try {
      await userVerifyTask(task._id);
    } catch (err) {
      status = false;
      message = "Verify task failed!"
    }
    toast({
      title: message,
      status: status ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
      position: 'top'
    })
  }

  return (
    <Flex py={8} alignItems={'center'}>
      <Tooltip label={isSubcribed ? 'Verified' : 'Verify task'}>
        <CheckCircleIcon
          w={'40px'}
          h={'40px'}
          mr={6}
          color={isSubcribed && 'green.700'}
          cursor={'pointer'}
          onClick={verifyTask}
        />
      </Tooltip>
      <Flex direction={'column'}>
        <Text as={'h5'} mb={2}>{index+1}. {task.name}</Text>
        <Text as="p" mb={2}>{task.description}</Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(TaskItem);
