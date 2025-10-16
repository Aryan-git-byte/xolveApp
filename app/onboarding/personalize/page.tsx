"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/Toast";

type QuestionType = "buttons" | "date" | "multi-select";

interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which grade are you in?",
    type: "buttons",
    options: ["4th", "5th", "6th", "7th", "8th", "9th", "10th", "Other"]
  },
  {
    id: 2,
    question: "When's your birthday?",
    type: "date",
    placeholder: "Select your date of birth"
  },
  {
    id: 3,
    question: "What interests you the most?",
    type: "multi-select",
    options: ["🤖 Robotics", "⚡ Electronics", "💻 Coding", "🔬 Science Experiments", "🚀 Space", "💡 Innovation", "✨ All of them"]
  },
  {
    id: 4,
    question: "What's your current goal?",
    type: "buttons",
    options: ["Learn basics", "Build cool projects", "Join competitions", "Start innovating", "Not sure yet"]
  },
  {
    id: 5,
    question: "How do you like to learn?",
    type: "buttons",
    options: ["📺 Videos", "📚 Reading + practice", "🔧 Hands-on building", "🎮 Challenges & games"]
  }
];

export default function PersonalizePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [dateInput, setDateInput] = useState("");
  const [showTransition, setShowTransition] = useState(false);
  const nickname = typeof window !== 'undefined' ? localStorage.getItem('xolve_nickname') || "Student" : "Student";
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (answer: string | string[]) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleInterestToggle = (interest: string) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    setSelectedInterests(newInterests);
  };

  const handleContinue = () => {
    if (currentQuestion.type === "multi-select") {
      handleAnswer(selectedInterests);
    } else if (currentQuestion.type === "date") {
      handleAnswer(dateInput);
      if (currentStep < questions.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 300);
      }
    }
    
    // On last question completion, show transition message
    if (currentStep === questions.length - 1) {
      // Save preferences to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('xolve_preferences', JSON.stringify(answers));
      }
      
      // Update user profile with onboarding completion
      updateOnboardingStatus();
      
      showToast("Preferences saved! 🎉 Setting up your account...", "success", 3000);
      setShowTransition(true);
      setTimeout(() => {
        router.push("/signup");
      }, 3000);
    }
  };

  const updateOnboardingStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Mark onboarding as completed
        await supabase
          .from('user_profiles')
          .update({ has_completed_onboarding: true })
          .eq('id', user.id);
        
        showToast("Onboarding completed successfully! ✨", "success");
      }
    } catch (error) {
      console.error('Error updating onboarding status:', error);
    }
  };

  const progressWidth = `${progress}%`;

  if (showTransition) {
    return (
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10 text-center max-w-md space-y-6 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
              <span className="text-5xl">🤖</span>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-4">
            <h1 className="text-3xl font-bold text-white">Awesome, {nickname}! 🎉</h1>
            <p className="text-xl text-blue-100">
              I've saved your preferences.
            </p>
            <p className="text-lg text-blue-200">
              Now, let's get your personal XolveTech account ready — so you can track your XP, badges, and kits.
            </p>
            <div className="pt-4">
              <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md mx-auto mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-blue-100 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <span className="text-blue-100 text-sm font-medium">Question {currentStep + 1} of {questions.length}</span>
          </div>
          <span className="text-blue-200 text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-blue-800/50 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 ease-out rounded-full progress-bar`}
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 text-center mb-8">
        <div className="inline-block mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-4xl">🤖</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Hi {nickname}!</h1>
        <p className="text-blue-100">Answer a few questions so I can customize your journey</p>
      </div>

      <div className="relative z-10 flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === "buttons" && currentQuestion.options && (
              <div className="space-y-3">
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 ${
                        answers[currentQuestion.id] === option
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                          : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {currentStep === questions.length - 1 && answers[currentQuestion.id] && (
                  <button
                    onClick={handleContinue}
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 shadow-lg mt-2"
                  >
                    Complete Setup 🎉
                  </button>
                )}
              </div>
            )}

            {currentQuestion.type === "date" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="birthday-input" className="block text-sm font-semibold text-blue-600 text-center">
                    MM/DD/YYYY
                  </label>
                  <div className="relative">
                    <input
                      id="birthday-input"
                      type="date"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      min="2003-01-01"
                      max="2020-12-31"
                      aria-label="Birthday"
                      className="w-full px-4 py-4 bg-blue-50 text-blue-900 text-lg font-semibold rounded-2xl border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all appearance-none"
                      style={{ colorScheme: 'light' }}
                    />
                    {!dateInput && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-blue-400">
                        Tap to select date
                      </div>
                    )}
                  </div>
                </div>
                {dateInput && (
                  <button
                    onClick={handleContinue}
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 shadow-lg"
                  >
                    Continue →
                  </button>
                )}
              </div>
            )}

            {currentQuestion.type === "multi-select" && currentQuestion.options && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleInterestToggle(option)}
                      className={`px-4 py-4 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                        selectedInterests.includes(option)
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                          : "bg-blue-50 text-blue-900 hover:bg-blue-100"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {selectedInterests.length > 0 && (
                  <button
                    onClick={handleContinue}
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 shadow-lg mt-4"
                  >
                    Continue →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-2 mt-6 mb-4">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentStep 
                ? "w-8 bg-orange-500" 
                : index < currentStep 
                ? "w-2 bg-green-500" 
                : "w-2 bg-blue-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}