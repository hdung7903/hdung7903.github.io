import { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../redux/store"
import { closeWebSocket, fetchChatbotResponse, initializeWebSocket } from "../../../../redux/slices/chatbotSlice"
import { Send } from "lucide-react"
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap"
import "../StudentChatBot.scss"
import ChatBotImg from "../../../../assets/images/Chatbot.jpg";
import TeacherImg from "../../../../assets/images/teacher.jpg";
import ChatBotSidebarComponent from "../../../../components/sidebar/ChatbotSideBar"
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
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch<AppDispatch>()
    const auth = useSelector((state: RootState) => state.auth);
    const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
    const [loadingMessageId, setLoadingMessageId] = useState<number | null>(null);

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
                const selectedSubjectName = "";

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
                    subject: "",
                    isBot: true,
                    isError: true,
                }
                setMessages((prev) => [...prev, botResponse])
                setLoadingMessageId(null)
            }
        },
        [input, "selectedSubject", messages, auth.user?.id, dispatch],
    )

    const handleRetry = useCallback(
        async (messageToRetry: Message) => {
            const student_code = auth.user?.id
            const selectedSubjectName = "";

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
                    subject: "selectedSubject",
                    isBot: true,
                    isError: true,
                }
                setMessages((prev) => [...prev, botResponse])
                setLoadingMessageId(null)
            }
        },
        [auth.user?.id, dispatch, "selectedSubject", "subjects"],
    )

    return (
        <Container fluid className="chat-container p-0 m-0">
            <Row className="h-100 gx-0">
                <ChatBotSidebarComponent />
                <Col className="p-0 m-0">
                    <Card className="chat-card">
                        <Card.Header className="py-3">
                            
                            <h4 className="mb-0 "><FontAwesomeIcon icon={faRobot} />&nbsp;Teacher Chat Bot</h4>
                        </Card.Header>
                        <Card.Body className="chat-body">
                            <div className="messages-container">
                                {messages.map((message) => (
                                    <div key={message.id} className={`message ${message.isBot ? "bot" : "user"}`}>
                                        <div className="avatar">
                                            {message.isBot ?
                                                <Image roundedCircle src={ChatBotImg} /> :
                                                <Image roundedCircle src={TeacherImg} />}
                                        </div>
                                        <div className="content">
                                            {message.isAudio ? (
                                                <audio controls src={message.content} className="w-100" />
                                            ) : message.isLoading ? (
                                                <span className="text-secondary">
                                                    Waiting for response....
                                                </span>
                                            ) : (
                                                <div className="align-items-center">
                                                    <span
                                                        className={message.isError ? "ps-2 text-danger" : message.isBot ? "ps-2 text-black" : " s-2 text-white"}
                                                    >
                                                        {message.content}
                                                    </span>
                                                    {message.isError && (
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            className="ms-2"
                                                            onClick={() => handleRetry(message)}
                                                            style={{width:"20%"}}
                                                        >
                                                            Retry
                                                        </Button>
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
                                        <Button type="submit" disabled={!input.trim()}>
                                            <Send size={20} />
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container >
    )
}

export default StudentChatBot

