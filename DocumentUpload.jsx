import React, { useState } from 'react';
import Layout from '../components/Layout';
import { UploadCloud, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function DocumentUpload() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [aiStatus, setAiStatus] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return;

        setIsUploading(true);
        setAiStatus('Parsing document text...');

        // Simulate API call and AI Processing
        setTimeout(() => {
            setAiStatus('Extracting Line Items & Weights...');

            setTimeout(() => {
                setAiStatus('Running HS Code Classification Model...');

                setTimeout(() => {
                    setAiStatus('Validating Compliance Rules...');

                    setTimeout(() => {
                        setIsUploading(false);
                        navigate('/hs-advisor'); // Redirect to results page
                    }, 1500);

                }, 1500);
            }, 1500);
        }, 1500);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Upload Shipping Documents</h1>
                    <p className="text-gray-500 mt-1">Upload Commercial Invoices or Packing Lists (PDF, Excel, Images). AI will automatically extract text.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-8">
                        <div
                            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${file ? 'border-brand-green bg-green-50' : 'border-gray-300 hover:border-brand-blue hover:bg-gray-50'}`}
                        >
                            {!file ? (
                                <>
                                    <div className="mx-auto w-16 h-16 mb-4 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center">
                                        <UploadCloud size={32} />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">Drag and drop your file here</h3>
                                    <p className="text-sm text-gray-500 mb-4">or click to browse from your computer</p>
                                    <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-blue hover:bg-brand-darkBlue">
                                        Select File
                                        <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.xlsx,.jpg,.png" />
                                    </label>
                                </>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <File size={48} className="text-brand-green mb-4" />
                                    <p className="text-lg font-medium text-gray-900">{file.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <button
                                        onClick={() => setFile(null)}
                                        className="mt-4 text-sm text-red-500 hover:text-red-700"
                                    >
                                        Remove File
                                    </button>
                                </div>
                            )}
                        </div>

                        {file && (
                            <div className="mt-8 flex justify-end gap-4">
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className={`flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-green hover:bg-green-700'}`}
                                >
                                    {isUploading ? (
                                        <><Loader2 className="animate-spin mr-2" size={20} /> Processing...</>
                                    ) : (
                                        'Analyze Document'
                                    )}
                                </button>
                            </div>
                        )}

                        {isUploading && (
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-3">
                                <Loader2 className="animate-spin text-brand-blue mt-0.5" size={20} />
                                <div>
                                    <h4 className="text-sm font-bold text-brand-darkBlue">AI Processing in Progress</h4>
                                    <p className="text-xs text-brand-blue mt-1 font-mono">{aiStatus}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default DocumentUpload;
