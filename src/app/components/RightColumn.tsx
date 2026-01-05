import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function RightColumn() {
  const riskItems = [
    {
      id: 1,
      status: 'high',
      title: '임상시험 모니터링 필요',
      description: '임상 2a상 중간분석 시점입니다. DSMB(안전성모니터링위원회) 보고서 검토 및 후속 조치가 필요합니다.',
      badge: '긴급',
    },
    {
      id: 2,
      status: 'high',
      title: '규제 당국 문의 대응',
      description: 'FDA로부터 추가 비임상 독성 데이터 요청이 있었습니다. 2주 내 답변 제출 기한을 준수해야 합니다.',
      badge: '조치 필요',
    },
    {
      id: 3,
      status: 'medium',
      title: '특허 출원 진행 중',
      description: '신규 바이오마커 조합에 대한 특허 출원이 진행 중입니다. IP팀과 협업하여 클레임 범위를 최종 검토하세요.',
      badge: '중간 우선순위',
    },
    {
      id: 4,
      status: 'low',
      title: 'IRB 승인 완료',
      description: '모든 참여 기관의 임상시험심사위원회(IRB) 승인이 완료되었습니다. 환자 모집을 시작할 수 있습니다.',
      badge: '승인됨',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'medium':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'low':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'border-l-4 border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-4 border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-4 border-l-green-500 bg-green-50';
      default:
        return '';
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-900">프로젝트 알림</h2>
        <Badge variant="outline" className="text-xs">
          4개 항목
        </Badge>
      </div>

      <div className="space-y-3">
        {riskItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg p-4 ${getStatusColor(item.status)}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="mt-0.5">{getStatusIcon(item.status)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm text-gray-900">{item.title}</h3>
                  <Badge variant={getBadgeVariant(item.status)} className="text-xs ml-2">
                    {item.badge}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-[#4A90E2] border-[#4A90E2] hover:bg-[#4A90E2] hover:text-white"
            >
              세부사항 보기
            </Button>
          </div>
        ))}
      </div>

      {/* Risk Summary Section */}
      <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm text-gray-900 mb-3">알림 요약</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">긴급 조치 필요</span>
            <span className="text-xs text-red-600">2</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">중간 우선순위</span>
            <span className="text-xs text-yellow-600">1</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">완료/승인됨</span>
            <span className="text-xs text-green-600">1</span>
          </div>
        </div>
      </div>

      {/* Project Metrics */}
      <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm text-gray-900 mb-3">프로젝트 진행률</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>임상 2a상 진행률</span>
              <span>68%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#4A90E2] h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>환자 모집 달성률</span>
              <span>45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>데이터 품질 점수</span>
              <span>92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}