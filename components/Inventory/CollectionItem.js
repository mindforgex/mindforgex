import React, { useState } from 'react'
import { Avatar, Box, Button, CardFooter, Collapse, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useToast } from '@chakra-ui/react'
import { Card, CardBody, CardHeader, Flex, Image, Text } from '@chakra-ui/react'
import CollectionPack from './CollectionPack'
import { requestExchangeCollection, confirmExchangeCollection } from '../../services/inventoryService'
import { confirmTransactionFromFrontend  } from '../../utils/transactionSigner'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { FaAngleDown } from 'react-icons/fa'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

function CollectionItem({ data, onFetchCollection }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoadingTransaction, setIsLoadingTransaction] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const { t } = useTranslation()

  const { connection } = useConnection()
  const { wallet, signTransaction } = useWallet();
  const toast = useToast()

  const onCloseModal = () => setIsOpenModal(false)
  const onOpenModal = () => setIsOpenModal(true)
  const toggleExpand = () => setIsExpanded(prev => !prev)

  if (!data) return <></>
  const nftInfo = Array.isArray(data.nft_info) ? data.nft_info : []
  const isExchangeable = nftInfo.every(_nft => _nft.owned)

  const onExchange = async () => {
    try {
      setIsLoadingTransaction(true)
      const requestExResp = await requestExchangeCollection({
        "collectionId": data._id,
        "channelId": data.channel_id
      })

      const _wallet = {
        wallet,
        signTransaction,
      };

      const completedTransaction = await Promise.all(
        requestExResp.encodedTxnData.map(_txData => {
          return confirmTransactionFromFrontend(
            connection,
            _txData,
            _wallet
          );
        })
      )

      const { message } = await confirmExchangeCollection({
        "channelId": data.channel_id,
        "txnSignature": completedTransaction,
        "rewardHistoryId": requestExResp.rewardHistoryId,
      })
      toast({
        title: 'Exchange successful',
        description: `${message}. Check your reward now!`,
        status: 'success',
        isClosable: true,
      })
      setIsLoadingTransaction(false)
      onCloseModal()
      onFetchCollection && onFetchCollection()
    } catch (error) {
      console.log(error);
      onCloseModal()
    }
  }

  return (
    <section id={data.address}>
      <Card 
        w='100%'
        backgroundColor='rgba(0, 0, 0, 0.6)'
        color='#fff'
        borderWidth={'1px'}
        borderColor={'gray.600'}
        borderStyle={'solid'}
        borderRadius={'20px'}
        boxShadow="0px 3px 16px rgb(47 83 109 / 12%)"
        transition="all 0.3s ease-in-out"
      >
        <CardHeader borderBottom='1px solid #aaaaaa50' mb={3}>
          <Flex justifyContent='space-between'>
            <Flex gap={4} display='flex' alignItems='center'>
              <h3>{data.name}</h3>
              <h5>({data.symbol})</h5>
            </Flex>
            <Flex alignItems='center' gap={6}>
              <button 
              // TODO: fix this
                disabled={!isExchangeable } // || data.reward_history_data?.length === data.reward_data?.amount 
                className={'nk-btn nk-btn-color-main-1'}
                onClick={onOpenModal}
              >
                {t('inventory.exchange')}
              </button>
            
              <FaAngleDown
                fontSize='20' 
                className={classNames('expand-icon', { 'rotate-close': !isExpanded })}
                onClick={toggleExpand}
              />
            </Flex>
          </Flex>
        </CardHeader>
        <Collapse in={isExpanded} animateOpacity>
          <CardBody>
            <Flex gap={5} flexWrap='wrap'>
              <Flex direction={'column'} maxW={'24%'}>
                <Flex borderRadius={'full'} pos={'relative'} w={'100%'}>
                  <Avatar
                    h={'250px'}
                    w={'100%'}
                    display={'flex'}
                    src={data.image}
                    alt={data.name}
                    borderWidth={'5px'}
                    borderColor={'#dd163b'}
                  />
                  <Tooltip label={`${data?.reward_data?.name} - ${data?.reward_data?.description}`}>
                    <Avatar
                      pos={'absolute'}
                      h={20}
                      w={20}
                      display={'flex'}
                      borderWidth={'3px'}
                      borderColor={'green.900'}
                      src={data?.reward_data?.image_uri || ""}
                      alt={data?.reward_data?.name}
                      bottom={0}
                      right={6}
                    />
                  </Tooltip>
                </Flex>
                <Text mt={6} overflow='auto' fontWeight={'semibold'} fontSize={'xl'} align={'center'}>
                  {data.description}
                </Text>
              </Flex>
              <Flex flexWrap='wrap' flexDirection='column' justifyContent='space-between' mb={12}>
                <Flex
                  w='100%'
                  flexWrap='wrap'
                  gap={5}
                  maxHeight={200}
                >
                  {
                    nftInfo.map(_item => {
                      return (
                        <>
                          <CollectionPack key={_item._id} data={_item} />
                        </>
                      )
                    })
                  }
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Collapse>
      </Card>

      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom='3px solid #aaaaaa30'>
            <Text as='h3'>
              {t(['inventory.confirm', 'inventory.exchange'])}
            </Text>
            <ModalCloseButton />
          </ModalHeader>
          
          <ModalBody>
            <Flex direction={'column'} alignItems={'center'}>
              <Avatar src={data.reward_data?.image_uri} boxSize={20} />
              <Text as={'p'} mt={6}>
                {t('inventory.exchange_msg', { amount: nftInfo.length, name: data.reward_data?.name })}
              </Text>
            </Flex>
          </ModalBody>
          
          <ModalFooter mt={0} pt={0}>
            <Flex>
              <Button mr={3} onClick={onCloseModal} variant='ghost' color='#fff' _hover={{ bg: 'transparent' }}>
                {t('inventory.close')}
              </Button>
              <Button isLoading={isLoadingTransaction} colorScheme='red' onClick={onExchange}>
                {t('inventory.confirm')}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  )
}

export default CollectionItem
