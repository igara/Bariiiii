import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {List, ListHeader, ListItem} from 'react-onsenui';

export interface IUnityState {}

export interface IUnityProps {}

/**
 * Unityのビルド一覧
 */
export class Unity extends React.Component<IUnityProps, IUnityState> {

    /**
     * コンストラクタ
     */
    constructor () {
        super();
    }

    /**
     * renderHeader
     * @return JSX.Element Unityのビルドのタイトル文言
     */
    private renderHeader() {
        return <ListHeader> Unity Build </ListHeader>;
    }

    /**
     * dataSource
     * @return JSX.Element[] Unityのビルド一覧
     */
    private dataSource() {
        return [
            <a href="#">Android Build</a>,
            <a href="#">iOS Build</a>
        ];
    }

    /**
     * renderRow
     * @param JSX.Element row 該当するリスト項目
     * @param number index リストのindex番号
     * @return JSX.Element Unityのビルド一覧の一項目
     */
    private renderRow(row, index) {
        return <ListItem key={index}>{row}</ListItem>
    }

    /**
     * render
     * @return JSX.Element <Unity></Unity> Unityのビルド一覧
     */
    render() {
        return <List
            renderHeader={() => this.renderHeader()}
            dataSource={this.dataSource()}
            renderRow={(row, index) => this.renderRow(row, index)}
        />
    }
}
