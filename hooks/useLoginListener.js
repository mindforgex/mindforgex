import { useToast } from '@chakra-ui/react'
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import bs58 from 'bs58';
import { ed25519 } from '@noble/curves/ed25519';
import { getUserInfo, saveUserInfo, clearUserInfo } from '../utils/helpers'
import { post } from '../services/apiService'

export default function useLoginListener() {
  const toast = useToast();
  const { publicKey, signMessage } = useWallet();

  const onLogin = useCallback(async () => {
    try {
      if (!publicKey || !signMessage) {
        return;
      }

      const userInfo = getUserInfo();
      if (userInfo?.user?.walletAddress !== publicKey?.toString()) clearUserInfo();
      if (userInfo?.user?.walletAddress === publicKey?.toString()) return;

      const message = `${window.location.host
        } wants you to sign in with your Solana account:\n${publicKey.toBase58()}\n\nPlease sign in.`;
      const encodeMessage = new TextEncoder().encode(message)
      const signature = await signMessage(encodeMessage);

      if (!ed25519.verify(signature, encodeMessage, publicKey.toBytes())) {
        toast({
          title: 'Message signature invalid!',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top'
        })
        return
      }

      const userData = await post('/auth/signin', {
        "walletAddress": publicKey,
        "message": message,
        "signature": bs58.encode(signature)
      })
      if (userData) {
        toast({
          title: 'Sign in successfully',
          status: 'success',
          isClosable: true,
          position: 'top'
        })
        saveUserInfo(userData)
      } else {
        throw new Error("Sign in failed")
      }
    } catch (error) {
      toast({
        title: 'Sign Message failed',
        description: error?.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top'
      })
    }
  }, [publicKey, signMessage, toast])

  useEffect(() => {


    onLogin();
  }, [onLogin]);

  return (
    <></>
  )
}
