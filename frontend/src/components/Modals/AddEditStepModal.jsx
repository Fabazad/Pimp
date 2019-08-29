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
    this.stepService = new StepService();
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
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
    this.stepService.getOne().then(res => {
      this.setState({
        step: { title: '' }
      });
      this.props.onAdd(res)
    });
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
                <Input placeholder="Step title" type="text" value={this.state.step.title} onChange={this.handleChange} name="title"/>
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
                onClick={() => this.toggleModal("exampleModal")}
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