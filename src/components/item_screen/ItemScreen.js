import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

export class ItemScreen extends Component {
    state = {
        todoList: null,
        itemNum: -1
    }
    render() {
        console.log("ItemScreen: todoList: " + this.props.todoList.items[this.props.itemNum].description)
        const item = this.props.todoList.items[this.props.itemNum];
        return (
            <div id='todo_item'>
                <div id="item_container">Item</div>
                <div id="item_name_container" class="text_toolbar">
                    <span id="description_prompt">Description:</span>
                    <input type="text" defaultValue={item.description} id="item_description_textfield" />
                </div>
                <div id="assigned_to_container" class="text_toolbar">
                    <span id="assigned_to_prompt">Assigned To:</span>
                    <input type="text" defaultValue={item.assigned_to} id="assigned_to_textfield" />
                </div>
                <div id="due_date_container" class="text_toolbar">
                    <span id="due_date_prompt">Due Date:</span>
                    <input type="date" defaultValue={item.due_date} id="due_date_dropdown" />
                </div>
                <div id="completed_container" class="text_toolbar">
                    <span id="completed_prompt">Completed:</span>
                    <input type="checkbox" defaultChecked={item.completed} id="completed_checkbox" />
                </div>
                <div id="list_submit_buttons">
                    <button id="list_submit_list" onClick={this.submitItemChanges}>Submit</button>
                    <button id="list_cancel_submit_list" onClick={this.cancelItemChanges}>Cancel</button>
                </div>
            </div>
        )
        // if (this.props.currentItem) {
        //     let itemToLoad = this.props.currentItem;
        //     return (
        // <div id='todo_item'>
        //     <div id="item_container">Item</div>
        //     <div id="item_name_container" class="text_toolbar">
        //         <span id="description_prompt">Description:</span>
        //         <input type="text" defaultValue={itemToLoad.description} id="item_description_textfield" />
        //     </div>
        //     <div id="assigned_to_container" class="text_toolbar">
        //         <span id="assigned_to_prompt">Assigned To:</span>
        //         <input type="text" defaultValue={itemToLoad.assigned_to} id="assigned_to_textfield" />
        //     </div>
        //     <div id="due_date_container" class="text_toolbar">
        //         <span id="due_date_prompt">Due Date:</span>
        //         <input type="date" defaultValue={itemToLoad.due_date} id="due_date_dropdown" />
        //     </div>
        //     <div id="completed_container" class="text_toolbar">
        //         <span id="completed_prompt">Completed:</span>
        //         <input type="checkbox" defaultChecked={itemToLoad.completed} id="completed_checkbox" />
        //     </div>
        //     <div id="list_submit_buttons">
        //         <button id="list_submit_list" onClick={this.submitItemChanges}>Submit</button>
        //         <button id="list_cancel_submit_list" onClick={this.cancelItemChanges}>Cancel</button>
        //     </div>
        // </div>
        //     )
        // }
        // else {
        //     return (
        //         <div id='todo_item'>
        //             <div id="item_container">Item</div>
        //             <div id="item_name_container" class="text_toolbar">
        //                 <span id="description_prompt">Description:</span>
        //                 <input type="text" defaultValue={""} id="item_description_textfield" />
        //             </div>
        //             <div id="assigned_to_container" class="text_toolbar">
        //                 <span id="assigned_to_prompt">Assigned To:</span>
        //                 <input type="text" defaultValue={""} id="assigned_to_textfield" />
        //             </div>
        //             <div id="due_date_container" class="text_toolbar">
        //                 <span id="due_date_prompt">Due Date:</span>
        //                 <input type="date" defaultValue={""} id="due_date_dropdown" />
        //             </div>
        //             <div id="completed_container" class="text_toolbar">
        //                 <span id="completed_prompt">Completed:</span>
        //                 <input type="checkbox" defaultChecked={false} id="completed_checkbox" />
        //             </div>
        //             <div id="list_submit_buttons">
        //                 <button id="list_submit_list" onClick={this.submitItemChanges}>Submit</button>
        //                 <button id="list_cancel_submit_list" onClick={this.cancelItemChanges}>Cancel</button>
        //             </div>
        //         </div>
        //     )
        // }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    todoList.id = id;
    const itemNum = ownProps.match.params.key;

    return {
        itemNum,
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemScreen);