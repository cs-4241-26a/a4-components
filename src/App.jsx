import React, {useEffect, useState} from "react";
import Task from "./Task";

export default function App(){
    const [taskText, setTaskText] = useState("");
    const [priority, setPriority] = useState("high");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTaskList()
    }, [])

    async function loadTaskList(){
        const response = await fetch("/task-list")
        const json = await response.json()
        setTasks(json)
    }

    async function addTask() {
      if(taskText === "") {
        alert("Please enter a task");
        return;
      }

      const newTask = {
        task: taskText,
        priority: priority,
        done: false,
        creationDate: new Date().toISOString().split("T")[0],
      };

      try{
        const response = await fetch("/add-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        })

        if(response.ok){
          const updatedTodoList = await response.json();
          setTasks(updatedTodoList);
          setTaskText("");
        }
        else{
          console.error("Server Error: ", response.statusText);
        }
      }catch(e){
        console.error("Failed to add task: ", e);
        alert("There was a problem adding task!");
      }
    }

    async function deleteTask(id) {
      try {
        const response = await fetch("/delete-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id}),
        })

        if(response.ok){
          const updatedTodoList = await response.json();
          setTasks(updatedTodoList);
        }
        else{
          console.error("Server Error: ", response.statusText);
        }
      } catch(e){
        console.error("Failed to delete task: ", e);
      }
    }

    async function editTask(id) {
      const newText = prompt("Please edit task text:");
      if(newText === null || newText.trim() === "") {
        return
      }

      const newPriority = prompt("Please edit priority (high/medium/low):");
      if(!['high', 'medium', 'low'].includes(newPriority)){
        alert("Priority can be high, medium, or low")
        return
      }

      try{
        const response = await fetch("/edit-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id, task: newText, priority: newPriority}),
        })

        if(response.ok){
          const updatedTodoList = await response.json();
          setTasks(updatedTodoList);
        }
        else{
          console.error("Server Error: ", response.statusText);
        }
      }
      catch(e){
        console.error("Failed to edit task: ", e);
      }
    }

    async function toggleTask(id) {
      try {
        const response = await fetch("/toggle-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id}),
        })

        if(response.ok){
          const updatedTodoList = await response.json();
          setTasks(updatedTodoList);
        }
        else{
          console.error("Server Error: ", response.statusText);
        }
      } catch(e){
        console.error("Failed to delete task: ", e);
      }
    }

    return(
        <div className="w-full min-h-screen bg-gradient-to-r from-[#667db6] via-[#0082c8] to-[#667db6] p-2.5 flex justify-center items-center">
            <div className="bg-white w-full max-w-150 rounded-2xl p-5">
                <h1 className="text-2xl font-bold mb-2">To-Do List</h1>

                <div className="w-full pt-2.5 flex justify-between gap-2.5">
                    <input
                        type="text"
                        value={taskText}
                        onChange={e => setTaskText(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && addTask()}
                        placeholder="Enter Task"
                        className="flex-1 rounded-lg p-2 border-2 border-black outline-none"
                    />

                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                        className="border-2 border-black rounded-lg p-1"
                    >
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>

                    <button
                        className="w-full max-w-22 rounded-lg border-none bg-orange-400 cursor-pointer"
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                </div>

                <ul>
                    {tasks.map((task) => (
                        <Task
                            key={task._id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}