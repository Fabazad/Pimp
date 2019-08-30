import React from "react";
import StepService from "services/step.service";
// reactstrap components
import {
  Button,
  Modal,
  Form,
  FormGroup,
  Input
} from "reactstrap";

class EditInstructionsModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      exampleModal: false,
      instructions: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.stepService = new StepService();
    this.instructionsInput = React.createRef();
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
      instructions: this.props.step.instructions
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
    this.stepService.update(this.props.step._id, {instructions: this.state.instructions}).then(step => {
      this.props.onEdit(step);
      this.toggleModal("exampleModal");
    });
  }

  focusInput() {
    this.instructionsInput.current.select();
  }

  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="success"
          type="button"
          className="w-100"
          size="sm"
          onClick={() => this.toggleModal("exampleModal")}
        >Edit Instructions</Button>
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
            Edit Instructions
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
                  placeholder="Step instructions" 
                  type="textarea" 
                  value={this.state.instructions} 
                  onChange={this.handleChange} 
                  name="instructions"
                  innerRef={this.instructionsInput} />
              </FormGroup>
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

export default EditInstructionsModal;