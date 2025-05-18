import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { 
  Wrench, 
  CheckCircle,
  Search,
  X,
  ExternalLink,
  Calendar,
  Tag,
  ArrowRight,
  Workflow,
  ChevronRight,
  Clock,
  ListTodo,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Pin,
  Eye,
  Gauge,
  PenTool,
  Table,
  Hammer,
  Info,
  MoveHorizontal,
  Keyboard,
  Award
} from 'lucide-react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, animate, useSpring, useTransform } from 'framer-motion';

// Enhanced Workshop View with drag functionality (Will be imported in KanbanPortfolio.tsx)
const EnhancedWorkshopView = React.forwardRef(({ 
  blueprintSolutions, 
  workbenchSolutions,
  showcaseSolutions,
  onSelectSolution,
  onUpdateSolutionStatus,
  mousePosition,
  className
}, ref) => {
  // Patterns for different areas
  const blueprintPattern = "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232563eb' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z'/%3E%3Cpath d='M0 0h20v20H0V0zm21 0h19v19H21V0z'/%3E%3C/g%3E%3C/svg%3E\")";
  const woodgrainPattern = "url(\"data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E\")";
  
  // Setup mouse tracking for spotlight effect
  const mouseX = useMotionValue(mousePosition.x);
  const mouseY = useMotionValue(mousePosition.y);
  const springMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  // Physics-based spotlight that follows cursor more realistically
  const spotlightBg = useMotionTemplate`
    radial-gradient(
      circle 350px at ${springMouseX}px ${springMouseY}px, 
      rgba(59, 130, 246, 0.07), 
      transparent
    )
  `;
  
  // Dragging state
  const [draggingSolution, setDraggingSolution] = useState(null);
  const [dragTargetArea, setDragTargetArea] = useState(null);
  const blueprintAreaRef = useRef(null);
  const workbenchAreaRef = useRef(null);
  const showcaseAreaRef = useRef(null);
  
  // Track mouse position for effects and dragging
  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
    
    // Determine which area the mouse is over during dragging
    if (draggingSolution) {
      const blueprintRect = blueprintAreaRef.current?.getBoundingClientRect();
      const workbenchRect = workbenchAreaRef.current?.getBoundingClientRect();
      const showcaseRect = showcaseAreaRef.current?.getBoundingClientRect();
      
      if (
        blueprintRect && 
        mousePosition.x >= blueprintRect.left && 
        mousePosition.x <= blueprintRect.right && 
        mousePosition.y >= blueprintRect.top && 
        mousePosition.y <= blueprintRect.bottom
      ) {
        setDragTargetArea('blueprint');
      } else if (
        workbenchRect && 
        mousePosition.x >= workbenchRect.left && 
        mousePosition.x <= workbenchRect.right && 
        mousePosition.y >= workbenchRect.top && 
        mousePosition.y <= workbenchRect.bottom
      ) {
        setDragTargetArea('workbench');
      } else if (
        showcaseRect && 
        mousePosition.x >= showcaseRect.left && 
        mousePosition.x <= showcaseRect.right && 
        mousePosition.y >= showcaseRect.top && 
        mousePosition.y <= showcaseRect.bottom
      ) {
        setDragTargetArea('showcase');
      } else {
        setDragTargetArea(null);
      }
    }
  }, [mousePosition, mouseX, mouseY, draggingSolution]);
  
  // Handle drag start
  const handleDragStart = (solution) => {
    setDraggingSolution(solution);
  };
  
  // Handle drag end 
  const handleDragEnd = () => {
    if (draggingSolution && dragTargetArea && draggingSolution.status !== dragTargetArea) {
      onUpdateSolutionStatus(draggingSolution.id, dragTargetArea);
    }
    setDraggingSolution(null);
    setDragTargetArea(null);
  };
  
  // Keyboard shortcuts helper
  const KeyboardShortcutHelper = () => (
    <motion.div 
      className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg border shadow-md z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Keyboard size={14} />
        <span>Press <kbd className="px-1 py-0.5 bg-muted rounded-sm">Tab</kbd> to navigate, <kbd className="px-1 py-0.5 bg-muted rounded-sm">Space</kbd> to select</span>
      </div>
    </motion.div>
  );
  
  // Confetti effect for completed solutions
  const ConfettiEffect = ({ visible }) => {
    if (!visible) return null;
    
    return (
      <motion.div 
        className="absolute inset-0 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full bg-${
              ['emerald', 'amber', 'blueprint', 'white'][Math.floor(Math.random() * 4)]
            }-${Math.floor(Math.random() * 500)}`}
            initial={{ 
              x: `calc(${showcaseAreaRef.current?.getBoundingClientRect().left || 0}px + 50%)`,
              y: `calc(${showcaseAreaRef.current?.getBoundingClientRect().top || 0}px - 20px)`,
              scale: 0 
            }}
            animate={{ 
              x: `calc(${showcaseAreaRef.current?.getBoundingClientRect().left || 0}px + ${Math.random() * 100}%)`,
              y: `calc(${showcaseAreaRef.current?.getBoundingClientRect().top || 0}px + ${Math.random() * 100}%)`,
              scale: Math.random() * 0.5 + 0.5,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 2 + 1,
              ease: "easeOut",
              delay: Math.random() * 0.5
            }}
          />
        ))}
      </motion.div>
    );
  };

  // Function to render draggable solutions
  const renderDraggableSolution = (solution, index, type) => {
    const Component = type === 'blueprint' 
      ? BlueprintItemEnhanced 
      : type === 'workbench' 
        ? WorkbenchItemEnhanced 
        : ShowcaseItemEnhanced;
    
    return (
      <motion.div
        key={solution.id}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragStart={() => handleDragStart(solution)}
        onDragEnd={handleDragEnd}
        className="z-10 relative"
        whileDrag={{ 
          zIndex: 100, 
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          scale: 1.02
        }}
        whileHover={{ zIndex: 20 }}
      >
        <Component
          solution={solution}
          onClick={() => onSelectSolution(solution)}
          delay={index * 0.1}
          isDragging={draggingSolution?.id === solution.id}
          targetArea={dragTargetArea}
        />
      </motion.div>
    );
  };

  return (
    <motion.div 
      ref={ref}
      className={cn("rounded-xl border overflow-hidden relative w-full bg-muted/20 h-[700px]", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="region"
      aria-label="Solution Workshop Display"
    >
      {/* Workshop background with ambient lighting */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/80"></div>
        
        {/* Dynamic spotlight that follows the cursor with physics */}
        <motion.div 
          className="absolute pointer-events-none"
          style={{ 
            background: spotlightBg,
            width: '100%',
            height: '100%',
          }}
        ></motion.div>
        
        {/* Workshop dust particles - subtle floating specks */}
        <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
          <div className="absolute left-1/4 top-1/5 w-1 h-1 rounded-full bg-blueprint/40 animate-float-slow"></div>
          <div className="absolute left-2/3 top-1/4 w-0.5 h-0.5 rounded-full bg-white/30 animate-float-slower"></div>
          <div className="absolute left-1/2 top-2/3 w-0.5 h-0.5 rounded-full bg-amber-500/30 animate-float"></div>
          <div className="absolute left-3/4 top-1/3 w-1 h-1 rounded-full bg-white/20 animate-float-slower"></div>
          <div className="absolute left-1/5 top-2/5 w-0.5 h-0.5 rounded-full bg-emerald-500/30 animate-float-slow"></div>
          <div className="absolute left-1/3 top-3/4 w-0.5 h-0.5 rounded-full bg-blueprint/30 animate-float"></div>
          <div className="absolute left-4/5 top-1/5 w-1 h-1 rounded-full bg-amber-500/20 animate-float-slow"></div>
        </div>
        
        {/* Status transition indicators - path arrows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Arrow from Blueprint to Workbench */}
          <svg 
            className="absolute top-1/3 left-[28%] opacity-0 group-hover:opacity-20 transition-opacity" 
            width="40" height="50" viewBox="0 0 40 50" fill="none"
          >
            <path 
              d="M0 25 L30 25 L20 15 M30 25 L20 35" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray="3 3"
              className="text-blueprint"
            />
          </svg>
          
          {/* Arrow from Workbench to Showcase */}
          <svg 
            className="absolute top-1/3 right-[28%] opacity-0 group-hover:opacity-20 transition-opacity" 
            width="40" height="50" viewBox="0 0 40 50" fill="none"
          >
            <path 
              d="M0 25 L30 25 L20 15 M30 25 L20 35" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray="3 3"
              className="text-emerald-500"
            />
          </svg>
        </div>
      </div>
      
      <div className="relative z-10 grid grid-rows-[auto_1fr] h-full">
        {/* Area labels - top navigation */}
        <div className="grid grid-cols-3 border-b text-center bg-gradient-to-r from-background via-background/80 to-background shadow-md relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500/40 via-blueprint/40 to-emerald-500/40"></div>
          
          <motion.div 
            className="p-3 border-r relative"
            whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}
            role="button"
            aria-label="Blueprints Section - Problems to tackle"
            tabIndex={0}
          >
            <h3 className="font-medium text-amber-500 flex items-center justify-center gap-2">
              <PenTool size={18} />
              <span>Blueprints</span>
            </h3>
            <p className="text-xs text-muted-foreground">Problems I'll tackle</p>
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500/60"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="p-3 border-r bg-blueprint/5 relative"
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            role="button"
            aria-label="Workbench Section - Solutions being created now"
            tabIndex={0}
          >
            <div className="absolute -top-0.5 left-0 right-0 h-0.5 bg-blueprint/40"></div>
            <h3 className="font-medium text-blueprint flex items-center justify-center gap-2">
              <Wrench size={18} />
              <span>Workbench</span>
            </h3>
            <p className="text-xs text-muted-foreground">Currently crafting</p>
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blueprint/60"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="p-3 relative"
            whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
            role="button"
            aria-label="Showcase Section - Completed solutions"
            tabIndex={0}
          >
            <h3 className="font-medium text-emerald-500 flex items-center justify-center gap-2">
              <CheckCircle size={18} />
              <span>Showcase</span>
            </h3>
            <p className="text-xs text-muted-foreground">Finished solutions</p>
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500/60"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.div>
          </motion.div>
        </div>
        
        {/* Workshop areas */}
        <div className="grid grid-cols-7 h-full overflow-hidden">
          {/* Blueprint area - draft table with blueprints (2/7 width) */}
          <div 
            ref={blueprintAreaRef}
            className={cn(
              "col-span-2 border-r relative p-4 overflow-y-auto bg-gradient-to-b from-amber-800/5 to-background/80",
              dragTargetArea === 'blueprint' && draggingSolution && "ring-4 ring-amber-500/30 ring-inset"
            )}
          >
            <div 
              className="absolute inset-0 opacity-20" 
              style={{ backgroundImage: blueprintPattern }}
            ></div>
            
            {/* Blueprint desk tools - decorative elements */}
            <div className="absolute top-3 right-3 w-8 h-4 bg-amber-900/20 rounded-sm transform rotate-12"></div>
            <div className="absolute top-8 right-4 w-2 h-6 bg-amber-500/20 rounded-full"></div>
            <div className="absolute bottom-6 left-3 w-10 h-2 bg-amber-950/20 rounded-sm transform -rotate-6"></div>
            
            {/* z-offset for 3D effect */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-0",
              dragTargetArea === 'blueprint' && "opacity-20",
              "transition-opacity duration-200"
            )}></div>
            
            <div className="relative z-10 space-y-3">
              <h4 className="mb-3 text-amber-500/80 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <PenTool size={12} />
                <span>Future Projects</span>
                
                {/* Drag hint */}
                <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-1 opacity-50">
                  <MoveHorizontal size={10} />
                  <span>Drag to move</span>
                </span>
              </h4>
              
              {blueprintSolutions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
                    <PenTool size={18} className="text-amber-500/50" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">No blueprints drafted yet</p>
                </div>
              ) : (
                <ul className="space-y-3" aria-label="Blueprint solutions list">
                  {blueprintSolutions.map((solution, index) => (
                    <li key={solution.id}>
                      {renderDraggableSolution(solution, index, 'blueprint')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Workbench area - active projects with tools (3/7 width) */}
          <div 
            ref={workbenchAreaRef}
            className={cn(
              "col-span-3 relative overflow-y-auto shadow-md bg-blueprint/5 border-r",
              dragTargetArea === 'workbench' && draggingSolution && "ring-4 ring-blueprint/30 ring-inset"
            )}
          >
            {/* Woodgrain workbench texture */}
            <div 
              className="absolute inset-0 opacity-10" 
              style={{ backgroundImage: woodgrainPattern }}
            ></div>
            
            {/* Workbench lighting effect */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-blueprint/10 to-transparent"></div>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-blueprint/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Workbench tools - decorative elements */}
            <div className="absolute top-12 right-8 w-4 h-4 border-2 border-blueprint/20 rounded-full"></div>
            <div className="absolute top-8 right-12 w-6 h-1 bg-blueprint/20 rounded-full transform rotate-45"></div>
            <div className="absolute bottom-20 left-5 w-2 h-8 bg-blueprint/15 rounded-sm"></div>
            
            {/* z-offset for 3D effect */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-b from-blueprint/5 via-transparent to-transparent opacity-0",
              dragTargetArea === 'workbench' && "opacity-20",
              "transition-opacity duration-200"
            )}></div>
            
            <div className="relative z-10 space-y-5 p-6">
              <h4 className="mb-4 text-blueprint text-sm uppercase tracking-wider font-semibold flex items-center">
                <Wrench size={16} className="mr-2" />
                <span>Currently Crafting</span>
                
                {/* Drag hint */}
                <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-1 opacity-50">
                  <MoveHorizontal size={10} />
                  <span>Drag to move</span>
                </span>
              </h4>
              
              {workbenchSolutions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 rounded-full bg-blueprint/10 flex items-center justify-center mb-3">
                    <Wrench size={24} className="text-blueprint/50" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Workbench is clear</p>
                  <p className="text-xs text-muted-foreground text-center mt-1">No active projects</p>
                </div>
              ) : (
                <ul className="space-y-6" aria-label="Active workbench projects">
                  {workbenchSolutions.map((solution, index) => (
                    <li key={solution.id}>
                      {renderDraggableSolution(solution, index, 'workbench')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Showcase area - finished projects on display (2/7 width) */}
          <div 
            ref={showcaseAreaRef}
            className={cn(
              "col-span-2 relative p-4 overflow-y-auto bg-gradient-to-b from-emerald-800/5 to-background/80",
              dragTargetArea === 'showcase' && draggingSolution && "ring-4 ring-emerald-500/30 ring-inset"
            )}
          >
            <div 
              className="absolute inset-0 bg-center bg-repeat opacity-5" 
              style={{ 
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23047857' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")" 
              }}
            ></div>
            
            {/* Display case elements */}
            <div className="absolute top-6 right-5 w-8 h-2 bg-emerald-900/10 rounded-sm transform rotate-45"></div>
            <div className="absolute top-10 right-8 w-3 h-3 border border-emerald-500/30 rounded-sm"></div>
            <div className="absolute bottom-10 left-5 w-6 h-1 bg-emerald-500/20 rounded-full"></div>
            
            {/* z-offset for 3D effect */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent opacity-0",
              dragTargetArea === 'showcase' && "opacity-20",
              "transition-opacity duration-200"
            )}></div>
            
            <div className="relative z-10 space-y-3">
              <h4 className="mb-3 text-emerald-500/80 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <CheckCircle size={12} />
                <span>Completed Work</span>
                
                {/* Drag hint */}
                <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-1 opacity-50">
                  <MoveHorizontal size={10} />
                  <span>Drag to move</span>
                </span>
              </h4>
              
              {showcaseSolutions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
                    <CheckCircle size={18} className="text-emerald-500/50" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Display case is empty</p>
                </div>
              ) : (
                <ul className="space-y-3" aria-label="Showcase of completed solutions">
                  {showcaseSolutions.map((solution, index) => (
                    <li key={solution.id}>
                      {renderDraggableSolution(solution, index, 'showcase')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Keyboard shortcut helper */}
      <KeyboardShortcutHelper />
      
      {/* Confetti effect when completing a workbench item */}
      <AnimatePresence>
        {draggingSolution?.status === 'workbench' && dragTargetArea === 'showcase' && (
          <ConfettiEffect visible={true} />
        )}
      </AnimatePresence>
      
      {/* Workshop pointer element - follows cursor on workbench area only */}
      <div 
        className="absolute pointer-events-none z-20 transition-opacity duration-300 opacity-0 hover:opacity-100"
        style={{
          left: `${mousePosition.x - 4}px`,
          top: `${mousePosition.y - 4}px`,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 12px rgba(59, 130, 246, 0.15)'
        }}
      ></div>
    </motion.div>
  );
});

// Enhanced Blueprint Item Component
const BlueprintItemEnhanced = ({
  solution,
  onClick,
  delay = 0,
  isDragging = false,
  targetArea = null
}) => {
  // Calculate visual states based on dragging and target area
  const isValidTarget = targetArea && targetArea !== 'blueprint';
  const isWorkbenchTarget = targetArea === 'workbench';
  const isShowcaseTarget = targetArea === 'showcase';
  
  return (
    <motion.div
      onClick={!isDragging ? onClick : undefined}
      className={cn(
        "rounded-md border border-amber-500/30 bg-amber-500/5 p-3 cursor-pointer group relative overflow-hidden",
        isDragging && "shadow-xl z-50",
        isDragging && isValidTarget && "opacity-90"
      )}
      whileHover={{ 
        y: -2, 
        x: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderColor: "rgba(245, 158, 11, 0.5)"
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 8, rotateZ: -0.5 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateZ: 0,
        scale: isDragging ? 1.03 : 1,
        boxShadow: isDragging ? "0 10px 25px rgba(0,0,0,0.2)" : "0 2px 4px rgba(0,0,0,0.05)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 20,
        delay: !isDragging ? delay : 0
      }}
      role="button"
      aria-label={`View blueprint details for ${solution.title}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Blueprint corner fold effect */}
      <div className="absolute top-0 right-0 w-6 h-6 bg-amber-500/10 rounded-bl-lg">
        <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-amber-500/40 border-r-amber-500/40"></div>
      </div>
      
      {/* Status transition indicators - show appropriate status icon based on target */}
      {isDragging && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-md z-10">
          {isWorkbenchTarget ? (
            <div className="p-3 rounded-full bg-blueprint/20 text-blueprint">
              <Wrench size={24} />
            </div>
          ) : isShowcaseTarget ? (
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-500">
              <CheckCircle size={24} />
            </div>
          ) : (
            <div className="p-3 rounded-full bg-amber-500/20 text-amber-500">
              <PenTool size={24} />
            </div>
          )}
        </div>
      )}
      
      {/* Blueprint grid lines - only visible on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0h2v20H1V0zm0 0h20v2H0V0z' fill='%23F59E0B' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "8px 8px" 
        }}
      ></div>
      
      {/* 3D fold effect using transforms */}
      <div className="relative transform-gpu group-hover:rotate-y-2 transition-transform duration-300">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 flex-shrink-0 bg-amber-500/10 p-1 rounded-full">
            <PenTool size={12} />
          </span>
          <h4 className="font-medium text-sm truncate group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
            {solution.title}
          </h4>
        </div>
        
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 pl-7">
          {solution.description}
        </p>
        
        {/* Tags */}
        <div className="mt-2 pl-7 flex flex-wrap gap-1">
          {solution.tags.slice(0, 1).map(tag => (
            <span 
              key={tag} 
              className="text-[10px] px-1.5 rounded-sm bg-amber-500/10 text-amber-700 dark:text-amber-300"
            >
              {tag}
            </span>
          ))}
          {solution.tags.length > 1 && (
            <span className="text-[10px] px-1.5 rounded-sm text-muted-foreground">
              +{solution.tags.length - 1}
            </span>
          )}
        </div>
      </div>
      
      {/* Grip handle for dragging - visual indicator */}
      <div className="absolute right-2 bottom-2 w-3 h-3 flex flex-col justify-center items-center opacity-30 group-hover:opacity-80">
        <div className="w-1 h-1 rounded-full bg-current mb-0.5"></div>
        <div className="w-1 h-1 rounded-full bg-current"></div>
      </div>
    </motion.div>
  );
};

