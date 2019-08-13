import React, { Component } from 'react';
import { SearchBar } from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenFancy, faThumbsUp, faThumbsDown, faPhotoVideo } from '@fortawesome/free-solid-svg-icons'

export class GetData extends Component {
    static displayName = GetData.name;

    constructor(props) {
        super(props);
        this.state = { result: [], loading: true };
    }

    fetchedData = (data) => {
        this.setState({
            result: data
        })
    }

    loadingData = (status) => {
        this.setState({
            loading: status
        })
    }

    static renderData(result) {
        const cardStyle = {
            marginTop: '20px'
        };

        const headingStyle = {
            textAlign: 'center'
        }

        const accordionStyle = {
            textAlign: 'center'
        }

        return (
            <div>
                <h3 style={headingStyle}>{result[0].subredditName}</h3>
                <table align="center">
                    <td>
                        <div id="accordion" style={accordionStyle}>
                            {result.map(res =>
                                <div className="card">
                                    <div class="card-header" id={"heading_" + res.id}>
                                        <h5 class="mb-0">
                                            <button class="btn btn-link" data-toggle="collapse" data-target={"#" + res.id} aria-expanded="true" aria-controls={res.id}>
                                                {res.tag} - {res.author}
                                            </button>
                                        </h5>
                                    </div>

                                    <div id={res.id} class="collapse" aria-labelledby={"heading_" + res.id} data-parent="#accordion">
                                        <div class="card-body">
                                            <p className="card-text">
                                                <FontAwesomeIcon icon={faPenFancy} />  Author: {res.author}
                                            </p>
                                            <p className="card-text">
                                                <FontAwesomeIcon icon={faThumbsUp} />  Upvotes: {res.ups}
                                            </p>
                                            <p className="card-text">
                                                <FontAwesomeIcon icon={faThumbsDown} />  Downvotes: {res.downs}
                                            </p>
                                            <a href={res.url} className="btn btn-primary" role="button" target="_blank">
                                                Get Image  <FontAwesomeIcon icon={faPhotoVideo} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </td>
                </table>
            </div>
        );
    }

    render() {
        let dataAppearsHere = <p style={{ marginTop: '10px' }}><em>Data will appear here...</em></p>;
        let contents;

        if (this.state.loading) {
            contents = dataAppearsHere;
        }
        else if (this.state.result.length > 0) {
            contents = GetData.renderData(this.state.result);
        } else {
            contents = dataAppearsHere;
        }

        return (
            <div>
                <SearchBar fetchedData={this.fetchedData} loadingData={this.loadingData} />
                <div className="container">
                    {contents}
                </div>
            </div>
        );
    }
}
