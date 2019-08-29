import React from "react";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import SimpleModal from "components/Modals/SimpleModal.jsx";
import AddEditStepModal from "components/Modals/AddEditStepModal.jsx";
import StepService from "services/step.service.js";
import { Link, Redirect } from "react-router-dom";

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
        this.addStep = this.addStep.bind(this);
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

  addStep(step) {
    this.setState({step: step})
  }

  stepsRender() {
      return this.state.step.steps.map(step => {
        return (
        <Link to={'/edit-step/' + step._id} key={step._id}>
            <Button className="w-100 my-1" size="lg" type="button" color="primary">{step.title}</Button>
        </Link>)
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

  render() {
      const text = `test \n frefu \n frefu \n frefu \n frefu \n frefu \n frefu \n frefu \n frefu`;
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
                    <Col className="text-right">
                        <Button color="secondary" type="button">Next</Button>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col className="text-center">
                        <h2 className="text-default">Edit {this.state.step.title}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SimpleModal buttonTitle="Notes" title={this.state.step.title + ' Notes'} text={text}></SimpleModal>
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
                        <AddEditStepModal onAdd={this.addStep} currentStepId={this.state.step._id}></AddEditStepModal>
                    </Col>
                </Row>
            </Container>
        </main>
      </>
    );
  }
}

export default EditStep;
