import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {

	const { loading, conversation } = useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversation.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} emoji={getRandomEmoji()}/>
			))}
			{loading ? <span className="loading loading-spinner mx-auto"/> : null}
		</div>
	);
};
export default Conversations;
