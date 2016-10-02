import * as tslib from "tslib";
const __extends = tslib . __extends;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
require('onsenui');
import {Page} from 'react-onsenui';
import {Header} from './component/settings/header';
import {UnityPath} from './component/settings/unity_path';
import {AndroidPath} from './component/settings/android_path';
import {IOsPath} from './component/settings/ios_path';
import {ButtonArea} from './component/settings/button_area';

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
     * UnityPath設定入力部分
     * @return JSX.Element <UnityPath></UnityPath> パス設定入力部分
     */
    private unity_path() {
        return <UnityPath></UnityPath>
    }

    /**
     * AndroidPath設定入力部分
     * @return JSX.Element <AndroidPath></AndroidPath> パス設定入力部分
     */
    private android_path() {
        return <AndroidPath></AndroidPath>
    }

    /**
     * IOsPath設定入力部分
     * @return JSX.Element <IOsPath></IOsPath> パス設定入力部分
     */
    private ios_path() {
        return <IOsPath></IOsPath>
    }

    /**
     * ボタン部分
     * @return JSX.Element <ButtonArea></ButtonArea> ボタン部分
     */
    private button_area() {
        return <ButtonArea></ButtonArea>
    }

    /**
     * render
     * @return JSX.Element <Settings></Settings> Settings
     */
    render() {
        return <Page renderToolbar={() => this.header()}>
            {this.unity_path()}
            {this.android_path()}
            {this.ios_path()}
            {this.button_area()}
        </Page>
    }
}
