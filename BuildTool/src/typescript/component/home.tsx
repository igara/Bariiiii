import * as tslib from "tslib";
const __extends = tslib . __extends;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
require('onsenui');
import {Header} from './home/header';
import {Page} from 'react-onsenui';
import {Unity} from './home/unity';
import {Android} from './home/android';
import {Console} from './home/console';

const ons_style = require("!style!css!ons_css");
const ons_component_style = require("!style!css!ons_component_css");
const home_style = require("../../css/component/_home");

export interface IHomeState {}

export interface IHomeProps {
    title: any;
    active: any;
    tabbar: any;
}

/**
 * Home
 */
export class Home extends React.Component<IHomeProps, IHomeState> {

    /**
     * コンストラクタ
     */
    constructor () {
        super();
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
     * ヘッダー表示箇所
     * @return JSX.Element <Header></Header> ヘッダー表示箇所
     */
    private header() {
        return <Header></Header>
    }

    /**
     * render
     * @return JSX.Element <Index></Index> Index
     */
    render() {
        return <Page renderToolbar={() => this.header()}>
            <div className={home_style.flex_container}>
                <div className={home_style.build_list}>
                    {this.unity()}
                    {this.android()}
                </div>
                <div className={home_style.build_console}>
                    {this.console()}
                </div>
            </div>
        </Page>
    }
}
