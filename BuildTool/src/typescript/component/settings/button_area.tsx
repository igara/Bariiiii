import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Button, AlertDialog} from 'react-onsenui';
import * as fs from 'fs';

export interface IButtonAreaState {
    isOpen: boolean;
}

export interface IButtonAreaProps {}

/**
 * ボタンの表示部分
 */
export class ButtonArea extends React.Component<IButtonAreaProps, IButtonAreaState> {

    /**
     * コンストラクタ
     */
    constructor (props) {
        super(props);
        this.state = {isOpen: false};
    }

    /**
     * Saveボタンを押下した時
     * @param e: Event
     */
    private onClickSaveButton(event: Event) {
        this.setState({isOpen: true});
    }

    /**
     * PopUp上のOKボタンを押下した時
     * @param e: Event
     */
    private onClickOkPopUpButton(event: Event) {
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
        this.setState({isOpen: false});
    }

    /**
     * PopUp上のCancelボタンを押下した時
     * @param e: Event
     */
    private onClickCancelPopUpButton(event: Event) {
        this.setState({isOpen: false});
    }

    /**
     * render
     * @return JSX.Element <ButtonArea></ButtonArea> ButtonArea
     */
    render() {
        return (<div>
            <Button onClick={this.onClickSaveButton.bind(this)}>
                Save Path
            </Button>
            <AlertDialog
                isOpen={this.state.isOpen}
                isCancelable={false}>
                <div className='alert-dialog-title'>Save?</div>
                <div className='alert-dialog-content'>
                    本当に保存を行いますか？
                </div>
                <div className='alert-dialog-footer'>
                    <button onClick={this.onClickCancelPopUpButton.bind(this)} className='alert-dialog-button'>
                        Cancel
                    </button>
                    <button onClick={this.onClickOkPopUpButton.bind(this)} className='alert-dialog-button'>
                        Ok
                    </button>
                </div>
            </AlertDialog>
        </div>
        );
    }
}
