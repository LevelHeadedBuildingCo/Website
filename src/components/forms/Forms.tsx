import { academyPrograms, crewPathways, workshopTopics } from '../../content';
import { FormShell } from './FormShell';
import { CheckboxGroup, Consent, FileField, SelectField, TextArea, TextField } from './fields';

function ContactBasics({ showLocation = true }: { showLocation?: boolean }) {
  return (
    <>
      <TextField label="Full name" name="name" required autoComplete="name" />
      <TextField label="Email" name="email" type="email" required autoComplete="email" />
      <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
      {showLocation && <TextField label="Town or city" name="location" autoComplete="address-level2" />}
    </>
  );
}

export const projectTypes = [
  'Repairs or maintenance',
  'Accessibility or aging-in-place upgrade',
  'Bathroom renovation',
  'Kitchen renovation',
  'Other renovation',
  'Addition or accessory dwelling unit (ADU)',
  'New home',
  'Housing provider: unit turnovers or repairs',
  'Commercial or institutional project',
  'Panelized construction',
  'Other',
];

export function QuoteForm() {
  return (
    <FormShell formType="quote" submitLabel="Request a quote" successTitle="Thanks, your project details are in."
      successText="We’ve received your request and will be in touch to talk through the next steps. We review every inquiry personally.">
      <SelectField label="Project type" name="project_type" required options={projectTypes} />
      <TextField label="Property or project location" name="project_location" required hint="Town or nearest community is fine." />
      <SelectField label="Approximate budget" name="budget" options={['Under $10,000', '$10,000 – $25,000', '$25,000 – $50,000', '$50,000 – $100,000', '$100,000 – $250,000', 'Over $250,000', 'Not sure yet']} />
      <SelectField label="Desired timeline" name="timeline" options={['As soon as possible', 'Within 3 months', '3 – 6 months', '6 – 12 months', 'More than a year away', 'Flexible']} />
      <TextArea label="Tell us about the project" name="description" required hint="What needs to be done, anything you’re worried about, and how you’ll use the space." />
      <FileField label="Plans or photographs" name="attachments" multiple />
      <div className="full"><hr className="divider-copper" /><h3 className="mb-0">Your contact information</h3></div>
      <ContactBasics showLocation={false} />
      <SelectField label="Best way to reach you" name="preferred_contact" options={['Email', 'Phone', 'Either']} />
      <Consent />
    </FormShell>
  );
}

export function ConsultingForm() {
  return (
    <FormShell formType="consulting" submitLabel="Send inquiry" successTitle="Thanks, we’ll be in touch."
      successText="We’ve received your inquiry about construction management or consulting and will follow up to learn more.">
      <ContactBasics />
      <TextField label="Organization" name="organization" autoComplete="organization" />
      <CheckboxGroup label="What do you need help with?" name="services" options={[
        'Project planning and estimating', 'Scheduling and coordination', 'Cost control', 'Subcontractor management',
        'Quality oversight', 'Owner representation', 'Development feasibility', 'Construction operations improvement',
      ]} />
      <TextField label="Project location" name="project_location" />
      <SelectField label="Timeline" name="timeline" options={['Immediately', 'Within 3 months', '3 – 6 months', '6+ months', 'Exploring options']} />
      <TextArea label="Describe the project or challenge" name="description" required />
      <FileField label="Supporting documents" name="attachments" multiple />
      <Consent />
    </FormShell>
  );
}

export function CrewForm() {
  return (
    <FormShell formType="crew" submitLabel="Submit my interest" successTitle="Thanks for reaching out to the crew."
      successText="We’ve received your information. We review every submission, and we’ll contact you when there’s an opportunity or program that fits. Submitting interest is not an application for a specific job.">
      <ContactBasics />
      <SelectField label="Area of experience or interest" name="area" required options={[...crewPathways.map((p) => p.title), 'Other']} />
      <SelectField label="Years of construction experience" name="years_experience" required options={['None yet, I’m exploring', 'Less than 1 year', '1 – 3 years', '3 – 5 years', '5 – 10 years', '10+ years']} />
      <TextField label="Certifications or trade qualifications" name="certifications" full hint="For example: Certificate of Qualification, apprenticeship level, Working at Heights, WHMIS, first aid." />
      <CheckboxGroup label="What are you interested in?" name="preference" options={[
        'Full-time employment', 'Part-time or seasonal work', 'Contract or subcontract work', 'Apprenticeship',
        'Training through the Academy', 'Mentoring or training others', 'Professional partnership',
      ]} />
      <FileField label="Resume" name="resume" accept=".pdf,.doc,.docx" hint={`PDF or Word, up to 10 MB.`} />
      <TextArea label="Tell us a little about yourself" name="message" rows={5} hint="What you bring, what excites you, and what you’d like to know." />
      <Consent>
        I agree that Level Headed Building Co. may collect, store and use the information and any resume I provide to consider me for
        current and future employment, training and partnership opportunities, as described in the privacy policy. I can ask for my
        information to be deleted at any time.
      </Consent>
    </FormShell>
  );
}

