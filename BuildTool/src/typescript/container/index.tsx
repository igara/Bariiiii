import * as FluxUtils from 'flux/utils';
import * as React from 'react';

require('onsenui');
import * as fs from 'fs';
import Footer from '../component/footer';
import {Tabbar, TabPage, Tab, Page} from 'react-onsenui';
import {Home} from '../component/home';
import Settings from '../component/settings';
import IndexStore from '../store/index';
import IndexAction from '../action/index';

const ons_style = require("!style!css!ons_css");
const ons_component_style = require("!style!css!ons_component_css");

export interface IIndexState {
    path: any
}

export interface IIndexProps {}

/**
 * Indexページ
 */
export class Index extends React.Component<IIndexProps, IIndexState> {

    /**
     * コンストラクタ
     */
    constructor (props) {
        super(props);
    }

    static getStores() {
        return [IndexStore];
    }
    static calculateState() {
        return IndexStore.getState();
    }

componentDidMount() {
// ファイル読み込み
        fs.readFile('path.json', 'utf8', (err: NodeJS.ErrnoException, data: Buffer) => {
            if (err) {
                // 読み込みに失敗した時
                console.log(err);
            }
            if (data) {
                // JSONパース
                var json = JSON.parse(data.toString());
                IndexAction.changePath(json.path);
                this.setState({path: json});
            }
        });

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
                content: <Home key="HomePage" title="Home" active={activeIndex === 0} tabbar={tabbar} />,
                tab: <Tab key="HomeTab" label="Home" icon="md-home" />
            },
            {
                content: <Settings key="SettingsPage"
                title="Settings"
                active={activeIndex === 1}
                tabbar={tabbar}
                path={this.state.path} />,
                tab: <Tab key="SettingsTab" label="Settings" icon="md-settings" />
            }
        ];
    }

    /**
     * render
     * @return JSX.Element <Index></Index> Index
     */
    render() {
        return <Tabbar
                index={this.index()}
                position='bottom'
                renderTabs={(activeIndex, tabbar) => this.renderTabs(activeIndex, tabbar)} />;
    }
}

const IndexContainer = FluxUtils.Container.create(Index);
export default IndexContainer;
