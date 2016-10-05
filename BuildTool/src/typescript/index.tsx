import * as tslib from "tslib";
const __extends = tslib . __extends;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
require('onsenui');
import {Footer} from './component/footer';

const ons_style = require("!style!css!ons_css");
const ons_component_style = require("!style!css!ons_component_css");

export interface IIndexState {}

export interface IIndexProps {}

/**
 * Indexページ
 */
export class Index extends React.Component<IIndexProps, IIndexState> {

    /**
     * コンストラクタ
     */
    constructor () {
        super();
    }

    /**
     * render
     * @return JSX.Element <Index></Index> Index
     */
    render() {
        return <Footer />
    }
}

ReactDOM.render(<Index />, document.querySelector('#app'));
