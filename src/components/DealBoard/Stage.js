import React from 'react';
import {connect} from "react-redux";
import {deleteDeal, getAllDeals, updateDeal} from "../../actions/deal.actions";
import SweetAlert from 'sweetalert-react';
import Deal from "./Deal";


class Stage extends React.Component {

    constructor(props) {
        super(props);
        this.renderDeals = this.renderDeals.bind(this);
        this.onDeleteDeal = this.onDeleteDeal.bind(this);
        this.onEditDeal = this.onEditDeal.bind(this);
        this.confirmDeleteActivity = this.confirmDeleteActivity.bind(this);
        this.cancelDeleteActivity = this.cancelDeleteActivity.bind(this);
        this.onMoveDeal = this.onMoveDeal.bind(this);

        this.state = {
            showDeleteDialog: false
        };

    }

    confirmDeleteActivity() {
        this.props.deleteDeal(this.state.deletingDealId);

        this.setState({
            showDeleteDialog: false,
            deletingDealId: null
        });
    }

    cancelDeleteActivity() {
        this.setState({
            showDeleteDialog: false,
            deletingDealId: null
        });
    }

    onMoveDeal(){

    }
    onDeleteDeal(id) {
        this.setState({
            showDeleteDialog: true,
            deletingDealId: id
        });
    }

    onEditDeal(id) {
        console.log("edit");
    }

    componentDidMount() {
        this.props.getAllDeals();
    }

    renderDeals(stage) {
        const deals = this.props.deals;

        return deals.ids.filter(id =>
            deals.items[id].stageId == stage.id
        ).sort((a,b)=>
            deals.items[a].order - deals.items[b].order
        ).map(id => {
            const deal = deals.items[id];
            return (
                <Deal deal={deal}
                      onEditDeal={this.onEditDeal}
                      onDeleteDeal={this.onDeleteDeal}
                      onMoveDeal={this.onMoveDeal}/>
            );
        });
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

export default connect(mapStateToProps, {getAllDeals, deleteDeal, updateDeal})(Stage);
