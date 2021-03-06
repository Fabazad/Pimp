import React from "react";
import stepService from "services/step.service";
// reactstrap components
import {
  Button,
  Modal,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSteps } from "actions/steps";

class AddEditStepModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      exampleModal: false,
      title: '',
      stepId: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.titleInput = React.createRef();
  }

  componentDidMount() {
    if (!this.props.isEditing) {
      this.props.fetchSteps({main: false});
    }
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
      title: this.props.isEditing ? this.props.step.title : ''
    });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    let serviceAction;
    if (!this.props.isEditing && this.state.stepId) {
      const steps = this.props.step.steps;
      const addedStep = this.props.steps.find(s => s._id === this.state.stepId)
      steps.push(addedStep);
      serviceAction = stepService.update(this.props.step._id, {steps})
    } else {
      serviceAction = this.props.isEditing ?
        stepService.update(this.props.step._id, {title: this.state.title}) :
        stepService.create({title: this.state.title}, {stepId: this.props.step._id});
    }
    serviceAction.then(step => {
      this.props.onSave(step);
      this.toggleModal("exampleModal");
    });
  }

  focusInput() {
    this.titleInput.current.focus();
  }

  modalButtonRender() {
    return this.props.isEditing ? 
      (<Button
        color="warning"
        type="button"
        className="ml-2"
        size="sm"
        onClick={() => this.toggleModal("exampleModal")}
      >Edit</Button>) :
      (<Button
        color="success"
        type="button"
        className="w-100"
        size="lg"
        onClick={() => this.toggleModal("exampleModal")}
      >Add</Button>);
  }

  selectStepRender() {
    if (!this.props.isEditing) {
      return (
        <div>
          <h6 className="text-center">OR</h6>
          <FormGroup>
            <Input type="select" name="stepId" onChange={this.handleChange} value={this.state.stepId} disabled={this.state.title}>
                <option value={''}>Choose step</option>
                {this.props.steps.map(step => <option key={"oprion" + step._id} value={step._id}>{step.title}</option>)}
            </Input>
          </FormGroup>
        </div>
      );
    }
    return (null);
  }

  render() {
    const title = (this.props.isEditing ? "Edit" : "Add") + " step";
    return (
      <>
        {this.modalButtonRender()}
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          unmountOnClose={true}
          onOpened={this.focusInput}
          toggle={() => this.toggleModal("exampleModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
            {title}
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <div className="modal-body white-space-pre-line">
              <FormGroup>
                <Input 
                  placeholder="Step title" 
                  type="text" 
                  value={this.state.title} 
                  onChange={this.handleChange} 
                  name="title"
                  disabled = {this.state.stepId}
                  innerRef={this.titleInput} />
              </FormGroup>
              {this.selectStepRender()}
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("exampleModal")}
              >
                Close
              </Button>
              <Button
                color="success"
                data-dismiss="modal"
                type="submit"
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      </>
    );
  }
}


AddEditStepModal.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  fetchSteps: PropTypes.func.isRequired,
  step: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => ({
  fetchSteps: query => dispatch(fetchSteps(query))
});

const mapStateToProps = state => ({
  steps: state.steps.items
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditStepModal);