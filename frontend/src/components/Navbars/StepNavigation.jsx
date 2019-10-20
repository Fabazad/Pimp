import React from "react";

// reactstrap components
import { Breadcrumb, BreadcrumbItem, Container, Row, Col, Button } from "reactstrap";
import { connect } from 'react-redux';
import { removeLastHistorySteps, initHistorySteps, removeLastHistoryStep } from "actions/historySteps";

import { Link } from "react-router-dom";

class StepNavigation extends React.Component {

  componentDidMount() {
    if(this.props.historySteps.length === 0) {
      this.props.initHistorySteps([this.props.step]);
    }
  }

  breadCrumbItemsRender() {
    return this.props.historySteps.map((step, i) => {
        if (i === this.props.historySteps.length - 1) {
            return (<BreadcrumbItem active key={'b' + step._id}>{step.title}</BreadcrumbItem>);
        }
        return (
          <BreadcrumbItem key={'b' + step._id}>
              <Link to={'/edit-step/' + step._id} onClick={() => this.onBreadcrumbItemClick(step)}>{step.title}</Link>
          </BreadcrumbItem>
        );
    })
  }

  onBreadcrumbItemClick(step) {
    const index = this.props.historySteps.findIndex(historyStep => historyStep._id === step._id) + 1;
    this.props.removeLastHistorySteps(index);
  }

  previousButtonRender() {
    return (this.props.historySteps.length > 1) ? (
        <Col className="text-left">
            <Link to={"/edit-step/" + this.props.historySteps[this.props.historySteps.length -2]._id}>
                <Button color="secondary" type="button" onClick={() => this.props.removeLastHistoryStep()}>Previous</Button>
            </Link>
        </Col>
    ) : null;
  }

  render() {
    return (
      <>
        <Breadcrumb>
            {this.breadCrumbItemsRender()}
        </Breadcrumb>
        <Container className="mt-2">
            <Row>
                {this.previousButtonRender()}
            </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  historySteps: state.historySteps
});

const mapDispatchToProps = dispatch => ({
  removeLastHistorySteps: index => dispatch(removeLastHistorySteps(index)),
  initHistorySteps: step => dispatch(initHistorySteps(step)),
  removeLastHistoryStep: () => dispatch(removeLastHistoryStep())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepNavigation);
