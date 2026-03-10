import React from 'react';
import Layout from '../components/Layout';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { FileCheck, ShieldAlert, Clock, TrendingUp } from 'lucide-react';

const data = [
    { name: 'Mon', submissions: 40, alerts: 2 },
    { name: 'Tue', submissions: 30, alerts: 1 },
    { name: 'Wed', submissions: 20, alerts: 5 },
    { name: 'Thu', submissions: 27, alerts: 0 },
    { name: 'Fri', submissions: 18, alerts: 2 },
    { name: 'Sat', submissions: 23, alerts: 0 },
    { name: 'Sun', submissions: 34, alerts: 1 },
];

function StatCard({ title, value, icon, trend, positive }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
                <p className={`text-xs font-semibold mt-2 flex items-center ${positive ? 'text-green-600' : 'text-red-500'}`}>
                    <TrendingUp size={14} className="mr-1" />
                    {trend}
                </p>
            </div>
            <div className={`p-4 rounded-full ${positive ? 'bg-brand-lightGreen bg-opacity-10 text-brand-green' : 'bg-red-100 text-red-600'}`}>
                {icon}
            </div>
        </div>
    );
}

function Dashboard() {
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Declarations" value="1,248" icon={<FileCheck />} trend="+12.5% this week" positive={true} />
                <StatCard title="Compliance Alerts" value="23" icon={<ShieldAlert />} trend="-5.2% this week" positive={true} />
                <StatCard title="Avg. Clearance" value="2.4 hrs" icon={<Clock />} trend="-45 mins improved" positive={true} />
                <StatCard title="AI Confidence" value="94.2%" icon={<TrendingUp />} trend="+1.2% accuracy" positive={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Submission Volume</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <RechartsTooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="submissions" fill="#1565c0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Alerts</h3>
                    <div className="space-y-4">
                        {[
                            { id: 'INV-8921', issue: 'Restricted Destination', risk: 'High', time: '10 mins ago' },
                            { id: 'INV-8902', issue: 'Value Threshold Exceeded', risk: 'Medium', time: '2 hrs ago' },
                            { id: 'INV-8891', issue: 'Missing Origin Cert', risk: 'Low', time: '5 hrs ago' },
                        ].map(alert => (
                            <div key={alert.id} className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">{alert.id}</p>
                                    <p className="text-xs text-gray-500">{alert.issue}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${alert.risk === 'High' ? 'bg-red-100 text-red-700' :
                                            alert.risk === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {alert.risk} Risk
                                    </span>
                                    <p className="text-[10px] text-gray-400 mt-1">{alert.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
