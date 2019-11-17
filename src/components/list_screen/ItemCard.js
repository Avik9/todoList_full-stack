import React from 'react';
import ListScreen from './ListScreen';
import { Icon, Button } from 'react-materialize';

class ItemCard extends React.Component{
    removeListItemCard = (e) => {
        this.props.firestore.collection('todoLists').doc(this.props.todoList.id).update({
            items: this.props.firestore.FieldValue.arrayRemove(this.props)
        });

        e.stopPropagation();
    }

    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card-title col s12">{item.description}</span>
                    <span className="card-content col s4">Assigned To: {item.assigned_to}</span>
                    <span className="card-content col s3">{item.due_date}</span>
                
                    {item.completed === true && <span className="card-content col s3 green-text">Completed</span>}
                    {item.completed === false && <span className="card-content col s3 red-text">Pending</span>}

                    <Button style={{position:'relative'}} floating fab={{direction: 'left'}} className="red right" large>
                        <Button floating icon={<Icon>arrow_upward</Icon>} className="green" />
                        <Button floating icon={<Icon>arrow_downward</Icon>} className="green" />
                        <Button floating icon={<Icon>delete</Icon>} className="green" onClick={(e) => this.removeListItemCard(e)}/>
                    </Button>
                </div>
            </div>
        );
    }
}
export default ItemCard;