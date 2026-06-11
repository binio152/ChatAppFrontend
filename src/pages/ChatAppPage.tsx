import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const ChatAppPage = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();
  const user = useAuthStore((s) => s.user);

  const logOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch {
      toast.error("Lỗi xảy ra khi đăng xuất");
    }
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "-";

  return (
    <div>
      <h1>Thông tin tài khoản</h1>
      <p>
        Họ và tên: {user?.displayName || user?.username || "Chưa có dữ liệu"}
      </p>
      <p>Tên đăng nhập: {user?.username || "-"}</p>
      <p>Email: {user?.email || "-"}</p>
      <p>Ngày tạo: {formattedDate}</p>
      <button className="border-2 rounded-xl bg-indigo-300 px-3 py-1" onClick={logOut}>
        Đăng xuất
      </button>
    </div>
  );
};

export default ChatAppPage;
