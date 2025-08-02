import React from 'react';
import {
  Clock,
  Calendar,
  CheckSquare,
  FileText,
  TrendingUp,
  Plus,
  ChevronRight,
  Play,
  Pause,
  Circle,
  BarChart3,
  Target,
  BookOpen,
  Coffee
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for widgets
  const todayTasks = [
    { id: 1, title: 'Complete project proposal', completed: false, priority: 'high' },
    { id: 2, title: 'Team meeting at 2 PM', completed: true, priority: 'medium' },
    { id: 3, title: 'Review code changes', completed: false, priority: 'low' },
    { id: 4, title: 'Update documentation', completed: false, priority: 'medium' }
  ];

  const recentNotes = [
    { id: 1, title: 'Meeting Notes - Q4 Planning', preview: 'Discussed upcoming features and timeline...', date: '2 hours ago' },
    { id: 2, title: 'Learning React Hooks', preview: 'useState and useEffect best practices...', date: '1 day ago' },
    { id: 3, title: 'Project Ideas', preview: 'Dashboard app, expense tracker, habit tracker...', date: '3 days ago' }
  ];

  const activeHours = [
    { task: 'Frontend Development', time: '02:34:12', status: 'active', color: '#3B82F6' },
    { task: 'Learning React', time: '4.2h', status: 'paused', color: '#10B981' },
    { task: 'Exercise', time: '1.0h', status: 'completed', color: '#F59E0B' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Good morning! 👋</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your productivity today</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Hours</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">6.5h</p>
                <p className="text-sm text-green-600 mt-1">+1.2h from yesterday</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasks Done</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12/18</p>
                <p className="text-sm text-blue-600 mt-1">67% completion</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notes Created</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">23</p>
                <p className="text-sm text-purple-600 mt-1">This week</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Productivity</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">85%</p>
                <p className="text-sm text-orange-600 mt-1">Above average</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Tasks Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CheckSquare className="w-5 h-5 mr-2 text-blue-500" />
                  Today's Tasks
                </h2>
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {todayTasks.slice(0, 4).map(task => (
                  <div key={task.id} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {task.completed && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-600' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-500 hover:text-blue-600 flex items-center justify-center text-sm font-medium transition-colors">
                View all tasks
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Time Tracking Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-500" />
                Time Tracking
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {activeHours.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.task}</p>
                        <p className="text-xs text-gray-500 capitalize">{item.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">{item.time}</span>
                      {item.status === 'active' && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Today's Total:</span>
                  <span className="text-lg font-bold text-gray-900">6.5h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                Calendar
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-gray-900">August 2025</p>
                <p className="text-sm text-gray-500">Today: August 2nd</p>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="font-medium text-gray-500 py-2">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center">
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={`py-2 text-sm ${
                    i + 1 === 2 ? 'bg-blue-500 text-white rounded-lg font-bold' : 
                    i + 1 > 25 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100 rounded-lg'
                  }`}>
                    {i + 1}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Team meeting - 2:00 PM</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Project deadline - Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notes Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-yellow-500" />
                  Recent Notes
                </h2>
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentNotes.map(note => (
                  <div key={note.id} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-medium text-gray-900 text-sm">{note.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{note.preview}</p>
                    <p className="text-xs text-gray-400 mt-2">{note.date}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-500 hover:text-blue-600 flex items-center justify-center text-sm font-medium transition-colors">
                View all notes
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Analytics Chart Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-indigo-500" />
                Weekly Progress
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mon</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">8.5h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tue</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">7.0h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Wed</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">9.5h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Thu</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">6.0h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fri</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">6.5h</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600">Weekly Average: <span className="font-semibold text-gray-900">7.5h/day</span></p>
              </div>
            </div>
          </div>
        </div>


        
      </div>
    </div>
  );
};

export default Dashboard;