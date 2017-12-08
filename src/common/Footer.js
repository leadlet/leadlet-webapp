import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="pull-right">
                    You are using <strong>starter</strong> plan.
                </div>
                <div>
                    <strong>Copyright</strong> Leadlet Company &copy; 2014-2017
                </div>
            </div>
        )
    }
}

export default Footer