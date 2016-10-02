import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Toolbar} from 'react-onsenui';

export interface IHeaderState {}

export interface IHeaderProps {}

/**
 * ヘッダーの表示部分
 */
export class Header extends React.Component<IHeaderProps, IHeaderState> {

    /**
     * コンストラクタ
     */
    constructor () {
        super();
    }

    /**
     * render
     * @return JSX.Element <Header></Header> Header
     */
    render() {
        return <Toolbar>
            <div className="center">Bariiiii Build Tool</div>
        </Toolbar>
    }
}
