import React, { Component } from 'react';

export class GetData extends Component {
    static displayName = GetData.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };

        fetch('api/r/data')
            .then(response => response.json())
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });

    }

    static renderForecastsTable(forecasts) {
        const cardStyle = {
            marginTop: '20px'
        };

        return (
            <div>
                <h3>{forecasts[0].subredditName}</h3>
                <div className="row">
                    {forecasts.map(forecast =>
                        <div className="card text-center container col-12 col-sm-12 col-md-5 col-lg-5 shadow p-3 mb-5 bg-white rounded" style={cardStyle}>
                            <div className="card-body">
                                <p className="card-text">{forecast.tag}</p>
                                <h6 className="card-text">Posted By: {forecast.author}</h6>
                                <a href={forecast.url} target="_blank" class="btn btn-primary">Get Image</a>
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
            : GetData.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                {contents}
            </div>
        );
    }
}
