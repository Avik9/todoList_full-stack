import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                    <span className="card-content">Assigned To: {item.assigned_to}</span>
                    <span className="card-content">{item.due_date}</span>
                
                    {item.completed === true && <span className="card-completed green-text">Completed</span>}
                    {item.completed === false && <span className="card-completed red-text">Pending</span>}
                </div>
            </div>
        );
    }
}
export default ItemCard;