import React from "react";

// core components
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addHistoryStep } from "actions/historySteps";
import PropTypes from 'prop-types';

// index page sections
import { Button } from "reactstrap";

class StepsView extends React.Component {

    render() {
        return (
        <div>
            {this.props.steps.map((step, index) =>(
                <Link to={'/step/'+step._id} key={index+step._id}>
                    <Button className="w-100 my-1" size="lg" type="button" color="primary" onClick={() => this.props.addHistoryStep(step)}>{step.title}</Button>
                </Link>
            ))}
        </div>
        )
    }
}

StepsView.propTypes = {
    addHistoryStep: PropTypes.func.isRequired,
    steps: PropTypes.array.isRequired
}

const mapDispatchToProps = dispatch => ({
    addHistoryStep: step => dispatch(addHistoryStep(step))
});
  
export default connect(
    null,
    mapDispatchToProps
)(StepsView);

