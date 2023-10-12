import { Flex, Button, useToast } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import ListingModal from './ListingModal';
import axios from 'axios';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { confirmTransactionFromFrontend } from '../../utils/helpers';
import { listingOrder, cancelListingOrder } from '../../services';
import { useMemo } from 'react';
import CancelListingModal from './CancelListingModal';

const ListingItem = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [isOpenCancel, setOpenCancel] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { publicKey, wallet, signTransaction } = useWallet();
  const { connection } = useConnection();
  const toast = useToast();

  const getEncodeTransaction = async(args) => {
    const params = {
      network: WalletAdapterNetwork.Devnet,
      nft_address: args.item,
      sender: publicKey
    }
    const { data: { result } } = await axios.post('/api/marketplace/listing-create', params);
    return {...args, encode: result?.result?.encoded_transaction }
  };

  const userSignTransaction = async(args) => {
    const {encode} = await getEncodeTransaction(args);
    const tx = await confirmTransactionFromFrontend(
      connection,
      encode,
      { wallet, signTransaction }
    );
    return {...args, tx};
  }

  const onListing = async({ price, item }, callback) => {
    try {
      const res = await userSignTransaction({ price, data, item })
      const params = {
        mint: item,
        price: res.price,
        transaction: res.tx,
        title: res.data.name,
        image: res.data.image,
        infoId: data._id 
      };
      const responseOrder = await listingOrder(params);
      toast({
        title: t('listing.success'),
        status: 'success',
        isClosable: true,
        position: 'top'
      });
    } catch(err) {
      console.log('error:', err);
      toast({
        title: t('listing.failed'),
        status: 'error',
        isClosable: true,
        position: 'top'
      });  
    }
    await sleep(1000); 
    callback();
  };
  const onCancelListing = async({ item }, callback) => {
    try {
      const { data: result } = await cancelListingOrder({ _id: item });
      result && toast({
        title: t('listing.cancel_success'),
        status: 'success',
        isClosable: true,
        position: 'top'
      });
      callback();
    } catch(err) {
      toast({
        title: t('listing.cancel_failed'),
        status: 'error',
        isClosable: true,
        position: 'top'
      });
    }
    await sleep(1000);
    setLoading(false);
  }
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const canncelListing = async() => {
    setLoading(true);
    setOpenCancel(true);
  };

  const listingItem = useMemo(() => {
    return data?.order?.filter(o => o.order_id) || [];
  },[data.order]);

  const nonListing = useMemo(() => {
    return data?.order?.filter(o => Object.keys(o).find(i => i === 'mint') && !o.order_id) || [];
  },[data.order]);

  return (
    <>
      <Flex mt={2} w={'100%'} direction={'column'} alignItems={'center'}>
        {nonListing.length ? (
          <Button
            isDisabled={!data.owned}
            bg={'#fc4f4f'}
            _hover={{ bg: '#fc4f4f' }}
            w={'100%'}
            mb={2}
            fontSize={'11px'}
            maxW={'80%'}
            onClick={() => (data.owned && setOpen(true))}
          >
            { t('btn.listing') }
          </Button>
        ) : ''}
        { listingItem.length ? (
          <Button
            colorScheme={'yellow'}
            w={'100%'}
            maxW={'80%'}
            fontSize={'11px'}
            isLoading={isLoading}
            loadingText='Cannceling...'
            onClick={canncelListing}
          >
            { t('btn.cancel_listing') }
          </Button>
        ) : ''}
      </Flex>
      <ListingModal isOpen={isOpen} setOpen={setOpen} onConfirm={onListing} listingItem={nonListing} />
      <CancelListingModal
        isOpen={isOpenCancel}
        setOpen={setOpenCancel}
        onConfirm={onCancelListing}
        listingItem={listingItem}
        parentCancel={setLoading}
      />
    </>
  )
}

export default React.memo(ListingItem);
