import { Card, Button, Tab, Row, Col, Nav } from 'react-bootstrap';
import styles from '../styles/Profile.module.css'
import loginStyles from '../styles/Login.module.css'
import LoginForm from '../components/loginForm'
import InterestPanel from '../components/interestPanel';
import React from 'react';
import ProfilePanel from '../components/ProfilePanel';

export default function LoginPage() {
    return <main className={styles.main + ' ' + loginStyles.background}>
        <div className={styles.profileContainer}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3} className={styles.column}>
                        <Nav variant="pills"
                            className={"flex-column " + styles.profileLeftMenu}>
                            <div className={styles.profileLeftItem}>
                                Account Setting
                            </div>
                            <Nav.Item>
                                <Nav.Link eventKey="first">Interest</Nav.Link>
                            </Nav.Item>
                            <div className={styles.profileLeftItem}>
                                Public profile
                            </div>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Contact Info</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div className={styles.profileRightItem}>
                                    <InterestPanel />
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className={styles.profileRightItem}>
                                    <ProfilePanel />
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    </main >;
}
