import React, { useState } from 'react'
import { Box, Button, CardFooter, Collapse, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import { Card, CardBody, CardHeader, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react'
import CollectionPack from './CollectionPack'
import { requestExchangeCollection, confirmExchangeCollection } from '../../services/inventoryService'
import { confirmTransactionFromFrontend  } from '../../utils/transactionSigner'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { FaAngleDown } from 'react-icons/fa'
import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

function CollectionItem({ data,  }) {
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
        border='1px solid #aaaaaa50'
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
            <Text as='h4' textTransform='capitalize' mb={8}>
            {t('inventory.collection_information')}:
            </Text>
            <Flex gap={5} flexWrap='wrap'>
              <Image
                flexBasis={250}
                fill={true}
                src={data.image}
                alt={data.name}
                width={250}
              />
              <Flex flexWrap='wrap' flexDirection='column' justifyContent='space-between'>
                <Text overflow='auto'>{data.description}</Text>
                <Flex w='100%' flexWrap='wrap' gap={5} maxHeight={200}>
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
          <CardFooter borderTop='1px solid #aaaaaa50' flexDirection='column' mt={8}>
            <Text as='h4' textTransform='capitalize' mb={8}>
              {t('inventory.reward_information')}:
            </Text>

            <Flex gap={5} flexWrap='wrap'>
              <Image
                flexBasis={250}
                fill={true}
                src={data?.reward_data?.image_uri || ""}
                alt={data?.reward_data?.name}
                width={250}
              />
              <Box>
                <Text as="h4">{data?.reward_data?.name}</Text>
                <Text overflow='auto'>{data?.reward_data?.description}</Text>
              </Box>
            </Flex>
          </CardFooter>
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
            {t('inventory.exchange_msg', { amount: nftInfo.length, reward_name: data.reward_data?.name })}
          </ModalBody>
          
          <ModalFooter>
            <Flex>
              <Button mr={3} onClick={onCloseModal} variant='ghost' color='#fff'>
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
