import { Breadcrumb, Card, Col, Nav, Row, Tab, ProgressBar } from "react-bootstrap";
import styles from '../styles/Problem.module.css'
import historyStyles from '../styles/History.module.css'

export default function History() {
    return (
        <div className={styles.main}>
            <Card className={styles.panel}>
                <Card.Header className={styles.title}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            3rd grade
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#" active>
                            Test1
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Card.Header>
                <Card.Body>


                    <Card className={styles.panel}>
                        <Card.Header className={styles.title}>Summary </Card.Header>
                        <Card.Body>
                            exercise remaining: 1/3
                            <ProgressBar now={66} label={`${66}%`} />
                            <div>your score so far: 2/2</div>
                            <div>average score: 1.7/2 </div>
                        </Card.Body>
                    </Card>



                    <Card className={styles.panel}>
                        <Card.Header className={styles.title}>Details </Card.Header>
                        <Card.Body>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row>
                                    <Col sm={3}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">
                                                    <div className={historyStyles.progressTab}>
                                                        <span className={historyStyles.progressDot}
                                                            style={{ "opacity": `${1}` }}></span>
                                                        <div>exercise 1</div>
                                                    </div>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">
                                                    <div className={historyStyles.progressTab}>
                                                        <span className={historyStyles.progressDot}
                                                            style={{ "opacity": `${0.5}` }} ></span>
                                                        <div>exercise 2</div>
                                                    </div>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="third">
                                                    <div className={historyStyles.progressTab}>
                                                        <span className={historyStyles.progressDot}
                                                            style={{ "opacity": `${0}` }}></span>
                                                        <div>exercise 3</div>
                                                    </div>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={9}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <div> 2 attempts</div>
                                                <div> this is the first exercise</div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <div> 1 attempts</div>
                                                <div>this is the second exercise</div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <div> 0 attempts</div>
                                                <div>this is the third exercise</div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Card.Body>
                    </Card>


                </Card.Body>
            </Card>
        </div>
    );
}