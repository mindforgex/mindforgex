import React, { useCallback, useEffect, useState } from 'react'
import BreadCrumbs from '../../../../components/BreadCrumbs'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { getDetailChannel } from '../../../../services';
import { getChannelCollection } from '../../../../services/inventoryService';
import { getUserInfo } from '../../../../utils/helpers';
import { Box, Flex, SkeletonCircle, SkeletonText, Spinner } from '@chakra-ui/react';
import CollectionList from '../../../../components/Inventory/CollectionList';
import axios from 'axios';
import { useAppRedireact } from '../../../../utils/hook';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

function ChannelCollections() {
  const { t } = useTranslation()
  const [generateRouter] = useAppRedireact();
  const router = useRouter();
  const [detailChannel, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [collectionData, setCollectionData] = useState([])

  const onFetchCollection = useCallback(() => {
    const userInfo = getUserInfo()

    const getDetail = async () => {
      const res = await getDetailChannel(router.query.id);
      setDetail(res);
    }
    const getCollection = async () => {
      if (userInfo && userInfo.accessToken) {
        const { items } = await getChannelCollection(router.query.id);
        const data = await Promise.all(
          items.map(async (_item) => {
            const resp = await axios.get(_item.metadata_uri)
            return {
              ..._item,
              reward_data: _item?.reward_data?.[0],
              ...resp.data || {}
            }
          })
        )
        setCollectionData(data)
      }
    }

    const combineFunction = async () => {
      getDetail && await getDetail();
      getCollection && await getCollection();
      setIsLoading(false)
    }

    if (router.query?.id) {
      combineFunction()
    }
  }, [router.query?.id])

  useEffect(() => {
    onFetchCollection()
  }, [onFetchCollection]);

  const RenderSkeleton = () => {
    return (
      <Box
        p={6}
        boxShadow='lg'
        bg={'rgba(0, 0, 0, 0.6)'}
        borderRadius={'20px'}
        borderWidth={'1px'}
        borderColor={'gray.600'}
        borderStyle={'solid'}
      >
        <SkeletonText my='4' noOfLines={4} spacing='2' skeletonHeight='1' />
        <SkeletonCircle size='10' />
        <SkeletonText my='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
    )
  };

  return (
    <>
      <Head>
        <title>{detailChannel?.name} {t('menu.collection')}</title>
      </Head>

      <div className="nk-gap-2" />
      <BreadCrumbs
        label={t("menu.collection")}
        root={
          [
            { href: `channel/${router.query?.id}`, label: detailChannel?.name || t('menu.detail') }
          ]
        } 
      />
      <div className="nk-gap-2 mt-10" />

      <div className="container">
        {
          isLoading ? (
            <RenderSkeleton />
          ) : (
            <>
              <CollectionList data={collectionData} onFetchCollection={onFetchCollection}/>
            </>
          )
        }
      </div>
    </>
  )
}

export default ChannelCollections

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}
