import React, { Component } from 'react';

export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subreddit: ""
        }
    }

    handleChange = event => {
        event.preventDefault();

        var newEntry = event.target.value;
        this.setState({
            subreddit: newEntry
        })
    }

    fetchData = () => {
        fetch('api/r/data/' + this.state.subreddit)
            .then(response => response.json())
            .then(data => {
                this.props.fetchedData(data);
                this.props.loadingData(false);
            });
    }

    resetData = () => {
        var emptyData = []
        this.setState({
            subreddit: ""
        })
        this.props.fetchedData(emptyData);
        this.props.loadingData(false);
    }

    render() {
        const buttonStyle = {
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: '5px',
            marginRight: '5px'
        }

        return (
            <div>
                <div class="input-group flex-nowrap">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="addon-wrapping">Subreddit :</span>
                    </div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-12">
                        <input type="text" class="form-control" aria-label="Subreddit" aria-describedby="subreddit name" onChange={this.handleChange} value={this.state.subreddit}/>
                    </div>
                </div>
                <button className="btn btn-outline-primary" style={buttonStyle} onClick={this.fetchData}>Search</button>
                <button className="btn btn-outline-warning" style={buttonStyle} onClick={this.resetData}>Clear</button>
            </div>
        )
    }
}