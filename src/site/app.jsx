import React from 'react';
import ChartWithDetails from '../shared/components/chart-with-details';
import Footer from '../shared/components/footer';
import addDragDrop from '../shared/util/dragdrop';
import readFile from '../shared/util/readFile';
import formatSize from '../shared/util/formatSize';
import {getAssetsData, getBundleDetails, ERROR_CHUNK_MODULES} from '../shared/util/stat-utils';
import buildHierarchy from '../shared/buildHierarchy';
import WebpackVisualizer from '../component/WebpackVisualizer';

export default React.createClass({
    getInitialState() {
        return {
            stats: null,
            needsUpload: true,
            dragging: false,
        };
    },

    componentDidMount() {
        addDragDrop({
            el: this.refs.UploadArea,
            callback: file => {
                readFile(file, this.handleFileUpload);
            },
            onDragStart: () => {
                this.setState({
                    dragging: true
                });
            },
            onDragEnd: () => {
                this.setState({
                    dragging: false
                });
            }
        });
    },

    uploadAreaClick() {
        if (this.state.needsUpload) {
            this.refs.FileInput.click();
        }
    },

    onFileChange(ev) {
        readFile(ev.target.files[0], this.handleFileUpload);
    },

    handleFileUpload(jsonText) {
        let stats = JSON.parse(jsonText);

        this.setState({
            needsUpload: false,
            stats
        });
    },

    loadDemo() {
        this.setState({
            demoLoading: true
        });

        let request = new XMLHttpRequest();
        request.open('GET', 'stats-demo.json', true);

        request.onload = () => {
            this.setState({
                demoLoading: false
            });

            if (request.status >= 200 && request.status < 400) {
                this.handleFileUpload(request.response);
            }
        };

        request.send();
    },

    renderUploadArea(uploadAreaClass) {
        if (this.state.needsUpload) {
            return (
                <div ref="UploadArea" className={uploadAreaClass} onClick={this.uploadAreaClick}>
                    <div className="uploadArea-uploadMessage">
                        <p>Drop JSON file here or click to choose.</p>
                        <small>Files won't be uploaded &mdash; your data stays in your browser.</small>
                    </div>
                    <input
                        ref="FileInput"
                        type="file"
                        className="hiddenFileInput"
                        onChange={this.onFileChange}
                    />
                </div>
            );
        }
    },

    render() {
        let demoButton, assetList;
        let uploadAreaClass = 'uploadArea';
        let bundleDetails = {};

        if (this.state.dragging) {
            uploadAreaClass += ' uploadArea--dragging';
        }

        if (this.state.needsUpload) {
            uploadAreaClass += ' uploadArea--needsUpload';

            let demoClass = 'destyledButton';
            if (this.state.demoLoading) {
                demoClass += ' demoLoading';
            }

            demoButton = <button onClick={this.loadDemo} className={demoClass} style={{marginTop: '0.5em'}}>Try a Demo</button>;
        }

        return (
            <div>
                <h1>Webpack Visualizer</h1>

                {this.state.needsUpload && this.renderUploadArea(uploadAreaClass)}
                {this.state.needsUpload && demoButton}

                {this.state.stats && <WebpackVisualizer stats={this.state.stats} />}

                {this.state.error && <div className="errorMessage">{this.state.error}</div>}

                <Footer>
                    <h2>How do I get stats JSON from webpack?</h2>
                    <p><code>webpack --json > stats.json</code></p>
                    <p>If you're customizing your stats output or using webpack-stats-plugin, be sure to set <code>chunkModules</code> to <code>true</code> (see <a href="https://github.com/FormidableLabs/webpack-stats-plugin/issues/18#issuecomment-268699997">here</a> for an example).</p>

                    <h2>Try the Plugin!</h2>
                    <p>This tool is also available as a webpack plugin. See <a href="https://github.com/chrisbateman/webpack-visualizer#plugin-usage">here</a> for usage details.</p>
                    <p><code>npm install webpack-visualizer-plugin</code></p>
                </Footer>
            </div>
        );
    }
});
