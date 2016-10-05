import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {List, ListHeader, ListItem} from 'react-onsenui';

export interface IAndroidState {}

export interface IAndroidProps {}

/**
 * Androidのビルド一覧
 */
export class Android extends React.Component<IAndroidProps, IAndroidState> {

    /**
     * コンストラクタ
     */
    constructor () {
        super();
    }

    /**
     * renderHeader
     * @return JSX.Element Androidのビルドのタイトル文言
     */
    private renderHeader() {
        return <ListHeader> Android Native Build </ListHeader>;
    }

    /**
     * dataSource
     * @return JSX.Element[] Androidのビルド一覧
     */
    private dataSource() {
        return [
            <a href="#">Android Build</a>
        ];
    }

    /**
     * renderRow
     * @param JSX.Element row 該当するリスト項目
     * @param number index リストのindex番号
     * @return JSX.Element Andoirdのビルド一覧の一項目
     */
    private renderRow(row, index) {
        return <ListItem key={index}>{row}</ListItem>
    }

    /**
     * render
     * @return JSX.Element <Android></Android> Androidのビルド一覧
     */
    render() {
        return <List
            renderHeader={() => this.renderHeader()}
            dataSource={this.dataSource()}
            renderRow={(row, index) => this.renderRow(row, index)}
        />
    }
}
