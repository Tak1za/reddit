import React, { Component } from 'react';
import { SearchBar } from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenFancy, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export class GetData extends Component {
    static displayName = GetData.name;

    constructor(props) {
        super(props);
        this.state = { result: [] };
    }

    fetchedData = (data) => {
        this.setState({
            result: data
        })
    }

    static renderData(result) {
        const headingStyle = {
            textAlign: 'center'
        }

        const groupStyle = {
            marginBottom: '-20px'
        }

        result.shift();

        return (
            <div>
                <h3 style={headingStyle}>{result[0].subredditName}</h3>

                <ul className="list-group list-group-flush">
                    {result.map(res =>
                        <li className="list-group-item" key={res.id}>
                            <div style={groupStyle}>
                                <p>
                                    <FontAwesomeIcon icon={faPenFancy} /> - {res.tag}
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faThumbsUp} /> - {res.ups}
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faThumbsDown} /> - {res.downs}
                                </p>
                                <p>
                                    <a href={res.url} className="stretched-link" target="_blank">
                                        Get Image
                                    </a>
                                </p>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

    render() {
        let contents;

        if (this.state.result.length > 0) {
            contents = GetData.renderData(this.state.result);
        }

        return (
            <div>
                <SearchBar fetchedData={this.fetchedData} />
                <div className="container">
                    {contents}
                </div>
            </div>
        );
    }
}
