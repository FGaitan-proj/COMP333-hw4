import React from "react";
// We would like to use a modal (small window) to show details of a task.
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";


export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }


  handleChange = (event) => {
    let { name, value } = event.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };


  render() {

    const { onSave } = this.props;
    return (

      <Modal isOpen={true} className="row">
        <ModalBody>
          <Form>
            <FormGroup>
                <Label for="song"> Song title</Label>
                <br/>
                <Input
                  type="text"
                  name="song"
                  value={this.state.activeItem.song}
                  onChange={this.handleChange}
                  placeholder="Enter Song"
                />
            </FormGroup>

            <FormGroup>
              <Label for="artist"> Artist </Label>
              <br/>
              <Input
                type="text"
                name="artist"
                value={this.state.activeItem.artist}
                onChange={this.handleChange}
                placeholder="Enter Artist"
              />
            </FormGroup>
            
            <FormGroup>
              <Label for="genre">Genre</Label>
              <br/>
              <Input
                type="text"
                name="genre"
                value={this.state.activeItem.genre}
                onChange={this.handleChange}
                placeholder="Enter Genre"
              />
            </FormGroup>

            <FormGroup>
              <Label for="year"> Release Year </Label>
              <br/>
                <Input
                  type="text"
                  name="year"
                  value={this.state.activeItem.year}
                  onChange={this.handleChange}
                  placeholder="Enter Year"
                />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
          Update/Add
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}