import React from 'react';
import PropTypes from 'prop-types';
import ChartWithDetails from '../shared/components/chart-with-details';
import Footer from '../shared/components/footer';
import buildHierarchy from '../shared/buildHierarchy';
import { getAssetsData, getBundleDetails, ERROR_CHUNK_MODULES } from '../shared/util/stat-utils';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assets: (this.props.stats && getAssetsData(this.props.stats.assets, this.props.stats.chunks)) || [],
            chartData: (this.props.stats && buildHierarchy(this.props.stats.modules)) || null,
            selectedAssetIndex: 0,
            stats: this.props.stats,
        };
    }

    static propTypes = {
        stats: PropTypes.object,
    };

    onAssetChange = (ev) => {
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
            selectedAssetIndex,
        });
    };

    render() {
        let assetList;
        let bundleDetails = {};

        if (this.state.stats) {
            bundleDetails = getBundleDetails({
                assets: this.state.assets,
                selectedAssetIndex: this.state.selectedAssetIndex,
            });
        }

        if (this.state.assets.length > 1) {
            assetList = (
                <div>
                    <select onChange={this.onAssetChange} value={this.state.selectedAssetIndex}>
                        <option value={0}>All Chunks</option>
                        {this.state.assets.map((asset, i) => (
                            <option key={i} value={i + 1}>
                                {asset.name}
                            </option>
                        ))}
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
}

export default App;
