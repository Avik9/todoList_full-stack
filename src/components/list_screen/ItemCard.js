import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                    <span className="card-assigned-to">{item.assigned_to}</span>
                    <span className="card-due_date">{item.due_date}</span>
                
                    {item.completed === true && <span className="card-completed">Completed</span>}
                    {item.completed === false && <span className="card-completed">Pending</span>}
                </div>
            </div>
        );
    }
}
export default ItemCard;