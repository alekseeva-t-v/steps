import StepListItem from './StepListItem';

/**
 * Компонент отображающий непосредственно список тренировок. Родительский компонет App. Дочерние компоненты StepListItem (элементы отдельных тренировок)
 *
 * @param {object} props.data массив объектов с данными тренировок.
 * @param {function} props.onDelete c помощью функции происходит передача id удаляемого элемента в компонент App. Данную функцию передаем через пропс в компонент StepListItem
 * @param {function} props.onToggleReplacement c помощью функции происходит передача id изменяемого элемента в компонент App. Данную функцию передаем через пропс в компонент StepListItem
 */
const StepList = (props) => {
  const { data, onDelete, onToggleReplacement } = props;

  const elements = data.map((item) => {
    return (
      <StepListItem
        key={item.id}
        date={item.date}
        distance={item.distance}
        replacement={item.replacement}
        onDelete={() => onDelete(item.id)}
        onToggleReplacement={() => onToggleReplacement(item.id)}
      />
    );
  });

  return <ul className="list list-group">{elements}</ul>;
};

export default StepList;
