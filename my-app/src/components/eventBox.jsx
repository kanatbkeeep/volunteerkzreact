import React from 'react';
import '../style/eventBox_style.css'

class EventBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: []
        };
    }

    componentDidMount() {
        let baseUrl = (window.location).href; // You can also use document.URL
        let eventId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

        fetch(
            "http://localhost:8080/event/getById",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id : eventId
                })
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    item: json
                });
            })
    }

    render() {
        const {item} = this.state;
        console.log(item);
        return (
            <div>

            </div>
        );
    }
}

export default EventBox;