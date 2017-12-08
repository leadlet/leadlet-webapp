import React from 'react';
import Stage from "./Stage";

function StageList(props) {

    function renderStageList(){
        return props.stages.map(stage => {
            return (
                <Stage stage={stage}></Stage>
            );
        });
    }

    return props.stages && renderStageList();
}

export default StageList;