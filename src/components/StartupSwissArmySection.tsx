import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, BarChart3, Users, Lightbulb, Target, DollarSign, 
  TrendingUp, Brain, Zap, Settings, ChevronRight, 
  Cpu, Database, PieChart, Rocket, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Role {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  tools: string[];
  outcomes: string[];
  timeframe: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  urgency: 'critical' | 'high' | 'medium';
  roles: string[];
}

export function StartupSwissArmySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'selector' | 'configuration' | 'deployment'>('selector');
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('startup-swiss-army');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const roles: Role[] = [
    {
      id: 'product',
      title: 'Product Detective',
      icon: <Target className="w-5 h-5" />,
      color: 'text-cyan-400',
      description: 'Find product-market fit by talking to actual humans',
      tools: ['User interviews', 'Cohort analysis', 'Feature usage tracking'],
      outcomes: ['Clear user personas', 'Validated hypotheses', 'Prioritized roadmap'],
      timeframe: '2-4 weeks'
    },
    {
      id: 'engineer',
      title: 'Rapid Prototyper',
      icon: <Code className="w-5 h-5" />,
      color: 'text-green-400',
      description: 'Build MVPs faster than your runway burns',
      tools: ['No-code tools', 'API integrations', 'Technical debt assessment'],
      outcomes: ['Working prototypes', 'Technical roadmap', 'Build vs buy decisions'],
      timeframe: '1-3 weeks'
    },
    {
      id: 'analyst',
      title: 'Data Truth-Teller',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'text-blue-400',
      description: 'Turn vanity metrics into actionable insights',
      tools: ['Cohort analysis', 'CAC/LTV modeling', 'Retention deep-dives'],
      outcomes: ['Real unit economics', 'Growth levers identified', 'Investor-ready metrics'],
      timeframe: '1-2 weeks'
    },
    {
      id: 'strategist',
      title: 'Growth Catalyst',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-purple-400',
      description: 'Connect dots others miss, find leverage points',
      tools: ['Market analysis', 'Competitive positioning', 'Growth experiments'],
      outcomes: ['Clear positioning', 'Growth experiments', 'Market advantages'],
      timeframe: '2-3 weeks'
    },
    {
      id: 'consigliere',
      title: 'Founder Consigliere',
      icon: <Brain className="w-5 h-5" />,
      color: 'text-orange-400',
      description: 'Be the outside voice when everyone else says yes',
      tools: ['Strategic questioning', 'Scenario planning', 'Decision frameworks'],
      outcomes: ['Clear decision criteria', 'Risk mitigation', 'Strategic clarity'],
      timeframe: 'Ongoing'
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 'pmf',
      title: 'Product-Market Fit Mystery',
      description: 'Investors keep asking about PMF but you\'re not sure how to measure it',
      urgency: 'critical',
      roles: ['product', 'analyst', 'strategist']
    },
    {
      id: 'metrics',
      title: 'Metrics Confusion',
      description: 'Dashboard full of numbers but no idea what actually matters',
      urgency: 'high',
      roles: ['analyst', 'strategist']
    },
    {
      id: 'feature-debt',
      title: 'Feature Factory Syndrome',
      description: 'Building features but not moving key metrics',
      urgency: 'high',
      roles: ['product', 'engineer', 'analyst']
    },
    {
      id: 'scaling',
      title: 'Premature Scaling',
      description: 'Growing team but efficiency decreasing',
      urgency: 'medium',
      roles: ['strategist', 'consigliere']
    },
    {
      id: 'fundraising',
      title: 'Investor Story Gaps',
      description: 'Great product but story doesn\'t resonate with VCs',
      urgency: 'critical',
      roles: ['analyst', 'strategist', 'consigliere']
    }
  ];

  const getSelectedRoleDetails = () => {
    return roles.filter(role => selectedRoles.includes(role.id));
  };

  const getRecommendedRoles = () => {
    const roleCounts = new Map<string, number>();
    
    selectedChallenges.forEach(challengeId => {
      const challenge = challenges.find(c => c.id === challengeId);
      challenge?.roles.forEach(roleId => {
        roleCounts.set(roleId, (roleCounts.get(roleId) || 0) + 1);
      });
    });
    
    return Array.from(roleCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .map(([roleId]) => roles.find(r => r.id === roleId))
      .filter(Boolean)
      .slice(0, 3);
  };

  const renderRoleSelector = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2">
          <Settings className="text-cyan-400" size={16} />
          <span className="text-cyan-400 font-mono text-sm">SWISS ARMY KNIFE CONFIGURATOR</span>
        </div>
        
        <h2 className="text-3xl font-bold text-white">
          Configure Your <span className="text-cyan-400">Problem-Solving Arsenal</span>
        </h2>
        
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select the challenges you're facing. I'll dynamically configure my skill set 
          to tackle your specific problems. Think of it as a Swiss Army knife, but for startup dysfunction.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-medium text-white">What's keeping you up at night?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all",
                selectedChallenges.includes(challenge.id)
                  ? "border-cyan-500/50 bg-cyan-500/10"
                  : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
              )}
              onClick={() => {
                setSelectedChallenges(prev => 
                  prev.includes(challenge.id)
                    ? prev.filter(id => id !== challenge.id)
                    : [...prev, challenge.id]
                );
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-white">{challenge.title}</h4>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      challenge.urgency === 'critical' ? "bg-red-500/20 text-red-400" :
                      challenge.urgency === 'high' ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-blue-500/20 text-blue-400"
                    )}>
                      {challenge.urgency.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{challenge.description}</p>
                </div>
                
                {selectedChallenges.includes(challenge.id) && (
                  <div className="ml-3">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 bg-white rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {selectedChallenges.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setCurrentView('configuration')}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            Configure My Arsenal <ChevronRight size={16} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  const renderConfiguration = () => {
    const recommendedRoles = getRecommendedRoles();
    
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Recommended <span className="text-cyan-400">Configuration</span>
          </h3>
          <p className="text-gray-400">
            Based on your challenges, here's how I'll configure myself to help:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedRoles.map((role, index) => (
            <motion.div
              key={role?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-gray-700/50", role?.color)}>
                  {role?.icon}
                </div>
                <h4 className="font-medium text-white">{role?.title}</h4>
              </div>
              
              <p className="text-sm text-gray-400">{role?.description}</p>
              
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Tools I'll use:</div>
                <div className="flex flex-wrap gap-1">
                  {role?.tools.map((tool) => (
                    <span key={tool} className="text-xs bg-gray-700/50 px-2 py-1 rounded text-gray-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Expected outcomes:</div>
                <ul className="text-xs text-gray-400 space-y-1">
                  {role?.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2 border-t border-gray-700">
                <div className="text-xs text-gray-500">Timeline: {role?.timeframe}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h4 className="text-lg font-medium text-white mb-3">Dynamic Adaptation Protocol</h4>
          <p className="text-gray-400 mb-4">
            I don't just wear one hat. As your challenges evolve, I dynamically reconfigure my approach. 
            Started as a data analyst? I'll shift to product strategy when the metrics point to positioning problems.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-cyan-400">Phase 1: Immediate Impact</div>
              <div className="text-sm text-gray-400">Quick wins to build momentum and credibility</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-cyan-400">Phase 2: Strategic Shifts</div>
              <div className="text-sm text-gray-400">Adapt roles based on what the data reveals</div>
            </div>
          </div>
        </div>
        
        <motion.button
          onClick={() => setCurrentView('deployment')}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          Deploy Configuration <Rocket size={16} />
        </motion.button>
      </motion.div>
    );
  };

  const renderDeployment = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
          <Rocket className="text-green-400" size={16} />
          <span className="text-green-400 font-mono text-sm">DEPLOYMENT READY</span>
        </div>
        
        <h3 className="text-2xl font-bold text-white">
          <span className="text-green-400">Arsenal Configured.</span> Let's Ship.
        </h3>
      </div>
      
      <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-lg p-6">
        <h4 className="text-lg font-medium text-white mb-4">My Deployment Strategy</h4>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              W1
            </div>
            <div>
              <h5 className="font-medium text-white">Week 1: Rapid Assessment</h5>
              <p className="text-gray-400 text-sm">I embed with your team to understand the real problems (not just the ones in Slack)</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              W2
            </div>
            <div>
              <h5 className="font-medium text-white">Week 2-3: Quick Wins</h5>
              <p className="text-gray-400 text-sm">Implement fast solutions that demonstrate immediate value and build team confidence</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              W4+
            </div>
            <div>
              <h5 className="font-medium text-white">Week 4+: Strategic Implementation</h5>
              <p className="text-gray-400 text-sm">Roll out systemic improvements while adapting my role based on what we've learned</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-white mb-2">Why Startups Choose Me</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• No 6-month contracts or elaborate statements of work</li>
            <li>• I adapt to your runway and stage</li>
            <li>• Focus on metrics that actually matter to investors</li>
            <li>• Build solutions, not presentations</li>
          </ul>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-white mb-2">What Makes Me Different</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• I spot problems before they become crises</li>
            <li>• Work happens in your tools, not mine</li>
            <li>• Knowledge transfer is built in, not extra</li>
            <li>• Results speak louder than methodologies</li>
          </ul>
        </div>
      </div>
      
      <div className="flex gap-4">
        <motion.button
          className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          Let's Talk Deployment
        </motion.button>
        
        <motion.button
          onClick={() => {
            setCurrentView('selector');
            setSelectedChallenges([]);
            setSelectedRoles([]);
          }}
          className="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          Reconfigure
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div id="startup-swiss-army" className="relative min-h-[600px] p-6 overflow-hidden bg-gray-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[url('/images/blueprint-grid.svg')] opacity-5" />
      
      {/* Floating elements for tech feel */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {currentView === 'selector' && (
            <motion.div key="selector" exit={{ opacity: 0, x: -20 }}>
              {renderRoleSelector()}
            </motion.div>
          )}
          
          {currentView === 'configuration' && (
            <motion.div key="configuration" exit={{ opacity: 0, x: -20 }}>
              {renderConfiguration()}
            </motion.div>
          )}
          
          {currentView === 'deployment' && (
            <motion.div key="deployment" exit={{ opacity: 0, x: -20 }}>
              {renderDeployment()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
