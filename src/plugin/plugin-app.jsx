import React from 'react';
import ChartWithDetails from '../shared/components/chart-with-details';
import Footer from '../shared/components/footer';
import buildHierarchy from '../shared/buildHierarchy';
import {getAssetsData, getBundleDetails, ERROR_CHUNK_MODULES} from '../shared/util/stat-utils';


export default React.createClass({
    propTypes: {
        stats: React.PropTypes.object
    },

    getInitialState() {
        return {
            assets: [],
            chartData: null,
            selectedAssetIndex: 0
        };
    },

    componentWillMount() {
        let stats = this.props.stats;
        let assets = getAssetsData(stats.assets, stats.chunks);

        this.setState({
            assets,
            chartData: buildHierarchy(stats.modules),
            selectedAssetIndex: 0,
            stats
        });
    },

    onAssetChange(ev) {
        let selectedAssetIndex = Number(ev.target.value);
        let modules, chartData, error;

        if (selectedAssetIndex === 0) {
            modules = this.state.stats.modules;
        } else {
            let asset = this.state.assets[selectedAssetIndex - 1];
            modules = asset.chunk.modules;
        }

        if (modules) {
            chartData = buildHierarchy(modules);
        } else {
            error = ERROR_CHUNK_MODULES;
        }

        this.setState({
            chartData,
            error,
            selectedAssetIndex
        });
    },

    render() {
        let assetList;
        let bundleDetails = {};

        if (this.state.stats){
            bundleDetails = getBundleDetails({
                assets: this.state.assets,
                selectedAssetIndex: this.state.selectedAssetIndex
            });
        }

        if (this.state.assets.length > 1) {
            assetList = (
                <div>
                    <select onChange={this.onAssetChange} value={this.state.selectedAssetIndex}>
                        <option value={0}>All Chunks</option>
                        {this.state.assets.map((asset, i) => <option key={i} value={i + 1}>{asset.name}</option>)}
                    </select>
                </div>
            );
        }

        return (
            <div>
                <h1>Webpack Visualizer</h1>

                {assetList}

                <ChartWithDetails chartData={this.state.chartData} bundleDetails={bundleDetails} />

                {this.state.error && <div className="errorMessage">{this.state.error}</div>}

                <Footer />
            </div>
        );
    }
});
