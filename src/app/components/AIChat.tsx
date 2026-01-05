import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

      {/* Right Panel - Suggested Questions */}
      <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-gray-900 mb-4">추천 질문</h2>
        
        <div className="space-y-2">
          <button
            onClick={() => setInput('현재 임상시험 진행 상황을 알려주세요')}
            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#4A90E2] hover:bg-blue-50 transition-colors text-sm text-gray-700"
          >
            현재 임상시험 진행 상황을 알려주세요
          </button>
          <button
            onClick={() => setInput('FDA 규제 요구사항은 무엇인가요?')}
            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#4A90E2] hover:bg-blue-50 transition-colors text-sm text-gray-700"
          >
            FDA 규제 요구사항은 무엇인가요?
          </button>
          <button
            onClick={() => setInput('시장 분석 결과를 요약해주세요')}
            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#4A90E2] hover:bg-blue-50 transition-colors text-sm text-gray-700"
          >
            시장 분석 결과를 요약해주세요
          </button>
          <button
            onClick={() => setInput('특허 출원 진행 상황은 어떻게 되나요?')}
            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#4A90E2] hover:bg-blue-50 transition-colors text-sm text-gray-700"
          >
            특허 출원 진행 상황은 어떻게 되나요?
          </button>
          <button
            onClick={() => setInput('안전성 모니터링 현황을 알려주세요')}
            className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#4A90E2] hover:bg-blue-50 transition-colors text-sm text-gray-700"
          >
            안전성 모니터링 현황을 알려주세요
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm text-gray-900 mb-2">💡 도움말</h3>
          <p className="text-xs text-gray-600">
            임상시험, 규제 준수, 시장 분석, 특허 전략 등 신약 개발 전반에 대해 질문하실 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
