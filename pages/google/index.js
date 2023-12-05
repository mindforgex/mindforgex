import React, { useState, useEffect } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Google = () => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem('main_access');
    access && setAuth(true);
  }, []);

  // const onResponseLogin = (res) => {
  //   localStorage.setItem('main_access', res.access_token);
  //   localStorage.setItem('main_exp', res.expires_in);
  //   setAuth(true);
  // }
  // const login = useGoogleLogin({
  //   onSuccess: onResponseLogin,
  //   onError: error => console.log({ error }),
  //   scope: "https://www.googleapis.com/auth/youtube.readonly",
  //   onNonOAuthError: err => console.log({ err }),
  //   client_id: "237263602945-o2hpvb524rp84nqb002batne9qi0d88k.apps.googleusercontent.com",
  //   redirect_uri: "https://02de-2a09-bac1-7aa0-50-00-17-13e.ngrok-free.app/google"
  // });


  return (
    <Flex>
      {/* {isAuth 
        ? <Button colorScheme="blue">Logged in</Button>
        : <Button onClick={login} colorScheme="blue">Sign in with Google 🚀</Button>
      } */}
      {/* <GoogleLogin
        client_id={'237263602945-o2hpvb524rp84nqb002batne9qi0d88k.apps.googleusercontent.com'}
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}
      {/* <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
        // scope={'https://www.googleapis.com/auth/youtube.readonly'}
        // redirect_uri={'https://02de-2a09-bac1-7aa0-50-00-17-13e.ngrok-free.app/api/google/auth'}
      /> */}
    </Flex>
  )
};

export default Google;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}
