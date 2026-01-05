import { Plus, ChevronDown } from 'lucide-react';
import { Badge } from './ui/badge';

export function LeftColumn() {
  const documents = [
    { id: 1, name: '임상시험 프로토콜 v3.2', date: '2024.12.07' },
    { id: 2, name: 'IND 제출 자료 패키지', date: '2024.11.15' },
    { id: 3, name: 'DSMB 회의록', date: '2024.10.28' },
  ];

  const products = [
    { 
      id: 1, 
      name: 'IMX-2401 (면역항암제)', 
      category: '임상 2a상',
      riskLevel: '고위험',
      riskColor: 'red' 
    },
    { 
      id: 2, 
      name: 'NEU-7788 (신경퇴행성 질환)', 
      category: '임상 1b상',
      riskLevel: '중위험',
      riskColor: 'yellow' 
    },
    { 
      id: 3, 
      name: 'CAR-5501 (심혈관 질환)', 
      category: '전임상',
      riskLevel: '저위험',
      riskColor: 'green' 
    },
  ];

  const getBadgeVariant = (color: string) => {
    switch (color) {
      case 'red':
        return 'destructive';
      case 'yellow':
        return 'default';
      case 'green':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-gray-900 mb-4">참조 자료</h2>

      {/* Common Documents */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-gray-700">공통 문서</h3>
          <button className="text-[#4A90E2] hover:text-[#3A7BC8]">
            <Plus size={16} />
          </button>
        </div>
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-3 rounded-lg border border-gray-200 hover:border-[#4A90E2] cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-gray-700">개발 파이프라인</h3>
          <button className="text-[#4A90E2] hover:text-[#3A7BC8]">
            <Plus size={16} />
          </button>
        </div>
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-3 rounded-lg border border-gray-200 hover:border-[#4A90E2] cursor-pointer transition-colors"
            >
              <div className="mb-2">
                <Badge 
                  variant={getBadgeVariant(product.riskColor)}
                  className="text-xs"
                >
                  {product.riskLevel}
                </Badge>
              </div>
              <p className="text-sm text-gray-900 mb-1">{product.name}</p>
              <p className="text-xs text-gray-500">{product.category}</p>
              <div className="mt-2 flex items-center gap-2">
                <button className="text-xs text-[#4A90E2] hover:underline">
                  자세히 보기
                </button>
                <button className="text-xs text-[#4A90E2] hover:underline flex items-center gap-1">
                  추가
                  <ChevronDown size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
