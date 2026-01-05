import { ChevronRight, Calendar, AlertCircle, History, Share2, Download } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-gray-600">
        <span className="text-gray-900">JW RND</span>
      </div>
      

      {/* Center: Date & Time */}
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar size={16} />
        <span className="text-sm">
          {currentDate} {currentTime}
        </span>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <AlertCircle size={16} />
          리스크 분석
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <History size={16} />
          히스토리
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 size={16} />
          공유
        </Button>
        <Button 
          size="sm" 
          className="gap-2 bg-[#4A90E2] hover:bg-[#3A7BC8]"
        >
          <Download size={16} />
          PDF 내보내기
        </Button>
      </div>
    </div>
  );
}