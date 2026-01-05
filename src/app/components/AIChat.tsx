import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MCPTool {
  id: string;
  name: string;
  description: string;
  input: string;
  output: string;
  url: string;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: '안녕하세요! 저는 신약 개발 AI 어시스턴트입니다. 임상시험, 규제 준수, 시장 분석 등에 대해 도움을 드릴 수 있습니다. 무엇을 도와드릴까요?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTool, setSelectedTool] = useState<MCPTool | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mcpTools: MCPTool[] = [
    {
      id: '1',
      name: 'Clinical Trial Data Analyzer',
      description: '임상시험 데이터를 분석하고 통계적 유의성을 평가합니다',
      input: 'JSON 형식의 임상시험 데이터 (환자 ID, 측정값, 시점 등)',
      output: '통계 분석 결과, p-value, 신뢰구간, 그래프 데이터',
      url: 'https://api.clinicaltools.com/v1/analyze',
    },
    {
      id: '2',
      name: 'FDA Regulatory Checker',
      description: 'FDA 규제 요구사항 준수 여부를 확인합니다',
      input: '제출 문서 종류, 적응증, 임상 단계',
      output: '필수 문서 체크리스트, 미비 항목, 제출 가이드라인',
      url: 'https://api.fdatools.com/v2/compliance',
    },
    {
      id: '3',
      name: 'Safety Signal Detector',
      description: '이상반응 데이터에서 안전성 신호를 탐지합니다',
      input: '이상반응 보고서 데이터 (MedDRA 코드, 중증도, 인과관계)',
      output: '안전성 신호 목록, 위험도 점수, DSMB 보고용 요약',
      url: 'https://api.safetysignal.com/v1/detect',
    },
    {
      id: '4',
      name: 'Patent Landscape Analyzer',
      description: '특허 환경을 분석하고 자유실시 가능성을 평가합니다',
      input: '화합물 구조, 적응증, 작용기전',
      output: '관련 특허 목록, FTO 분석 결과, 회피 설계 제안',
      url: 'https://api.patentanalytics.com/v1/landscape',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('임상') || lowerInput.includes('clinical')) {
      return '임상시험과 관련하여 현재 IMX-2401의 임상 2a상이 진행 중입니다. 환자 모집률은 45%이며, 중간분석 시점이 다가오고 있습니다. DSMB 보고서 검토가 필요한 상황입니다. 추가로 궁금하신 사항이 있으신가요?';
    } else if (lowerInput.includes('규제') || lowerInput.includes('fda') || lowerInput.includes('허가')) {
      return 'FDA로부터 추가 비임상 독성 데이터 요청을 받았습니다. 2주 내 답변을 제출해야 하며, IND 제출 자료 패키지를 업데이트해야 합니다. 규제 당국과의 커뮤니케이션은 매우 중요하니 신속하게 대응하는 것이 좋습니다.';
    } else if (lowerInput.includes('시장') || lowerInput.includes('market')) {
      return '현재 면역항암제 시장은 연평균 12.5% 성장하고 있으며, 2030년까지 약 250억 달러 규모로 예상됩니다. IMX-2401의 타겟 적응증은 경쟁이 치열하지만, 차별화된 기전으로 시장 진입 기회가 있습니다.';
    } else if (lowerInput.includes('특허') || lowerInput.includes('patent')) {
      return '신규 바이오마커 조합에 대한 특허 출원이 진행 중입니다. IP팀과 협업하여 클레임 범위를 최종 검토하고 있으며, 경쟁사 특허 분석도 함께 진행하고 있습니다. 특허 전략은 신약 개발의 핵심 요소입니다.';
    } else if (lowerInput.includes('안전성') || lowerInput.includes('safety')) {
      return '안전성 모니터링은 임상시험의 최우선 과제입니다. 현재까지 중대한 이상반응은 보고되지 않았으나, DSMB의 정기적인 검토와 실시간 안전성 데이터 분석이 계속 진행되고 있습니다.';
    } else {
      return '네, 이해했습니다. 신약 개발과 관련하여 임상시험, 규제 준수, 시장 분석, 특허 전략 등 다양한 분야에서 도움을 드릴 수 있습니다. 구체적으로 어떤 부분에 대해 더 알고 싶으신가요?';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-white">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#4A90E2] flex items-center justify-center flex-shrink-0">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              
              <div
                className={`max-w-2xl rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString('ko-KR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-gray-600" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#4A90E2] flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="max-w-2xl rounded-lg p-4 bg-gray-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 bg-[#4A90E2] hover:bg-[#3A7BC8] text-white"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - MCP Server Tools */}
      <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-gray-900 mb-4">MCP 서버</h2>
        
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <div className="space-y-2">
            {mcpTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 bg-white hover:border-[#4A90E2] hover:bg-blue-50 transition-colors"
              >
                <p className="text-sm text-gray-900 mb-1">{tool.name}</p>
                <p className="text-xs text-gray-500">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={() => setSelectedTool(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl text-gray-900">{selectedTool.name}</h2>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-4">{selectedTool.description}</p>
              </div>

              {/* Input Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm text-gray-900 mb-2">📥 Input</h3>
                <p className="text-sm text-gray-700">{selectedTool.input}</p>
              </div>

              {/* Output Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm text-gray-900 mb-2">📤 Output</h3>
                <p className="text-sm text-gray-700">{selectedTool.output}</p>
              </div>

              {/* URL Section */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="text-sm text-gray-900 mb-2 flex items-center gap-2">
                  <ExternalLink size={16} />
                  API URL
                </h3>
                <a
                  href={selectedTool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#4A90E2] hover:underline break-all"
                >
                  {selectedTool.url}
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button
                onClick={() => setSelectedTool(null)}
                variant="outline"
                className="text-gray-700"
              >
                닫기
              </Button>
              <Button
                onClick={() => {
                  window.open(selectedTool.url, '_blank');
                }}
                className="bg-[#4A90E2] hover:bg-[#3A7BC8] text-white"
              >
                API 문서 보기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}