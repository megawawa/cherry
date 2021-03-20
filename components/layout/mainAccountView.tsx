import { Card, Button, Tab, Row, Col, Nav, Modal } from 'react-bootstrap';
import styles from '../../styles/Profile.module.css'
import loginStyles from '../../styles/Login.module.css'
import LoginForm from '../profile/loginForm'
import Image from 'next/image'
import InterestPanel from '../profile/interestPanel';
import React, { useState } from 'react';
import ProfilePanel from '../profile/profilePanel';
import FeaturesPanel from '../featuresPanel';
import AnsweredQuizPanel from '../answeredQuizPanel';
import BrowseQuizPanel from '../browseQuizPanel';
import Link from 'next/link';
import { AccountContextProvider, useAccountContext } from './accountContext';
import CreateQuizPanel from '../quiz/createQuizPanel';
import ProfilePanelView from '../profile/profilePanelView';
import BrowseTutorRequestPanel from '../profile/tutor/browseTutorRequestPanel';

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

export default function MainAccountView({ activeKey }: {
    activeKey: string
}) {
    const context = useAccountContext();
    return <main className={styles.main}>
        <div className={styles.profileContainer}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={activeKey}>
                <Row>
                    <Col sm={2} className={styles.column}>
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
                            <Nav.Item>
                                <Nav.Link eventKey="second">
                                    <LockTab locked={false} text="Contact Info" />
                                </Nav.Link>
                            </Nav.Item>
                            <div className={styles.profileLeftSectionHeader}>
                                Browse
                               </div>
                            <Nav.Item>
                                <Link href="/quizzes" passHref>
                                    <Nav.Link  eventKey="browseQuiz">
                                        <LockTab locked={false} text="Quiz" />
                                    </Nav.Link>
                                </Link>
                                <Nav.Link eventKey="Browse Test">
                                    <LockTab locked={false} text="Test" />
                                </Nav.Link>
                                <Link href="/tutorRequests" passHref>
                                    <Nav.Link eventKey="browseTutorRequest">
                                        <LockTab locked={false} text="Tutor Request" />
                                    </Nav.Link>
                                </Link>
                                <Nav.Link eventKey="viewProfile">
                                    <LockTab locked={false} text="Profile" />
                                </Nav.Link>
                            </Nav.Item>
                            <div className={styles.profileLeftSectionHeader}>
                                Tutor
                            </div>
                            <Nav.Item>
                                <Link href="/profileHistory" passHref>
                                    <Nav.Link eventKey="answeredQuizHistory">
                                        <LockTab locked={false} text="History" />
                                    </Nav.Link>
                                </Link >
                                <Nav.Link eventKey="answerQuiz">
                                    <LockTab locked={false} text="Answer Quiz" />
                                </Nav.Link>
                                <Link href="/createQuiz/?tutor=1" passHref>
                                    <Nav.Link eventKey="createQuiz">
                                        <LockTab locked={false} text="Create Quiz" />
                                    </Nav.Link>
                                </Link>
                                <Nav.Link eventKey="createProblemSet">
                                    <LockTab locked={false} text="Create Problem Set" />
                                </Nav.Link>
                            </Nav.Item>
                            <div className={styles.profileLeftSectionHeader}>
                                Student
                            </div>
                            <Nav.Item>
                                <Nav.Link eventKey="takenQuizHistory">
                                    <LockTab locked={false} text="History" />
                                </Nav.Link>
                                <Link href="/createQuiz" passHref>
                                    <Nav.Link eventKey="askQuiz">
                                        <LockTab locked={false} text="Help me on Quiz!!!" />
                                    </Nav.Link>
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} className={styles.columnRight}>
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
                                    <FeaturesPanel handleChange={null} state={null} />
                                </LockItem>
                            </Tab.Pane>
                            <Tab.Pane eventKey="answeredQuizHistory">
                                <LockItem locked={false}>
                                    <AnsweredQuizPanel />
                                </LockItem>
                            </Tab.Pane>
                            <Tab.Pane eventKey="browseQuiz">
                                <LockItem locked={false}>
                                    <BrowseQuizPanel />
                                </LockItem>
                            </Tab.Pane>
                            <Tab.Pane eventKey="browseTutorRequest">
                                <LockItem locked={false}>
                                    <BrowseTutorRequestPanel />
                                </LockItem>
                            </Tab.Pane>
                            <Tab.Pane eventKey="askQuiz">
                                <LockItem locked={false}>
                                    <CreateQuizPanel isTutor={false} />
                                </LockItem>
                            </Tab.Pane>
                            <Tab.Pane eventKey="createQuiz">
                                <LockItem locked={false}>
                                    <CreateQuizPanel isTutor={true} />
                                </LockItem>
                            </Tab.Pane>
                            <Tab.Pane eventKey="viewProfile">
                                <LockItem locked={false}>
                                    <ProfilePanelView />
                                </LockItem>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    </main >;
}
