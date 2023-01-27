import { Component } from 'react';

class StepAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      distance: '',
    };
  }

  onValueCange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.date.length < 10 || !this.state.distance) return;

    this.props.onAdd(this.state.date, +this.state.distance);
    this.setState({
      date: '',
      distance: '',
    });
  };


  render() {
    let { date, distance } = this.state;

    return (
      <div className="app-add-form">
        <h3>Добавьте информацию о тренировке</h3>
        <form className="add-form d-flex" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="form-control new-post-label"
            placeholder="Дата тренировки"
            name="date"
            value={date}
            onChange={this.onValueCange}
          />

          <input
            type="number"
            className="form-control new-post-label"
            placeholder="Сколько километров пройдено?"
            name="distance"
            value={distance}
            onChange={this.onValueCange}
          />

          <button type="submit" className="btn btn-outline-light">
            OK
          </button>
        </form>
      </div>
    );
  }
}

export default StepAddForm;
