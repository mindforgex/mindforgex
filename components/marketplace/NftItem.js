import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import AppLink from '../AppLink';
import { FaShoppingBag } from 'react-icons/fa';
import { numberFormatter, subAddress } from '../../utils/helpers';
import BuyModal from './BuyModal';
import { useTranslation } from 'next-i18next';

const NftItem = ({ item }) => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation('common');

  return (
    <>
      <Flex
        h={{ xl: '488px' }}
        maxW={{ xl: 'calc(25% - var(--chakra-space-4))', sm: 'calc(100% - var(--chakra-space-4))', md: 'calc(33.33% - var(--chakra-space-4))' }}
        css={{ '& .swiper-wrapper': { paddingTop: '10px' } }}
      >
        <Flex
          direction="column"
          alignItems="center"
          py={5}
          px={5}
          bgColor={'var(--cbp-color-background)'}
          boxShadow="0px 3px 16px rgb(47 83 109 / 12%)"
          transition="all 0.3s ease-in-out"
          mb="40px"
          overflow="hidden"
          borderRadius="20"
          _hover={{
            '&>*': { opacity: 1 },
            transform: 'translateY(-10px)',
            transition: 'all 0.4s ease',
          }}
          role="group"
          css={{ webkitFilter: 'grayscale(0%)' }}
        >
          <Flex pos="relative" mb={5} borderRadius="20" overflow="hidden">
            <AppLink href="#" _groupHover={{ transform: 'scale(1.05)' }} maxH={'298px'}>
              <Image alt={item.title} src={item.image ? item.image : `/assets/live_auction.jpg`} w="100%" transition="all 0.4s ease" />
            </AppLink>
            <Flex
              pos="absolute"
              top="60%"
              transform="translateY(-50%)"
              left="0"
              right="0"
              justifyContent="center"
              opacity="0"
              transition="all 0.4s ease"
              cursor="pointer"
              _groupHover={{ top: '50%', opacity: '1' }}
            >
              <Flex
                bgColor={'rgba(0, 0, 0, .4)'}
                px="27px"
                py="12px"
                borderWidth="2px"
                borderColor="app.c_white"
                transition="all 0.3s ease"
                borderRadius="30"
                _hover={{
                  bgColor: 'app.c_blue',
                  borderColor: 'app.c_blue',
                  '&>svg, &>span': { color: 'white' },
                }}
                onClick={() => setOpen(true)}
              >
                <Icon as={FaShoppingBag} w="22px" h="22px" color="white" />
                <Text
                  as="span"
                  fontSize="xl"
                  fontWeight="semibold"
                  pl="10px"
                  color="white"
                  zIndex="1"
                  transition="all 0.3s ease"
                  lineHeight="22px"
                >
                  {t('marketplace.buy_now')}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-start" mb="16px" w="100%">
            <Text
              as="h5"
              textTransform="capitalize"
              lineHeight="26px"
              fontWeight="semibold"
              color="white"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              wordBreak={'break-word'}
            >
              <AppLink href="#">
                {item.title}
              </AppLink>
            </Text>
          </Flex>
          <Flex mb="4px" justifyContent="space-between" direction='column' w="100%">
            <Flex>
              <Text as="span" fontSize="md" lineHeight="21px" color="app.c_gray20">
                {t('marketplace.current_price')}: &nbsp;
              </Text>
              <Text as="h5" lineHeight="22px" fontWeight="semibold" color="app.c_white">
                {numberFormatter(item.price)} SOL
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Flex
                w={{ xl: '44px' }}
                h={{ xl: '44px' }}
                borderRadius="15px"
                overflow="hidden"
                mr="12px"
                css={{ flexShrink: '0' }}
              >
                <Image alt={item.title} src="/assets/ava.jpg" h="auto" w="100%" verticalAlign="middle" />
              </Flex>
              <Flex direction="column">
                <Text as="span" fontSize="md" lineHeight="21px" color="app.c_gray20">
                  {t('marketplace.seller')}
                </Text>
                <Text as="h6" lineHeight="22px" mb={0} fontWeight="semibold" color="app.c_white">
                  {subAddress(item.seller)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <BuyModal item={item} isOpen={isOpen} setOpen={setOpen} />
    </>
  )
}

export default React.memo(NftItem);
