import React, { Component } from 'react';
import { SearchBar } from './SearchBar';

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

        return (
            <div>
                <h3 style={headingStyle}>{result[0].subredditName}</h3>
                <div className="row">
                    {result.map(res =>
                        <div className="card text-center container col-12 col-sm-12 col-md-5 col-lg-5 shadow p-3 mb-5 bg-white rounded" style={cardStyle}>
                            <div className="card-body">
                                <p className="card-text">{res.tag}</p>
                                <h6 className="card-text">Posted By: {res.author}</h6>
                                <a href={res.url} target="_blank" class="btn btn-primary">Get Image</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : GetData.renderData(this.state.result);

        return (
            <div>
                <SearchBar fetchedData={this.fetchedData} loadingData={this.loadingData}/>
                {contents}
            </div>
        );
    }
}
