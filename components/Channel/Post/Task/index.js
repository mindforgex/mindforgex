import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react';
import React, { useMemo, useRef, useState } from 'react';
import TaskItem from './TaskItem';
import { getUserInfo } from '../../../../utils/helpers';
import { claimNFT } from '../../../../services/postService';
import ClaimNFTButton from '../../../ClaimNFTButton';
import { useRouter } from 'next/router';

const Task = ({ channelId, post }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState(post?.tasks || [])
  const [claimed, setClaimed] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const resultRef = useRef()
  const userInfo = getUserInfo();
  const isFinished = useMemo(() => {
    if (userInfo?.user?.walletAddress) {
      return tasks.filter(t => {
        return t.userAddress?.includes(userInfo?.user?.walletAddress)
      }).length === tasks.length;
    }
  }, [tasks, userInfo?.user?.walletAddress]);
  const isClaimed = useMemo(() => {
    if (claimed) return claimed
    return Array.isArray(post?.userAddress) && post?.userAddress?.includes(userInfo?.user?.walletAddress)
  }, [claimed, post?.userAddress, userInfo?.user?.walletAddress])
  const isClaimable = isFinished && !isClaimed
  const router = useRouter()

  const onClose = () => setIsOpenModal(false)

  const claimNft = async () => {
    setIsLoading(true)
    const receipt = await claimNFT(post._id)
    if (!receipt) {
      toast({
        title: "Claim NFT failed",
        status: "error",
        isClosable: true,
        position: 'top',
      })
    } else {
      setIsOpenModal(true)
      setClaimed(true)
      setTimeout(() => {
        console.log(resultRef.current);
        resultRef.current.setAttribute("href", `https://translator.shyft.to/tx/${receipt.txnSignature}?cluster=devnet`)
      }, 500)
    }
    setIsLoading(false)
  }

  return (
    <Flex direction={'column'}>
      <Text as="h4" my={4}>Tasks</Text>
      {tasks.map((task, index) => (
        <TaskItem
          key={task._id}
          task={task}
          index={index}
          userInfo={userInfo}
          channelId={channelId}
          setTasks={setTasks}
        />
      ))}
      <ClaimNFTButton
        btnProps={{
          style: {
            cursor: isClaimable ? "pointer" : "not-allowed"
          },
          colorScheme: isClaimable ? "green" : "gray",
          onClick: () => {
            if (isClaimable) {
              claimNft()
            }
          },
          isLoading: isLoading,
        }}
        nftData={post.nftId}
      >
        {isClaimed ? "Claimed" : "Claim NFT"}
      </ClaimNFTButton>

      <Modal isOpen={isOpenModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Alert
              className='custom-modal'
              status="success"
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'
            >
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={5} mb={1} fontSize='lg'>
                Claim NFT successful!
              </AlertTitle>
              <AlertDescription maxWidth='sm'>
                <a ref={resultRef} target='_blank' href="" rel="nofollow">View your NFT on Explorer</a>
              </AlertDescription>
            </Alert>
            <Flex justifyContent="center" mb={5}>
              <button className='nk-btn nk-btn-color-main-1 subscribe-btn' mr={3} onClick={() => {
                router.push('/my-inventory')
              }}>
                Go to My Inventory
              </button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default React.memo(Task);
