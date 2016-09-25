import * as React from 'react';
import * as ReactDOM from 'react-dom';
const ons = require('onsenui');
import {Tabbar, TabPage, Tab, Page} from 'react-onsenui';

import {Index} from '../../index';
import {Settings} from '../../settings';

export interface IFooterState {}

export interface IFooterProps {}

/**
 * フッターの表示部分
 */
export class Footer extends React.Component<IFooterProps, IFooterState> {

    /**
     * コンストラクタ
     */
    constructor () {
        super();
    }

    /**
     * index
     * return number 初回起動時に選択されるタブindex
     */
    private index() {
        return 0;
    }

    /**
     * renderTabs
     * @param any activeIndex
     * @param any tabbar 
     * @return {
     *             content: JSX.Element,
     *             tab: JSX.Element
     *         }[]
     */
    private renderTabs(activeIndex, tabbar) {
        return [
            {
                content: <Index key="IndexPage" title="Index" active={activeIndex === 0} tabbar={tabbar} />,
                tab: <Tab key="IndexTab" label="Index" icon="md-home" />
            },
            {
                content: <Settings key="SettingsPage" title="Settings" active={activeIndex === 1} tabbar={tabbar} />,
                tab: <Tab key="SettingsTab" label="Settings" icon="md-settings" />
            }
        ];
    }

    /**
     * render
     * @return JSX.Element <Footer></Footer> Footer
     */
    render() {
        return <Tabbar
            index={this.index()}
            position='bottom'
            renderTabs={(activeIndex, tabbar) => this.renderTabs(activeIndex, tabbar)}
        />    
    }
}
