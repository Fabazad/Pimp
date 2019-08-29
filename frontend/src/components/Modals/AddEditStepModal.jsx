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

class AddEditStepModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      exampleModal: false,
      step: {
        title: ''
      },
      steps: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.stepService = new StepService();
    this.titleInput = React.createRef();
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
      step: { title: ''}
    });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      step: { [name]: value }
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.stepService.create(this.state.step, {stepId: this.props.currentStepId}).then(step => {
      this.props.onAdd(step);
      this.toggleModal("exampleModal");
    });
  }

  focusInput() {
    this.titleInput.current.focus();
  }

  render() {
    const title = (this.props.isEditing ? "Edit" : "Add") + " step";
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="success"
          type="button"
          className="w-100"
          onClick={() => this.toggleModal("exampleModal")}
        >{title}</Button>
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
                  value={this.state.step.title} 
                  onChange={this.handleChange} 
                  name="title"
                  ref={this.titleInput} />
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

export default AddEditStepModal;