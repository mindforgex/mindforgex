import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../../../components/BreadCrumbs'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { getDetailChannel } from '../../../../services';
import { getChannelCollection } from '../../../../services/inventoryService';
import { getUserInfo } from '../../../../utils/helpers';
import { Flex, Spinner } from '@chakra-ui/react';
import CollectionList from '../../../../components/Inventory/CollectionList';
import axios from 'axios';
import { useAppRedireact } from '../../../../utils/hook';

function ChannelCollections() {
  const [generateRouter] = useAppRedireact();
  const router = useRouter();
  const [detailChannel, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [collectionData, setCollectionData] = useState([])

  useEffect(() => {
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
  }, [router.query?.id]);

  return (
    <>
      <Head>
        <title>{detailChannel?.name} Collection</title>
      </Head>

      <div className="nk-gap-2" />
      <BreadCrumbs label="Collection" root={[{ href: generateRouter(''), label: "Channel" }, { href: generateRouter(`channel/${router.query?.id}`), label: detailChannel?.name || "Detail" }]} />
      <div className="nk-gap-2 mt-10" />


      <div className="container">
        <div className="col-lg-12">
          {
            isLoading ? (
              <Flex justifyContent="center"><Spinner /></Flex>
            ) : (
              <>
                <CollectionList data={collectionData} />
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default ChannelCollections