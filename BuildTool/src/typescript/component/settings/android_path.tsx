import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {List, ListHeader, ListItem, Input} from 'react-onsenui';
const settings_path_style = require("../../../css/component/settings/_path");

export interface IAndroidPathState {}

export interface IAndroidPathProps {}

/**
 * AndroidPath一覧
 */
export class AndroidPath extends React.Component<IAndroidPathProps, IAndroidPathState> {

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
        return <ListHeader> Android Path Settings </ListHeader>;
    }

    /**
     * dataSource
     * @return JSX.Element[] Path一覧
     */
    private dataSource() {
        return [
            <Input
                className={settings_path_style.path_textarea}
                id="android_path"
                value=""
                modifier='underbar'
                float
                placeholder='Android Project Path' />,
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
     * @return JSX.Element <AndroidPath></AndroidPath> Path一覧
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
