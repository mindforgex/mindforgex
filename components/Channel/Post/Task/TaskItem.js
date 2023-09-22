import { Flex, Text, Tooltip, useToast } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { userVerifyTask } from '../../../../services';

const TaskItem = ({ task, index, userInfo, channelId }) => {
  const toast = useToast();
  const [isSubcribed, setIsSubcribed] = useState(false);
  useEffect(() => {
    const handleSubscribe = () => {
      const hasUser = userInfo?.user?.walletAddress
        && task.userAddress.find(address => address === userInfo?.user?.walletAddress);
      setIsSubcribed(hasUser)
    }
    handleSubscribe && handleSubscribe();
  }, [task]);

  const verifyTask = async () => {
    if (isSubcribed) return;
    const res = await userVerifyTask(task._id, { channelId });
    res && setIsSubcribed(true);
    toast({
      title: res ? "Verify task success!" : "Verify task failed!",
      status: res ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
      position: 'top'
    })
    setTimeout(() => window.location.reload(), 1000);
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
        <Text as={'h5'} mb={2}>{index + 1}. {task.name}</Text>
        <Text as="p" mb={2}>{task.description}</Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(TaskItem);
