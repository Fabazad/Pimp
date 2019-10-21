import React from "react";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import AddEditStepModal from "components/Modals/AddEditStepModal.jsx";
import EditInstructionsModal from "components/Modals/EditInstructionsModal";
import StepNavigation from "components/Navbars/StepNavigation";
import ReactDragList from 'react-drag-list';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addHistoryStep } from "actions/historySteps";
import { fetchStep } from "actions/steps";
import stepService from "services/step.service";
import { updateLastHistoryStep } from "actions/historySteps";

// index page sections
import { Button, Container, Row, Col } from "reactstrap";

class EditStep extends React.Component {

    constructor(props) {
        super(props);
        this.updateStep = this.updateStep.bind(this);
        this.onUpdateDragList = this.onUpdateDragList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var stepId = nextProps.match.params.id;
        if (stepId !== this.props.match.params.id) {
            this.props.fetchStep(stepId);
        }
    }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.props.fetchStep(this.props.match.params.id);
  }

  updateStep(step) {
    this.props.updateLastHistoryStep(step);
    this.props.fetchStep(step._id);
  }

  stepsRender() {
      return (<ReactDragList
      handles={false}
      dataSource={this.props.step.steps}
      onUpdate={this.onUpdateDragList}
      row={step => {
          return (
            <Row key={step._id} className="my-2">
                <Col>
                    <Link to={'/edit-step/' + step._id}>
                        <Button className="w-100" size="lg" type="button" color="primary" onClick={() => this.props.addHistoryStep(step)}>{step.title}</Button>
                    </Link>
                </Col>
                <div  className="pr-3">
                    <Button type="button" size="lg" color="danger" onClick={() => this.removeStep(step._id)}>X</Button>
                </div>
            </Row>)
      }}
    />);
  }

  onUpdateDragList() {
      stepService.update(this.props.step._id, {steps: this.props.step.steps});
  }

  removeStep(stepId) {
      const index = this.props.step.steps.findIndex(step => step._id === stepId);
      if (index >= 0) {
          const steps = this.props.step.steps;
          steps.splice(index, 1);
          stepService.update(this.props.step._id, {steps}).then(step => {
            this.props.fetchStep(this.props.step._id)
          })
      }
  }

  pageRender() {
    if (this.props.step.error) return (<div>error: {this.props.step.error}</div>)
    if (!this.props.step._id) return (<div>Loading</div>)
    return (
        <div>
            {this.props.step.loading ? (<div className="overlay"></div>) : ""}
            <StepNavigation step={this.props.step} isEditing={true}/>
            <Container className="mt-2">
                <Row className="mt-2">
                    <Col className="text-center">
                        <h2 className="text-default">
                            {this.props.step.title} 
                            <AddEditStepModal step={this.props.step} onSave={this.updateStep} isEditing={true}></AddEditStepModal>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EditInstructionsModal step={this.props.step} onEdit={this.updateStep}></EditInstructionsModal>
                    </Col>
                    <Col>
                        <Button size="sm" color="danger" className="w-100">Update Video</Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <label>Choose the next step</label>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col xs="12">
                        {this.stepsRender()}
                        <AddEditStepModal onSave={this.updateStep} step={this.props.step}></AddEditStepModal>
                    </Col>
                </Row>
            </Container>
        </div>
    )

  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main" className="mt-56px">
            {this.pageRender()}
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
)(EditStep);
