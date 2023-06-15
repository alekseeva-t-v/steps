/**
 * Компонент отображающий элемент отдельной тренировки. Родительский компонент StepList
 *
 * @param {string} props.date дата тренировки.
 * @param {string} props.distance дистанция тренировки.
 * @param {boolean} props.replacement показатель нужно ли изменять компонент прямо сейчас.
 * @param {function} props.onDelete c помощью функции происходит передача id удаляемого элемента в компонент StepList.
 * @param {function} props.onToggleReplacement c помощью функции происходит передача id изменяемого элемента в компонент StepList.
 */
const StepListItem = (props) => {
  const { date, distance, replacement, onDelete, onToggleReplacement } = props;

  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="list-group-item-label">{date}</span>
      <span className="list-group-item-input">{distance}</span>
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn-cookie btn-sm"
          onClick={onToggleReplacement}
          disabled={replacement}
        >
          <i className="fa-solid fa-pencil"></i>
        </button>

        <button type="button" className="btn-trash btn-sm" onClick={onDelete}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </li>
  );
};

export default StepListItem;
