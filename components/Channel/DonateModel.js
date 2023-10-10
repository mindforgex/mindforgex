import React, { useState, useRef } from "react";
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
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next";

const DonateModal = ({isOpen, setOpen, onConfirm}) => {
  const { t } = useTranslation('common');
  const [donate, setDonate] = useState(0);
  const inputDonate = useRef();
  const toast = useToast();
  const onClose = () => {
    !donate && toast({
      title: t('modal.donate.required_amount'),
      status: 'error',
      isClosable: true,
      position: 'top'
    });
    !donate && inputDonate.current.focus();
    donate && setOpen(!isOpen);
    donate && onConfirm({ donate });
  };

  return (
    <> 
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg={'#181c23'}>
          <ModalHeader color={'white'}>{t('modal.donate.header')}</ModalHeader>
          <ModalBody pb={6} bg={'#181c23 !important'}>
            <Input
              type="number"
              borderRadius={'20px'}
              borderWidth={'1px'}
              borderColor={'gray.300'}
              bg={'white'}
              onChange={(e) => setDonate(e?.target?.value)}
              placeholder={t('modal.donate.amount_placeholder')}
              ref={inputDonate}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              {t('modal.donate.btn_donate')}
            </Button>
            <Button onClick={() => setOpen(!isOpen)}>{t('modal.btn_cancel')}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default React.memo(DonateModal);
