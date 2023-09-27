import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage } from "@/util/loginStorage";
import { useRouter } from "next/navigation";
const DeleteFeed = () => {
  const { instance } = JwtInterceptors();
  const router = useRouter();
  const deletes = async () => {
    const memberId = getStorage("delete")?.replace(/\"/gi, "");

    try {
      const response = await instance.post(`/feeds/${memberId}`);

      alert("삭제되었습니다");
      router.refresh();
      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { deletes };
};

export default DeleteFeed;
