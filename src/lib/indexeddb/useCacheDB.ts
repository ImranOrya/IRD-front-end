// useUserDB.ts
import { getNativeItem, updateNativeItem } from "./dbUtils"; // Adjust the path as needed

const useCacheDB = () => {
  const getComponentCache = async (key: IDBValidKey): Promise<any> =>
    await getNativeItem("appCache", "cmp", key);

  const updateComponentCache = async (data: any) =>
    await updateNativeItem("appCache", "cmp", data);

  const getChatCache = async (key: IDBValidKey): Promise<any> =>
    await getNativeItem("appCache", "chat", key);

  const updateChatCache = async (data: any) =>
    await updateNativeItem("appCache", "chat", data);

  return {
    getComponentCache,
    updateComponentCache,
    getChatCache,
    updateChatCache,
  };
};

export default useCacheDB;
