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

const DonateModal = ({isOpen, setOpen, onConfirm}) => {
  const [donate, setDonate] = useState(0);
  const inputDonate = useRef();
  const toast = useToast();
  const onClose = () => {
    !donate && toast({
      title: `Please enter donate`,
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
          <ModalHeader color={'white'}>Donate for idol</ModalHeader>
          <ModalBody pb={6} bg={'#181c23 !important'}>
            <Input
              type="number"
              borderRadius={'20px'}
              borderWidth={'1px'}
              borderColor={'gray.300'}
              bg={'white'}
              onChange={(e) => setDonate(e?.target?.value)}
              placeholder="Enter donate..."
              ref={inputDonate}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Donate
            </Button>
            <Button onClick={() => setOpen(!isOpen)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default React.memo(DonateModal);
