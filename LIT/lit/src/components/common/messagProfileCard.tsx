export const MessageProfileCard = () => {
  return (
    <div className="hover:cursor-pointer border-y">
      <div className="flex space-x-2 items-center p-4">
        <div className="w-14 h-14 bg-white rounded-full"></div>

        <div className=" flex flex-col items-start">
          <p className="text-white font-bold text-2xl">username</p>
          <p className="text-white">message content</p>{" "}
        </div>
      </div>
    </div>
  );
};
