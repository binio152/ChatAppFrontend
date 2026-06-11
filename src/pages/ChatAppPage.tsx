import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const ChatAppPage = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();
  const logOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch {
      toast.error("loi say ra khi dang xuat");
    }
  };

  return (
    <div>
      <h1>Chat App Page</h1>
      <button className="border-2 rounded-xl" onClick={logOut}>
        Logout
      </button>
    </div>
  );
};

export default ChatAppPage;
