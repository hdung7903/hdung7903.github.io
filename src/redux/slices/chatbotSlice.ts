import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatbotState {
  response: string | null;
  loading: boolean;
  error: string | null;
  ws: WebSocket | null;
  errorStatus: number | null;
}

const initialState: ChatbotState = {
  response: null,
  loading: false,
  error: null,
  ws: null,
  errorStatus: null,
};

// Async Thunk for Text-Based Chat
export const fetchChatbotResponse = createAsyncThunk(
  "chatbot/fetchResponse",
  async (
    { student_code, subject, question }: { student_code: any; subject: string; question: string | Blob },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AI_API}/student_ask_question`,
        { student_code, question, subject },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const chatbotResponse = response.data.message;

      if (chatbotResponse) {
        return chatbotResponse;
      } else {
        return rejectWithValue({
          message: "No response from chatbot",
          status: 404
        });
      }
    } catch (error: any) {
      return rejectWithValue({
        message: error?.response?.data?.message || "An error occurred while fetching chatbot response",
        status: error?.response?.status || 500
      });
    }
  }
);

// WebSocket Handling
const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    initializeWebSocket: (state) => {
      if (!state.ws) {
        const ws = new WebSocket(
          `${import.meta.env.VITE_WS_API}/process_audio_ws`
        );

        ws.onopen = () => {
          console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
          console.log("WebSocket Message Received:", event.data);
          state.response = event.data; // Store response
        };

        ws.onerror = (error) => {
          console.error("WebSocket Error:", error);
          state.error = "WebSocket error occurred";
          state.errorStatus = 1006;
        };

        ws.onclose = () => {
          console.log("WebSocket closed");
          state.ws = null;
        };

        state.ws = ws;
      }
    },
    sendAudioMessage: (state, action: PayloadAction<Blob>) => {
      if (state.ws && state.ws.readyState === WebSocket.OPEN) {
        state.ws.send(action.payload);
        console.log("Audio message sent via WebSocket");
      } else {
        console.error("WebSocket not connected");
        state.error = "WebSocket not connected";
        state.errorStatus = 1015;
      }
    },
    closeWebSocket: (state) => {
      if (state.ws) {
        state.ws.close();
        state.ws = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatbotResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorStatus = null;
      })
      .addCase(
        fetchChatbotResponse.fulfilled,
        (state, action: PayloadAction<string>) => {
          console.log("Bot Response Received:", action.payload);
          state.loading = false;
          state.response = action.payload;
          state.errorStatus = null;
        }
      )
      .addCase(fetchChatbotResponse.rejected, (state, action) => {
        console.error("Chatbot API Error:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { initializeWebSocket, sendAudioMessage, closeWebSocket } =
  chatbotSlice.actions;
export default chatbotSlice.reducer;
