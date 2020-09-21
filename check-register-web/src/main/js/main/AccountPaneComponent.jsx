import React from 'react';

import "./mainstyle.css";

class AccountPaneComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        //don't like how this works right now bc sidebar wraps everything instead of just being the bar, which is bad
        //will correct later though
        return (
            <div class="sidebar">
                <div>{/*intermediate wraper*/}
                    <div>{/*sidebar*/}
                        <button>Account Button</button>
                    </div>
                    <div class="main">{/*main content*/}
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    };
}

export default AccountPaneComponent