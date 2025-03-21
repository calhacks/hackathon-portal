import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is Hackathons @ Berkeley?",
    answer: "Hackathons @ Berkeley is the organizing group for various hackathons run at UC Berkeley. We aim to create inclusive, educational, and fun events for students to learn new skills, build innovative projects, and connect with like-minded peers and industry professionals.",
  },
  {
    question: "What is this portal for?",
    answer: "This portal is for applying to most of our hackathons. Starting AI Hackathon 3.0, we are going to use a centralized application platform for all of our hackathons.",
  },
  {
    question: "How do I apply for a hackathon?",
    answer: "Simply navigate to the 'Apply' section in the sidebar and complete the application form.",
  },
  {
    question: "How can I contact the organizers if I have more questions?",
    answer: "Email us: team@hackberkeley.org!",
  },
];


export default function FAQPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <Accordion type="multiple" className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-xl font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  );
}
