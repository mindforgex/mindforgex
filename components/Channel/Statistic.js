import { Flex, Grid, GridItem, Icon, Tag, TagLabel, Text, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { AiOutlineLike } from 'react-icons/ai';
import { MdOutlinePublish } from 'react-icons/md';
import { FaDonate } from 'react-icons/fa';
import { BsFillCollectionFill } from 'react-icons/bs';
import React from 'react';
import { numberFormatter } from '../../utils/helpers';

const Statistic = ({ detail }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Flex mt={'60px'}></Flex>
      <Flex className='nk-decorated-h-2'>
        <Text as={'h3'} px={4}>{t('channel.statistic')}</Text>
      </Flex>
      <Grid templateColumns={'repeat(12, 1fr)'} w={'100%'} grap={6} mt={8}>
        <GridItem colSpan={3} borderRightWidth={'1px'} borderRightColor={'#535353'}>
          <Tooltip label={t('channel.subscribe')}>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              transition="all 0.3s ease-in-out"
              _hover={{ transform: 'scale(1.1)'}}
            >
              <Tag
                size='lg'
                bg={'#292e38'}
                borderRadius='full'
                color={'white'}
                p={4}
                minW={'85%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-around'}
              >
                <Icon as={AiOutlineLike} w={6} h={6} />
                <TagLabel fontSize={'1.4rem'} fontWeight={'semibold'}>
                  {numberFormatter(detail?.numberSubscribers)}
                </TagLabel>
              </Tag>
            </Flex>
          </Tooltip>
        </GridItem>
        <GridItem colSpan={3} borderRightWidth={'1px'} borderRightColor={'#535353'}>
          <Tooltip label={t('channel.published_posts')}>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              transition="all 0.3s ease-in-out"
              _hover={{ transform: 'scale(1.1)'}}
            >
              <Tag
                size='lg'
                bg={'#292e38'}
                borderRadius='full'
                color={'white'}
                p={4}
                minW={'85%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-around'}
              >
                <Icon as={MdOutlinePublish} w={6} h={6} />
                <TagLabel fontSize={'1.4rem'} fontWeight={'semibold'}>
                  {numberFormatter(detail?.numberPosts)}
                </TagLabel>
              </Tag>
            </Flex>
          </Tooltip>
        </GridItem>
        <GridItem colSpan={3} borderRightWidth={'1px'} borderRightColor={'#535353'}>
          <Tooltip label={t('channel.donate')}>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              transition="all 0.3s ease-in-out"
              _hover={{ transform: 'scale(1.1)'}}
            >
              <Tag
                size='lg'
                bg={'#292e38'}
                borderRadius='full'
                color={'white'}
                p={4}
                minW={'85%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-around'}
              >
                <Icon as={FaDonate} w={6} h={6} />
                <TagLabel fontSize={'1.4rem'} fontWeight={'semibold'}>
                  {numberFormatter(detail?.amountDonate)}
                  <Text as="span" fontSize={'1rem'}> SOL</Text>
                </TagLabel>
              </Tag>
            </Flex>
          </Tooltip>
        </GridItem>
        <GridItem colSpan={3}>
          <Tooltip label={t('channel.collection')}>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              transition="all 0.3s ease-in-out"
              _hover={{ transform: 'scale(1.1)'}}
            >
              <Tag
                size='lg'
                bg={'#292e38'}
                borderRadius='full'
                color={'white'}
                p={4}
                minW={'85%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-around'}
              >
                <Icon as={BsFillCollectionFill} w={6} h={6} />
                <TagLabel fontSize={'1.4rem'} fontWeight={'semibold'}>
                  {numberFormatter(detail?.numberCollections)}
                </TagLabel>
              </Tag>
            </Flex>
          </Tooltip>
        </GridItem>
      </Grid>
    </>
  )
};

export default React.memo(Statistic);
