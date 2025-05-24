import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, TrendingUp, Users, Target, Zap, ArrowRight, Clock, DollarSign, BarChart3, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PainPoint {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  severity: number;
  impact: 'high' | 'medium' | 'low';
  timeToFix: string;
  roi: string;
  symptoms: string[];
}

interface DiagnosticStep {
  step: number;
  title: string;
  description: string;
}

export function CorporateDiagnosticSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [severityScores, setSeverityScores] = useState<Record<string, number>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [diagnosisComplete, setDiagnosisComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('corporate-diagnostic');
    if (section) observer.observe(section);
    return () => { if (section) observer.unobserve(section); };
  }, []);

  const painPoints: PainPoint[] = [
    {
      id: 'bureaucracy',
      title: 'Bureaucratic Bottlenecks',
      description: 'Feature requests disappear into committee black holes, taking 6 months for a button color change',
      icon: <Users className="text-red-400" size={24} />,
      severity: 0,
      impact: 'high',
      timeToFix: '2-4 weeks',
      roi: '300% efficiency gain',
      symptoms: ['Endless approval chains', 'Feature requests in limbo', 'Frustrated team leads']
    },
    {
      id: 'data-paralysis',
      title: 'Data Analysis Paralysis',
      description: 'Mountains of data, zero actionable insights. Analytics teams that report but never recommend',
      icon: <BarChart3 className="text-orange-400" size={24} />,
      severity: 0,
      impact: 'high',
      timeToFix: '1-3 weeks',
      roi: '250% decision speed',
      symptoms: ['Dashboard overload', 'Analysis paralysis', 'Gut-feeling decisions']
    },
    {
      id: 'roadmap-theater',
      title: 'Product Roadmap Theater',
      description: 'Quarterly planning sessions that produce beautiful slides but no actual progress',
      icon: <Target className="text-yellow-400" size={24} />,
      severity: 0,
      impact: 'medium',
      timeToFix: '3-6 weeks',
      roi: '180% alignment',
      symptoms: ['Misaligned priorities', 'Customer complaints', 'Internal finger-pointing']
    },
    {
      id: 'innovation-theater',
      title: 'Innovation Theater',
      description: 'Hack weeks and innovation labs that never ship anything to production',
      icon: <Lightbulb className="text-blue-400" size={24} />,
      severity: 0,
      impact: 'medium',
      timeToFix: '4-8 weeks',
      roi: '200% innovation velocity',
      symptoms: ['Brainstorm fatigue', 'Prototype graveyards', 'Innovation without execution']
    }
  ];

  const diagnosticSteps: DiagnosticStep[] = [
    {
      step: 0,
      title: 'Welcome to Your Diagnostic',
      description: 'Let\'s identify what\'s really blocking your progress and how to bypass it'
    },
    {
      step: 1,
      title: 'Pain Point Assessment',
      description: 'Select the organizational issues that sound familiar'
    },
    {
      step: 2,
      title: 'Severity Analysis',
      description: 'Rate how much each selected issue is impacting your ability to ship'
    },
    {
      step: 3,
      title: 'Your Personalized Solution',
      description: 'Here\'s your roadmap for working around the system'
    }
  ];

  const handlePainPointToggle = (painPointId: string) => {
    setSelectedPainPoints(prev => 
      prev.includes(painPointId) 
        ? prev.filter(id => id !== painPointId)
        : [...prev, painPointId]
    );
  };

  const handleSeverityChange = (painPointId: string, severity: number) => {
    setSeverityScores(prev => ({ ...prev, [painPointId]: severity }));
  };

  const calculateOverallScore = () => {
    const scores = Object.values(severityScores);
    return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  };

  const getRecommendation = () => {
    const score = calculateOverallScore();
    const criticalIssues = selectedPainPoints.length;
    
    if (score >= 8 || criticalIssues >= 3) {
      return {
        urgency: 'Critical',
        timeline: '2-4 weeks',
        approach: 'Emergency Bypass Protocol',
        description: 'Your organization needs immediate intervention. We\'ll create parallel channels to get critical work done while the formal processes catch up.',
        roi: '300-500%',
        color: 'red'
      };
    } else if (score >= 6 || criticalIssues >= 2) {
      return {
        urgency: 'High',
        timeline: '1-2 months',
        approach: 'Strategic Edge Work',
        description: 'We\'ll identify the organizational boundaries where you have more freedom and build momentum from the edges.',
        roi: '200-300%',
        color: 'orange'
      };
    } else {
      return {
        urgency: 'Moderate',
        timeline: '2-3 months',
        approach: 'Gradual System Enhancement',
        description: 'We\'ll work within existing structures while introducing new patterns that gradually improve efficiency.',
        roi: '150-200%',
        color: 'yellow'
      };
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 2) {
      setDiagnosisComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const recommendation = diagnosisComplete ? getRecommendation() : null;

  return (
    <div id="corporate-diagnostic" className="relative min-h-[700px] p-6 bg-slate-900 overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[url('/images/blueprint-grid.svg')] opacity-10" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Corporate Bureaucracy Bypass Diagnostic
          </h2>
          <p className="text-slate-300 text-lg">
            Identify your bottlenecks. Get your personalized workaround strategy.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {diagnosticSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                    currentStep >= index
                      ? "bg-blue-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  )}
                >
                  {index + 1}
                </div>
                {index < diagnosticSteps.length - 1 && (
                  <div
                    className={cn(
                      "w-16 h-1 mx-2 transition-all duration-300",
                      currentStep > index ? "bg-blue-500" : "bg-slate-700"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {currentStep === 0 && (
              <div className="bg-slate-800 rounded-lg p-8 text-center">
                <Zap className="text-blue-400 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-white mb-4">
                  {diagnosticSteps[0].title}
                </h3>
                <p className="text-slate-300 mb-6 text-lg">
                  {diagnosticSteps[0].description}
                </p>
                <p className="text-slate-400 mb-8">
                  This diagnostic will help you understand exactly where your organization is stuck 
                  and provide you with a custom strategy for getting things done despite the bureaucracy.
                </p>
                <button
                  onClick={nextStep}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Start Diagnostic
                </button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {diagnosticSteps[1].title}
                  </h3>
                  <p className="text-slate-300">
                    {diagnosticSteps[1].description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {painPoints.map((painPoint) => (
                    <motion.div
                      key={painPoint.id}
                      className={cn(
                        "bg-slate-800 rounded-lg p-6 cursor-pointer border-2 transition-all duration-200",
                        selectedPainPoints.includes(painPoint.id)
                          ? "border-blue-500 bg-slate-700"
                          : "border-slate-600 hover:border-slate-500"
                      )}
                      onClick={() => handlePainPointToggle(painPoint.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-3">
                        {painPoint.icon}
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">
                            {painPoint.title}
                          </h4>
                          <p className="text-slate-300 text-sm">
                            {painPoint.description}
                          </p>
                        </div>
                        {selectedPainPoints.includes(painPoint.id) && (
                          <CheckCircle className="text-blue-400" size={20} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && selectedPainPoints.length > 0 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {diagnosticSteps[2].title}
                  </h3>
                  <p className="text-slate-300">
                    {diagnosticSteps[2].description}
                  </p>
                </div>

                <div className="space-y-6">
                  {selectedPainPoints.map((painPointId) => {
                    const painPoint = painPoints.find(p => p.id === painPointId);
                    if (!painPoint) return null;

                    return (
                      <div key={painPointId} className="bg-slate-800 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          {painPoint.icon}
                          <h4 className="text-white font-semibold">
                            {painPoint.title}
                          </h4>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-slate-300 text-sm">
                            How severely is this blocking you? (1 = minor annoyance, 10 = business critical)
                          </label>
                          <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                              <button
                                key={score}
                                onClick={() => handleSeverityChange(painPointId, score)}
                                className={cn(
                                  "w-8 h-8 rounded-full text-sm font-bold transition-all",
                                  severityScores[painPointId] === score
                                    ? "bg-blue-500 text-white"
                                    : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                                )}
                              >
                                {score}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {currentStep === 3 && recommendation && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {diagnosticSteps[3].title}
                  </h3>
                </div>

                <div className="bg-slate-800 rounded-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle 
                        className={cn(
                          "w-8 h-8",
                          recommendation.color === 'red' && "text-red-400",
                          recommendation.color === 'orange' && "text-orange-400",
                          recommendation.color === 'yellow' && "text-yellow-400"
                        )} 
                      />
                      <div>
                        <h4 className="text-white font-bold text-lg">
                          {recommendation.urgency} Priority
                        </h4>
                        <p className="text-slate-300">
                          Recommended timeline: {recommendation.timeline}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">
                        {recommendation.roi} ROI
                      </div>
                      <div className="text-slate-400 text-sm">
                        Expected return
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-blue-400 font-semibold mb-2">
                        {recommendation.approach}
                      </h5>
                      <p className="text-slate-300">
                        {recommendation.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-slate-700 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="text-blue-400" size={16} />
                          <span className="text-white font-semibold">Phase 1</span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Immediate workarounds and quick wins
                        </p>
                      </div>
                      
                      <div className="bg-slate-700 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="text-green-400" size={16} />
                          <span className="text-white font-semibold">Phase 2</span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          System improvements and process optimization
                        </p>
                      </div>
                      
                      <div className="bg-slate-700 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="text-purple-400" size={16} />
                          <span className="text-white font-semibold">Phase 3</span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Long-term cultural and structural changes
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors mr-4">
                        Get My Custom Strategy
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentStep(0);
                          setSelectedPainPoints([]);
                          setSeverityScores({});
                          setDiagnosisComplete(false);
                        }}
                        className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {currentStep > 0 && currentStep < 3 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Previous
            </button>
            
            <button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && selectedPainPoints.length === 0) ||
                (currentStep === 2 && Object.keys(severityScores).length !== selectedPainPoints.length)
              }
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>
                {currentStep === 2 ? 'Get My Diagnosis' : 'Next'}
              </span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

interface PainPointAlternative {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timeToFix: string;
  roi: string;
  symptoms: string[];
  icon?: React.ReactNode;
  severity?: number;
}

export function CorporateDiagnosticSectionAlternative() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'diagnosis' | 'solution'>('intro');
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [assessmentProgress, setAssessmentProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    
    const section = document.getElementById('corporate-diagnostic');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  const painPoints: PainPointAlternative[] = [
    {
      id: 'bureaucracy',
      title: 'Bureaucratic Bottlenecks',
      description: 'Good ideas die in approval hell while competitors ship faster',
      impact: 'high',
      timeToFix: '2-4 weeks',
      roi: '300% efficiency gain',
      symptoms: ['Endless approval chains', 'Feature requests in limbo', 'Frustrated team leads']
    },
    {
      id: 'data-paralysis',
      title: 'Data Rich, Insight Poor',
      description: 'Drowning in metrics but starving for actionable intelligence',
      impact: 'high',
      timeToFix: '1-3 weeks',
      roi: '250% decision speed',
      symptoms: ['Dashboard overload', 'Analysis paralysis', 'Gut-feeling decisions']
    },
    {
      id: 'feature-roadmap',
      title: 'Roadmap Roulette',
      description: 'Sales promises features, engineering builds what they want',
      impact: 'medium',
      timeToFix: '3-6 weeks',
      roi: '180% alignment',
      symptoms: ['Misaligned priorities', 'Customer complaints', 'Internal finger-pointing']
    },
    {
      id: 'innovation-theater',
      title: 'Innovation Theater',
      description: 'Lots of ideation sessions, zero shipping of new ideas',
      impact: 'medium',
      timeToFix: '4-8 weeks',
      roi: '200% innovation velocity',
      symptoms: ['Brainstorm fatigue', 'Prototype graveyards', 'Innovation without execution']
    }
  ];

  const handlePainSelection = (painId: string) => {
    setSelectedPains(prev => 
      prev.includes(painId) 
        ? prev.filter(id => id !== painId)
        : [...prev, painId]
    );
  };

  const calculateSeverity = () => {
    const highImpactCount = selectedPains.filter(id => 
      painPoints.find(p => p.id === id)?.impact === 'high'
    ).length;
    
    if (highImpactCount >= 2) return 'critical';
    if (highImpactCount === 1 || selectedPains.length >= 3) return 'moderate';
    return 'manageable';
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'text-red-400',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          message: 'Critical dysfunction detected. Immediate intervention required.'
        };
      case 'moderate':
        return {
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          message: 'Moderate inefficiencies. Strategic optimization needed.'
        };
      default:
        return {
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          message: 'Manageable challenges. Focused improvements recommended.'
        };
    }
  };

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2">
        <Target className="text-blue-400" size={16} />
        <span className="text-blue-400 font-mono text-sm">ORGANIZATIONAL HEALTH CHECK</span>
      </div>
      
      <h2 className="text-3xl font-bold text-white">
        Is Your Organization <span className="text-blue-400">Secretly Broken?</span>
      </h2>
      
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        Most dysfunction hides behind metrics and meetings. Let's diagnose what's really 
        slowing you down and calculate the exact cost of doing nothing.
      </p>
      
      <motion.button
        onClick={() => setCurrentStep('assessment')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start 60-Second Diagnosis
      </motion.button>
    </motion.div>
  );

  const renderAssessment = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Select Your Pain Points</h3>
        <div className="text-sm text-gray-400">
          {selectedPains.length}/4 selected
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {painPoints.map((pain) => (
          <motion.div
            key={pain.id}
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all",
              selectedPains.includes(pain.id)
                ? "border-blue-500/50 bg-blue-500/10"
                : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
            )}
            onClick={() => handlePainSelection(pain.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                pain.impact === 'high' ? "bg-red-500/20 text-red-400" :
                pain.impact === 'medium' ? "bg-yellow-500/20 text-yellow-400" :
                "bg-green-500/20 text-green-400"
              )}>
                <AlertTriangle size={16} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">{pain.title}</h4>
                <p className="text-sm text-gray-400 mb-2">{pain.description}</p>
                
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-700 px-2 py-1 rounded">
                    {pain.impact.toUpperCase()} IMPACT
                  </span>
                </div>
              </div>
              
              {selectedPains.includes(pain.id) && (
                <CheckCircle className="text-blue-400" size={20} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {selectedPains.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setCurrentStep('diagnosis')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          Generate Diagnosis <ArrowRight size={16} />
        </motion.button>
      )}
    </motion.div>
  );

  const renderDiagnosis = () => {
    const severity = calculateSeverity();
    const config = getSeverityConfig(severity);
    const selectedPainDetails = painPoints.filter(p => selectedPains.includes(p.id));
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className={cn("border rounded-lg p-6", config.borderColor, config.bgColor)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={config.color} size={24} />
            <h3 className="text-xl font-bold text-white">Diagnosis: {severity.toUpperCase()}</h3>
          </div>
          
          <p className={cn("text-lg mb-6", config.color)}>
            {config.message}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-blue-400" size={16} />
                <span className="text-sm text-gray-400">Estimated Fix Time</span>
              </div>
              <p className="text-white font-medium">2-8 weeks</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-green-400" size={16} />
                <span className="text-sm text-gray-400">Potential ROI</span>
              </div>
              <p className="text-white font-medium">200-300% efficiency</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-yellow-400" size={16} />
                <span className="text-sm text-gray-400">Cost of Inaction</span>
              </div>
              <p className="text-white font-medium">$50K+ monthly</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white">Identified Issues</h4>
          {selectedPainDetails.map((pain) => (
            <div key={pain.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h5 className="font-medium text-white mb-2">{pain.title}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Time to fix:</span>
                  <span className="text-blue-400 ml-2">{pain.timeToFix}</span>
                </div>
                <div>
                  <span className="text-gray-400">Expected ROI:</span>
                  <span className="text-green-400 ml-2">{pain.roi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <motion.button
          onClick={() => setCurrentStep('solution')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          See How I Fix This <ArrowRight size={16} />
        </motion.button>
      </motion.div>
    );
  };

  const renderSolution = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
          <CheckCircle className="text-green-400" size={16} />
          <span className="text-green-400 font-mono text-sm">SOLUTION PROTOCOL</span>
        </div>
        
        <h3 className="text-2xl font-bold text-white">
          Here's How I'll <span className="text-green-400">Fix Your System</span>
        </h3>
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-medium text-white mb-4">My Outside-In Approach</h4>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              1
            </div>
            <div>
              <h5 className="font-medium text-white">Rapid Diagnosis (Week 1)</h5>
              <p className="text-gray-400 text-sm">I map your actual workflow vs. your org chart. The gaps are where your problems live.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              2
            </div>
            <div>
              <h5 className="font-medium text-white">Stealth Implementation (Weeks 2-4)</h5>
              <p className="text-gray-400 text-sm">Working from the edges, I create working prototypes that bypass bureaucracy while demonstrating value.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              3
            </div>
            <div>
              <h5 className="font-medium text-white">Organic Scaling (Weeks 5-8)</h5>
              <p className="text-gray-400 text-sm">Success spreads naturally. Your teams adopt the working solutions without mandate or training.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600/10 to-green-600/10 border border-blue-500/30 rounded-lg p-6">
        <h4 className="text-lg font-medium text-white mb-2">Why I Work From The Outside</h4>
        <p className="text-gray-300">
          Internal consultants get trapped in your politics. External agencies don't understand your constraints. 
          I sit in the sweet spot - close enough to understand your reality, distant enough to see the solutions 
          your org chart makes invisible.
        </p>
      </div>
      
      <div className="flex gap-4">
        <motion.button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          Let's Talk Solutions
        </motion.button>
        
        <motion.button
          onClick={() => {
            setCurrentStep('intro');
            setSelectedPains([]);
          }}
          className="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          Start Over
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div id="corporate-diagnostic" className="relative min-h-[600px] p-6 overflow-hidden bg-gray-900">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[url('/images/blueprint-grid.svg')] opacity-5" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <motion.div key="intro" exit={{ opacity: 0, x: -20 }}>
              {renderIntro()}
            </motion.div>
          )}
          
          {currentStep === 'assessment' && (
            <motion.div key="assessment" exit={{ opacity: 0, x: -20 }}>
              {renderAssessment()}
            </motion.div>
          )}
          
          {currentStep === 'diagnosis' && (
            <motion.div key="diagnosis" exit={{ opacity: 0, x: -20 }}>
              {renderDiagnosis()}
            </motion.div>
          )}
          
          {currentStep === 'solution' && (
            <motion.div key="solution" exit={{ opacity: 0, x: -20 }}>
              {renderSolution()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
