interface Props {
  fillScreen?: boolean;
}

export default function Loading({ fillScreen = true }: Props) {
  return (
    <div
      className={`gw-loading grow flex items-center justify-center w-full h-${
        fillScreen ? "screen" : "full"
      }`}
    >
      <div className="bg-white p-2 m-4 rounded">
        <p className="font-[monospace] text-black">Loading</p>
      </div>
    </div>
  );
}
