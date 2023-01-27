import { Component } from 'react';

class StepListItem extends Component {
  render() {
    const {date, distance, onDelete, onToggleReplacement} = this.props;

    return (
      <li className="list-group-item d-flex justify-content-between">
          <span className="list-group-item-label">{date}</span>
          <span
            className="list-group-item-input">{distance}</span>
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn-cookie btn-sm"
              onClick={onToggleReplacement}
            >
              <i className="fa-solid fa-pencil"></i>
            </button>

            <button type="button"
                    className="btn-trash btn-sm"
                    onClick={onDelete}
                  >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </li>
    )
  }
}

export default StepListItem