import React from "react";
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
                    <Label for="user"> User</Label>
                    <br/>
                    <Input
                      type="text"
                      name="user"
                      value={this.state.activeItem.user}
                      onChange={this.handleChange}
                      placeholder="Username"
                    />
                </FormGroup>  
                <FormGroup>
                    <Label for = "password"> Password</Label>
                    <br/>
                    <Input 
                    type="text"
                    name="password"
                    value={this.state.activeItem.rating}
                    onChange={this.handleChange}
                    placeholder = "Enter your password"
                    />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => onSave(this.state.activeItem)}>
              Login
              </Button>
  
            </ModalFooter>
          </Modal>
        );
      }
    } 