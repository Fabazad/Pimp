import React from "react";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";

// index page sections
import { Button, Container, Row, Col } from "reactstrap";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main" className="mt-72px">
            <Container className="mt-3">
                <Row>
                    <Col className="text-left">
                        <Button color="secondary" type="button">Previous</Button>
                    </Col>
                    <Col className="text-right">
                        <Button color="secondary" type="button">Next</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Button size="sm" color="success" className="w-100">Notes</Button>
                    </Col>
                    <Col>
                        <Button size="sm" color="danger" className="w-100">Video</Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <label>Choose the next step</label>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col xs="12">
                        <Button className="w-100 my-1" size="lg" type="button" color="primary">fuedjgfbyvuehd fdvx</Button>
                        <Button className="w-100 my-1" size="lg" type="button" color="primary">fhd fjedgsvb</Button>
                        <Button className="w-100 my-1" size="lg" type="button" color="primary">fdv fdjvh fdvx</Button>
                        <Button className="w-100 my-1" size="lg" type="button" color="primary">fuedjgfbyvuehd dsf fhdb</Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs="12" className="text-center">
                        <Button size="sm" type="button" color="success">Statistics</Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs="12" className="text-center">
                        <Button size="sm" type="button" color="info">Comments</Button>
                    </Col>
                </Row>
            </Container>
        </main>
      </>
    );
  }
}

export default Index;
