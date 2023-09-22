import { Image, Spinner } from "@chakra-ui/react";

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
        gap: '14px',
        height: "100vh",
        width: "100vw",
        backgroundColor: "#1A202C",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Image
        src="/assets/logo.svg"
        alt=""
        width={500}
      />
      <Spinner size="xl" color="white" />
    </div>
  );
};

export default LoadingComponent;
