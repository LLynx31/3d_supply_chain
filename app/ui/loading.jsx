const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-t-4 border-yellow-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
