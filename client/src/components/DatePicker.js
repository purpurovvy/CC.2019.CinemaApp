import React from 'react';
import "./DatePicker.css"
import "../App.css";


class DatePicker extends React.PureComponent {
    render() {
        return (
            <div className="mainContent">
                <form action="/">
                    <h5>Data seansu: </h5>
                    <input type="date" name="movieday" />
                    <input type="submit" ref={input => this.search = input}
                        onChange={this.handleInputChange}
                        value="Szukaj!" />
                </form>
            </div>
        );
    }
}

export default DatePicker;
