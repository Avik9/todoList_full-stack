import React from 'react';
import ListScreen from './ListScreen';

class ItemCard extends React.Component {
    removeListItemCard = () => {
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.firestore.FieldValue.arrayRemove()
        });
    }

    loadItem = (item) => {
        
        console.log("Opening " + item.description);
    }

    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3" /*onClick={() => this.loadItem(item)}*/>
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card-title col s12">{item.description}</span>
                    <span className="card-content col s4">Assigned To: {item.assigned_to}</span>
                    <span className="card-content col s3">{item.due_date}</span>
                
                    {item.completed === true && <span className="card-content col s3 green-text">Completed</span>}
                    {item.completed === false && <span className="card-content col s3 red-text">Pending</span>}
                </div>
            </div>
        );
    }
}
export default ItemCard;