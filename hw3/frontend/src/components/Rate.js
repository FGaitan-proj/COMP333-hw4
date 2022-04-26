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
  ModalHeader,
} from "reactstrap";


export default class RateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem.rateItem,
      RatingList: this.props.activeItem.RatingList,
      SongList: this.props.activeItem.SongList,
    };
  }


  handleChange = (event) => {
    let { name, value } = event.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  renderRatings() {
      const allItems = this.state.RatingList.filter((item) => item.song === this.state.activeItem.song);
      const Average = allItems.map((item) => item.rating).reduce((item1,item2) => item1+item2,0) / allItems.length;
      const avg_out = <div>The average Rating: {(Average.length === 0) ? ("Rate now!") : (Average) } </div>;

  
      const rate_out = allItems.map((item) => (
        <div
        className="allsongs"
        key={item.id}
      >
        {item.rating}: {item.user} says "{item.description}"
      </div>
      ));
    
      
      return <div> {avg_out} {rate_out}</div>

  };


  render() {

    const { onSave } = this.props;
    return (

      <Modal isOpen={true} className="row">
        <ModalHeader> {this.state.activeItem.song} <br/> {this.state.SongList.filter((item) => item.song === this.state.activeItem.song)[0].artist} </ModalHeader>
        {this.renderRatings()}
        <br/>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="rating">{this.state.RatingList.map((item) => (item.song === this.state.activeItem.song) ? 
              item.user : "").includes(this.state.activeItem.user) ? ("You have rated this song, update here"): ("Add your rating Here")}</Label>
              <br/>
              Enter Rate: 
              <Input
                type="number"
                name="rating"
                max={5}
                min={1}
                value={this.state.activeItem.rating}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
            <Label for="description"></Label>
              <br/>
                <Input
                  type="text"
                  name="description"
                  value={this.state.activeItem.description}
                  onChange={this.handleChange}
                  placeholder="Enter description"
                />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
          Update rating
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}