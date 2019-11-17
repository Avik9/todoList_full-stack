import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Checkbox } from 'react-materialize';
import { Link } from 'react-router-dom';

export class ItemScreen extends Component {
    submitItemChanges = () => {

        var currentItem = this.props.item;

        currentItem.description = this.refs.item_description_textfield.value;
        currentItem.assigned_to = this.refs.assigned_to_textfield.value;
        currentItem.due_date = this.refs.due_date_dropdown.value;
        currentItem.completed = true;

        this.props.firestore.collection("todoLists")
        .doc(this.props.todoList.id)
        .get()
        .then(doc => {
            const data = doc.data();
            data.items[currentItem.key] = currentItem;
            this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update(
                {items: data.items}
        )
    });
    }

    createListItemCard = () => {
        var newCard = {
            description: this.refs.item_description_textfield.value,
            assigned_to: this.refs.assigned_to_textfield.value,
            due_date: this.refs.due_date_dropdown.value,
            completed: true,

        }

        if(newCard.description === '')
        {
            newCard.description = 'No Description';
        }

        if(newCard.assigned_to === '')
        {
            newCard.assigned_to = 'Not Assigned';
        }

        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.firestore.FieldValue.arrayUnion(newCard)
        });
    }

    render() {
        const item = this.props.item;

        if (item) {
            return (
                <div id='todo_item'>
                    <div id="item_container">Item</div>
                    <div id="item_name_container" className="text_toolbar">
                        <span id="description_prompt">Description:</span>
                        <input type="text" defaultValue={item.description} ref="item_description_textfield" />
                    </div>
                    <div id="assigned_to_container" className="text_toolbar">
                        <span id="assigned_to_prompt">Assigned To:</span>
                        <input type="text" defaultValue={item.assigned_to} ref="assigned_to_textfield" />
                    </div>
                    <div id="due_date_container" className="text_toolbar">
                        <span id="due_date_prompt">Due Date:</span>
                        <input type="date" defaultValue={item.due_date} ref="due_date_dropdown" />
                    </div>
                    <div id="completed_container" className="text_toolbar">
                        <span id="completed_prompt">Completed:</span>
                        <Checkbox defaultChecked={item.completed} ref="completed_checkbox" />

                    </div>
                    <div id="list_submit_buttons">
                        <button id="list_submit_list" onClick={this.submitItemChanges}><Link to={'/todoList/' + this.props.todoList.id}>Submit</Link></button>
                        <button id="list_cancel_submit_list"><Link to={'/todoList/' + this.props.todoList.id}>Cancel</Link></button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div id='todo_item'>
                    <div id="item_container">Item</div>
                    <div id="item_name_container" class="text_toolbar">
                        <span id="description_prompt">Description:</span>
                        <input type="text" defaultValue={""} ref="item_description_textfield" />
                    </div>
                    <div id="assigned_to_container" class="text_toolbar">
                        <span id="assigned_to_prompt">Assigned To:</span>
                        <input type="text" defaultValue={""} ref="assigned_to_textfield" />
                    </div>
                    <div id="due_date_container" class="text_toolbar">
                        <span id="due_date_prompt">Due Date:</span>
                        <input type="date" defaultValue={""} ref="due_date_dropdown" />
                    </div>
                    <div id="completed_container" class="text_toolbar">
                        <span id="completed_prompt">Completed:</span>
                        <Checkbox defaultChecked={false} ref="completed_checkbox" />
                    </div>
                    <div id="list_submit_buttons">
                        <button id="list_submit_list" onClick={this.createListItemCard}><Link to={'/todoList/' + this.props.todoList.id}>Submit</Link></button>
                        <button id="list_cancel_submit_list"><Link to={'/todoList/' + this.props.todoList.id}>Cancel</Link></button>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    todoList.id = id;
    const itemNum = ownProps.match.params.key;
    const item = todoList.items[itemNum]

    console.log('itemNum: ' + itemNum)
    console.log('item:' + item)


    return {
        itemNum,
        todoList,
        item,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen);