import * as React from 'react';
import * as ReactDOM from 'react-dom';
const ons = require('onsenui');
import {List, ListHeader, ListItem, Input} from 'react-onsenui';
const settings_path_style = require("../../../css/component/settings/_path");

export interface IPathState {}

export interface IPathProps {}

/**
 * Path一覧
 */
export class Path extends React.Component<IPathProps, IPathState> {

    /**
     * コンストラクタ
     */
    constructor () {
        super();
    }

    /**
     * renderHeader
     * @return JSX.Element Path一覧のタイトル文言
     */
    private renderHeader() {
        return <ListHeader> Path Settings </ListHeader>;
    }

    /**
     * dataSource
     * @return JSX.Element[] Path一覧
     */
    private dataSource() {
        return [
            <Input
                className={settings_path_style.path_textarea}
                id="unity_path"
                value=""
                modifier='underbar'
                float
                placeholder='Unity Project Path' />,
            <Input
                className={settings_path_style.path_textarea}
                id="android_path"
                value=""
                modifier='underbar'
                float
                placeholder='Android Project Path' />,
            <Input
                className={settings_path_style.path_textarea}
                id="ios_path"
                value=""
                modifier='underbar'
                float
                placeholder='iOS Project Path' />
        ];
    }

    /**
     * renderRow
     * @param JSX.Element row 該当するリスト項目
     * @param number index リストのindex番号
     * @return JSX.Element Path一覧の一項目
     */
    private renderRow(row, index) {
        return <ListItem key={index}>{row}</ListItem>
    }

    /**
     * render
     * @return JSX.Element <Path></Path> Path一覧
     */
    render() {
        return <List
            className={settings_path_style.path_list}
            renderHeader={() => this.renderHeader()}
            dataSource={this.dataSource()}
            renderRow={(row, index) => this.renderRow(row, index)}
        />
    }
}
