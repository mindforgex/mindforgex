import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Text,
  InputGroup,
  InputRightAddon,
  Stack,
  Progress,
  Select,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next";

const ListingModal = ({isOpen, setOpen, onConfirm, listingItem}) => {
  const { t } = useTranslation('common');
  const [price, setPrice] = useState(0);
  const [item, setItem] = useState();
  const [isLoading, setLoading] = useState(false);
  const inputPrice = useRef();
  const toast = useToast();

  const callback = () => {
    setLoading(false);
    setOpen(false);
  };

  const handleChangeSelection = (e) => {
    setItem(e.target.value);
  };

  const onClose = () => {
    setLoading(true);
    !price && toast({
      title: t('modal.listing.required_amount'),
      status: 'error',
      isClosable: true,
      position: 'top'
    });
    !price && setLoading(false);
    !price && inputPrice.current.focus();
    price && onConfirm({ price, item }, callback);
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
      setLoading(false);
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
            <Text as='h4'>{t('modal.listing.header')}</Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <InputGroup display={isLoading ? 'none' : 'flex'} mb={2}>
                <Input
                type="number"
                borderRadius={'20px'}
                borderWidth={'1px'}
                borderColor={'gray.300'}
                bg={'white'}
                onChange={(e) => setPrice(e?.target?.value)}
                placeholder={t('modal.listing.amount_placeholder')}
                ref={inputPrice}
                />
                <InputRightAddon children='SOL' />
            </InputGroup>
            <Select defaultValue={'default'} onChange={handleChangeSelection} borderRadius={'full'}>
              <option value={'default'} disabled>{t('modal.listing.select_item_placeholder')}</option>
              {listingItem.map(item => (<option value={item.mint} key={item.mint}>{item.mint}</option>))}
            </Select>
            <RenderProcess />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              {t('modal.listing.btn_listing')}
            </Button>
            <Button onClick={() => setOpen(!isOpen)}>{t('modal.btn_cancel')}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default React.memo(ListingModal);
