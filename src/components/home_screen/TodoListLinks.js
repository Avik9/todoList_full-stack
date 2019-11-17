import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';

class TodoListLinks extends React.Component {
    moveUpList = () => {
        console.log("TodoListLinks: Opened up " + this.refs.card.key);
    }

    render() {
        const todoLists = this.props.todoLists;
        console.log("TodoLists: " + todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} ref="card" onClick={this.moveUpList}>
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