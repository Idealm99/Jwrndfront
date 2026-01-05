import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LeftColumn } from './components/LeftColumn';
import { CenterColumn } from './components/CenterColumn';
import { RightColumn } from './components/RightColumn';
import { PromptHub } from './components/PromptHub';
import { AIChat } from './components/AIChat';
import { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('consultation');

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeItem={currentPage} onNavigate={setCurrentPage} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header />

          {/* Content based on current page */}
          {currentPage === 'ai-chat' ? (
            <AIChat />
          ) : currentPage === 'prompts' ? (
            <PromptHub />
          ) : (
            /* Three Column Layout */
            <div className="flex-1 flex overflow-hidden">
              {/* Left Column - Reference Materials */}
              <LeftColumn />

              {/* Center Column - Main Content */}
              <CenterColumn />

              {/* Right Column - Risk Analysis */}
              <RightColumn />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}