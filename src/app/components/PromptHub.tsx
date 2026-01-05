import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Star, Copy, RefreshCw, Zap, Share2, Download, Trash2 } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUsed: string;
  isFavorite: boolean;
  author: string;
  template: string;
  variables: { name: string; placeholder: string }[];
}

const mockPrompts: Prompt[] = [
  {
    id: '1',
    title: '의사 프로필 분석',
    category: '병원 방문',
    description: '방문 예정 의사의 처방 성향과 선호도를 종합적으로 분석합니다.',
    lastUsed: '2024-01-03',
    isFavorite: true,
    author: '김MR',
    template: '다음 의사에 대한 프로필을 분석해주세요:\n\n의사명: [의사명]\n진료과: [진료과]\n병원: [병원명]\n주요 관심 질환: [관심질환]\n\n위 정보를 바탕으로 처방 성향, 추천 제품, 방문 전략을 작성해주세요.',
    variables: [
      { name: '의사명', placeholder: '예: 박주치' },
      { name: '진료과', placeholder: '예: 내과' },
      { name: '병원명', placeholder: '예: 서울대학교병원' },
      { name: '관심질환', placeholder: '예: 당뇨, 고혈압' },
    ],
  },
  {
    id: '2',
    title: '제품 비교 자료 생성',
    category: '제품 소개',
    description: '자사 제품과 경쟁사 제품을 비교하는 상세 자료를 생성합니다.',
    lastUsed: '2024-01-02',
    isFavorite: false,
    author: '이제약',
    template: '자사 제품: [자사제품명]\n경쟁사 제품: [경쟁제품명]\n비교 항목: [비교항목]\n\n제품 비교 분석 자료를 작성해주세요.',
    variables: [
      { name: '자사제품명', placeholder: '예: 메디신A 정' },
      { name: '경쟁제품명', placeholder: '예: 경쟁약B 정' },
      { name: '비교항목', placeholder: '예: 효능, 안전성, 가격' },
    ],
  },
  {
    id: '3',
    title: '임상 데이터 요약',
    category: '학술 정보',
    description: '최신 임상 연구 데이터를 의사가 이해하기 쉽게 요약합니다.',
    lastUsed: '2024-01-01',
    isFavorite: true,
    author: '박학술',
    template: '제품명: [제품명]\n임상 시험명: [임상시험명]\n주요 결과: [주요결과]\n\n임상 데이터를 의사용 요약 자료로 작성해주세요.',
    variables: [
      { name: '제품명', placeholder: '예: 신약X' },
      { name: '임상시험명', placeholder: '예: Phase III 다기관 연구' },
      { name: '주요결과', placeholder: '예: 유효성 85%, 이상반응 5%' },
    ],
  },
  {
    id: '4',
    title: '부작용 대응 가이드',
    category: '의약 안전',
    description: '의사가 문의하는 부작용에 대한 대응 방법을 제시합니다.',
    lastUsed: '2023-12-28',
    isFavorite: false,
    author: '최안전',
    template: '제품명: [제품명]\n부작용 증상: [부작용증상]\n환자 정보: [환자정보]\n\n부작용 대응 가이드를 작성해주세요.',
    variables: [
      { name: '제품명', placeholder: '예: 항생제Z' },
      { name: '부작용증상', placeholder: '예: 소화불량, 두통' },
      { name: '환자정보', placeholder: '예: 60세 여성, 고혈압 병력' },
    ],
  },
];

const mockResult = `# 의사 프로필 분석 결과

## 1. 의사 기본 정보
- **의사명**: 박주치
- **진료과**: 내과
- **병원**: 서울대학교병원
- **주요 관심 질환**: 당뇨, 고혈압

## 2. 처방 성향 분석

### 종합 평가
박주치 교수는 **근거 기반 의학**을 중시하는 보수적 처방 성향을 보입니다.

### 주요 특징
- ✅ 임상 데이터와 가이드라인 중시
- ✅ 환자 순응도를 고려한 처방
- ⚠️ 신약보다 검증된 약물 선호
- ⚠️ 약물 상호작용에 민감

## 3. 추천 제품 및 접근 전략

| 제품군 | 추천도 | 접근 포인트 |
|--------|--------|------------|
| **당뇨 신약** | ⭐⭐⭐⭐⭐ | 최신 임상 데이터 강조 |
| **고혈압 복합제** | ⭐⭐⭐⭐ | 환자 순응도 개선 효과 |
| **이상지질혈증** | ⭐⭐⭐ | 장기 안전성 데이터 제시 |

## 4. 방문 전략

1. **학술 중심 접근**
   - 최신 국내외 임상 연구 자료 준비
   - 가이드라인 근거 강조

2. **환자 중심 가치 제안**
   - 환자 순응도 개선 사례
   - 삶의 질 향상 데이터

3. **정기적인 학술 정보 제공**
   - 분기별 업데이트 자료 전달
   - 학회 참석 후 정보 공유

## 5. 주의사항 및 권고사항

⚠️ **핵심 주의사항**
- 과도한 마케팅 지양, 학술적 접근 필수
- 부작용 정보 투명하게 공유
- 약물 상호작용 자료 항상 준비

💡 **추가 권고사항**
- 환자 사례 중심 대화 준비
- 경쟁사 제품 대비 객관적 우위 자료
- 병원 학술 세미나 지원 제안`;

