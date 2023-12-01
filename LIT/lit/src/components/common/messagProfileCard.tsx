export const MessageProfileCard = () => {
  return (
    <div className="hover:cursor-pointer">
      <div className="flex space-x-2 items-center ">
        <div className="w-10 h-10 bg-white rounded-full"></div>
        <div className="p-0 m-0 flex justify-start space-x-2">
          <p className="text-white font-bold text-md">username</p>

          <p className="text-slate-400 text-left ">@tag</p>
        </div>
      </div>
      <div className="text-white">message content</div>
    </div>
  );
};
