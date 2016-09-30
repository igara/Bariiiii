import * as React from 'react';
import * as ReactDOM from 'react-dom';
const ons = require('onsenui');
import {Button} from 'react-onsenui';
import * as fs from 'fs';

export interface IButtonState {}

export interface IButtonProps {}

/**
 * ボタンの表示部分
 */
export class ButtonArea extends React.Component<IButtonProps, IButtonState> {

    /**
     * コンストラクタ
     */
    constructor () {
        super();
    }

    /**
     * Saveボタンを押下した時
     */
    private onClickSavePathButton() {
        var unity: any = document.getElementById('unity_path');
        var android: any = document.getElementById('android_path');
        var ios: any = document.getElementById('ios_path');
        var data = {
            path: {
                unity: unity.value,
                android: android.value,
                ios: ios.value
            }
        };
        fs.writeFile('path.json', JSON.stringify(data, null, ''));
    }

    /**
     * render
     * @return JSX.Element <Button></Button> Button
     */
    render() {
        return <Button onClick={this.onClickSavePathButton}>Save Path</Button>
    }
}
