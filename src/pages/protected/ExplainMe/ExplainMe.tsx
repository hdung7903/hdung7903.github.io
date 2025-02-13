import 'flag-icons/css/flag-icons.min.css';
import React from 'react'
import { Accordion, Button, Card, Col, Container, Dropdown, Form, InputGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Bg2 from '../../../assets/images/bg-2.jpg';

const ExplainMe: React.FC = () => {
    const { t } = useTranslation();

    const renderCardSection = (sectionTitle: string, cardCount: number = 6) => (
        <>
            <div className="d-flex align-items-center">
                <h2 className="text-center flex-grow-1 mb-5" style={{ borderBottom: '0.5px solid #e6edf5', paddingBottom: '0px', textDecoration: 'underline', textUnderlineOffset: '4px' }}>{sectionTitle}</h2>
            </div>
            <Row className="g-4 mb-4">
                {Array.from({ length: cardCount }).map((_, index) => (
                    <Col key={index} md={4}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img
                                variant="top"
                                src="/placeholder.svg?height=200&width=400"
                                className="bg-light"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title className="h6">{t('explainMe.hotTopic.cardTitle')}</Card.Title>
                                <Card.Text className="small text-muted">
                                    {t('explainMe.hotTopic.showMore')}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-center mb-5">
                <Button variant="outline-primary">{t('explainMe.hotTopic.showMore')}</Button>
            </div>
        </>
    );
    return (
        <Container fluid style={{ padding: 0, margin: 0 }}>
            <div className="hero-section py-5 text-center" style={{
                backgroundImage: `url(${Bg2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '60vh',
                position: 'relative',
                marginBottom: '50px'
            }} data-overlay="4">
                <div className="overlay" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    zIndex: 1
                }}></div>

                <Container className="py-5" style={{ position: 'relative', zIndex: 2 }}>
                    <h1 className="display-4 mb-3 text-white">{t('explainMe.hero.title')}</h1>
                    <p className="lead text-white mb-5 mx-auto" style={{
                        maxWidth: '600px',
                        opacity: 0.9
                    }}>
                        {t('explainMe.hero.description')}
                    </p>
                </Container>

                <div className="search-container" style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    zIndex: 10, // Increased z-index
                    padding: '0 15px'
                }}>
                    <InputGroup size="lg" className="mx-auto" style={{
                        maxWidth: '600px',
                        background: 'white',
                        borderRadius: '10px',
                        overflow: 'visible',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <InputGroup.Text className="bg-white border-0">
                            <i className="fa fa-search text-muted"></i>
                        </InputGroup.Text>

                        <Form.Control
                            placeholder="Search"
                            className="border-0 shadow-none"
                            style={{ boxShadow: 'none' }}
                        />

                        <InputGroup.Text className="bg-white border-0">
                            <i className="fa fa-times-circle text-muted"></i>
                        </InputGroup.Text>

                        <Dropdown align="end" className="topic-dropdown">
                            <Dropdown.Toggle
                                variant="white"
                                className="border-0 h-100"
                                style={{
                                    backgroundColor: 'white',
                                    borderLeft: '1px solid #dee2e6',
                                    paddingLeft: '1rem',
                                    paddingRight: '1rem'
                                }}
                            >
                                Topic
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{
                                backgroundColor: 'white',
                                border: '1px solid #dee2e6',
                                borderRadius: '8px',
                                marginTop: '4px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                zIndex: 1050
                            }}>
                                <Dropdown.Item>Topic 1</Dropdown.Item>
                                <Dropdown.Item>Topic 2</Dropdown.Item>
                                <Dropdown.Item>Topic 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>
                </div>
            </div>

            <Container className="py-5">
                {renderCardSection(t('explainMe.hotTopic.title'))}
                {renderCardSection(t('explainMe.video.title'))}

                <h2 className="text-center mb-4">{t('explainMe.faq.title')}</h2>
                <div className="mx-auto" style={{ maxWidth: '800px' }}>
                    <Accordion flush>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Accordion.Item key={index} eventKey={index.toString()}>
                                <Accordion.Header>
                                    <span className="flex-grow-1">{t('explainMe.faq.question')} {index + 1}</span>
                                    <i className="bi bi-chevron-down accordion-icon"></i>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {t('explainMe.faq.answer')}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </Container>
        </Container>

    );
};

export default ExplainMe;