import React from 'react';

const Main = () => {
    return (<></>)
};

export const getServerSideProps = (context: any) => {
  return {
    redirect: {
      permanent: false,
      destination: "/manager/dashboard"
    },
    props: {},
  }
}

export default Main;
