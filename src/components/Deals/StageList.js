import React from 'react';
import Stage from "./Stage";

function StageList(props) {

    function renderStageList(){
        return props.stages.map(stage => {
            return (
                <div className="col-lg-3">
                    <Stage stage={stage}></Stage>
                </div>
            );
        });
    }

    return (
        <div>
            {props.stages && renderStageList()}
        </div>
    );
}

export default StageList;