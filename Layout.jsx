import React from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content View */}
            <div className="flex-1 ml-64 flex flex-col h-full overflow-y-auto">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 shadow-sm">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800">Customs Automation Dashboard</h2>
                    </div>
                    <div className="flex space-x-4">
                        {/* Notification Icon */}
                        <div className="relative cursor-pointer text-gray-500 hover:text-brand-green">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