export function AcademyInterestForm({ preselect = [] }: { preselect?: string[] }) {
  return (
    <FormShell formType="training" submitLabel="Register my interest" successTitle="You’re on our list."
      successText="Thanks! We’ll let you know when programs or workshops you’re interested in are scheduled. Registering interest doesn’t commit you to anything.">
      <ContactBasics />
      <CheckboxGroup label="Programs you’re interested in" name="programs" options={academyPrograms.map((p) => p.title)} defaultChecked={preselect} />
      <CheckboxGroup label="Workshop topics you’d attend" name="workshops" options={workshopTopics.map((w) => w.title)} />
      <SelectField label="Your experience level" name="experience" options={['Brand new', 'Some DIY experience', 'Working in or near the trades', 'Experienced tradeswoman']} />
      <SelectField label="Best times for you" name="availability" options={['Weekday evenings', 'Weekends', 'Weekdays', 'Flexible']} />
      <TextArea label="Anything else we should know?" name="message" rows={4} hint="Accessibility needs, childcare, transportation, or topics you’d like us to add." />
      <Consent />
    </FormShell>
  );
}

export const partnerTypes = [
  'Municipality', 'Social or co-operative housing provider', 'Developer', 'General contractor', 'Skilled trades company',
  'Architect or engineer', 'College or training institution', 'Workforce development organization', 'Corporate sponsor',
  'Community organization', 'Funding or development partner', 'Other',
];
export const partnershipAreas = [
  'Construction contracts', 'Panelized construction delivery', 'Workforce development', 'Training sponsorship',
  'Mentorship', 'Housing partnerships', 'Community workshops', 'Employment pathways',
];

export function PartnerForm() {
  return (
    <FormShell formType="partnership" submitLabel="Start the conversation" successTitle="Thank you, let’s talk."
      successText="We’ve received your partnership inquiry and will reach out to set up a conversation.">
      <TextField label="Full name" name="name" required autoComplete="name" />
      <TextField label="Organization" name="organization" required autoComplete="organization" />
      <TextField label="Your role" name="role" autoComplete="organization-title" />
      <SelectField label="Organization type" name="organization_type" required options={partnerTypes} />
      <TextField label="Email" name="email" type="email" required autoComplete="email" />
      <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
      <CheckboxGroup label="Areas of interest" name="interests" options={partnershipAreas} />
      <TextArea label="What would you like to explore together?" name="message" required rows={5} />
      <Consent />
    </FormShell>
  );
}

export function GeneralForm() {
  return (
    <FormShell formType="general" submitLabel="Send message" successTitle="Message received."
      successText="Thanks for getting in touch. We’ll get back to you as soon as we can.">
      <ContactBasics />
      <TextField label="Subject" name="subject" full />
      <TextArea label="Message" name="message" required />
      <Consent />
    </FormShell>
  );
}

export function NewsletterForm() {
  return (
    <FormShell formType="newsletter" submitLabel="Subscribe" successTitle="Request received."
      successText="Thanks! We’ve added your request and will confirm your subscription by email.">
      <TextField label="Email" name="email" type="email" required autoComplete="email" />
      <TextField label="First name" name="name" autoComplete="given-name" />
      <Consent>I’d like to receive occasional emails from Level Headed Building Co. I can unsubscribe at any time.</Consent>
    </FormShell>
  );
}

export function FoundingCircleForm() {
  return (
    <FormShell formType="founding" submitLabel="Send to Sonya" successTitle="Thank you. I’ve got it."
      successText="Your thoughts came straight to my inbox. I read every one, and I’ll be in touch personally.">
      <TextField label="Your name" name="name" required autoComplete="name" />
      <TextField label="Email" name="email" type="email" required autoComplete="email" />
      <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
      <SelectField label="Your main area" name="expertise" options={['Construction', 'Professional services', 'Training & community', 'Other']} />
      <TextArea label="What you bring" name="what_you_bring" rows={3} />
      <TextArea label="What excites you" name="what_excites_you" rows={3} />
      <TextArea label="What you would need to know" name="what_you_need_to_know" rows={3} />
      <TextArea label="Ideas, thoughts or feedback" name="feedback" rows={5} hint="Anything at all: what’s missing, what worries you, what you’d change." />
      <SelectField label="Where are you at?" name="next_step" full options={[
        'I’d like a coffee or a conversation', 'Keep me in the loop', 'Just sharing feedback for now',
      ]} />
      <Consent>I’m happy for Sonya and Level Headed Building Co. to keep my name, contact details and comments to follow up with me about the founding circle.</Consent>
    </FormShell>
  );
}
