import { Spinner } from "@chakra-ui/react";

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 68, 255, 0.52)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Spinner size="xl" color="white" />
    </div>
  );
};

export default LoadingComponent;
