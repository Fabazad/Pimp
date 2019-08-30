import React from "react";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import AddEditStepModal from "components/Modals/AddEditStepModal.jsx";
import StepService from "services/step.service.js";
import EditInstructionsModal from "components/Modals/EditInstructionsModal";
import ReactDragListView from 'react-drag-listview';
import { Link } from "react-router-dom";

// index page sections
import { Button, Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";

class EditStep extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            step: {
                steps: []
            },
            stepHistory: []
        };
        this.stepService = new StepService();
        this.updateStep = this.updateStep.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var stepId = nextProps.match.params.id;
        if (stepId !== this.props.match.params.id) {
            this.stepService.getOne(nextProps.match.params.id).then(step => {
                this.setState({step: step});
                this.updateStepHistory(step);
            });
        }
    }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.stepService.getOne(this.props.match.params.id).then(step => {
        this.setState({step: step});
        this.updateStepHistory(step);
    });
  }

  updateStep(step) {
    this.setState({step: step})
  }

  stepsRender() {
    return this.state.step.steps.map(step => {
        return (
            <Row key={step._id} className="my-1">
                <Col>
                    <Link to={'/edit-step/' + step._id}>
                        <Button className="w-100" size="lg" type="button" color="primary">{step.title}</Button>
                    </Link>
                </Col>
                <div  className="pr-3">
                    <Button type="button" size="lg" color="danger" onClick={() => this.removeStep(step._id)}>X</Button>
                </div>
            </Row>
        )
    });
  }

  breadCrumbItemsRender() {
      return this.state.stepHistory.map((step, i) => {
          if (i === this.state.stepHistory.length - 1) {
              return (<BreadcrumbItem active key={'b' + step._id}>{step.title}</BreadcrumbItem>);
          }
          return (
            <BreadcrumbItem key={'b' + step._id}>
                <Link to={'/edit-step/' + step._id}>{step.title}</Link>
            </BreadcrumbItem>
          );
      })
  }

  updateStepHistory(step) {
      const stepIndex = this.state.stepHistory.findIndex(stepH => stepH._id === step._id);
      let stepHistory = this.state.stepHistory;
        if (stepIndex > -1) {
            stepHistory = stepHistory.slice(0, stepIndex + 1);
        } else {
            stepHistory.push(step);
        }
        this.setState({stepHistory: stepHistory});
  }

  previousButtonRender() {
    return (this.state.stepHistory.length > 1) ? (
        <Col className="text-left">
            <Link to={"/edit-step/" + this.state.stepHistory[this.state.stepHistory.length -2]._id}>
                <Button color="secondary" type="button">Previous</Button>
            </Link>
        </Col>
    ) : null;
  }

  nextButtonRender() {
    const parentStep = this.state.stepHistory[this.state.stepHistory.length - 2];
    if(!parentStep) {
        return (null);
    }
    const stepIndex = parentStep.steps.findIndex(step => step._id === this.state.step._id);
    const nextStep = parentStep.steps[stepIndex + 1];
    return (nextStep) ? (
        <Col className="text-right">
            <Link to={"/edit-step/" + nextStep._id}>
                <Button color="secondary" type="button">Next</Button>
            </Link>
        </Col>
    ) : null;
  }

  removeStep(stepId) {
      const index = this.state.step.steps.findIndex(step => step._id === stepId);
      if (index >= 0) {
          const steps = this.state.step.steps;
          steps.splice(index, 1);
          this.stepService.update(this.state.step._id, {steps: steps}).then(step => {
            this.setState({step: step});
          })
      }
  }

  render() {
      
    const that = this;
    const dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const steps = that.state.step.steps;
        const item = steps.splice(fromIndex, 1)[0];
        steps.splice(toIndex, 0, item);
        that.stepService.update(that.state.step._id, {steps}).then(step => that.setState({step}));
      },
      nodeSelector: 'div.row',
      handleSelector: 'div.col'
    };

    return (
      <>
        <DemoNavbar />
        <main ref="main" className="mt-56px">
            <Breadcrumb>
                {this.breadCrumbItemsRender()}
            </Breadcrumb>
            <Container className="mt-2">
                <Row>
                    {this.previousButtonRender()}
                    {this.nextButtonRender()}
                </Row>
                <Row className="mt-2">
                    <Col className="text-center">
                        <h2 className="text-default">
                            {this.state.step.title} 
                            <AddEditStepModal step={this.state.step} onSave={this.updateStep} isEditing={true}></AddEditStepModal>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EditInstructionsModal step={this.state.step} onEdit={this.updateStep}></EditInstructionsModal>
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
                        <ReactDragListView {...dragProps}>
                            {this.stepsRender()}
                        </ReactDragListView>
                        <AddEditStepModal onSave={this.updateStep} currentStepId={this.state.step._id}></AddEditStepModal>
                    </Col>
                </Row>
            </Container>
        </main>
      </>
    );
  }
}

export default EditStep;
