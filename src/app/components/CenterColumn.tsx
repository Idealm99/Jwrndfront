import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';

export function CenterColumn() {
  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto">
      <h2 className="text-gray-900 mb-4">신약 개발 프로젝트 정보</h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6 bg-white border border-gray-200">
          <TabsTrigger value="overview">프로젝트 개요</TabsTrigger>
          <TabsTrigger value="clinical">임상 단계</TabsTrigger>
          <TabsTrigger value="mechanism">작용 기전</TabsTrigger>
          <TabsTrigger value="risk">리스크 및 과제</TabsTrigger>
          <TabsTrigger value="opinion">연구팀 의견</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-700">1. 프로젝트 개요</h3>
            </div>
            <Textarea
              className="min-h-[120px] resize-none bg-white border border-gray-300"
              defaultValue="혁신적인 면역항암제 개발 프로젝트입니다. 기존 PD-1 억제제와 차별화된 이중 표적 기전을 통해 고형암 치료 효과를 극대화하는 것을 목표로 합니다. 현재 임상 2상 진행 중이며, 초기 데이터에서 유의미한 반응률을 보이고 있습니다."
            />
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-700">2. 개발 전략</h3>
            </div>
            <div className="bg-white p-3 rounded border border-gray-300">
              <p className="text-sm text-gray-600 mb-3">
                주요 개발 집중 분야 및 핵심 전략:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-[#4A90E2]">1.</span>
                  <span>PD-L1과 CTLA-4 이중 표적 억제 기전을 통한 면역 활성화</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#4A90E2]">2.</span>
                  <span>바이오마커 기반 환자 선별로 반응률 향상 및 안전성 확보</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#4A90E2]">3.</span>
                  <span>대장암, 비소세포폐암, 위암 등 다양한 적응증 확대 계획</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#4A90E2]">4.</span>
                  <span>글로벌 임상 네트워크 구축을 통한 신속한 환자 모집 및 데이터 확보</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-700">임상 개발 현황</h3>
            </div>
            <Textarea
              className="min-h-[200px] resize-none bg-white"
              defaultValue="• 임상 1상: 완료 (2022년 3월) - 안전성 및 내약성 확인
• 임상 2a상: 진행 중 (2023년 6월~) - 용량 최적화 단계
• 임상 2b상: 계획 중 (2025년 1분기 예정) - 효능 검증 단계
• 임상 3상: 2026년 하반기 목표 - 허가 신청용 pivotal study"
            />
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-gray-700">주요 임상 지표</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#4A90E2]">•</span>
                <span>객관적 반응률(ORR): 42% (임상 2a상 중간 분석)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#4A90E2]">•</span>
                <span>질병 조절률(DCR): 78%</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#4A90E2]">•</span>
                <span>무진행생존기간(PFS): 중앙값 9.2개월</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#4A90E2]">•</span>
                <span>Grade 3 이상 이상반응 발생률: 18% (관리 가능한 수준)</span>
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="mechanism">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm text-gray-700 mb-3">작용 기전 (Mechanism of Action)</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong className="text-gray-900">1. 이중 면역 체크포인트 억제:</strong><br/>
                PD-L1과 CTLA-4를 동시에 차단하여 T세포 활성화를 극대화합니다. 단일 표적 억제제 대비 시너지 효과가 있습니다.
              </p>
              <p>
                <strong className="text-gray-900">2. 종양 미세환경 개선:</strong><br/>
                면역 억제 세포(Treg, MDSC)의 기능을 억제하고, 효과기 T세포의 종양 침투를 증가시킵니다.
              </p>
              <p>
                <strong className="text-gray-900">3. 바이오마커 연계 치료:</strong><br/>
                PD-L1 발현 수준과 TMB(Tumor Mutational Burden)를 기반으로 반응 가능성이 높은 환자를 선별합니다.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="risk">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm text-gray-700 mb-3">주요 리스크 및 과제</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm font-medium text-red-900 mb-1">고위험: 면역 관련 이상반응 관리</p>
                <p className="text-xs text-red-700">자가면역 부작용(간염, 폐렴 등) 발생 가능성. 환자 모니터링 프로토콜 강화 필요.</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm font-medium text-yellow-900 mb-1">중위험: 경쟁 제품 출시</p>
                <p className="text-xs text-yellow-700">유사 기전의 경쟁 신약들이 임상 개발 중. 차별화된 데이터 확보가 중요.</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm font-medium text-blue-900 mb-1">기회: 병용요법 확대</p>
                <p className="text-xs text-blue-700">표준 화학요법과의 병용 전략을 통해 적응증 확대 가능성 높음.</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="opinion">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm text-gray-700 mb-3">연구개발팀 평가 및 권고사항</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong className="text-[#4A90E2]">✓ 긍정적 평가:</strong><br/>
                임상 2a상 중간 분석 결과가 예상을 상회하는 수준입니다. 특히 바이오마커 양성 환자군에서 60% 이상의 반응률을 보여 블록버스터 가능성을 확인했습니다.
              </p>
              <p>
                <strong className="text-yellow-600">⚠ 주의사항:</strong><br/>
                면역 관련 이상반응 관리 프로토콜을 더욱 정교화해야 합니다. 임상 3상 진입 전 안전성 데이터를 충분히 축적하는 것이 중요합니다.
              </p>
              <p>
                <strong className="text-green-600">→ 권고사항:</strong><br/>
                - 임상 2b상을 신속하게 진행하여 효능 데이터 확보<br/>
                - 글로벌 제약사와의 라이센싱 협상 준비<br/>
                - 추가 적응증(위암, 간암) 탐색 임상 개시
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
