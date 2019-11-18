import React from 'react';
import ListScreen from './ListScreen';
import { Icon, Button, M } from 'react-materialize';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card-title col s12">{item.description}</span>
                    <span className="card-content col s3">Assigned To: {item.assigned_to}</span>
                    <span className="card-content col s3">{item.due_date}</span>

                    {item.completed === true && <span className="card-content col s3 green-text">Completed</span>}
                    {item.completed === false && <span className="card-content col s3 red-text">Pending</span>}
                    {/* <div class="fixed-action-btn">
                        <a class="btn-floating btn-large red">
                            <i class="large material-icons">mode_edit</i>
                        </a>
                        <ul>
                            <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                            <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                            <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                            <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                        </ul>
                    </div> */}

                    {/* <Button style={{position:'relative'}} floating fab={{direction: 'left'}} className="red right" large>
                        <Button floating icon={<Icon>arrow_upward</Icon>} className="green" id="up_button" onClick={(e) => this.props.moveUp(e)}/>
                        <Button floating icon={<Icon>arrow_downward</Icon>} className="green" id="down_button" onClick={(e) => this.props.moveDown(e)}/>
                        <Button floating icon={<Icon>delete</Icon>} className="green" id="delete_button" onClick={(e) => this.props.deleteItem(e)}/>
                    </Button> */}
                    <button className="green" id="up_button" onClick={(e) => this.props.moveUp(e, item.key)}><Icon>arrow_upward</Icon></button>
                    <button className="green" id="down_button" onClick={(e) => this.props.moveDown(e, item.key)}><Icon>arrow_downward</Icon></button>
                    <button className="green" id="delete_button" onClick={(e) => this.props.deleteItem(e, item.key)}><Icon>delete</Icon></button>
                    
                </div>
            </div>
        );
    }
}
export default ItemCard;