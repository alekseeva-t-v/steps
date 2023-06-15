import React, { useState, useEffect } from 'react';

/**
 * Компонент отображающий форму добавления новой тренировки. Родительский компонет App.
 *
 * @param {object} props.data массив объектов с данными тренировок.
 * @param {function} props.onAdd c помощью функции происходит передача объекта с параметрами новой тренировки в компонент App.
 */
const StepAddForm = (props) => {
  const { data, onAdd } = props;

  const [training, setTraining] = useState({
    date: '',
    distance: '',
  });

  useEffect(() => {
    data.map((item, index) => {
      if (item.replacement) {
        setTraining({
          date: item.date,
          distance: item.distance,
        });

        data.splice(index, 1);
      }
    });
  }, [data]);

  /**
   * Обновляет состояние при вводе данных в поля формы
   *
   * @param {object} event Непосредственно, тот объект, с которым происходит взаимодействие (конкретное поле формы).
   */
  const ValueChangeHandler = (event) => {
    setTraining((prevTraing) => ({
      ...prevTraing,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * Вызывается при нажатии конпки "Ok". Отменяет стандартное поведение(перезагрузку страницы). Сохраняет данные введенные в поля формы в объект. Вызывает функцию onAdd сохранения данных тренировок в компонент App. Очищает поля формы.
   *
   * @param {object} event Непосредственно, тот объект, с которым происходит взаимодействие (Форма).
   */
  const SubmitHandler = (event) => {
    event.preventDefault();
    if (training.date.length < 10 || !training.distance) return;

    onAdd(training.date, Number(training.distance));
    setTraining({
      date: '',
      distance: '',
    });
  };

  return (
    <div className="app-add-form">
      <h3>Добавьте информацию о тренировке</h3>
      <form className="add-form d-flex" onSubmit={SubmitHandler}>
        <input
          type="text"
          className="form-control new-post-label"
          placeholder="Дата тренировки"
          name="date"
          value={training.date}
          onChange={ValueChangeHandler}
        />

        <input
          type="number"
          className="form-control new-post-label"
          placeholder="Сколько километров пройдено?"
          name="distance"
          value={training.distance}
          onChange={ValueChangeHandler}
        />

        <button type="submit" className="btn btn-outline-light">
          OK
        </button>
      </form>
    </div>
  );
};

export default StepAddForm;
