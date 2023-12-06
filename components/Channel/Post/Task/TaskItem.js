import { Flex, Link, Text, Tooltip, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { userVerifyTask } from '../../../../services';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { TASK_TYPE } from '../../../../utils/constants';

const TaskItem = ({ task, index, userInfo, channelId, setTasks }) => {
  const toast = useToast();
  const { t } = useTranslation('common');
  const [isSubscribed, setIsSubscribed] = useState(false);
  useEffect(() => {
    const handleSubscribe = () => {
      const hasUser = userInfo?.user?.walletAddress
        && task.userAddress?.find(address => address === userInfo?.user?.walletAddress);
      setIsSubscribed(hasUser)
    }
    handleSubscribe && handleSubscribe();
  }, [task, userInfo?.user?.walletAddress]);

  const verifyTask = async () => {
    if (isSubscribed) return;

    const res = await userVerifyTask(task._id, { channelId });
    if (res) {
      setIsSubscribed(true)
      task.userAddress = (task.userAddress || []).concat(userInfo?.user?.walletAddress)
      setTasks(prev => prev.map(_item => _item._id === task._id ? task : _item))
    }

    toast({
      title: t(`channel.task.${res ? "verify_success" : "verify_failed"}`),
      status: res ? 'success' : 'error',
      isClosable: true,
      position: 'top'
    })
  }

  return (
    <Flex py={8} alignItems={'center'}>
      <Tooltip label={isSubscribed ? 'Verified' : 'Verify task'}>
        <CheckCircleIcon
          w={'40px'}
          h={'40px'}
          mr={6}
          color={isSubscribed && 'green.700'}
          cursor={'pointer'}
          onClick={verifyTask}
        />
      </Tooltip>
      <Flex direction={'column'} width='100%'>
        <Text as={'h5'} mb={2}>{index + 1}. {task.name}</Text>
        <Text as="p" mb={2}>
          {task.description}
          {
            task.taskType === TASK_TYPE.JOIN_DISCORD && (
              <>
                <br />
                {t('channel.task.join_channel')}
                <Link ml='1' color="#dd163b" href={task.taskInfo?.link || '#'} target='_blank'>
                  {task.taskInfo?.title}
                </Link>
              </>
            )
          }
          {
            task.taskType === TASK_TYPE.SUBSCRIBE_TWITCH && (
              <>
                <br />
                {t('channel.task.follow_channel')}
                <Link ml='1' color="#dd163b" href={task.taskInfo?.link || '#'} target='_blank'>
                  {task.taskInfo?.title}
                </Link>
              </>
            )
          }
        </Text>
      </Flex>
      <Flex ml={'auto'}>
        <button
          onClick={verifyTask}
          disabled={isSubscribed}
          className={classNames('nk-btn nk-btn-color-main-1 subscribe-btn', { "task-done-btn": isSubscribed })}
        >{t(isSubscribed ? "channel.task.completed" : "channel.task.verify")}</button>
      </Flex>
    </Flex>
  )
}

export default React.memo(TaskItem);
