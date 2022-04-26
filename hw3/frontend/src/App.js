import React from "react";
// Import the CustomModal that we created in Modal.js.
import Modal from "./components/Modal";
import Rate from "./components/Rate";
import Login from "./components/Login";
import axios from "axios";
import Search from "./components/search"
// import { Input } from "reactstrap";

import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
<link rel="stylesheet" type="text/css" href="path/to/react-notifications/dist/react-notifications.css">

<script src="path/to/react-notifications/dist/react-notifications.js"></script>

</link>
// We are creating a class component for our todo list and individual todo list
// items.
class App extends React.Component {
  // Here comes our constructor.
  constructor(props) {
    super(props);

    this.state = {
      create: false,
      loggedIn: false,
      activeItem: {
        song: "",
        artist: "",
        genre: "",
        year: "",
      },
      rateItem: {
        user: "",
        song: "", 
        rating: "", 
        description: "" },
      
      userItem: {
        user: "",
        password: "",
      },
      UserList: [],
      SongList: [],
      RatingList: [],
      FilteredSongList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
    this.refreshRate();
    this.refreshUser();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/artist")
      .then((res) => this.setState({ SongList: res.data }))
      .catch((err) => console.log(err));
  };

  refreshRate = () => {
    axios
      .get("http://localhost:8000/api/rating")
      .then((res) => this.setState({RatingList: res.data }))
      .catch((err) => console.log(err));
  };

  refreshUser = () => {
    axios
      .get("http://localhost:8000/api/user")
      .then((res) => this.setState({UserList: res.data}))
      .catch((err) => console.log(err));

  };

  renderItems = () => {

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');

    return this.state.SongList.map((item) => (
      item.song === query || !query ?
      <li
        key={item.song}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          onClick={() => this.editRate(item.song)}
          className="allsongs"
          title={item.description}
        >
          {item.song}, {item.artist}
        </span>

        <span>
          <button
            onClick={() => this.editItem(item)}
            className="editbtn"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="deletebtn"
          >
            Delete
          </button>
        </span>
      </li>
      : null
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (this.state.create) {
      axios
      .post("http://localhost:8000/api/artist/", item)
      .then((res) => this.refreshList());
    }
    axios
    .put(`http://localhost:8000/api/artist/${item.song}/`, item)
    .then((res) => this.refreshList());
    return;

  };

  togglerate = () => {
    this.setState({ rate: !this.state.rate});
  }

  toggleuser = () => {
    this.setState({user: !this.state.user});
  }

  handleUser = (item) => {
    this.toggleuser();
    let ret;
    if (this.state.UserList.map((item1) => item1.user).includes(item.user)){
        let user = { user: item.user, song: "", rating: "", description: "" }
        this.setState({loggedIn: true, rateItem: user })
        alert("Welcome!")
        this.refreshUser();
        ret = NotificationManager.success('Success message', 'Logged In');
    }else{
    if (item.user === "") {
        ret =  NotificationManager.warning('Warning message', 'Not a valid Input');

    } else {
      
      axios
      .post("http://localhost:8000/api/user/", item)
      .then((res) => this.refreshUser());
      let user = { user: item.user, song: "", rating: "", description: "" }
      this.setState({loggedIn: true, rateItem: user })
      alert("Welcome!")
      ret = NotificationManager.success('Success message', 'Signed Up');
    }
    }
    return ret
  };


  handleRate = (item) => {
    this.togglerate();
    this.refreshRate();
    const exists = this.state.RatingList.filter((temp) => temp.user === item.user && temp.song === item.song);
    if (item.rating > 5) {
      item.rating = 5;
    } else if (item.rating < 1){
      item.rating = 1;
    }
    if (exists.length === 0) {
      axios
      .post("http://localhost:8000/api/rating/", item)
      .then((res) => this.refreshRate());
    }
    axios
    .put(`http://localhost:8000/api/rating/${exists[0].id}/`, item)
    .then((res) => this.refreshRate());
    return;
  };



  handleDelete = (item) => {
    if(window.confirm('Are you sure you want to delete?')){
      axios
        .delete(`http://localhost:8000/api/artist/${item.song}`)
        .then(res => this.refreshList());
      }
      else {
        this.refreshList();
      }
  };
  createItem = () => {
    const item = { song: "", artist: "", genre: "", year: "" };
    if (this.state.loggedIn) {
      this.setState({ activeItem: item, modal: !this.state.modal, create: true, rate: false})
    }
   ;
  };
  editItem = (item) => {
    if (this.state.loggedIn) {
    this.setState({ activeItem: item, modal: !this.state.modal, create: false, rate: false});
    }
  };

  editRate = (song) => {
    const rate = { user: this.state.rateItem.user, song: song, rating: "", description: "" };
    if (this.state.loggedIn) {
      this.setState({ rateItem: rate, rate: !this.state.rate, create: false, modal: false})
    }
   
  }

  createUser = () => {
    const user = {user: "", password: ""};
    this.setState({userItem: user, user: !this.state.user, create:false, model: false});
  };

  // The `render()` method is the only required method in a class component.
  // When called, it will render the page. You do not have to specifically
  // call render() in your component. Rather, the stub code with the
  // ReactDOM.render(...) in your index.js will do that for you.
  render() {
    return (
      <main className="content">
        <div className="tbar">
            <h1 className="brandname"> Listener </h1>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
            <Search
                onSave={this.searched}
            />
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {/* If the modal state is true, show the modal component. */}
        {/* {(this.state.modal && this.state.rate) && 
          <Modal 
            activeItem={this.state.activeItem}
            onSave={this.handleSubmit}
          />} */}
        {(this.state.modal && !this.state.rate) &&
          <Modal 
          activeItem={this.state.activeItem}
          onSave={this.handleSubmit}
        />
        }
        {(!this.state.modal && this.state.rate) &&
          <Rate 
          activeItem={this.state}
          onSave={this.handleRate}
          /> 
        }
        {(!this.state.model && !this.state.rate && !this.state.loggedIn) &&
        <Login
          activeItem={this.state.userItem}
          onSave={this.handleUser}
          />
        }
        <NotificationContainer/>
        <div className="">
          <button onClick={this.createItem} className="btn btn-primary">
            Add Song
          </button>
        </div>
      </main>
    );
  }
}

// Export our App so that it can be rendered in index.js, where it is imported.
export default App;