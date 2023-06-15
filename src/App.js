import React, { useState } from 'react';
import shortid from 'shortid';

import Info from './components/Info';
import StepList from './components/StepList';
import StepListHeader from './components/StepListHeader';
import StepAddForm from './components/StepAddForm';
import moment from 'moment';
import './App.css';

/**
 * Основной компонент приложения, отвечающий за отображение всех элементов на странице. Дочерние компоненты Info (Название приложения), StepListHeader (Шапка таблицы значений), StepList (список тренировок), StepAddForm (Форма добавления новой тренировки)
 *
 */
const App = () => {
  const [trainingData, setTrainingData] = useState([]);

  /**
   * Функция служит для обновления состояния списка тренировок, при вызове из списка тренировок удаляется тренировка, чей индекс пришел в качестве параметра функции из компонента StepList.
   *
   * @param {string} id Идентификатор удаляемого элемента
   */
  const deleteItemHandler = (id) => {
    setTrainingData((prevTrainingData) => {
      return prevTrainingData.filter((item) => item.id !== id);
    });
  };

  /**
   * Функция служит для обновления состояния списка тренировок, при вызове к предыдущему варианту списка тренировок добавляется новый элемент, включающий дату и дистанцию, пришедшие в качестве параметра функции из компонента StepAddForm. Также в объект добавляется сгенерированный с помощью shortid id и параметр replacement (показывает нужно ли прямо сейчас изменить элемент, по умолчанию false). После добавления элемента, происходит сортировка массива тренировок, т.о чтобы даты шли в порядке от новых к старым. Кроме того происходит проверка, того есть ли в списке тренировок данная дата, если есть, то она не добавляется снова как отдельный элемент, а суммируются дистанции
   *
   * @param {string} date дата тренировки
   * @param {number} distance дистанция тренировки
   */
  const addItemHandler = (date, distance) => {
    const newItem = {
      date,
      distance,
      id: shortid.generate(),
      replacement: false,
    };

    setTrainingData((prevTrainingData) => {
      const newArr = [...prevTrainingData, newItem].sort(
        (a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY')
      );

      const newData = newArr.reduce((acc, cur, i) => {
        const item = i > 0 && acc.find(({ date }) => date === cur.date);
        if (item) item.distance += cur.distance;
        else
          acc.push({
            date: cur.date,
            distance: cur.distance,
            id: cur.id,
            replacement: false,
          });
        return acc;
      }, []);

      return newData;
    });
  };

  /**
   * Функция служит для обновления состояния списка тренировок, при вызове редактируется тренировка, чей индекс пришел в качестве параметра функции из компонента StepList, у нее изменяется параметр replacement
   *
   * @param {string} id Идентификатор изменяемого элемента
   */
  const ToggleReplacementHandler = (id) => {
    setTrainingData((prevTrainingData) => {
      const index = prevTrainingData.findIndex((elem) => elem.id === id);
      const old = prevTrainingData[index];
      const newItem = { ...old, replacement: !old.replacement };
      const newArr = [
        ...prevTrainingData.slice(0, index),
        newItem,
        ...prevTrainingData.slice(index + 1),
      ];

      return newArr;
    });
  };

  return (
    <div className="App">
      <Info />
      <StepListHeader />
      <StepList
        data={trainingData}
        onDelete={deleteItemHandler}
        onToggleReplacement={ToggleReplacementHandler}
      />
      <StepAddForm data={trainingData} onAdd={addItemHandler} />
    </div>
  );
};

export default App;
