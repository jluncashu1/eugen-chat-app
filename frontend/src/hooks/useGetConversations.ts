import { useEffect, useState } from "react";
import { ConversationType } from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);

  const [conversation, setConversation] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      

      try {
        setLoading(true);
        const res = await fetch("/api/messages/conversations")
        const data = await res.json();

        if(!res.ok) {
          throw new Error(data.error);
        }

        setConversation(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [ ]);

  return { loading, conversation };
};

export default useGetConversations;
