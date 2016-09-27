import * as tslib from "tslib";
const __extends = tslib . __extends;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
const ons = require('onsenui');
import {Page} from 'react-onsenui';
import {Header} from './component/settings/header';
import {Path} from './component/settings/path';
import {ButtonArea} from './component/settings/buttonarea';

const ons_style = require("!style!css!ons_css");
const ons_component_style = require("!style!css!ons_component_css");

export interface ISettingsState {}

export interface ISettingsProps {
    title: any;
    active: any;
    tabbar: any;
}

/**
 * Settings
 */
export class Settings extends React.Component<ISettingsProps, ISettingsState> {

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
     * パス設定入力部分
     * @return JSX.Element <Path></Path> パス設定入力部分
     */
    private path() {
        return <Path></Path>
    }

    /**
     * ボタン部分
     * @return JSX.Element <ButtonArea></ButtonArea> ボタン部分
     */
    private buttonarea() {
        return <ButtonArea></ButtonArea>
    }

    /**
     * render
     * @return JSX.Element <Settings></Settings> Settings
     */
    render() {
        return <Page renderToolbar={() => this.header()}>
            {this.path()}
            {this.buttonarea()}
        </Page>
    }
}
