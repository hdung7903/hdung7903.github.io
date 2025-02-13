import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { fetchChatbotResponse } from "../../../../redux/slices/chatbotSlice";

interface BotMessageProps {
  userMessage: string; // The user's message to send to the bot
}

function BotMessage({ userMessage }: BotMessageProps) {
  // const dispatch = useDispatch<AppDispatch>();
  const response = useSelector((state: RootState) => state.chatbot.response);
  const loading = useSelector((state: RootState) => state.chatbot.loading);
  const error = useSelector((state: RootState) => state.chatbot.error);

  // useEffect(() => {
  //   if (userMessage) {
  //     dispatch(fetchChatbotResponse(userMessage));
  //   }
  // }, [dispatch, userMessage]);

  return (
    <div className="message-container">
      <div className="bot-message">
        {userMessage}
        {/* {loading ? "..." : error ? `Error: ${error}` : response} */}
      </div>
    </div>
  );
}

export default BotMessage;