// Enhanced Workbench Item Component
const WorkbenchItemEnhanced = ({
  solution,
  onClick,
  delay = 0,
  isDragging = false,
  targetArea = null
}) => {
  // State for progress animation
  const progressValue = useMotionValue(0);
  const progressWidth = useMotionTemplate`${progressValue}%`;
  
  // Calculate visual states based on dragging and target area
  const isValidTarget = targetArea && targetArea !== 'workbench';
  const isBlueprintTarget = targetArea === 'blueprint';
  const isShowcaseTarget = targetArea === 'showcase';
  
  // Animate progress value
  useEffect(() => {
    if (isDragging) return;
    
    const controls = animate(progressValue, solution.progress, {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.3 + delay
    });
    
    return controls.stop;
  }, [progressValue, solution.progress, delay, isDragging]);

  return (
    <motion.div
      onClick={!isDragging ? onClick : undefined}
      className={cn(
        "rounded-lg border border-blueprint/40 bg-white/10 backdrop-blur-sm p-5 cursor-pointer shadow-md relative group overflow-hidden",
        isDragging && "shadow-xl z-50 rotate-1",
        isDragging && isValidTarget && "opacity-90"
      )}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(37, 99, 235, 0.15)",
        borderColor: "rgba(37, 99, 235, 0.5)"
      }}
      whileTap={{ scale: isDragging ? 1 : 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isDragging ? 1.03 : 1,
        boxShadow: isDragging ? "0 15px 30px rgba(0,0,0,0.25)" : "0 4px 12px rgba(0,0,0,0.1)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 20,
        delay: !isDragging ? delay : 0
      }}
      role="button"
      aria-label={`View workbench details for ${solution.title}, ${solution.progress}% complete`}
      style={{
        transformStyle: "preserve-3d",
        transform: isDragging ? "translateZ(20px)" : "translateZ(0px)",
        transition: "transform 0.3s ease-out"
      }}
    >
      {/* Status transition indicators - show appropriate status icon based on target */}
      {isDragging && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-lg z-10">
          {isBlueprintTarget ? (
            <div className="p-3 rounded-full bg-amber-500/20 text-amber-500">
              <PenTool size={24} />
            </div>
          ) : isShowcaseTarget ? (
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-500">
              <CheckCircle size={24} />
            </div>
          ) : (
            <div className="p-3 rounded-full bg-blueprint/20 text-blueprint">
              <Wrench size={24} />
            </div>
          )}
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-1 w-24 bg-gradient-to-l from-blueprint to-blueprint/20 rounded-bl-full rounded-tr-lg"></div>
      
      {/* Workbench texture overlay - subtle wood grain */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity",
          isDragging && "opacity-5"
        )}
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      ></div>
      
      {/* Tool marks - become visible on hover */}
      <div className="absolute -left-2 top-1/3 w-4 h-1 bg-blueprint/0 group-hover:bg-blueprint/20 transition-colors rounded-full transform rotate-45"></div>
      <div className="absolute right-4 bottom-3 w-8 h-0.5 bg-blueprint/0 group-hover:bg-blueprint/10 transition-colors rounded-full"></div>
      
      <div className="flex items-start justify-between">
        <h4 className="font-medium text-base group-hover:text-blueprint transition-colors">
          {solution.title}
        </h4>
        <div className="bg-blueprint/20 text-blueprint p-1.5 rounded-full flex-shrink-0 shadow-sm group-hover:bg-blueprint/30 transition-colors">
          <Wrench size={16} className="group-hover:rotate-[15deg] transition-transform" />
        </div>
      </div>
      
      <p className="mt-2.5 text-sm text-muted-foreground line-clamp-2">
        {solution.description}
      </p>
      
      {/* Progress indicator with animated value */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium flex items-center gap-1.5">
            <Clock size={12} className="text-muted-foreground" />
            <span>Progress</span>
          </span>
          <motion.span 
            className="text-sm font-medium text-blueprint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + delay }}
          >
            <motion.span>{solution.progress}</motion.span>%
          </motion.span>
        </div>
        
        <div className="h-2.5 bg-muted rounded-full overflow-hidden shadow-inner relative">
          {/* Track marks */}
          <div className="absolute inset-0 flex justify-between px-1 items-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-px h-1.5 bg-muted-foreground/20"></div>
            ))}
          </div>
          
          {/* Progress fill */}
          <motion.div 
            className="h-full bg-gradient-to-r from-blueprint/80 to-blueprint"
            style={{ width: progressWidth }}
          />
          
          {/* Progress highlight */}
          <motion.div 
            className="absolute h-px top-0.5 left-0 bg-white/40"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {solution.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 rounded-full bg-background/80 group-hover:bg-blueprint/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {!isDragging && (
          <motion.div
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-xs gap-1 hover:bg-blueprint/20 hover:text-blueprint group-hover:bg-blueprint/10 transition-colors"
            >
              Details
              <ChevronRight size={12} />
            </Button>
          </motion.div>
        )}
      </div>
      
      {/* "In progress" banner in corner */}
      <div className="absolute -right-8 top-3 bg-blueprint/20 text-[10px] text-blueprint py-0.5 px-6 transform rotate-45 font-medium">
        Active
      </div>
      
      {/* Grip handle for dragging - visual indicator */}
      <div className="absolute right-10 bottom-5 w-3 h-3 flex flex-col justify-center items-center opacity-30 group-hover:opacity-80">
        <div className="w-1 h-1 rounded-full bg-current mb-0.5"></div>
        <div className="w-1 h-1 rounded-full bg-current"></div>
      </div>
    </motion.div>
  );
};