export function PromptHub() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(mockPrompts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [streamedResult, setStreamedResult] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // Streaming effect
  useEffect(() => {
    if (!showResult || !isStreaming) {
      return;
    }

    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < mockResult.length) {
        setStreamedResult(mockResult.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsStreaming(false);
        clearInterval(streamInterval);
      }
    }, 15); // 15ms per character for smooth streaming

    return () => clearInterval(streamInterval);
  }, [showResult, isStreaming]);

  const filteredPrompts = mockPrompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRunPrompt = () => {
    setShowResult(true);
    setStreamedResult('');
    setIsStreaming(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '병원 방문': 'bg-blue-100 text-blue-700',
      '제품 소개': 'bg-green-100 text-green-700',
      '학술 정보': 'bg-purple-100 text-purple-700',
      '의약 안전': 'bg-red-100 text-red-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-gray-50">
      {/* Left Panel - Prompt Explorer (35%) */}
      <div className="w-[35%] bg-white border-r border-gray-200 flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="프롬프트 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} className="text-gray-600" />
            </button>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7BC8] transition-colors">
            <Plus size={18} />
            <span>새 프롬프트 만들기</span>
          </button>
        </div>

        {/* Prompt List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                onClick={() => {
                  setSelectedPrompt(prompt);
                  setShowResult(false);
                  setVariables({});
                }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPrompt.id === prompt.id
                    ? 'border-[#4A90E2] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{prompt.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="shrink-0"
                  >
                    <Star
                      size={16}
                      className={prompt.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                    />
                  </button>
                </div>
                <span className={`inline-block px-2 py-1 rounded text-xs mb-2 ${getCategoryColor(prompt.category)}`}>
                  {prompt.category}
                </span>
                <p className="text-sm text-gray-600 mb-2">{prompt.description}</p>
                <p className="text-xs text-gray-500">마지막 사용: {prompt.lastUsed}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Editor & Result (65%) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl text-gray-900">{selectedPrompt.title}</h2>
              <p className="text-sm text-gray-500">작성자: {selectedPrompt.author}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Share2 size={16} />
                <span className="text-sm">공유</span>
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download size={16} />
                <span className="text-sm">내보내기</span>
              </button>
              <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
                <Trash2 size={16} />
                <span className="text-sm">삭제</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Prompt Editor Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">프롬프트 템플릿</h3>
              <textarea
                value={selectedPrompt.template}
                readOnly
                className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm resize-none focus:outline-none"
              />
            </div>

            {/* Variables Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">변수 입력</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedPrompt.variables.map((variable) => (
                  <div key={variable.name}>
                    <label className="block text-sm text-gray-700 mb-2">{variable.name}</label>
                    <input
                      type="text"
                      placeholder={variable.placeholder}
                      value={variables[variable.name] || ''}
                      onChange={(e) =>
                        setVariables({ ...variables, [variable.name]: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Run Button */}
            <div className="flex justify-center">
              <button
                onClick={handleRunPrompt}
                className="px-8 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7BC8] transition-colors flex items-center gap-2 shadow-lg"
              >
                <Zap size={20} />
                <span className="font-medium">프롬프트 실행</span>
              </button>
            </div>

            {/* Result Section */}
            {showResult && (
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700">실행 결과</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                      <Copy size={14} />
                      <span>복사</span>
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                      <RefreshCw size={14} />
                      <span>재생성</span>
                    </button>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none bg-white rounded-lg p-6 border border-gray-200">
                  <div
                    className="text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: streamedResult
                        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-gray-900">$1</h1>')
                        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-6 mb-3 text-gray-900">$1</h2>')
                        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-800">$1</h3>')
                        .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                        .replace(/\n\n/g, '<br><br>')
                        .replace(/✅/g, '<span class="text-green-600">✅</span>')
                        .replace(/⚠️/g, '<span class="text-yellow-600">⚠️</span>')
                        .replace(/💡/g, '<span class="text-blue-600">💡</span>')
                        .replace(/⭐/g, '<span class="text-yellow-500">⭐</span>'),
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
