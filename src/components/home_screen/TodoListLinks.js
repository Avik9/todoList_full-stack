import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';

class TodoListLinks extends React.Component {
    moveUpList = (id) => {
        console.log("TodoListLinks: Opened up " + id);
        console.log(this.props.todoLists);
        this.props.todoLists[1] = null;
        console.log(this.props.todoLists);

        // this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
        //     items: this.props.firestore.FieldValue.arrayRemove(this.props)
        // });
    }

    render() {
        const todoLists = this.props.todoLists;
        console.log("TodoLists: " + todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} onClick={() => this.moveUpList(todoList.id)}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))} 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);