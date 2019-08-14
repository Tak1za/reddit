import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCut } from '@fortawesome/free-solid-svg-icons'

export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subreddit: "", boilerText: "Data will appear here"
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
        this.setState({
            boilerText: "Loading..."
        })
        fetch('api/r/data/' + this.state.subreddit)
            .then(response => response.json())
            .then(data => {
                this.props.fetchedData(data);
                this.setState({
                    boilerText: ""
                })
            });
    }

    resetData = () => {
        var emptyData = []
        this.setState({
            subreddit: "",
            boilerText: "Data will appear here"
        })
        this.props.fetchedData(emptyData);
    }

    render() {
        const buttonStyleSearch = {
            marginTop: '10px',
            marginBottom: '10px'
        }

        const buttonStyleClear = {
            marginTop: '10px',
            marginBottom: '10px',
            marginLeft: '5px'
        }

        return (
            <div>
                <div className="input-group flex-nowrap">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="addon-wrapping">Subreddit :</span>
                    </div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-11">
                        <input type="text" className="form-control" aria-label="Subreddit" aria-describedby="subreddit name" onChange={this.handleChange} value={this.state.subreddit}/>
                    </div>
                </div>
                <button className="btn btn-outline-primary" style={buttonStyleSearch} onClick={this.fetchData}><FontAwesomeIcon icon={faSearch} /> Search </button>
                <button className="btn btn-outline-warning" style={buttonStyleClear} onClick={this.resetData}><FontAwesomeIcon icon={faCut} /> Clear </button>
                <p><em>{this.state.boilerText}</em></p>
            </div>
        )
    }
}