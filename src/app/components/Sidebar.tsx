import { MessageSquare, FileText, Users, TrendingUp, ClipboardList, ShoppingCart, User } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (page: string) => void;
}

export function Sidebar({ activeItem = 'consultation', onNavigate }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const menuItems = [
    { id: 'ai-chat', icon: MessageSquare, label: 'AI 채팅' },
    { id: 'prompts', icon: FileText, label: '프롬프트 허브' },
    { id: 'market', icon: TrendingUp, label: '시장 분석' },
    { id: 'consultation', icon: ClipboardList, label: '방문 준비' },
    { id: 'sales', icon: ShoppingCart, label: '사내 데이터베이스' },
 
  ];

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 flex flex-col py-6 gap-1 transition-all duration-300 relative`}>
      {/* Toggle Button - Top Right */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-[#4A90E2] hover:text-[#4A90E2] transition-all shadow-sm z-10"
        title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Logo */}
      <div className={`mb-6 px-6 flex items-center gap-3 ${!isExpanded && 'justify-center px-0'}`}>
        <div className="text-[#4A90E2]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="currentColor" />
            <path d="M16 8L22 16L16 24L10 16L16 8Z" fill="white" />
          </svg>
        </div>
        {isExpanded && <span className="text-gray-900">AI PB PROTAL</span>}
      </div>

      {/* Menu Items */}
      <div className="flex-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.id === activeItem;
          
          return (
            <div key={item.id}>
              <button
                className={`
                  /* mx-3 대신 width를 직접 계산하거나, 부모에 padding을 주고 w-full을 사용하세요 */
                  w-[calc(100%-1.5rem)]  /* 좌우 마진 0.75rem(mx-3)씩 총 1.5rem 제외 */
                  px-4 py-3 rounded-lg flex items-center gap-3 transition-all 
                  ${isActive ? 'bg-[#4A90E2] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'} 
                  ${!isExpanded ? 'justify-center' : 'justify-start'}
                `}
                title={!isExpanded ? item.label : undefined}
                onClick={() => onNavigate && onNavigate(item.id)}
              >
                <Icon size={20} className="shrink-0" /> {/* 아이콘 크기 고정 */}
                {isExpanded && <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
              </button>
              {/* AI 채팅과 프롬프트 이후 구분선 추가 */}
              {item.id === 'prompts' && (
                <div className="mx-3 my-3 border-t border-gray-200"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Account Section */}
      <div className={`mx-3 px-4 py-3 rounded-lg border border-gray-200 flex items-center gap-3 text-gray-600 hover:bg-gray-100 cursor-pointer transition-all ${!isExpanded && 'justify-center'}`}>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <User size={16} />
        </div>
        {isExpanded && (
          <div className="flex-1">
            <p className="text-sm text-gray-900">홍길동</p>
            <p className="text-xs text-gray-500">MR 전문가</p>
          </div>
        )}
      </div>
    </div>
  );
}