const LoadingComponent: React.FC = () => {
  const wave = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <>
      <div className="p-2 w-full h-full flex justify-center items-center">
        <div className="flex">
          {wave.map((e) => (
            <div
              key={e}
              className={`w-1 h-24 bg-gradient-to-t from-cyan-500 to-cyan-950 m-2 animate-[wave_1s_linear_infinite]`}
              style={{
                animationDelay: `${e / (5 * 2)}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoadingComponent;
