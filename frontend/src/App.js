import logo from './logo.svg';
import './App.scss';
import Calendar from "./components/Calendar";
import Task from "./components/Task";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import DropDown from './components/DropDown';
import ColorPicker from './components/ColorPicker';
import Button from './components/Button';
import DayCard from './components/DayCard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

let pending_tasks = [];
let completed_tasks = [];

function App() 
{
  let history = useHistory();

  const [selected_date, setSelecteDate] = useState(new Date());


  let priority_drop_down_options = ["Low", "Medium", "High"];
  let duration_drop_down_options = ["Minutes", "Hours"];

  useEffect(() => 
  {
      updateParentDate(new Date());
  }, []);

  function updateParentDate(date)
  {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year =  date.getFullYear().toString();

    if(day.length === 1)
    {
      day = "0" + day;
    }

    if(month.length === 1)
    {
      month = "0" + month;
    }

    axios.get("http://127.0.0.1:5000/api/tasks?date=" + (day + month + year)).then((res) => 
    {
        const response_data = res.data;
        let tasks_json_array = response_data["tasks"];

        let completed_tasks_temp = [];
        let pending_tasks_temp = [];

        //convert to filter
        for(let i = 0; i < tasks_json_array.length; i++) 
        {
          let current_task = tasks_json_array[i];
          if(current_task["stage"] === "completed")
          {
            completed_tasks_temp.push(
              {
                "name": current_task["name"],
                "priority": current_task["priority"] + " priority",
                "duration": current_task["duration"],
                "stage": current_task["stage"],
                "color": current_task["color"]
              }
            );
          }
          else
          {
            pending_tasks_temp.push(
              {
                "name": current_task["name"],
                "priority": current_task["priority"] + " priority",
                "duration": current_task["duration"],
                "stage": current_task["stage"],
                "color": current_task["color"]
              }
            );
          }
        }
        
        pending_tasks = pending_tasks_temp;
        completed_tasks = completed_tasks_temp;
        setSelecteDate(date);
    }).catch(function(error)
    {
      if(error.response)
      {
        console.log("there was an error")
        pending_tasks = [];
        completed_tasks = [];
        setSelecteDate(date);
      }
    });
  }

  return (
    <div className="App">

      <section className="calendar-section">
        <Calendar parentCallback={updateParentDate}></Calendar>
      </section>
      <Switch>
        <Route exact path="/">

          <section className="pending-tasks-section">
            <div className="container">

              <div className="heading-container">
                <h1>Pending Tasks</h1>
                <img src="./images/icon-add-task.svg" alt="add new task" onClick={() => history.push("/new-task")}></img>
              </div>

              <div className="pending-tasks-list-container">
                {console.log("rendered pending")}
                {console.log(pending_tasks)}
                <TaskList tasks={pending_tasks}></TaskList>
              </div>

            </div>
          </section>

          <section className="completed-tasks-section">
            <div className="container">

              <div className="heading-container">
                <h1>Completed Tasks</h1>
              </div>

              <div className="completed-tasks-list-container">
                {console.log("rendered completed")}
                <TaskList tasks={completed_tasks}></TaskList>
              </div>
            </div>
          </section>

        </Route>


        <Route path="/new-task">

            <section className="new-task-section">
              <div className="container">
                <h1>New Task</h1>
                <h2>Name</h2>
                <InputField></InputField>
                <h2>Priority</h2>
                <DropDown options={priority_drop_down_options}></DropDown>
                <h2>Duration</h2>
                <div className="duration-container">
                  <InputField></InputField>
                  <DropDown options={duration_drop_down_options}></DropDown>
                </div>
                <h2>Color</h2>
                <ColorPicker></ColorPicker>
                <div className="actions-container">
                  <Button text="Cancel" color="#000000" background="#ffffff" outline={true}></Button>
                  <Button text="Done" background="#000000"></Button>
                </div>
              </div>
            </section>

        </Route> 
      </Switch>

    </div>
  );
}

export default App;
