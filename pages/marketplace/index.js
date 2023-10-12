import { Flex, Grid, GridItem, Icon, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NftItem from '../../components/marketplace/NftItem';
import axios from 'axios';
import { PAGE_SIZE } from '../../utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { marketOrders } from '../../services';
import SkeletonCard from '../../components/marketplace/SkeletonCard';
import { useTranslation } from 'next-i18next';

const Marketplace = () => {
  const { t } = useTranslation('common');
  const [nfts, setNfts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(PAGE_SIZE);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const getActiveListings = async() => {
      const { data: {items, totalItems} } = await marketOrders({ pageSize: size, pageIndex: page });
      await sleep(1000);
      setNfts(items);
      setLoading(false);
      setTotalPage(Math.ceil(totalItems / size));
    };
    getActiveListings && getActiveListings();
  }, [page, size]);

  const RenderSkeleton = () => {
    return (
      <>
        { isLoading && (
          <Grid templateColumns='repeat(12, 1fr)' templateRows='repeat(2, 1fr)' gap={6} minH={'61rem'}>
            {Array(8).fill(0).map((_, index) => (
              <GridItem w='100%' h='auto' colSpan={{ base: 3, sm: 12, md: 6, xl: 3 }} rowSpan={1} key={`card-${index}`}>
                <SkeletonCard />
              </GridItem>
            ))}
          </Grid>
        )}
      </>
    )
  };

  return (
    <Flex py="77px" bgColor="app.bg_main" transition="all 0.3s ease-in-out">
      <Flex pos="relative" mx="auto" px={4} w={{ xl: '1440px' }} maxW={{ xl: '100%' }}>
        <Flex mx={4} w="100%">
          <Flex maxW={{ xl: '100%' }} px={4} w="100%" direction="column">
            <Flex justifyContent="space-between" alignItems="center" w="100%">
              <Text
                as="h2"
                pb={5}
                pos="relative"
                lineHeight="44px"
                color="app.c_white"
                textAlign="center"
                fontSize="15xl"
                fontWeight="semibold"
              >
                {t('marketplace.header')}
              </Text>
              <Flex
                textTransform="uppercase"
                pos="relative"
                fontWeight="semibold"
                fontSize="md"
                lineHeight="20px"
                letterSpacing="0.1rem"
                mt="-20px"
                animation="rainbow 2s ease-in-out infinite"
                transition="color .2s ease-in-out"
                cursor="pointer"
                _after={{
                  bg: 'linear-gradient(216.56deg, #e250e5 5.32%, #4b50e6 94.32%)',
                  content: '""',
                  pos: 'absolute',
                  left: '0',
                  bottom: '-4px',
                  w: '100%',
                  h: '1px',
                }}
                _hover={{
                  bg: 'linear-gradient(to right, #E250E5,#4B50E6,#E250E5)',
                  bgClip: 'text',
                  bgSize: '100% 100%',
                  color: 'transparent',
                }}
                display={'none'}
              >
                Explore more
              </Flex>
            </Flex>
            <RenderSkeleton />
            <Flex flexWrap={'wrap'} alignItems="center" w="100%" gap={4}>
              {nfts.map((item, index) => <NftItem item={item} key={`nft-${index}`} />)}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
};

export default Marketplace;

export const getServerSideProps = async({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}
