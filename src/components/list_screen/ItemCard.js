import React from 'react';
import { Icon, Button } from 'react-materialize';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3 item-card">
                <div className="card-content grey-text text-darken-3 row">

                    <span className="card-title col s12">{item.description}</span>
                    <span className="card-content col s3">Assigned To: {item.assigned_to}</span>
                    <span className="card-content col s3">{item.due_date}</span>

                    {item.completed === true && <span className="card-content col s3 green-text">Completed</span>}
                    {item.completed === false && <span className="card-content col s3 red-text">Pending</span>}

                    <Button style={{ position: 'relative' }} floating fab={{ direction: 'left' }} className="blue right col s1" large>
                        <Button floating icon={<Icon>arrow_upward</Icon>} className="green" id="up_button" onClick={(e) => this.props.moveUp(e, item.key)} />
                        <Button floating icon={<Icon>arrow_downward</Icon>} className="green" id="down_button" onClick={(e) => this.props.moveDown(e, item.key)} />
                        <Button floating icon={<Icon>delete</Icon>} className="red" id="delete_button" onClick={(e) => this.props.deleteItem(e, item.key)} />
                    </Button>

                </div>
            </div>
        );
    }
}
export default ItemCard;