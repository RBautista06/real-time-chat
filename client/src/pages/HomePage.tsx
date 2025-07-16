import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../component/NoChatSelected";
import Sidebar from "../component/Sidebar";
import ChatContainer from "../component/ChatContainer";

const HomePage = () => {
  const { selectedUsers } = useChatStore();

  return (
    <div className="h-auto bg-base-200 ">
      <div className="flex items-center justify-center pt-5 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUsers ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
