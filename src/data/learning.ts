import { LearningModule } from '@/types';

export const learningModules: LearningModule[] = [
  {
    id: 'what-is-research',
    title: 'What Is Research? A Gentle Introduction',
    description: 'Understand the fundamentals of research, why it matters in medicine, and how beginners can start contributing.',
    content: `Research in medicine is the systematic process of asking questions, gathering evidence, and analyzing data to improve patient care and advance medical knowledge.

**Why should you care?**
- Research trains critical thinking skills essential for clinical practice
- It helps you become a better clinician by understanding the evidence behind treatments
- Published research strengthens residency and fellowship applications
- You contribute to the body of knowledge that helps future patients

**Types of Medical Research:**
1. **Basic Science** — Laboratory-based research on biological mechanisms
2. **Clinical Research** — Studies involving patients or patient data
3. **Epidemiological Research** — Population-level studies of disease patterns
4. **Health Services Research** — Studies on healthcare delivery and outcomes
5. **Quality Improvement** — Projects aimed at improving clinical processes

**Getting Started:**
- Start with a clinical question from your daily practice
- Find a mentor who can guide your first project
- Begin with simpler designs like case reports or clinical audits
- Use structured tools and templates (like those in ResearchPath) to stay organized`,
    duration: '10 min',
    category: 'Fundamentals',
    difficulty: 'beginner',
  },
  {
    id: 'choosing-study-design-guide',
    title: 'How to Choose the Right Study Design',
    description: 'A practical guide to selecting the most appropriate study design for your research question and resources.',
    content: `Choosing the right study design is one of the most important decisions in research. The design determines what conclusions you can draw and how strong your evidence will be.

**Decision Framework:**

1. **What type of question are you asking?**
   - Prevalence/frequency → Cross-sectional study
   - Risk factors/associations → Cohort or case-control study
   - Treatment effectiveness → RCT or systematic review
   - Unusual case → Case report
   - Practice improvement → Clinical audit

2. **What resources do you have?**
   - Limited time → Retrospective study or case report
   - Access to existing data → Record-based study
   - Access to patients → Prospective study or survey
   - No original data → Systematic review

3. **Hierarchy of Evidence (strongest to weakest):**
   - Systematic reviews and meta-analyses
   - Randomized controlled trials
   - Cohort studies
   - Case-control studies
   - Cross-sectional studies
   - Case reports and case series
   - Expert opinion

**Common Beginner Paths:**
- Case report → Cross-sectional study → Retrospective cohort → Systematic review
- Start simple and build your skills progressively`,
    duration: '15 min',
    category: 'Methodology',
    difficulty: 'beginner',
  },
  {
    id: 'writing-pico',
    title: 'Mastering the PICO Framework',
    description: 'Learn how to transform clinical questions into structured, answerable research questions using PICO.',
    content: `The PICO framework is a powerful tool for structuring research questions. Each letter represents a key component:

**P — Population/Patient/Problem**
Who are you studying? Be specific about demographics, conditions, and settings.
✓ "Adult patients aged ≥65 with type 2 diabetes in primary care"
✗ "Diabetic patients" (too vague)

**I — Intervention/Exposure**
What treatment, exposure, or factor are you investigating?
✓ "Metformin 500mg twice daily"
✗ "Diabetes medication" (too broad)

**C — Comparison/Control**
What is the alternative? This could be placebo, standard care, or another intervention.
✓ "Compared to lifestyle modification alone"
✗ No comparison specified

**O — Outcome**
What are you measuring? Be specific about the outcome and timeframe.
✓ "HbA1c reduction at 12 months"
✗ "Blood sugar improvement" (not specific)

**Putting it Together:**
"In adult patients aged ≥65 with type 2 diabetes (P), does metformin 500mg BID (I) compared to lifestyle modification alone (C) result in greater HbA1c reduction at 12 months (O)?"

**Variations:**
- **PECO** — for exposure-based questions (E = Exposure)
- **PEO** — for qualitative questions (no Comparison needed)

**Practice Exercise:**
Take a clinical question from your recent experience and structure it using PICO. Write down each component separately, then combine into a single question.`,
    duration: '12 min',
    category: 'Methodology',
    difficulty: 'beginner',
  },
  {
    id: 'understanding-bias',
    title: 'Understanding Bias in Research',
    description: 'Learn about the major types of bias, how they affect research validity, and strategies to minimize them.',
    content: `Bias is a systematic error that can distort your study results. Understanding bias is essential for both conducting and reading research.

**Major Types of Bias:**

**1. Selection Bias**
Occurs when the study sample is not representative of the target population.
Example: Studying only hospitalized patients when your question applies to all patients with the condition.
Prevention: Clear inclusion criteria, random sampling.

**2. Information Bias (Measurement Bias)**
Occurs when data is collected or measured inaccurately.
Example: Relying on patient recall for medication adherence data.
Prevention: Use validated instruments, blinding, objective measurements.

**3. Recall Bias**
A type of information bias where participants remember past exposures differently based on their outcome.
Example: Mothers of children with birth defects may recall prenatal exposures more thoroughly than mothers of healthy children.
Prevention: Use prospective data collection, medical records.

**4. Publication Bias**
Studies with positive results are more likely to be published than those with negative or null results.
Prevention: Search grey literature, trial registries, funnel plots.

**5. Confounding**
When a third variable is associated with both the exposure and outcome, creating a false association.
Example: Coffee → Cancer (confounded by smoking)
Prevention: Randomization, matching, multivariate analysis.

**Assessing Bias:**
Use validated tools like RoB 2 (for RCTs), NOS (for observational studies), or JBI tools (for various designs).`,
    duration: '15 min',
    category: 'Methodology',
    difficulty: 'beginner',
  },
  {
    id: 'reading-papers',
    title: 'How to Read a Research Paper',
    description: 'A step-by-step approach to reading and critically appraising published research papers.',
    content: `Reading research papers is a skill that improves with practice. Here's a structured approach:

**Step 1: Read the Abstract (2 minutes)**
Get the overview: What question? What design? What findings? What conclusion?

**Step 2: Look at the Figures and Tables (3 minutes)**
These tell the story. Understand the main data before diving into text.

**Step 3: Read the Introduction (5 minutes)**
What's the background? What gap exists? What's the study aim?

**Step 4: Read the Methods Critically (10 minutes)**
- Is the study design appropriate for the question?
- How were participants selected?
- How were outcomes measured?
- What statistical tests were used?

**Step 5: Read the Results (10 minutes)**
- Do the results answer the research question?
- Are effect sizes clinically meaningful (not just statistically significant)?
- Look at confidence intervals, not just p-values.

**Step 6: Read the Discussion (5 minutes)**
- How do findings compare to existing literature?
- What limitations are acknowledged?
- Are conclusions supported by the data?

**Critical Appraisal Questions:**
1. Is the study design appropriate?
2. Is the sample representative?
3. Are outcomes validly measured?
4. Are results statistically AND clinically significant?
5. Can results be applied to my patients?`,
    duration: '8 min',
    category: 'Fundamentals',
    difficulty: 'beginner',
  },
  {
    id: 'literature-search-basics',
    title: 'Literature Search Basics',
    description: 'Learn how to efficiently search medical databases to find relevant studies for your research.',
    content: `A thorough literature search is the foundation of good research. Here's how to do it effectively:

**Key Databases:**
- **PubMed** — Free, comprehensive biomedical database (essential)
- **Google Scholar** — Broad coverage, easy to use, includes grey literature
- **Embase** — Strong for pharmacology and European studies
- **Cochrane Library** — Systematic reviews and clinical trials
- **Scopus** — Multidisciplinary, good citation tracking

**Search Strategy Basics:**

1. **Identify key concepts** from your PICO question
2. **Find synonyms** for each concept
3. **Use MeSH terms** (Medical Subject Headings) in PubMed
4. **Combine using Boolean operators:**
   - AND narrows results (diabetes AND metformin)
   - OR broadens results (metformin OR biguanide)
   - NOT excludes (diabetes NOT type 1)

**Tips for Better Searches:**
- Use quotation marks for exact phrases: "blood pressure"
- Use truncation (*) for word variations: therap* finds therapy, therapies, therapeutic
- Start broad, then narrow with filters
- Save your searches for reproducibility
- Set up email alerts for new publications

**When to Stop Searching:**
- You keep finding the same studies (saturation)
- New results are no longer relevant
- You've searched at least 2-3 databases`,
    duration: '10 min',
    category: 'Methodology',
    difficulty: 'beginner',
  },
  {
    id: 'writing-introduction',
    title: 'Writing a Strong Introduction',
    description: 'Learn the structure and key elements of an effective research paper introduction.',
    content: `The introduction is your chance to convince readers that your study matters. Follow the "funnel" structure:

**Paragraph 1: Broad Context**
Start with the big picture. What is the health problem? Why does it matter?
"Type 2 diabetes affects over 500 million people worldwide and is a leading cause of cardiovascular mortality..."

**Paragraph 2: Narrow to Your Topic**
Focus on the specific aspect you're studying.
"Among the available pharmacological options, metformin remains the first-line agent, yet comparative effectiveness data..."

**Paragraph 3: Identify the Gap**
What is missing from the current literature? This is crucial.
"However, few studies have directly compared long-term cardiovascular outcomes between..."

**Paragraph 4: State Your Objective**
Clear, concise statement of what your study aims to do.
"Therefore, this systematic review aims to compare the cardiovascular outcomes of..."

**Common Mistakes:**
- Too much background, not enough gap identification
- Gap statement is vague or unconvincing
- Objective doesn't match the gap
- Too long (aim for 400-600 words)
- Including results or methods in the introduction

**Pro Tips:**
- Write the introduction AFTER methods and results
- End each paragraph with a sentence that leads to the next
- Cite recent and seminal references
- Have someone outside your field read it for clarity`,
    duration: '10 min',
    category: 'Writing',
    difficulty: 'beginner',
  },
  {
    id: 'ethics-basics',
    title: 'Research Ethics Essentials',
    description: 'Understand the fundamental ethical principles governing medical research and how to apply them.',
    content: `Research ethics protects participants and ensures the integrity of science.

**Core Principles (Belmont Report):**

1. **Respect for Persons (Autonomy)**
   - Informed consent is mandatory
   - Vulnerable populations need additional protection
   - Participants can withdraw at any time

2. **Beneficence**
   - Maximize benefits, minimize risks
   - Risk-benefit analysis must favor participation
   - Design studies to answer questions efficiently

3. **Justice**
   - Fair selection of participants
   - Benefits and burdens of research distributed equitably
   - No exploitation of vulnerable groups

**Practical Steps:**
1. Submit your protocol to the IRB/Ethics Committee BEFORE starting
2. Obtain written informed consent (or waiver if justified)
3. Protect participant data and privacy (anonymization/pseudonymization)
4. Report adverse events promptly
5. Register clinical trials before enrollment begins
6. Declare conflicts of interest honestly

**When Is Ethics Approval Needed?**
- Always for studies involving human subjects
- Usually for retrospective chart reviews (may be expedited)
- Often waived for quality improvement projects (check local policy)
- Not typically needed for systematic reviews of published data

**Red Flags:**
- Starting data collection before ethics approval
- Not having a consent process
- Storing identifiable data without encryption
- Failing to report adverse events`,
    duration: '12 min',
    category: 'Ethics',
    difficulty: 'beginner',
  },
];
