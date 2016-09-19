import * as React from 'react';
import * as ReactDOM from 'react-dom';
const ons = require('onsenui');
const Ons = require('react-onsenui');

const ons_style = require("!style!css!ons_css");
const ons_component_style = require("!style!css!ons_component_css");
const header_style = require("!style!css!../../../css/component/index/header");

interface Props {
    content: string;
}

class Header extends React.Component<Props, {}> {
    render() {
        return <div className={header_style.aaaaa}>{this.props.content}</div>
    }
}

ReactDOM.render(<Header content="hello world"/>, document.querySelector('#app'));