import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileUp, ShieldAlert, FileText, Search, Settings } from 'lucide-react';

function Sidebar() {
    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { name: 'Document Upload', icon: <FileUp size={20} />, path: '/upload' },
        { name: 'HS Code Advisor', icon: <Search size={20} />, path: '/hs-advisor' },
        { name: 'Compliance Alerts', icon: <ShieldAlert size={20} />, path: '/compliance' },
        { name: 'Customs Docs', icon: <FileText size={20} />, path: '/docs' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    ];

    return (
        <div className="w-64 bg-brand-darkBlue text-white h-screen flex flex-col fixed left-0 top-0">
            <div className="p-6">
                <h1 className="text-2xl font-bold flex items-center space-x-2">
                    <span className="text-brand-lightGreen">JVY</span> <span>Customs</span>
                </h1>
                <p className="text-sm text-blue-200 mt-1">AI Automation Platform</p>
            </div>

            <nav className="flex-1 mt-6">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 px-6 py-4 transition-colors ${isActive
                                        ? 'bg-brand-blue border-l-4 border-brand-lightGreen text-white'
                                        : 'text-gray-300 hover:bg-brand-blue hover:text-white'
                                    }`
                                }
                            >
                                {item.icon}
                                <span className="font-medium">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-brand-blue">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-sm font-bold">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-blue-300">Logistics Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