// Enhanced Showcase Item Component
const ShowcaseItemEnhanced = ({
  solution,
  onClick,
  delay = 0,
  isDragging = false,
  targetArea = null
}) => {
  // Calculate visual states based on dragging and target area
  const isValidTarget = targetArea && targetArea !== 'showcase';
  const isBlueprintTarget = targetArea === 'blueprint';
  const isWorkbenchTarget = targetArea === 'workbench';
  
  return (
    <motion.div
      onClick={!isDragging ? onClick : undefined}
      className={cn(
        "rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3.5 cursor-pointer group relative",
        isDragging && "shadow-xl z-50 -rotate-1",
        isDragging && isValidTarget && "opacity-90"
      )}
      whileHover={{ 
        y: -2, 
        x: -2,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08), 0 2px 6px rgba(16, 185, 129, 0.1)",
        borderColor: "rgba(16, 185, 129, 0.5)" 
      }}
      whileTap={{ scale: isDragging ? 1 : 0.97 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isDragging ? 1.03 : 1,
        boxShadow: isDragging ? "0 10px 25px rgba(0,0,0,0.2)" : "0 2px 5px rgba(0,0,0,0.05)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 20,
        delay: !isDragging ? delay : 0
      }}
      role="button"
      aria-label={`View case study for ${solution.title}, completed ${solution.date}`}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(800px)",
      }}
    >
      {/* Status transition indicators - show appropriate status icon based on target */}
      {isDragging && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-md z-10">
          {isBlueprintTarget ? (
            <div className="p-3 rounded-full bg-amber-500/20 text-amber-500">
              <PenTool size={24} />
            </div>
          ) : isWorkbenchTarget ? (
            <div className="p-3 rounded-full bg-blueprint/20 text-blueprint">
              <Wrench size={24} />
            </div>
          ) : (
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-500">
              <CheckCircle size={24} />
            </div>
          )}
        </div>
      )}
      
      {/* Showcase glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Completion badge */}
      <div className="absolute -left-1.5 -top-1.5">
        <div className="relative">
          <motion.div 
            className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15,
              delay: delay + 0.2
            }}
          >
            <CheckCircle size={14} className="text-emerald-500" />
          </motion.div>
          
          {/* Badge shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100"
            style={{ 
              rotate: -30,
              translateX: "-100%"
            }}
            animate={{ 
              translateX: ["100%", "-100%"]
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut",
              repeat: 0,
              repeatType: "reverse",
              repeatDelay: 5
            }}
          />
        </div>
      </div>
      
      <div className="ml-5 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {solution.title}
          </h4>
          <span className="text-xs text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <Calendar size={10} />
            <span>{solution.date}</span>
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-1 pr-2">
          {solution.description}
        </p>
        
        {/* Tags and link hint */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {solution.tags.slice(0, 1).map(tag => (
              <span 
                key={tag} 
                className="text-[10px] px-1.5 rounded-sm bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              >
                {tag}
              </span>
            ))}
            {solution.tags.length > 1 && (
              <span className="text-[10px] px-1.5 rounded-sm text-muted-foreground">
                +{solution.tags.length - 1}
              </span>
            )}
          </div>
          
          {solution.link && !isDragging && (
            <motion.div
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-[10px] gap-0.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 p-0"
              >
                <span>Case Study</span>
                <ExternalLink size={8} />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Award icon for completed solutions */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <motion.div
          initial={{ rotateZ: -20, scale: 0.8 }}
          animate={{ rotateZ: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Award size={14} className="text-emerald-500/70" />
        </motion.div>
      </div>
      
      {/* Grip handle for dragging - visual indicator */}
      <div className="absolute right-2 bottom-2 w-3 h-3 flex flex-col justify-center items-center opacity-30 group-hover:opacity-80">
        <div className="w-1 h-1 rounded-full bg-current mb-0.5"></div>
        <div className="w-1 h-1 rounded-full bg-current"></div>
      </div>
    </motion.div>
  );
};

export { 
  EnhancedWorkshopView, 
  BlueprintItemEnhanced, 
  WorkbenchItemEnhanced, 
  ShowcaseItemEnhanced 
};
