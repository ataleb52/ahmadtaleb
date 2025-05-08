import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function AboutPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading mb-6">Why People Call Me</h2>
            
            <div className="space-y-4 text-lg">
              <p className="font-heading text-2xl">My name is Ahmad. I solve problems.</p>
              
              <p>Not the kind you diagram on a whiteboard and forget. The kind that make people quietly mutter, "Why is this still broken?"</p>
              
              <p>I'm the one they call when your dev team is stuck in sprint hell, your execs are still "aligning on vision," and your data team is buried under a mountain of backlog. I cut through that mess.</p>
              
              <p>I've been a product manager, a founder, a consultant, a translator, a systems analyst, and the guy who rebuilt his family business's operations from scratch—because nobody else would. My resume doesn't look like a straight line. It looks like real life.</p>
              
              <p>I don't do corporate theater. I don't need 6 weeks to "scope" a strategy deck. I work fast, ask the hard questions, and build solutions that make the noise go away. Whether it's a scrappy prototype or an org-wide strategy, I bring order to chaos—without pretending it's easy.</p>
              
              <p>ADHD is my unofficial co-pilot. It means I see everything—especially the parts no one else connects. I skip the surface-level fixes and dive straight into the system underneath. Because surface-level is what got you stuck in the first place.</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}