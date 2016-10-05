import * as React from 'react';
import * as ReactDOM from 'react-dom';
const home_console_style = require("../../../css/component/home/_console");

export interface IConsoleState {}

export interface IConsoleProps {}

/**
 * Console
 */
export class Console extends React.Component<IConsoleProps, IConsoleState> {

    /**
     * コンストラクタ
     */
    constructor () {
        super();
    }

    /**
     * render
     * @return JSX.Element <Android></Android> Androidのビルド一覧
     */
    render() {
        return <textarea id="console" className={home_console_style.console_textarea} readOnly>
        </textarea>
    }
}
