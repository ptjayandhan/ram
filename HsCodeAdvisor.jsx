import React, { useState } from 'react';
import Layout from '../components/Layout';
import { CheckCircle, AlertTriangle, ShieldCheck, Info, Search, ChevronRight } from 'lucide-react';

function HsCodeAdvisor() {
    const [activeTab, setActiveTab] = useState('summary');

    // Hardcoded mock data resembling AI Output
    const shipmentData = {
        invoiceNumber: "INV-2026-9041",
        description: "Wireless Bluetooth Headphones with noise cancellation",
        origin: "China (CN)",
        destination: "United States (US)",
        value: "$25,000.00",
        weight: "150.5 kg",
        predictedHsCode: "8518.30",
        confidence: "92.5%",
        reasoning: "The AI model identified key NLP tokens 'Wireless', 'Bluetooth', and 'Headphones', mapping directly to heading 8518: 'Microphones and stands therefor; loudspeakers; headphones and earphones'. The subclass .30 specifically covers 'Headphones and earphones, whether or not combined with a microphone'.",
        alternatives: [
            { code: "8518.29", desc: "Other loudspeakers", confidence: "4.1%" },
            { code: "8517.62", desc: "Machines for the reception, conversion and transmission of voice/images", confidence: "2.2%" },
            { code: "8518.90", desc: "Parts of heading 8518", confidence: "1.2%" }
        ],
        complianceRisk: "Medium",
        complianceFlags: [
            { type: "Value Threshold", message: "Shipment value exceeds $10,000. Secondary clearance review recommended." }
        ]
    };

    return (
        <Layout>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">AI Classification Results</h1>
                    <p className="text-gray-500 mt-1">Review AI-extracted data, HS code suggestions, and compliance flags.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Edit Data
                    </button>
                    <button className="px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center">
                        <CheckCircle size={16} className="mr-2" />
                        Approve & Generate Docs
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Shipment Details */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Extracted Data</h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500">Product Description</p>
                                <p className="font-medium text-gray-800 bg-yellow-50 p-2 rounded mt-1 border border-yellow-100">{shipmentData.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500">Origin</p>
                                    <p className="font-medium text-gray-800">{shipmentData.origin}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Destination</p>
                                    <p className="font-medium text-gray-800">{shipmentData.destination}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Total Value</p>
                                    <p className="font-medium text-gray-800">{shipmentData.value}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Gross Weight</p>
                                    <p className="font-medium text-gray-800">{shipmentData.weight}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                            <ShieldCheck size={16} className="mr-2 text-brand-blue" />
                            Compliance Engine
                        </h3>

                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg mb-4">
                            <div className="flex items-center space-x-2 text-orange-800 font-bold mb-2">
                                <AlertTriangle size={18} />
                                <span>{shipmentData.complianceRisk} Risk Detected</span>
                            </div>
                            <ul className="list-disc list-inside text-sm text-orange-700 space-y-1">
                                {shipmentData.complianceFlags.map((flag, i) => (
                                    <li key={i}><strong>{flag.type}:</strong> {flag.message}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column - AI Reasoning & HS Codes */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-brand-darkBlue text-white p-8 rounded-xl shadow-md border border-brand-blue relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Search size={120} />
                        </div>

                        <div className="relative z-10">
                            <span className="bg-brand-lightGreen text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Primary Recommendation
                            </span>

                            <div className="mt-4 flex items-end space-x-6">
                                <div>
                                    <h2 className="text-5xl font-black tracking-tight">{shipmentData.predictedHsCode}</h2>
                                    <p className="text-blue-200 mt-2 text-lg">Headphones and earphones</p>
                                </div>

                                <div className="pb-1">
                                    <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                                        <span className="text-3xl font-bold text-brand-lightGreen">{shipmentData.confidence}</span>
                                        <span className="text-sm font-medium text-blue-100 leading-tight">AI Confidence<br />Score</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-black bg-opacity-20 p-5 rounded-lg border border-white border-opacity-10">
                                <h4 className="flex items-center text-sm font-bold text-brand-lightGreen mb-2 uppercase tracking-wide">
                                    <Info size={16} className="mr-2" /> AI Reasoning Panel
                                </h4>
                                <p className="text-sm text-blue-50 leading-relaxed">
                                    {shipmentData.reasoning}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Alternative Classifications</h3>
                            <span className="text-xs font-medium text-gray-500">Top 3 alternative nodes</span>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {shipmentData.alternatives.map((alt, index) => (
                                <div key={index} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-gray-100 text-gray-600 font-mono font-bold px-3 py-1 rounded">
                                            {alt.code}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{alt.desc}</p>
                                            <p className="text-xs text-gray-500 mt-1">Similarity score: {alt.confidence}</p>
                                        </div>
                                    </div>
                                    <button className="text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-sm font-medium">
                                        Select <ChevronRight size={16} className="ml-1" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default HsCodeAdvisor;
