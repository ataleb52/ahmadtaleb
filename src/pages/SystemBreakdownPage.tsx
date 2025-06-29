import { motion } from 'framer-motion';
import { ArrowRight, Box, Component, FileJson, GalleryHorizontalEnd, KanbanSquare, LayoutPanelLeft, Puzzle, Layers, FileCode, Lightbulb } from 'lucide-react'; // Added Layers, FileCode, Lightbulb

// Mock Solution type for display purposes
type MockSolution = {
  id: string;
  title: string;
  detailComponentId?: string;
  previewDescription?: string;
  thumbnailUrl?: string;
};

// Mock Showcase Component Preview
const ShowcasePreviewCard = ({ title, description, bgColorClass = 'bg-gray-700', children }: { title: string, description: string, bgColorClass?: string, children?: React.ReactNode }) => (
  <div className={`p-4 rounded-lg ${bgColorClass} border border-gray-600 shadow-md h-full flex flex-col`}>
    <h4 className="text-md font-semibold text-white mb-1">{title}</h4>
    <p className="text-xs text-gray-300 flex-grow">{description}</p>
    {children}
  </div>
);

// Specific Mock for LegacySystemsShowcase content
const MockLegacyShowcaseContent = () => (
  <div className="mt-2 p-3 bg-amber-700/30 border border-amber-600/50 rounded-md space-y-2">
    <p className="text-xs text-amber-200 font-semibold">Legacy Systems Modernization</p>
    <div className="h-10 bg-amber-500/20 rounded flex items-center justify-center text-xxs text-amber-300">[Visual Diagram Area]</div>
    <p className="text-xxs text-amber-300">Phase 1: Analysis | Phase 2: Strategy...</p>
  </div>
);

