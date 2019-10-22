import React from "react";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleModal from "components/Modals/SimpleModal.jsx";
import StepsView from "components/StepsView";
import { connect } from 'react-redux';
import { addHistoryStep } from "actions/historySteps";
import { fetchStep } from "actions/steps";
import { updateLastHistoryStep } from "actions/historySteps";
import StepNavigation from "components/Navbars/StepNavigation";

// index page sections
import { Button, Container, Row, Col } from "reactstrap";

class StepView extends React.Component {

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main && (this.refs.main.scrollTop = 0);
        this.props.fetchStep(this.props.match.params.id);
        
    }

    componentWillReceiveProps(nextProps) {
        const stepId = nextProps.match.params.id;
        if (stepId !== this.props.match.params.id) {
            this.props.fetchStep(stepId);
        }
    }

    render() {
        if (this.props.step.error) {
            return (<div>error: {this.props.step.error}</div>)
        } 
        if (!this.props.step._id) {
            return (<div>Loading...</div>)
        } 
        return (
        <>
            <DemoNavbar />
            <main ref="main" className="mt-56px">
                {(this.props.step.loading) ? (<div className="overlay"></div>) : ""}
                <StepNavigation step={this.props.step} isEditiong={false}/>
                <Container className="mt-2">
                    <Row className="mt-2">
                        <Col className="text-center">
                            <h2 className="text-default">{this.props.step.title}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SimpleModal buttonTitle="Notes" title="Vibe Notes" text={this.props.step.instructions}></SimpleModal>
                        </Col>
                        <Col>
                            <Button size="sm" color="danger" className="w-100">Video</Button>
                        </Col>
                    </Row>
                    {this.props.step.steps.length ? <Row className="mt-4">
                        <Col className="text-center">
                            <label>Choose the next step</label>
                        </Col>
                    </Row> : ""}
                    <Row className="mt-1">
                        <Col xs="12">
                            <StepsView steps={this.props.step.steps}/>
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

const mapStateToProps = state => ({
    step: state.step
});

const mapDispatchToProps = dispatch => ({
    addHistoryStep: step => dispatch(addHistoryStep(step)),
    fetchStep: _id => dispatch(fetchStep(_id)),
    updateLastHistoryStep: step => dispatch(updateLastHistoryStep(step)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StepView);