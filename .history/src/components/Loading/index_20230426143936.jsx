import HashLoader from "react-spinners/HashLoader";
const Loading = () => {
  return (
    <>
      <HashLoader
        color='#36d7b7'
        cssOverride={{}}
        loading
        size={50}
        speedMultiplier={1}
      />
    </>
  );
};
export default Loading;
