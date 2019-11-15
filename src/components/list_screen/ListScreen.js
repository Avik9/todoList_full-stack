import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom'
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

    createListItemCard = () => {
        console.log("Creating a new item");
        var newCard = {
            description: "No Description",
            assigned_to: "No One",
            due_date: "",
            completed: true,

        }
        
        console.log("New Card: " + newCard.description);
        console.log(this.state);
        // this.props.firestore.collection('todoLists').doc(this.props.todoList).items.push(newCard);
        // this.props.todoList.add(newCard)
        this.props.todoList.items.push(newCard)
    }

    deleteList = () => {
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).delete();
        this.props.history.push('/');
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
                    <div className ="right" onClick={() => this.deleteList()}>&#128465;</div>
                </h5>
                <div className="input-field col s6">
                    <label class="active" for="name">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field col s6">
                    <label class="active" htmlFor="owner">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <div className="row">
                    <div className="col s3" onClick={this.sortItemsByTask}>Task</div>
                    <div className="col s3" onClick={this.sortItemsByDueDate}>Due Date</div>
                    <div className="col s3" onClick={this.sortItemsByStatus}>Status</div>
                </div>
                <ItemsList todoList={todoList} />
                <div className='center' onClick={this.createListItemCard}>
                    <img src={addCard} alt=""/>
                </div>
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