export type Problem = {
  id: string;
  title: string;
  description: string;
  impact: string;
  status: 'idea' | 'building' | 'solved';
  progress: number; // 0-100
  date?: string;
  tags: string[];
  link?: string;
}
