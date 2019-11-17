import React, { Component } from 'react';
import { NavLink, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

import HomeScreen from '../home_screen/HomeScreen';

var addCard = require('./../../images/Add.png');

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    changeName = () => {
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
            name: this.refs.name.value
        });
    }

    changeOwner = () => {
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
            owner: this.refs.owner.value
        });
    }

    // createListItemCard = () => {
    //     console.log("Creating a new item");
    //     var newCard = {
    //         description: "No Description",
    //         assigned_to: "No One",
    //         due_date: "12-12-2019",
    //         completed: true,

    //     }

    //     this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
    //         items: this.props.firestore.FieldValue.arrayUnion(newCard)
    //     });
    // }

    deleteList = () => {
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).delete();
        this.props.history.push('/');

        this.hideDeleteDialog();
    }

    showDeleteDialog = () => {
        if(document.getElementById('modal_yes_no_dialog_background_hide'))
        {
          document.getElementById('modal_yes_no_dialog_background_hide').id = 'modal_yes_no_dialog_background_show';
        }
      }
    
      hideDeleteDialog = () => {
        let element = document.getElementById('modal_yes_no_dialog_background_show');
    
        if (element) {
          element.id = 'modal_yes_no_dialog_background_hide';
        }
      }

    componentDidMount()
    {
      document.getElementById('list_delete_list').addEventListener("click", () => this.deleteList());
      document.getElementById('list_cancel_delete_list').addEventListener("click", () => this.hideDeleteDialog());
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Route exact path="/" component={HomeScreen} />
        }

        return (
            <div className="container white row">
                <h5 className="grey-text text-darken-3">Todo List
                    <div className="right" onClick={() => this.showDeleteDialog()}>&#128465;</div>
                </h5>
                <div className="input-field col s6">
                    <label className="active" htmlFor="name">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} onBlur={this.changeName} defaultValue={todoList.name} ref="name" />
                </div>
                <div className="input-field col s6">
                    <label className="active" htmlFor="owner">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} onBlur={this.changeOwner} defaultValue={todoList.owner} ref="owner" />
                </div>
                <div className="row">
                    <div className="col s3" onClick={this.sortItemsByTask}>Task</div>
                    <div className="col s3" onClick={this.sortItemsByDueDate}>Due Date</div>
                    <div className="col s3" onClick={this.sortItemsByStatus}>Status</div>
                </div>
                <ItemsList todoList={todoList} />
                <Link to={'/todoList/' + todoList.id + '/newItem'} key={-1}>
                    <div className='center'>
                        <img src={addCard} alt="" />
                    </div>
                </Link>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    todoList.id = id;

    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ListScreen);