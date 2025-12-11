import React from 'react';
import { MOCK_CONTENT } from '../constants';
import { FileText, Play, Download } from 'lucide-react';

const Content: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">بانک محتوای آموزشی</h1>
        <div className="flex gap-2">
           {['همه', 'ویدئو', 'جزوه', 'مشاوره'].map((tag) => (
             <button key={tag} className="px-3 py-1.5 rounded-lg text-sm bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
               {tag}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CONTENT.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className={`h-32 flex items-center justify-center ${
              item.type === 'video' ? 'bg-red-50 text-red-400' :
              item.type === 'pdf' ? 'bg-blue-50 text-blue-400' : 'bg-green-50 text-green-400'
            }`}>
              {item.type === 'video' ? <Play size={40} className="fill-current" /> : <FileText size={40} />}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-xs font-bold text-gray-400 uppercase">{item.subject}</span>
                 <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{item.type}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
              
              <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                <Download size={16} />
                <span>دانلود / مشاهده</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;