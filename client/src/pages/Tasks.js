import React, { useState, useEffect } from 'react';
import { Trash2, Plus, CheckCircle2, Circle, Calendar } from 'lucide-react';

function TasksWidget() {
  const BASE_URL = 'http://localhost:5000/tasks';

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${BASE_URL}/get-task`,{
      headers:{
        'auth-token': token
      }
    })
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(task => ({
          ...task,
          text: task.description
        }));
        setTasks(formatted);
      })
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      const taskData = {
        description: newTask,
        dueDate: newDueDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
        priority: newPriority,
        category: newCategory,
        completed: false
      };

      fetch(`${BASE_URL}/add-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
                    'auth-token': token    
      },
        body: JSON.stringify(taskData)
      })
        .then(res => res.json())
        .then(savedTask => {
          setTasks([{ ...savedTask, text: savedTask.description }, ...tasks]);
          setNewTask('');
          setNewPriority('medium');
          setNewDueDate('');
          setNewCategory('General');
          setShowAddForm(false);
        })
        .catch(err => console.error('Error adding task:', err));
    }
  };

  const toggleTask = (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task.completed) {
      fetch(`${BASE_URL}/complete-task/${id}`, { method: 'PUT',
      headers:{
        'auth-token': token
      }    
    })
        .then(res => res.json())
        .then(() => {
          setTasks(tasks.map(t => t._id === id ? { ...t, completed: true } : t));
        })
        .catch(err => console.error('Error completing task:', err));
    } else {
      setTasks(tasks.map(t => t._id === id ? { ...t, completed: false } : t));
    }
  };

  const deleteTask = (id) => {
    fetch(`${BASE_URL}/delete-task/${id}`, { method: 'DELETE' ,
      headers:{
        'auth-token': token
      }  })
      .then(res => res.json())
      .then(() => {
        setTasks(tasks.filter(t => t._id !== id));
      })
      .catch(err => console.error('Error deleting task:', err));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed': return tasks.filter(task => task.completed);
      case 'pending': return tasks.filter(task => !task.completed);
      case 'high': return tasks.filter(task => task.priority === 'high');
      default: return tasks;
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays > 0) return `${diffDays} days left`;
    return `${Math.abs(diffDays)} days overdue`;
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="px-6 pt-6">
        <button
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-4"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Cancel' : 'Add Task'}</span>
        </button>

        {showAddForm && (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-4">
            <input
              type="text"
              placeholder="Task description"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="px-2 py-2 border rounded-md text-sm"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="px-2 py-2 border rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-2 py-2 border rounded-md text-sm"
              />
              <button
                onClick={addTask}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Add Task
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="p-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500">
              {filter === 'all' ? 'Add your first task to get started!' : `No ${filter} tasks at the moment.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTasks.map(task => (
              <div
                key={task._id}
                className={`group relative bg-gradient-to-r p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  task.completed
                    ? 'from-green-50 to-green-100 border-green-200 opacity-75'
                    : isOverdue(task.dueDate)
                    ? 'from-red-50 to-red-100 border-red-200'
                    : 'from-white to-gray-50 border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleTask(task._id)}
                    className={`mt-1 transition-all duration-200 ${
                      task.completed
                        ? 'text-green-500 hover:text-green-600'
                        : 'text-gray-400 hover:text-blue-500'
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-gray-800 ${task.completed ? 'line-through' : ''}`}>
                      {task.text}
                    </div>

                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getPriorityColor(task.priority)}`}>
                        {getPriorityIcon(task.priority)} {task.priority?.toUpperCase()}
                      </span>

                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        📁 {task.category || 'General'}
                      </span>

                      <span className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${
                        isOverdue(task.dueDate) ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Calendar className="w-3 h-3" />
                        <span>{getDaysUntilDue(task.dueDate)}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-110"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress */}
      {tasks.length > 0 && (
        <div className="px-6 pb-6">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Progress: {Math.round((completedCount / tasks.length) * 100)}%</span>
            <span>{tasks.length - completedCount} tasks remaining</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksWidget;
