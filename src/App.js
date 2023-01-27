import { Component } from 'react';
import Info from './components/Info';
import StepList from './components/StepList';
import StepListHeader from './components/StepListHeader';
import StepAddForm from './components/StepAddForm';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.maxId = 1;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (date, distance) => {
    const newItem = {
      date,
      distance,
      id: this.maxId++,
      replacement: false,
    };

    this.setState(({ data }) => {
      const newArr = [...data, newItem].sort(
        (a, b) => moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY')
      );

      const newData = newArr.reduce((acc, cur, i) => {
        const item = i > 0 && acc.find(({ date }) => date === cur.date);
        if (item) item.distance += cur.distance;
        else acc.push({ date: cur.date, distance: cur.distance, id: cur.id });
        return acc;
      }, []);

      return {
        data: newData,
      };
    });
  };

  onToggleReplacement = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const old = data[index];
      const newItem = { ...old, replacement: !old.replacement };
      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];

      return {
        data: newArr
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Info />
        <StepListHeader />
        <StepList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleReplacement={this.onToggleReplacement}
        />
        <StepAddForm data={this.state.data} onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
