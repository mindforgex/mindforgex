import { Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { compose, numberFormatter } from '../../utils/helpers';
import { useTranslation } from 'next-i18next';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useEffect } from 'react';
import { transferNFT } from '../../services';

const BuyModal = ({ item, isOpen, setOpen }) => {
  const { t } = useTranslation('common');
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const transferSolToSeller = async (args) => {
    const { encode: transaction } = args;
    try {
      const signature = await sendTransaction(transaction, connection);
      return {...args, tx: signature};
    } catch (err) {
      throw err
    }
  };

  const getTransferEndcode = async(args) => {
    const { price, seller } = args;
    setIsLoading(true);
    const latestBlockhash = await connection.getLatestBlockhash();
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(seller),
        lamports: LAMPORTS_PER_SOL * price,
        latestBlockhash: latestBlockhash.blockhash,
      })
    );
    return { ...args, encode: transaction };
  };

  const verifyTransaction = async(args) => {
    const { tx, price } = args;
    await sleep(5000);
    const { context: {slot}} = await connection.confirmTransaction(tx, 'finalized');
    try {
      await transferNFT({_id: item._id, tx });
      return {...args};
    } catch(err) {
      throw err;
    }
  };

  const notificationAction = (args) => {
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('marketplace.noti_buy_nft_success'),
        status: 'success',
        isClosable: true,
        position: 'top'
      });
    }, 1000);
  };

  const onClose = async() => {
    try {
      setIsLoading(true);
      await compose(notificationAction, verifyTransaction, transferSolToSeller, getTransferEndcode)({...item});
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      await sleep(1500);
      console.log(error)
      setIsLoading(false);
      toast({
        title: t('marketplace.noti_buy_nft_failed'),
        status: 'error',
        isClosable: true,
        position: 'top'
      });
    }
  };

  const RenderProcess = () => {
    return (
      <>
        { isLoading && (
          <Stack spacing={5} mt={4}>
            <Progress size='lg' isIndeterminate colorScheme='telegram' />
          </Stack>
        )}
      </>
    )
  };

  useEffect(() => {
    return () => {
      setSuccess(false);
    }
  }, []);

  return (
    <> 
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg={'#181c23'}>
          <ModalHeader color={'white'}>
            <Text as='h4'>{t('marketplace.buy.header')}</Text>
          </ModalHeader>
          <ModalBody pb={6}>
            {isSuccess && (
              <Flex justifyContent={'center'} mb={4}>
                <Icon as={CheckCircleIcon} w={14} h={14} color='green.800' bg={'white'} borderRadius={'full'} />
              </Flex>
            )}
            <Text as="p" color={'white'} fontWeight={'semibold'} fontSize={'xl'} textAlign={'center'}>
              <Text as="span">{t('marketplace.buy.nft_name', {name: item.title})} </Text>
              -
              <Text as="span"> {numberFormatter(item.price)} SOL</Text>
            </Text>
            <RenderProcess />
          </ModalBody>

          <ModalFooter>
            {
              !isSuccess ? (
                <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={onClose}
                  isLoading={isLoading}
                  loadingText='Buying...'
                  isDisabled={!publicKey}
                >
                  {t('marketplace.buy.btn_buy')}
                </Button>
              ) : ''
            }
            <Button onClick={() => setOpen(!isOpen)} isDisabled={isLoading}>{t('modal.btn_cancel')}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default React.memo(BuyModal);
