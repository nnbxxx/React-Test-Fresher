import HashLoader from "react-spinners/HashLoader";
const Loading = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div>
      <HashLoader
        color='#36d7b7'
        cssOverride={{}}
        loading
        size={50}
        speedMultiplier={1}
        style={style}
      />
    </div>
  );
};
export default Loading;
