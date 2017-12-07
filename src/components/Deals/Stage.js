import React from 'react';
import {connect} from "react-redux";
import {deleteDeal, getAllDeals} from "../../actions/deal.actions";
import SweetAlert from 'sweetalert-react';

class Stage extends React.Component {

    constructor(props) {
        super(props);
        this.renderDeals = this.renderDeals.bind(this);
        this.onDeleteDeal = this.onDeleteDeal.bind(this);
        this.onEditDeal = this.onEditDeal.bind(this);
        this.confirmDeleteActivity = this.confirmDeleteActivity.bind(this);
        this.cancelDeleteActivity = this.cancelDeleteActivity.bind(this);

        this.state= {
            showDeleteDialog: false
        };

    }

    confirmDeleteActivity(){
        this.props.deleteDeal(this.state.deletingDealId);

        this.setState({
            showDeleteDialog: false,
            deletingDealId: null
        });
    }

    cancelDeleteActivity(){
        this.setState({
            showDeleteDialog: false,
            deletingDealId: null
        });
    }

    onDeleteDeal(id){
        this.setState({
            showDeleteDialog: true,
            deletingDealId: id
        });
    }

    onEditDeal(id){
        console.log("edit");
    }

    componentDidMount(){
        this.props.getAllDeals();
    }

    renderDeals(stage){
        const deals = this.props.deals;

        const filteredDeals = deals.ids.filter( id =>
            deals.items[id].stageId == stage.id
        );

        return filteredDeals.map( id => {
                const deal = deals.items[id];
               return (
                   <li className="warning-element" id={id}>
                       {deal.name}
                       <div className="agile-detail pull-right">
                           <i className="fa fa-clock-o"/> 12.10.2015
                           <div className="btn-group btn-group-xs" role="group" aria-label="...">
                               <i className="btn fa fa-edit"  onClick={() => this.onEditDeal(id)}></i>
                               <i className="btn fa fa-trash" onClick={() => this.onDeleteDeal(id)}></i>
                           </div>
                       </div>
                   </li>
               );
            } );
    }

    render() {
        const {stage} = this.props;
        return (
            <div className="ibox">
                <div className="ibox-content">
                    <h3>{stage.name}</h3>
                    <p className="small"><i className="fa fa-hand-o-up"/> Drag task between list</p>

                    <ul className="sortable-list connectList agile-list" id="todo">
                        {this.props.deals.ids && this.renderDeals(stage)}
                    </ul>
                </div>
                <div>
                    <SweetAlert
                        title="Are you sure?"
                        text="You will not be able to recover this imaginary file!"
                        type="warning"
                        showCancelButton={true}
                        confirmButtonColor="#DD6B55"
                        confirmButtonText="Yes, delete it!"
                        show={this.state.showDeleteDialog}
                        onConfirm={this.confirmDeleteActivity}
                        onCancel={this.cancelDeleteActivity}
                    />
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        deals: state.deals,
    }
}

export default connect(mapStateToProps, {getAllDeals, deleteDeal})(Stage);
