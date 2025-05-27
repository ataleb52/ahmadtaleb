export interface NavCard {
  key: string;
  title: string;
  description: string;
  href: string;
  number: string;
  progressLabel?: string;
  progress?: string;
  isContact?: boolean;
}

export const navCards: NavCard[] = [
  { 
    key: 'about', 
    title: 'Who am I', 
    description: 'My background, experience, and approach to solving problems.', 
    href: '#about', 
    number: '01'
  },
  { 
    key: 'products', 
    title: 'What I do', 
    description: 'Product strategy, roadmapping, and helping businesses become more independent.', 
    href: '#products', 
    number: '02'
  },
  { 
    key: 'projects', 
    title: "What I'm working on", 
    description: 'Making home inspections easy to understand', 
    href: '#projects', 
    number: '03', 
    progressLabel: 'ClearCasa.io MVP', 
    progress: '80%'
  },
  { 
    key: 'contact', 
    title: 'Contact', 
    description: "Let's discuss your business challenges and how I can help you solve them.", 
    href: '#contact', 
    number: '04', 
    isContact: true 
  }
];
