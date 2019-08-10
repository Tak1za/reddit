import React, { Component } from 'react';

export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subreddit : ""
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

    render() {
        const buttonStyle = {
            marginTop: '10px',
            marginBottom: '10px'
        }

        return (
            <div>
                <div class="input-group flex-nowrap">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="addon-wrapping">Subreddit :</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Subreddit" aria-describedby="subreddit name" onChange={this.handleChange}/>
                </div>
                <button className="btn btn-outline-primary" style={buttonStyle} onClick={this.fetchData}>Search</button>
            </div>
        )
    }
}