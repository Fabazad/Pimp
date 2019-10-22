import React from "react";

// core components
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addHistoryStep } from "actions/historySteps";
import PropTypes from 'prop-types'
import ReactDragList from 'react-drag-list';

// index page sections
import { Button, Row, Col } from "reactstrap";

class EditStepsView extends React.Component {

    render() {
        return (
        <ReactDragList
            handles={false}
            dataSource={this.props.steps}
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
                        <Button type="button" size="lg" color="danger" onClick={() => this.props.onRemove(step._id)}>X</Button>
                    </div>
                </Row>)
            }}
        />
        );
    }
}

EditStepsView.propTypes = {
    addHistoryStep: PropTypes.func.isRequired,
    steps: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
    addHistoryStep: step => dispatch(addHistoryStep(step))
});
  
export default connect(
    null,
    mapDispatchToProps
)(EditStepsView);

