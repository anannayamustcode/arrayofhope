  import React, { useState, useEffect } from 'react';
  import { Bar, Pie, LineChart, Line, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Cell, ResponsiveContainer, AreaChart, Area } from 'recharts';
  import { Check, Clock, AlertCircle, FileText, Filter, Search, Calendar, Download, RefreshCw, ChevronDown, Users, TrendingUp, Activity } from 'lucide-react';

  // Sample data
  const requirementsData = [
    { id: 'REQ-001', title: 'Payment Gateway Integration', status: 'Approved', priority: 'High', department: 'Retail Banking', completion: 100, assignee: 'Sarah Johnson', createdDate: '2025-03-15', dueDate: '2025-04-10' },
    { id: 'REQ-002', title: 'Customer Onboarding Flow', status: 'In Review', priority: 'High', department: 'Customer Experience', completion: 80, assignee: 'Michael Chen', createdDate: '2025-03-18', dueDate: '2025-04-15' },
    { id: 'REQ-003', title: 'Anti-fraud Detection System', status: 'In Progress', priority: 'Critical', department: 'Security', completion: 60, assignee: 'Priya Patel', createdDate: '2025-03-10', dueDate: '2025-04-20' },
    { id: 'REQ-004', title: 'Mobile Banking App Redesign', status: 'Pending Approval', priority: 'Medium', department: 'Digital', completion: 90, assignee: 'James Wilson', createdDate: '2025-03-05', dueDate: '2025-04-05' },
    { id: 'REQ-005', title: 'Corporate Client Portal', status: 'In Progress', priority: 'High', department: 'Corporate Banking', completion: 45, assignee: 'Emily Roberts', createdDate: '2025-03-20', dueDate: '2025-04-25' },
    { id: 'REQ-006', title: 'Transaction Monitoring Upgrade', status: 'Approved', priority: 'Critical', department: 'Security', completion: 100, assignee: 'David Kim', createdDate: '2025-02-28', dueDate: '2025-03-28' },
    { id: 'REQ-007', title: 'Loan Application Process', status: 'In Review', priority: 'Medium', department: 'Loans', completion: 75, assignee: 'Jessica Taylor', createdDate: '2025-03-12', dueDate: '2025-04-12' },
    { id: 'REQ-008', title: 'Account Aggregation Feature', status: 'Pending Approval', priority: 'Low', department: 'Digital', completion: 85, assignee: 'Nathan Brooks', createdDate: '2025-03-22', dueDate: '2025-04-15' }
  ];

  const statusChartData = [
    { name: 'Approved', value: 2, color: '#4CAF50' },
    { name: 'In Review', value: 2, color: '#2196F3' },
    { name: 'In Progress', value: 2, color: '#FF9800' },
    { name: 'Pending Approval', value: 2, color: '#9C27B0' }
  ];

  const priorityData = [
    { name: 'Critical', value: 2, color: '#f44336' },
    { name: 'High', value: 3, color: '#ff9800' },
    { name: 'Medium', value: 2, color: '#2196f3' },
    { name: 'Low', value: 1, color: '#4caf50' }
  ];

  const departmentData = [
    { name: 'Security', value: 2 },
    { name: 'Digital', value: 2 },
    { name: 'Retail Banking', value: 1 },
    { name: 'Banking', value: 1 },
    { name: 'Customer Experience', value: 1 },
    { name: 'Loans', value: 1 }
  ];

  const timelineData = [
    { name: 'Week 1', completed: 2, inProgress: 3, new: 1 },
    { name: 'Week 2', completed: 1, inProgress: 4, new: 2 },
    { name: 'Week 3', completed: 3, inProgress: 2, new: 0 },
    { name: 'Week 4', completed: 2, inProgress: 2, new: 1 },
    { name: 'Week 5', completed: 4, inProgress: 3, new: 2 },
    { name: 'Week 6', completed: 3, inProgress: 4, new: 1 }
  ];

  const velocityData = [
    { sprint: 'Sprint 1', planned: 12, completed: 10 },
    { sprint: 'Sprint 2', planned: 14, completed: 13 },
    { sprint: 'Sprint 3', planned: 15, completed: 12 },
    { sprint: 'Sprint 4', planned: 16, completed: 15 },
    { sprint: 'Sprint 5', planned: 18, completed: 18 }
  ];

  const deliveryTrendData = [
    { month: 'Nov', onTime: 80, delayed: 20 },
    { month: 'Dec', onTime: 85, delayed: 15 },
    { month: 'Jan', onTime: 75, delayed: 25 },
    { month: 'Feb', onTime: 90, delayed: 10 },
    { month: 'Mar', onTime: 95, delayed: 5 }
  ];

  // Dummy activities for activity log
  const activityLogData = [
    { id: 1, action: 'Updated status to "Approved"', requirement: 'REQ-006', user: 'Anannaya Agarwal', time: '2 hours ago' },
    { id: 2, action: 'Added comment', requirement: 'REQ-003', user: 'Ishita Sodhiya', time: '4 hours ago' },
    { id: 3, action: 'Updated completion to 80%', requirement: 'REQ-002', user: 'Prisha Birla', time: '6 hours ago' },
    { id: 4, action: 'Created new requirement', requirement: 'REQ-008', user: 'Sakshi Narkhede', time: '1 day ago' },
    { id: 5, action: 'Assigned to team member', requirement: 'REQ-005', user: 'Bhavika Panpalia', time: '1 day ago' }
  ];

  // Enhanced dashboard component
  const EnhancedRequirementsDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [dateRange, setDateRange] = useState('Last 30 days');
    
    // Function to simulate data refresh
    const refreshData = () => {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1500);
    };
    
    // Filtered requirements based on search and filters
    const filteredRequirements = requirementsData.filter(req => {
      return (
        (req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        req.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === 'All' || req.status === filterStatus) &&
        (filterPriority === 'All' || req.priority === filterPriority)
      );
    });
    
    // Color function for status
    const getStatusColor = (status) => {
      switch(status) {
        case 'Approved': return 'bg-green-100 text-green-800';
        case 'In Review': return 'bg-blue-100 text-blue-800';
        case 'In Progress': return 'bg-orange-100 text-orange-800';
        case 'Pending Approval': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
    // Color function for priority
    const getPriorityColor = (priority) => {
      switch(priority) {
        case 'Critical': return 'bg-red-100 text-red-800';
        case 'High': return 'bg-orange-100 text-orange-800';
        case 'Medium': return 'bg-blue-100 text-blue-800';
        case 'Low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        {/* Top bar */}
        <header className="bg-white p-4 pl-16 shadow-md flex items-start justify-start">
        <div>
            <h1 className="text-2xl font-bold text-blue-900">Requirements Engineering Dashboard</h1>
            <p className="text-sm text-gray-500">Barclays Enterprise Solution</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-1 !bg-blue-90 text-blue-700 px-3 py-2 rounded-md">
                <Calendar className="w-15 h-4" />
                <span>{dateRange}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={refreshData}
              className="flex items-center space-x-1 !bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
            
            <button className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="flex px-6">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Dashboard Overview
            </button>
            <button 
              onClick={() => setActiveTab('requirements')}
              className={`py-4 px-6 font-medium ${activeTab === 'requirements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Requirements List
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-6 font-medium ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('activity')}
              className={`py-4 px-6 font-medium ${activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Activity Log
            </button>
          </div>
        </div>

        {/* Main Content based on active tab */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">Total Requirements</p>
                      <p className="text-3xl font-bold">{requirementsData.length}</p>
                      <p className="text-xs text-green-500 mt-1">+12% from last month</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-full">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">In Progress</p>
                      <p className="text-3xl font-bold">{requirementsData.filter(r => r.status === 'In Progress').length}</p>
                      <p className="text-xs text-orange-500 mt-1">+5% from last week</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-full">
                      <Clock className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">Pending Review</p>
                      <p className="text-3xl font-bold">{requirementsData.filter(r => r.status === 'In Review' || r.status === 'Pending Approval').length}</p>
                      <p className="text-xs text-purple-500 mt-1">-8% from last week</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-full">
                      <AlertCircle className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500">Completed</p>
                      <p className="text-3xl font-bold">{requirementsData.filter(r => r.status === 'Approved').length}</p>
                      <p className="text-xs text-green-500 mt-1">+15% from last month</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-full">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Sprint Velocity</h2>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={velocityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sprint" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="planned" fill="#a5b4fc" name="Planned" />
                        <Bar dataKey="completed" fill="#4f46e5" name="Completed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Priority Distribution</h2>
                    <Activity className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={priorityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {priorityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Delivery Trend</h2>
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={deliveryTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="onTime" stackId="1" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.6} name="On Time %" />
                        <Area type="monotone" dataKey="delayed" stackId="1" stroke="#FF9800" fill="#FF9800" fillOpacity={0.6} name="Delayed %" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Status and Timeline Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Requirements by Status</h2>
                  <div className="h-64 flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {statusChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Requirements Timeline</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={timelineData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="completed" stroke="#4CAF50" strokeWidth={2} />
                        <Line type="monotone" dataKey="inProgress" stroke="#FF9800" strokeWidth={2} />
                        <Line type="monotone" dataKey="new" stroke="#2196F3" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent Requirements Table */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Requirements</h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {requirementsData.slice(0, 5).map(req => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="p-3 text-sm text-gray-500">{req.id}</td>
                          <td className="p-3 text-sm font-medium text-gray-900">{req.title}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(req.status)}`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(req.priority)}`}>
                              {req.priority}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-500">{req.assignee}</td>
                          <td className="p-3 text-sm text-gray-500">{req.dueDate}</td>
                          <td className="p-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  req.completion === 100 ? 'bg-green-600' :
                                  req.completion > 70 ? 'bg-blue-600' :
                                  'bg-orange-400'
                                }`}
                                style={{ width: `${req.completion}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{req.completion}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Requirements List Tab */}
          {activeTab === 'requirements' && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-lg font-semibold text-gray-800">Requirements List</h2>
                
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-grow md:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search by ID or title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <select
                      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option>All</option>
                      <option>Approved</option>
                      <option>In Review</option>
                      <option>In Progress</option>
                      <option>Pending Approval</option>
                    </select>
                    
                  <select
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                  >
                    <option>All</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Requirements Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRequirements.map(req => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-500">{req.id}</td>
                      <td className="p-3 text-sm font-medium text-gray-900">{req.title}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(req.priority)}`}>
                          {req.priority}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-500">{req.department}</td>
                      <td className="p-3 text-sm text-gray-500">{req.assignee}</td>
                      <td className="p-3 text-sm text-gray-500">{req.createdDate}</td>
                      <td className="p-3 text-sm text-gray-500">{req.dueDate}</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                req.completion === 100 ? 'bg-green-600' :
                                req.completion > 70 ? 'bg-blue-600' :
                                'bg-orange-400'
                              }`}
                              style={{ width: `${req.completion}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{req.completion}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredRequirements.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No requirements found matching your criteria.</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 py-3 border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRequirements.length}</span> of{' '}
                    <span className="font-medium">{filteredRequirements.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Department Distribution */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Requirements by Department</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={departmentData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" name="Number of Requirements" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Completion Rate Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Requirements Status Distribution</h2>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}`}
                      >
                        {statusChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Requirement Completion Rate</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={timelineData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="completed" stroke="#4CAF50" fillOpacity={1} fill="url(#colorCompleted)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-md font-semibold mb-2 text-gray-800">Average Completion Time</h3>
                <p className="text-3xl font-bold text-blue-600">14.3 Days</p>
                <p className="text-sm text-gray-500">Per requirement</p>
                <div className="mt-4 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      {month: 'Jan', days: 16.5},
                      {month: 'Feb', days: 15.2},
                      {month: 'Mar', days: 14.3}
                    ]}>
                      <Line type="monotone" dataKey="days" stroke="#3b82f6" strokeWidth={2} dot={false} />
                      <XAxis dataKey="month" hide={true} />
                      <YAxis hide={true} domain={['dataMin - 1', 'dataMax + 1']} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-md font-semibold mb-2 text-gray-800">On-time Delivery Rate</h3>
                <p className="text-3xl font-bold text-green-600">94.2%</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
                <div className="mt-4 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      {month: 'Jan', rate: 88.5},
                      {month: 'Feb', rate: 91.2},
                      {month: 'Mar', rate: 94.2}
                    ]}>
                      <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} dot={false} />
                      <XAxis dataKey="month" hide={true} />
                      <YAxis hide={true} domain={['dataMin - 5', 100]} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-md font-semibold mb-2 text-gray-800">Revision Rate</h3>
                <p className="text-3xl font-bold text-orange-600">8.7%</p>
                <p className="text-sm text-gray-500">Requirements needing revision</p>
                <div className="mt-4 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      {month: 'Jan', rate: 12.3},
                      {month: 'Feb', rate: 10.1},
                      {month: 'Mar', rate: 8.7}
                    ]}>
                      <Line type="monotone" dataKey="rate" stroke="#f97316" strokeWidth={2} dot={false} />
                      <XAxis dataKey="month" hide={true} />
                      <YAxis hide={true} domain={[0, 'dataMax + 5']} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Activity Log Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Activity Log</h2>
              <div className="flex space-x-3">
                <select className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>All Actions</option>
                  <option>Status Changes</option>
                  <option>Comments</option>
                  <option>Assignments</option>
                  <option>Updates</option>
                </select>
                
                <select className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>All time</option>
                </select>
              </div>
            </div>
            
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {activityLogData.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">{activity.user.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user} <span className="text-gray-500 font-normal">performed action on</span> {activity.requirement}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.action}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <button className="bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <span className="sr-only">View details</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Load More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main export
export default function CollaborationDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedRequirementsDashboard />
    </div>
  );
}                 
