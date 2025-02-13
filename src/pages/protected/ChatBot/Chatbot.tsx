import { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../redux/store"
import { closeWebSocket, fetchChatbotResponse, initializeWebSocket } from "../../../redux/slices/chatbotSlice"
import { Book, Globe, Library, Mic, Send, Square } from "lucide-react"
import { Container, Row, Col, Card, Form, Button, Nav, Image } from "react-bootstrap"
import "./StudentChatBot.scss"
import ChatBotImg from "../../../assets/images/Chatbot.jpg";
import StudentImg from "../../../assets/images/student.jpg";
import { Calculator, Atom, FlaskConical, BookOpen, Landmark } from "lucide-react";
import ChatBotSidebarComponent from "../../../components/sidebar/ChatbotSideBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRobot } from "@fortawesome/free-solid-svg-icons"

interface Message {
  id: number
  content: string
  subject?: string
  isBot: boolean
  isAudio?: boolean,
  isError?: boolean,
  isLoading?: boolean
}

const StudentChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string>("math")
  const [showAudioRecorder, setShowAudioRecorder] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector((state: RootState) => state.auth);
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const [loadingMessageId, setLoadingMessageId] = useState<number | null>(null);

  const subjects = [
    { id: "math", name: "Toán học", icon: <Calculator /> },
    { id: "history", name: "Lịch sử", icon: <Landmark /> },
    { id: "english", name: "Tiếng Anh", icon: <Book /> },
    { id: "geography", name: "Địa lý", icon: <Globe /> },
    { id: "physics", name: "Khoa học", icon: <FlaskConical /> },
    { id: "literature", name: "Văn học", icon: <Library /> },
  ]

  useEffect(() => {
    dispatch(initializeWebSocket())
    setMessages([{ id: 0, content: "Tôi có thể giúp gì cho bạn?", isBot: true }])
    return () => {
      dispatch(closeWebSocket())
    }
  }, [dispatch])

  useEffect(() => {
    scrollToBottom()
  }, []) //Corrected dependency array

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim()) return

      try {
        const student_code = auth.user?.id
        const selectedSubjectName = subjects.find((s) => s.id === selectedSubject)?.name

        const newMessage: Message = {
          id: messages.length + 1,
          content: input,
          subject: selectedSubjectName,
          isBot: false,
        }

        setMessages((prev) => [...prev, newMessage])
        setInput("")

        const loadingMessage: Message = {
          id: messages.length + 2,
          content: "Loading...",
          subject: selectedSubjectName,
          isBot: true,
          isLoading: true,
        }

        setMessages((prev) => [...prev, loadingMessage])
        setLoadingMessageId(loadingMessage.id)

        setTimeout(async () => {
          const response = await dispatch(
            fetchChatbotResponse({
              student_code,
              question: input,
              subject: selectedSubjectName ?? "",
            }),
          )

          setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessage.id))
          setLoadingMessageId(null)

          if (response.error) {
            const errorData = response.payload as { message: string; status: number }
            const botResponse: Message = {
              id: messages.length + 3,
              content: errorData.message,
              subject: selectedSubjectName,
              isBot: true,
              isError: true,
            }
            setMessages((prev) => [...prev, botResponse])
          } else {
            const botResponse: Message = {
              id: messages.length + 3,
              content: response.payload,
              subject: selectedSubjectName,
              isBot: true,
            }
            setMessages((prev) => [...prev, botResponse])
          }
        }, 5000)
      } catch (error: any) {
        const errorMessage = error?.message || "An error occurred while sending your message"
        const botResponse: Message = {
          id: messages.length + 3,
          content: errorMessage,
          subject: selectedSubject,
          isBot: true,
          isError: true,
        }
        setMessages((prev) => [...prev, botResponse])
        setLoadingMessageId(null)
      }
    },
    [input, selectedSubject, messages, auth.user?.id, dispatch],
  )

  const handleRetry = useCallback(
    async (messageToRetry: Message) => {
      const student_code = auth.user?.id
      const selectedSubjectName = subjects.find((s) => s.id === selectedSubject)?.name

      // Remove the error message
      setMessages((prev) => prev.filter((msg) => msg.id !== messageToRetry.id))

      // Add a new loading message
      const loadingMessage: Message = {
        id: Date.now(),
        content: "Loading...",
        subject: selectedSubjectName,
        isBot: true,
        isLoading: true,
      }

      setMessages((prev) => [...prev, loadingMessage])
      setLoadingMessageId(loadingMessage.id)

      try {
        setTimeout(async () => {
          const response = await dispatch(
            fetchChatbotResponse({
              student_code,
              question: messageToRetry.content,
              subject: selectedSubjectName ?? "",
            }),
          )

          setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessage.id))
          setLoadingMessageId(null)

          if (response.error) {
            const errorData = response.payload as { message: string; status: number }
            const botResponse: Message = {
              id: Date.now(),
              content: errorData.message,
              subject: selectedSubjectName,
              isBot: true,
              isError: true,
            }
            setMessages((prev) => [...prev, botResponse])
          } else {
            const botResponse: Message = {
              id: Date.now(),
              content: response.payload,
              subject: selectedSubjectName,
              isBot: true,
            }
            setMessages((prev) => [...prev, botResponse])
          }
        }, 5000)
      } catch (error: any) {
        const errorMessage = error?.message || "An error occurred while retrying the message"
        const botResponse: Message = {
          id: Date.now(),
          content: errorMessage,
          subject: selectedSubject,
          isBot: true,
          isError: true,
        }
        setMessages((prev) => [...prev, botResponse])
        setLoadingMessageId(null)
      }
    },
    [auth.user?.id, dispatch, selectedSubject, subjects],
  )

  return (
    <Container fluid className="chat-container p-0 m-0">
      <Row className="h-100 gx-0">
        <ChatBotSidebarComponent />
        <Col className="p-0 m-0">
          <Card className="chat-card">
            <Card.Header>
              <h4 className="mb-0 py-3"><FontAwesomeIcon icon={faRobot} />&nbsp;Student Chat Bot</h4>
            </Card.Header>
            <Nav variant="tabs" activeKey={selectedSubject} onSelect={(k) => setSelectedSubject(k ?? "math")}>
              {subjects.map((subject) => (
                <Nav.Item key={subject.id}>
                  <Nav.Link eventKey={subject.id}>{subject.icon}&nbsp;{subject.name}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <Card.Body className="chat-body">
              <div className="messages-container">
                {messages.map((message) => (
                  <div key={message.id} className={`message ${message.isBot ? "bot" : "user"}`}>
                    <div className="avatar">
                      {message.isBot ?
                        <Image roundedCircle src={ChatBotImg} /> :
                        <Image roundedCircle src={StudentImg} />}
                    </div>
                    <div className="content">
                      {message.isAudio ? (
                        <audio controls src={message.content} className="w-100" />
                      ) : message.isLoading ? (
                        <span className="text-secondary">
                          Waiting for response....
                        </span>
                      ) : (
                        <div>
                          <span
                            className={message.isError ? "text-danger" : message.isBot ? "text-black" : "text-white"}
                          >
                            {message.content}
                          </span>
                          {message.isError && (
                            <div>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                // className="ms-2"
                                onClick={() => handleRetry(message)}
                                style={{ width: "20%" }}
                              >
                                Retry
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </Card.Body>
            <Card.Footer>
              <Form onSubmit={handleSubmit}>
                <Row className="align-items-center">
                  <Col>
                    <Form.Control
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" disabled={!selectedSubject || !input.trim()}>
                      <Send size={20} />
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowAudioRecorder(true)}
                      disabled={!selectedSubject}
                    >
                      <Mic size={20} />
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      {showAudioRecorder && (
        <AudioRecorderPopover
          setShowAudioRecorder={setShowAudioRecorder}
          setMessages={setMessages}
          selectedSubject={selectedSubject}
          subjects={subjects}
        />
      )}
    </Container>
  )
}

interface AudioRecorderPopoverProps {
  setShowAudioRecorder: React.Dispatch<React.SetStateAction<boolean>>
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  selectedSubject: string
  subjects: { id: string; name: string }[]
}

interface Message {
  id: number
  content: string
  subject?: string
  isBot: boolean
  isAudio?: boolean
}

const AudioRecorderPopover: React.FC<AudioRecorderPopoverProps> = ({
  setShowAudioRecorder,
  setMessages,
  selectedSubject,
  subjects,
}) => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const auth = useSelector((state: RootState) => state.auth)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioURL(audioUrl)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
    }
  }

  const handleSendAudio = async () => {
    if (audioURL && selectedSubject) {
      const selectedSubjectName = subjects.find((s) => s.id === selectedSubject)?.name
      const student_code = auth.user?.id

      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })

      const audioMessage: Message = {
        id: Date.now(),
        content: audioURL,
        subject: selectedSubjectName,
        isBot: false,
        isAudio: true,
      }

      setMessages((prev) => [...prev, audioMessage])

      try {
        const response = await dispatch(
          fetchChatbotResponse({
            student_code,
            question: audioBlob,
            subject: selectedSubjectName ?? "",
          }),
        )

        if (response.error) {
          const errorData = response.payload as { message: string; status: number }
          const botResponse: Message = {
            id: Date.now() + 1,
            content: errorData.message,
            subject: selectedSubjectName,
            isBot: true,
            isError: true,
          }
          setMessages((prev) => [...prev, botResponse])
          return
        }

        const botResponse: Message = {
          id: Date.now() + 1,
          content: response.payload,
          subject: selectedSubjectName,
          isBot: true,
        }

        setMessages((prev) => [...prev, botResponse])
      } catch (error) {
        console.error("Error sending audio message:", error)
      }

      setShowAudioRecorder(false)
    }
  }

  return (
    <Card className="audio-recorder-popover">
      <Card.Body>
        {isRecording ? (
          <Button onClick={stopRecording} variant="danger" className="w-100 mb-2">
            <Square className="me-2" size={16} />
            Stop Recording
          </Button>
        ) : (
          <Button onClick={startRecording} variant="primary" className="w-100 mb-2">
            <Mic className="me-2" size={16} />
            Start Recording
          </Button>
        )}

        {audioURL && (
          <div className="mt-2">
            <audio controls src={audioURL} className="w-100 mb-2" />
            <Button onClick={handleSendAudio} variant="success" className="w-100">
              <Send className="me-2" size={16} />
              Send Audio
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default StudentChatBot

