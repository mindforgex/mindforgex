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
  Stack,
  Progress,
  Select,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next";

const CancelListingModal = ({isOpen, setOpen, onConfirm, listingItem, parentCancel}) => {
  const { t } = useTranslation('common');
  const [item, setItem] = useState();
  const [isLoading, setLoading] = useState(false);
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
    !item && toast({
      title: t('modal.cancel_listing.required_item'),
      status: 'error',
      isClosable: true,
      position: 'top'
    });
    item && onConfirm({ item }, callback);
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
            <Select onChange={handleChangeSelection} borderRadius={'full'}>
              <option selected disabled>Select listing item...</option>
              {listingItem.map(item => (<option value={item.order_id} key={item.mint}>{item.mint}</option>))}
            </Select>
            <RenderProcess />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3} onClick={onClose}
              isLoading={isLoading}
              loadingText='Cannceling...'
            >
              {t('modal.cancel_listing.btn_cancel')}
            </Button>
            <Button
              onClick={() => {
                setOpen(!isOpen);
                parentCancel(false);
              }}
              isDisabled={isLoading}
            >
              {t('modal.btn_cancel')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default React.memo(CancelListingModal);
