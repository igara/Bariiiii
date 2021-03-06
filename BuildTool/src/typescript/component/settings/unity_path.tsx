import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {List, ListHeader, ListItem, Input} from 'react-onsenui';
const settings_path_style = require("../../../css/component/settings/_path");

export interface IUnityPathState {
    unity_path: any;
}

export interface IUnityPathProps {
    unity_path: any;
}

/**
 * UnityPath
 */
export default class UnityPath extends React.Component<IUnityPathProps, IUnityPathState> {

    /**
     * コンストラクタ
     */
    constructor (props) {
        super(props);
        this.state = {
            unity_path: ""
        };
    }

    /**
     * renderHeader
     * @return JSX.Element UnityPath一覧のタイトル文言
     */
    private renderHeader() {
        return <ListHeader> Unity Path Settings </ListHeader>;
    }

    /**
     * dataSource
     * @return JSX.Element[] UnityPath一覧
     */
    private dataSource() {
        return [
            <Input
                className={settings_path_style.path_textarea}
                id="unity_path"
                value={this.props.unity_path}
                modifier='underbar'
                float
                placeholder='Unity Project Path' />
        ];
    }

    /**
     * renderRow
     * @param JSX.Element row 該当するリスト項目
     * @param number index リストのindex番号
     * @return JSX.Element UnityPath一覧の一項目
     */
    private renderRow(row, index) {
        return <ListItem key={index}>{row}</ListItem>
    }

    /**
     * render
     * @return JSX.Element <UnityPath></UnityPath> UnityPath一覧
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
