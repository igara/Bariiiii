import * as tslib from "tslib";
const __extends = tslib . __extends;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
require('onsenui');
import {Page} from 'react-onsenui';
import {Header} from './component/index/header';
import {Unity} from './component/index/unity';
import {Android} from './component/index/android';
import {Console} from './component/index/console';
import {Footer} from './component/index/footer';

const ons_style = require("!style!css!ons_css");
const ons_component_style = require("!style!css!ons_component_css");
const index_style = require("../css/_index");

export interface IIndexState {}

export interface IIndexProps {
    title: any;
    active: any;
    tabbar: any;
}

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
     * ヘッダー表示箇所
     * @return JSX.Element <Header></Header> ヘッダー表示箇所
     */
    private header() {
        return <Header></Header>
    }

    /**
     * Unityビルド表示箇所
     * @return JSX.Element <Unity></Unity> Unityのビルド一覧
     */
    private unity() {
        return <Unity></Unity>;
    }

    /**
     * Androidビルド表示箇所
     * @return JSX.Element <Android></Android> Androidのビルド一覧
     */
    private android() {
        return <Android></Android>;
    }

    /**
     * Console表示箇所
     * @return JSX.Element <Console></Console> Console
     */
    private console() {
        return <Console></Console>;
    }

    /**
     * render
     * @return JSX.Element <Index></Index> Index
     */
    render() {
        return <Page renderToolbar={() => this.header()}>
            <div className={index_style.flex_container}>
                <div className={index_style.build_list}>
                    {this.unity()}
                    {this.android()}
                </div>
                <div className={index_style.build_console}>
                    {this.console()}
                </div>
            </div>
        </Page>
    }
}

ReactDOM.render(<Footer />, document.querySelector('#app'));
