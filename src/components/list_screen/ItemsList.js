import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';

class ItemsList extends React.Component {
    removeListItemCard = (e, key) => {
        console.log("Delete item");

        e.preventDefault();

        this.props.firestore.collection("todoLists")
            .doc(this.props.todoList.id)
            .get()
            .then(doc => {
                const data = doc.data();
                data.items.splice(key, 1);

                for (let i = 0; i < data.items.length; i++) {
                    data.items[i].key = i;
                }

                this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update(
                    { items: data.items }
                )
            }
            );
    }

    moveItemUp = (e, key) => {
        e.preventDefault();

        if (key === 0) {
            console.log("It is the first item")
        }
        else {
            this.props.firestore.collection("todoLists")
                .doc(this.props.todoList.id)
                .get()
                .then(doc => {
                    const data = doc.data();
                    var temp = data.items[key];
                    data.items[key] = data.items[key - 1];
                    data.items[key - 1] = temp;

                    for (let i = 0; i < data.items.length; i++) {
                        data.items[i].key = i;
                    }

                    this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update(
                        { items: data.items }
                    )
                });
        }
    }

    moveItemDown = (e, key) => {
        e.preventDefault();

        if (key === this.props.todoList.items.length - 1) {
            console.log("It is the last item")
        }
        else {
            this.props.firestore.collection("todoLists")
                .doc(this.props.todoList.id)
                .get()
                .then(doc => {
                    const data = doc.data();
                    var temp = data.items[key];
                    data.items[key] = data.items[key + 1];
                    data.items[key + 1] = temp;

                    for (let i = 0; i < data.items.length; i++) {
                        data.items[i].key = i;
                    }

                    this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update(
                        { items: data.items }
                    )
                });
        }
    }

    sortItems = (todoList, sortBy, isIncreasing) => {
        todoList.items.sort(
            (item1, item2) => {
                
                if(!isIncreasing) {
                    let temp = item1;
                    item1 = item2;
                    item2 = temp;
                }

                if(item1[sortBy] < item2[sortBy]) return -1;
                else if(item1[sortBy] > item2[sortBy]) return 1;
                else return 0;
        });

        for (let i = 0; i < todoList.items.length; i++) {
            todoList.items[i].key = i;
        }

        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update(
            { 
                items: todoList.items,
                isIncreasing: !isIncreasing,
            }
        )

    };

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className="row" />
                <div className="list_item_header_card">
                    <div className="list_item_task_header col s3 header" onClick={() => this.sortItems(todoList, "description", todoList.isIncreasing)}>Task</div>
                    <div className="list_item_due_date_header col s3 header" onClick={() => this.sortItems(todoList, "due_date", todoList.isIncreasing)}>Due Date</div>
                    <div className="list_item_status_header col s3 header" onClick={() => this.sortItems(todoList, "completed", todoList.isIncreasing)}>Status</div>
                </div>
                {items && items.map(item => (
                    <Link to={'/todoList/' + todoList.id + '/' + item.key} key={item.key}>
                        <ItemCard todoList={todoList} item={item} moveDown={this.moveItemDown} moveUp={this.moveItemUp} deleteItem={this.removeListItemCard} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
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
)(ItemsList);