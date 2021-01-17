import { Card, Button, Tab, Row, Col, Nav, Modal } from 'react-bootstrap';
import styles from '../styles/Profile.module.css'
import loginStyles from '../styles/Login.module.css'
import LoginForm from '../components/loginForm'
import Image from 'next/image'
import InterestPanel from '../components/interestPanel';
import React, { useState } from 'react';
import ProfilePanel from '../components/ProfilePanel';
import FeaturesPanel from '../components/featuresPanel';

function LockTab({ locked, text }: { locked: boolean, text: string }) {
    return <div className={styles.profileLeftItem}>
        {locked ? <Image
            src="/lock.svg"
            alt="my image"
            width={30}
            height={30} />
            : <div style={{
                width: 30,
                height: 30,
            }}></div>}
        <span>{text}</span>
    </div>;
}

function LoginMedal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div>
                This section is locked because you haven't enabled student features.
            </div>
            <Button variant="primary" onClick={handleShow}>
                Enable student features
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function LockItem({ locked, children }: { locked: boolean, children: React.ReactNode }) {
    return <div className={styles.profileRightItem}>
        {locked ?
            <LoginMedal /> :
            children}
    </div>;
}

export default function LoginPage() {
    return <main className={styles.main + ' ' + loginStyles.background}>
        <div className={styles.profileContainer}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="browseQuiz">
                <Row>
                    <Col sm={3} className={styles.column}>
                        <Nav variant="pills"
                            className={"flex-column " + styles.profileLeftMenu}>
                            <div className={styles.profileLeftSectionHeader}>
                                Account Setting
                            </div>
                            <Nav.Item>
                                <Nav.Link eventKey="sampleLocked">
                                    <LockTab locked={true} text="a locked tab" />
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="manageFeatures">
                                    <LockTab locked={false} text="Manage features" />
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="first">
                                    <LockTab locked={false} text="Interest" />
                                </Nav.Link>
                            </Nav.Item>
                            <div className={styles.profileLeftSectionHeader}>
                                Public profile
                               </div>
                            <Nav.Item>
                                <Nav.Link eventKey="second">
                                    <LockTab locked={false} text="Contact Info" />
                                </Nav.Link>
                            </Nav.Item>
                            <div className={styles.profileLeftSectionHeader}>
                                Tutor
                            </div>
                            <Nav.Item>
                                <Nav.Link eventKey="answeredQuiz">
                                    <LockTab locked={false} text="Answered Quiz" />
                                </Nav.Link>
                                <Nav.Link eventKey="browseQuiz">
                                    <LockTab locked={false} text="Browse Quiz" />
                                </Nav.Link>
                                <Nav.Link eventKey="createQuiz">
                                    <LockTab locked={false} text="Create Quiz" />
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="sampleLocked">
                                <LockItem locked={true}>
                                    <InterestPanel />
                                </LockItem>
                            </Tab.Pane>
                            <Tab.Pane eventKey="first">
                                <LockItem locked={false}>
                                    <InterestPanel />
                                </LockItem>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <LockItem locked={false}>
                                    <ProfilePanel />
                                </LockItem>
                            </Tab.Pane>
                            <Tab.Pane eventKey="manageFeatures">
                                <LockItem locked={false}>
                                    <FeaturesPanel />
                                </LockItem>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    </main >;
}