export default function SystemBreakdownPage() {
  const mockSolution: MockSolution = {
    id: 'blueprint-1',
    title: 'Legacy Systems Modernization',
    detailComponentId: 'LegacySystemsShowcase',
    previewDescription: 'Modernizing critical infrastructure.',
    thumbnailUrl: '/images/legacy-systems-thumb.jpg' // Example path
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const Section = ({ title, icon: Icon, children, sectionId }: { title: string, icon: React.ElementType, children: React.ReactNode, sectionId?: string }) => (
    <motion.div variants={itemVariants} className="mb-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 shadow-xl relative" id={sectionId}>
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-cyan-400 mr-3" />
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>
      <div className="text-gray-300 leading-relaxed space-y-3 pl-11">
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 sm:text-5xl">
          Deconstructing the Portfolio
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          A visual guide to understanding the components and flow of our interactive portfolio system.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* 1. The Entry Point */}
        <Section title="1. The Entry Point" icon={ArrowRight}>
          <p>Users typically start their journey from a navigation element, like a button in the main site navigation.</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(56, 189, 248, 0.5)" }}
            className="mt-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 ease-in-out"
          >
            Explore My Work
          </motion.button>
          <p className="text-sm text-gray-500 mt-1">This action loads the main portfolio interface.</p>
        </Section>

        {/* 2. The Main Board (KanbanPortfolio) */}
        <Section title="2. The Main Board" icon={KanbanSquare}>
          <p>This leads to the <strong>Main Board</strong> (<code>KanbanPortfolio</code>), which displays project "cards" in an organized layout.</p>
          <div className="mt-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <h4 className="font-semibold text-cyan-300 mb-2">Simplified Board View:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['Project Alpha', 'Service Beta', 'Solution Gamma'].map(title => (
                <div key={title} className="p-3 bg-gray-800 rounded-md shadow-lg border border-gray-700">
                  <h5 className="text-sm font-semibold text-white">{title}</h5>
                  <p className="text-xs text-gray-400 mt-1">Brief description of the item...</p>
                  <div className="mt-2 h-1 w-full bg-cyan-500/50 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 3. Portfolio Item Data (Solution objects) */}
        <Section title="3. Portfolio Item Data" icon={FileJson}>
          <p>Each card is backed by a <strong>Data Object</strong> (<code>Solution</code> type). This object holds all information, including a crucial <code>detailComponentId</code>.</p>
          <pre className="mt-3 p-3 bg-gray-800 border border-gray-700 rounded-md text-xs overflow-x-auto">
            <code className="text-purple-300">
{`{
  "id": "`} <span className="text-amber-300">{mockSolution.id}</span> {`",
  "title": "`} <span className="text-amber-300">{mockSolution.title}</span> {`",
  "detailComponentId": "`} <span className="text-green-400 font-bold">{mockSolution.detailComponentId}</span> {`", // <-- Links to the unique showcase
  "previewDescription": "`} <span className="text-amber-300">{mockSolution.previewDescription}</span> {`",
  // ... other fields
}`}
            </code>
          </pre>
        </Section>

        {/* 4. The "Cards" (SolutionCard) */}
        <Section title="4. The Interactive Cards" icon={Box}>
          <p>The <strong>Cards</strong> (<code>SolutionCard</code>) on the board are more than static displays. They act as interactive gateways.</p>
          <div className="mt-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 flex items-center space-x-4">
            <div className="flex-shrink-0 w-24 h-24 bg-gray-800 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-center items-center p-2">
                {mockSolution.thumbnailUrl ? <img src={mockSolution.thumbnailUrl} alt={mockSolution.title} className="w-full h-12 object-cover rounded-sm mb-1"/> : <GalleryHorizontalEnd className="w-8 h-8 text-gray-500 mb-1"/> }
                <h5 className="text-xs font-semibold text-white text-center leading-tight">{mockSolution.title}</h5>
            </div>
            <p className="text-sm text-gray-400">Clicking a card like this one initiates the process of showing detailed, custom content.</p>
          </div>
        </Section>

        {/* 5. Detail Viewer Shell (SolutionDetail Modal) */}
        <Section title="5. The Detail Viewer Shell" icon={LayoutPanelLeft} sectionId="modal-shell">
          <p>A <strong>Modal Shell</strong> (<code>SolutionDetail</code>) appears. This acts as a generic container or "stage" for the detailed content.</p>
          <div className="mt-3 h-64 p-4 bg-gray-800/70 rounded-lg border-2 border-dashed border-cyan-500/50 flex flex-col items-center justify-center relative shadow-inner">
            <p className="absolute top-2 left-2 text-xs text-cyan-500">SolutionDetail.tsx (Modal)</p>
            <p className="text-cyan-300 font-semibold mb-2 text-lg">Modal Container</p>
            <div className="w-full h-4/5 bg-gray-700/50 rounded-md p-3 border border-gray-600 flex flex-col items-center justify-center">
              <Layers className="w-12 h-12 text-gray-500 mb-2" />
              <p className="text-sm text-gray-400 text-center">This space will be filled by a specific Showcase Component.</p>
            </div>
          </div>
        </Section>

        {/* Connector Arrow from Modal Shell to Dynamic Loader */}
        <div className="flex justify-center my-[-2.5rem] relative z-10">
          <ArrowRight className="w-10 h-10 text-purple-400 rotate-90 animate-pulse" />
        </div>

        {/* 6. Dynamic Content Loader - More Visual */}
        <Section title="6. The Dynamic Content Loader" icon={Puzzle} sectionId="dynamic-loader">
          <p>Inside the modal, the <strong>Dynamic Loader</strong> uses the <code>detailComponentId</code> from the clicked item's data (e.g., <code className="text-amber-300">'LegacySystemsShowcase'</code>).</p>
          <p>It consults a mapping (<code>PortfolioItemComponents</code> object) to find the correct React component for that ID.</p>
          
          <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 space-y-3">
            <div className="flex items-start space-x-3">
              <FileJson className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-200">Data Object (Solution):</p>
                <pre className="text-xs text-purple-300"><code className="text-purple-300">{`{ detailComponentId: "`}</code><code className="text-amber-300 font-bold">LegacySystemsShowcase</code><code className="text-purple-300">{`" }`}</code></pre>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-green-400 rotate-90 my-1" />
            </div>

            <div className="flex items-start space-x-3">
              <FileCode className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-200">Component Mapping (<code>PortfolioItemComponents</code>):</p>
                <pre className="text-xs">
                  <code className="text-gray-400">
                    {`{
  "LegacySystemsShowcase": `}
                  </code>
                  <code className="text-green-400 font-bold">
                    {`React.lazy(() => import('./LegacySystemsShowcase'))`}
                  </code>
                  <code className="text-gray-400">
                    {`,
  "CustomerInsightsShowcase": `}
                  </code>
                  <code className="text-green-400 font-bold">
                    {`React.lazy(() => import('./CustomerInsightsShowcase'))`}
                  </code>
                  <code className="text-gray-400">
                    {`,
  // ...etc
}`} 
                  </code>
                </pre>
              </div>
            </div>
            <p className="text-sm text-gray-400 pt-2"><code>React.lazy()</code> ensures the specific showcase component (e.g., <code>LegacySystemsShowcase.tsx</code>) is loaded only when needed.</p>
          </div>
        </Section>

        {/* Connector Arrow from Dynamic Loader to Unique Showcase */}
        <div className="flex justify-center my-[-2.5rem] relative z-10">
          <ArrowRight className="w-10 h-10 text-purple-400 rotate-90 animate-pulse" />
        </div>

        {/* 7. Unique Showcase Components - Exploded View Example */}
        <Section title="7. The Unique Showcase Component In Action" icon={Component} sectionId="unique-showcase">
          <p>The dynamically loaded component (e.g., <code>LegacySystemsShowcase</code>) now renders its unique UI *inside* the modal shell.</p>
          
          <div className="mt-4 p-1 bg-gray-800/70 rounded-lg border-2 border-dashed border-cyan-500/50 relative shadow-inner">
            <p className="absolute top-2 left-2 text-xs text-cyan-500 z-20">SolutionDetail.tsx (Modal)</p>
            <div className="p-3 border border-gray-700/50 bg-gray-800 rounded-md">
              {/* This is where the actual showcase component would be rendered */}
              {/* We are using a mock representation for this breakdown page */}
              <ShowcasePreviewCard 
                title="LegacySystemsShowcase.tsx" 
                description="This component takes over the modal's content area, providing a custom-tailored presentation for the 'Legacy Systems Modernization' project."
                bgColorClass="bg-amber-800/30 border-amber-700/50"
              >
                <MockLegacyShowcaseContent />
              </ShowcasePreviewCard>
            </div>
          </div>
          
          <p className="mt-4">Other portfolio items would load their own distinct showcase components (e.g., <code>CustomerInsightsShowcase</code>, <code>PortfolioSystemShowcase</code>) into the same modal shell, each offering a different experience.</p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ShowcasePreviewCard 
              title="CustomerInsightsShowcase.tsx" 
              description="Presents customer data insights with interactive charts and step-by-step flows."
              bgColorClass="bg-purple-800/30 border-purple-700/50"
            >
              <div className="mt-2 p-2 bg-purple-700/30 border border-purple-600/50 rounded-md space-y-1">
                <p className="text-xxs text-purple-300">Step 1: Data Collection</p>
                <div className="h-6 bg-purple-500/20 rounded"></div>
              </div>
            </ShowcasePreviewCard>
            <ShowcasePreviewCard 
              title="GenericDetailView.tsx" 
              description="A fallback component for items without a custom showcase, displaying standard information."
              bgColorClass="bg-gray-700/50 border-gray-600/50"
            >
              <div className="mt-2 p-2 bg-gray-600/30 border border-gray-500/50 rounded-md space-y-1">
                <p className="text-xxs text-gray-300">Title: Generic Project</p>
                <p className="text-xxs text-gray-400">Description: Standard details...</p>
              </div>
            </ShowcasePreviewCard>
          </div>
        </Section>

        <motion.div variants={itemVariants} className="text-center mt-16 mb-8">
          <p className="text-xl text-gray-300">This modular and dynamic system allows for rich, tailored presentations of each portfolio piece while maintaining a consistent and performant overall structure.</p>
        </motion.div>

      </motion.div>
    </div>
  );
}
