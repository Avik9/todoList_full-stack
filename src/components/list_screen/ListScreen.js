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

    changeName = () => {
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
            name: 'Avik'
        });
    }

    changeOwner = () => {
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
            owner: 'Kadakia'
        });
    }

    createListItemCard = () => {
        console.log("Creating a new item");
        var newCard = {
            description: "No Description",
            assigned_to: "No One",
            due_date: "12-12-2019",
            completed: true,

        }
        
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.firestore.FieldValue.arrayUnion(newCard)
        });
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
                    <label className="active" htmlFor="name">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} onBlur={this.changeName} defaultValue={todoList.name} />
                </div>
                <div className="input-field col s6">
                    <label className="active" htmlFor="owner">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} onBlur={this.changeOwner} defaultValue={todoList.owner} />
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