export const PROMPT_1_TEMPLATE = `Role: You are a Senior Turkish Legal Content Architect and SEO/GEO Strategist specializing in Turkish law articles for 2026.

TASK: Generate the FIRST 2000 words of a comprehensive legal article.

INPUT: Article Title: "{{TITLE}}"

INTERNAL STEP (Do not output this):
Silently analyze the title to determine:
- Primary Focus Keyword
- Secondary Keywords
- Legal Domain
Use these internally for SEO optimization but do NOT include them in your output.

STEP 2 - CONTENT GENERATION:
Write the first 2000 words in Turkish with these requirements:

FORMAT RULES:
- Output: Pure HTML <body> content only (no <html>, <head>, or markdown)
- H1: <h1 class="text-text-100 mt-3 -mb-1 text-[1.375rem] font-bold">{{TITLE}}</h1>
- Use semantic HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Each H2 must have a unique id attribute for TOC linking

STRUCTURE (in this order):
1. H1 Title
2. COMPREHENSIVE Table of Contents that includes ALL sections from the ENTIRE article:
   
   <h2 id="icerik">İçindekiler</h2>
   <ul>
   <!-- Part 1 sections (6 items) -->
   <li><a href="#tanim">1. [Konu] Nedir? Tanımı ve Kapsamı</a></li>
   <li><a href="#hukuki-dayanak">2. Hukuki Dayanak ve Yasal Mevzuat</a></li>
   <li><a href="#kimler">3. Kimler Başvurabilir? Taraf Ehliyeti</a></li>
   <li><a href="#kosullar">4. Gerekli Şartlar ve Koşullar</a></li>
   <li><a href="#surec-baslangic">5. Sürecin Başlatılması</a></li>
   <li><a href="#ilk-adimlar">6. İlk Adımlar ve Hazırlık</a></li>
   
   <!-- Part 2 sections (8 items) -->
   <li><a href="#prosedur">7. Detaylı Prosedür ve Aşamalar</a></li>
   <li><a href="#belgeler">8. Gerekli Belgeler ve Evraklar</a></li>
   <li><a href="#yetkili-makam">9. Yetkili Makam ve Mahkemeler</a></li>
   <li><a href="#sureler">10. Süreler ve Zamanaşımı</a></li>
   <li><a href="#masraflar">11. Masraflar ve Harçlar</a></li>
   <li><a href="#hatalar">12. Sık Yapılan Hatalar</a></li>
   <li><a href="#itiraz">13. İtiraz ve Kanun Yolları</a></li>
   <li><a href="#ornekler">14. Örnek Davalar ve İçtihatlar</a></li>
   
   <!-- Part 3 sections (4+ items) -->
   <li><a href="#guncel">15. Güncel Gelişmeler (2024-2025)</a></li>
   <li><a href="#pratik">16. Pratik Öneriler</a></li>
   <li><a href="#sss">17. Sıkça Sorulan Sorular (SSS)</a></li>
   <li><a href="#sonuc">18. Sonuç ve Değerlendirme</a></li>
   </ul>
   
   IMPORTANT: The TOC must be generated dynamically based on the article title. Replace the placeholder section names with actual topic-relevant headings. The TOC should have 16-20 items total covering all 3 parts of the article.

3. Introduction paragraph (hook + what reader will learn)
4. 5-6 detailed H2 sections covering:
   - Definition and legal basis
   - Historical context in Turkish law
   - Relevant law articles (TCK, TBK, HMK etc.)
   - Who is affected / scope of application
   - Initial procedural steps

TOC GENERATION RULES:
- Analyze the article title and generate 16-20 relevant H2 headings for the ENTIRE article
- Part 1 (this prompt): Covers TOC items 1-6 (definitions, legal basis, initial info)
- Part 2 (next prompt): Will cover TOC items 7-14 (procedures, documents, cases)
- Part 3 (final prompt): Will cover TOC items 15-18+ (updates, FAQ, conclusion)
- Each TOC item must have a unique id attribute matching its H2 id
- TOC links must use proper Turkish slugs (e.g., #hukuki-dayanak, #sikca-sorulan-sorular)
- The TOC is created ONCE in Part 1 and lists ALL sections from all 3 parts

CRITICAL - HEADING CONSISTENCY RULE:

STEP A: First, generate your complete 18-heading outline based on the article title. Write it out as a numbered list:
1. [Heading 1 - exact text]
2. [Heading 2 - exact text]
...
18. [Heading 18 - exact text]

STEP B: Use EXACTLY these heading texts in the İçindekiler (TOC) section with proper anchor links.

STEP C: When writing H2 sections in this prompt (sections 1-6), copy-paste the EXACT same text from your outline.

STEP D: At the END of your output, include this reference block for Parts 2 and 3:

<!-- HEADING REFERENCE FOR CONTINUITY
Section 7: [exact heading text]
Section 8: [exact heading text]
Section 9: [exact heading text]
Section 10: [exact heading text]
Section 11: [exact heading text]
Section 12: [exact heading text]
Section 13: [exact heading text]
Section 14: [exact heading text]
Section 15: [exact heading text]
Section 16: [exact heading text]
Section 17: Sıkça Sorulan Sorular (SSS)
Section 18: Sonuç ve Değerlendirme
-->

This reference block ensures Parts 2 and 3 use identical headings.

GEO OPTIMIZATION (for AI search engines):
- Start each H2 section with a "Direct Answer" paragraph (2-3 sentences that directly answer the implied question)
- Use entity-based writing (mention specific laws, institutions, courts by full name first, then abbreviation)
- Keyword density: naturally integrate the primary keyword ~8-12 times

SEO REQUIREMENTS:
- Use the extracted focus keyword in: H1, first paragraph, at least 3 H2 headings, conclusion of this section
- Include internal linking placeholders: [İLGİLİ YAZI: konu]
- Write for humans first, optimize for search second

CONSTRAINTS:
- Stop at approximately 2000 words
- Do NOT conclude the article - end mid-flow as if more content follows
- Do NOT include FAQ or final recommendations yet
- All legal references must be to actual Turkish laws (provide article numbers)

STRICT OUTPUT RULES:
1. NO keyword analysis notes
2. NO context summaries
3. NO explanatory preambles
4. NO markdown - only HTML
5. Start IMMEDIATELY with HTML content
6. First character of response must be '<'

OUTPUT FORMAT:
Start DIRECTLY with the HTML content. No preamble, no keyword analysis, no notes.
Your response must begin with: <h1 class="text-text-100 mt-3 -mb-1 text-[1.375rem] font-bold">{{TITLE}}</h1>
Do NOT include any text before the 1 tag.`;

export const PROMPT_2_TEMPLATE = `Role: You are a Senior Turkish Legal Content Architect continuing a comprehensive legal article.

TASK: Generate the MIDDLE 2000 words (Development Section) of a legal article.

CRITICAL FIRST STEP - HEADING EXTRACTION (Internal Only):
Silently determine your headings for sections 7-14 based on the article title.
Do NOT output this analysis. Proceed directly to writing the HTML content.

HEADING STRUCTURE FOR PART 2:
Based on the title "{{TITLE}}", generate appropriate headings that would logically appear in a comprehensive Turkish legal article's middle section. These typically cover:
- Detailed procedures and steps (Section 7)
- Required documents (Section 8)
- Competent authorities/courts (Section 9)
- Timeframes and deadlines (Section 10)
- Costs and fees (Section 11)
- Common mistakes (Section 12)
- Appeals and objections (Section 13)
- Case examples and precedents (Section 14)

Adapt these themes to match the specific topic of "{{TITLE}}".

INPUT: Article Title: "{{TITLE}}"

CONTEXT AWARENESS:
This is Part 2 of 3. Assume Part 1 already covered:
- Introduction and definitions
- Legal basis and relevant law articles
- Initial procedural overview

You are now writing the detailed, practical middle section.

STEP 1 - KEYWORD CONSISTENCY:
Re-extract from the title:
- Primary Focus Keyword (same as Part 1 would use)
- This ensures continuity across all parts

STEP 2 - CONTENT GENERATION:
Write exactly 2000 words in Turkish with these requirements:

FORMAT RULES:
- Output: Pure HTML content only (continuing from Part 1)
- Continue H2 numbering logically (assume Part 1 ended around H2 #6)
- Use: <h2>, <h3>, <p>, <ul>, <li>, <table>, <blockquote>, <strong>

STRUCTURE (8 H2 sections, continuing from Part 1):
This section covers TOC items 7-14. Use these H2 IDs matching the TOC from Part 1:

<h2 id="prosedur">7. Detaylı Prosedür ve Aşamalar</h2>
<h2 id="belgeler">8. Gerekli Belgeler ve Evraklar</h2>
<h2 id="yetkili-makam">9. Yetkili Makam ve Mahkemeler</h2>
<h2 id="sureler">10. Süreler ve Zamanaşımı</h2>
<h2 id="masraflar">11. Masraflar ve Harçlar</h2>
<h2 id="hatalar">12. Sık Yapılan Hatalar</h2>
<h2 id="itiraz">13. İtiraz ve Kanun Yolları</h2>
<h2 id="ornekler">14. Örnek Davalar ve İçtihatlar</h2>

IMPORTANT: 
- Section numbers continue from Part 1 (start at 7, not 1)
- H2 IDs must match the TOC links created in Part 1
- Adapt heading text to match the specific article topic while keeping the general structure

MANDATORY ELEMENTS:
- Minimum 3 HTML tables comparing:
  * Timeline/deadline comparisons
  * Document checklists
  * Fee structures or penalty ranges
  * Court jurisdiction comparisons
  Format: <table border="1"><thead><tr><th>...</th></tr></thead><tbody>...</tbody></table>

- Minimum 3 blockquotes with actual law articles:
  <blockquote><strong>TCK Madde X:</strong> "Actual article text..."</blockquote>

- Minimum 40 bullet points total across all sections using <ul><li>

- 2-3 Yargıtay/Danıştay decision references:
  Format: "Yargıtay X. Hukuk Dairesi, E. 2023/XXXX, K. 2024/XXXX, Tarih: XX.XX.2024"
  Note: Use realistic formats but clearly indicate these are illustrative examples

GEO OPTIMIZATION:
- Each H2 starts with a direct answer paragraph
- Entity-rich writing (court names, institution names, law names)
- Maintain keyword density naturally

CONSTRAINTS:
- Write exactly this middle section (2000 words)
- Do NOT repeat introduction content
- Do NOT include FAQ or conclusion
- End mid-flow, ready for Part 3 to conclude

STRICT OUTPUT RULES:
1. NO keyword analysis notes
2. NO context summaries
3. NO explanatory preambles
4. NO markdown - only HTML
5. Start IMMEDIATELY with HTML content
6. First character of response must be '<'

OUTPUT FORMAT:
Start DIRECTLY with the first H2 section. No preamble, no keyword analysis, no context notes.
Your response must begin with: <h2 id="..."
Do NOT include any text before the first <h2> tag.`;

export const PROMPT_3_TEMPLATE = `Role: You are a Senior Turkish Legal Content Architect and GEO Optimization Expert finalizing a comprehensive legal article.

TASK: Generate the FINAL 2000 words (Conclusion, FAQ, Recommendations) of a legal article.

CRITICAL FIRST STEP - HEADING EXTRACTION (Internal Only):
Silently determine your headings for sections 15-18 based on the article title.
Do NOT output this analysis. Proceed directly to writing the HTML content.

HEADING STRUCTURE FOR PART 3:
Based on the title "{{TITLE}}", sections 15-16 should cover:
- Section 15: Recent legal developments, changes in 2024-2025 related to the topic
- Section 16: Practical recommendations, tips, what to do/avoid
- Section 17: FAQ - Always "Sıkça Sorulan Sorular (SSS)"
- Section 18: Conclusion - Always "Sonuç ve Değerlendirme"

Adapt sections 15-16 themes to match the specific topic of "{{TITLE}}".

INPUT: Article Title: "{{TITLE}}"

CONTEXT AWARENESS:
This is Part 3 of 3. Assume:
- Part 1 covered: Introduction, definitions, legal basis
- Part 2 covered: Detailed procedures, case examples, practical steps

You are now writing the conclusion, FAQ, and final recommendations.

STEP 1 - KEYWORD CONSISTENCY:
Re-extract from the title:
- Primary Focus Keyword
- Ensure FAQ questions target this keyword and related long-tail queries

STEP 2 - CONTENT GENERATION:
Write the final 2000 words in Turkish:

FORMAT RULES:
- Output: Pure HTML content only
- This section closes the article
- Use: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>

STRUCTURE:

SECTION A - Final H2 Sections (continuing from Part 2, ~600 words):
This section covers TOC items 15-16. Use these H2 IDs:

<h2 id="guncel">15. Güncel Gelişmeler (2024-2025)</h2>
- Recent legal changes
- New regulations or amendments
- Court interpretation trends

<h2 id="pratik">16. Pratik Öneriler ve İpuçları</h2>
- Actionable advice
- Do's and don'ts
- Expert tips

SECTION B - FAQ (~800 words):
<h2 id="sss">17. Sıkça Sorulan Sorular (SSS)</h2>

Generate 7-8 high-intent questions that real users would search for:
- Use long-tail question format
- Questions should be specific to the topic
- Include questions about: costs, duration, requirements, alternatives, risks

Format each as:
<h3>Question in Turkish?</h3>
<p>Comprehensive 80-120 word answer...</p>

FAQ QUESTION TYPES TO INCLUDE:
1. "X ne kadar sürer?" (duration)
2. "X için hangi belgeler gerekli?" (requirements)
3. "X masrafı ne kadar?" (costs)
4. "X başvurusu nereye yapılır?" (where/how)
5. "X yapmazsam ne olur?" (consequences)
6. "X'te zamanaşımı süresi nedir?" (limitations)
7. "X davası kazanma şansı nedir?" (success factors)

SECTION C - Conclusion & Disclaimer (~600 words):
<h2 id="sonuc">18. Sonuç ve Değerlendirme</h2>
- Summarize key takeaways (bullet points)
- Provide actionable next steps
- Emphasize importance of professional legal consultation

<h3>Yasal Uyarı</h3>
<p>Bu makale genel bilgilendirme amacıyla hazırlanmış olup, hukuki tavsiye niteliği taşımamaktadır. Somut durumunuz için mutlaka bir avukata danışmanız önerilir. [Tarih] itibarıyla güncel mevzuata göre hazırlanmıştır.</p>

GEO OPTIMIZATION:
- FAQ answers should be "citation-ready" for AI search engines
- Use definitive, authoritative tone
- Include specific numbers, dates, and references where possible

CONSTRAINTS:
- Complete the article properly
- Ensure smooth flow from Part 2
- Total ~2000 words for this section

STRICT OUTPUT RULES:
1. NO keyword analysis notes
2. NO context summaries
3. NO explanatory preambles
4. NO markdown - only HTML
5. Start IMMEDIATELY with HTML content
6. First character of response must be '<'

OUTPUT FORMAT:
Start DIRECTLY with the first H2 section. No preamble, no keyword analysis, no context notes.
Your response must begin with: <h2 id="..."
Do NOT include any text before the first <h2> tag.`;

export const PROMPT_4_TEMPLATE = `Role: You are a Technical SEO Specialist for Turkish legal content.

TASK: Generate WordPress metadata and SEO assets for a Turkish legal article.

INPUT: Article Title: "{{TITLE}}"

IMPORTANT: Output ONLY the data fields below in EXACTLY this order. No explanations, no extra text. Just the label and value for each field.

===========================================
OUTPUT FORMAT (Copy-Paste Ready):
===========================================

**Image Title:**
[Single descriptive title for featured image, 5-8 words, include main keyword]

**Image Alt Text:**
[Descriptive alt text for accessibility and SEO, 10-15 words, describe what image would show]

**Category:**
[Single primary WordPress category in Turkish, e.g., "Ceza Hukuku", "İş Hukuku", "Borçlar Hukuku"]

**Tags:**
[25 comma-separated tags in Turkish, mix of: main topic, subtopics, legal terms, related concepts, question-based tags]

**Key Topics:**
[8-10 main topics covered in the article, comma-separated]

**Related Terms:**
[15-20 semantically related legal terms for NLP optimization, comma-separated]

**Content Summary:**
[2-3 sentence summary of what the article covers, in Turkish, ~50 words]

**Language Versions:**
Turkish (Primary)

**Target Audience:**
[Specific audience description in Turkish, e.g., "İş kazası mağdurları, işverenler, hukuk öğrencileri, avukatlar"]

**Content Type:**
[One of: Bilgilendirici Rehber / Prosedür Kılavuzu / Hukuki Analiz / Soru-Cevap]

**Primary Entity:**
[Main legal concept/institution, e.g., "İş Kazası Tazminatı", "Boşanma Davası", "Kira Sözleşmesi"]

**Primary Keyword (Rank Math):**
[2-4 word focus keyword, highest search volume term for this topic]

**SEO Title:**
[Exactly 55-60 characters, format: "Primary Keyword: Hook | 2025 Rehber"]

**SEO URL:**
[Lowercase, hyphens, no Turkish characters, max 5 words, e.g., "is-kazasi-tazminat-davasi-rehberi"]

**Meta Description:**
[Exactly 150-155 characters, include primary keyword, end with call-to-action or value proposition]

===========================================
END OF OUTPUT
===========================================

RULES:
1. Output ONLY the fields listed above
2. Maintain EXACT order shown
3. No additional commentary or explanations
4. All content in Turkish except URL slug
5. Make each field copy-paste ready for WordPress
6. Ensure Primary Keyword appears in: SEO Title, Meta Description, Image Alt Text, Tags`;

export const generatePrompt = (title: string) => {
    return [
        {
            title: PROMPT_TITLES.prompt1.title,
            content: PROMPT_1_TEMPLATE.replace(/\{\{TITLE\}\}/g, title)
        },
        {
            title: PROMPT_TITLES.prompt2.title,
            content: PROMPT_2_TEMPLATE.replace(/\{\{TITLE\}\}/g, title)
        },
        {
            title: PROMPT_TITLES.prompt3.title,
            content: PROMPT_3_TEMPLATE.replace(/\{\{TITLE\}\}/g, title)
        },
        {
            title: PROMPT_TITLES.prompt4.title,
            content: PROMPT_4_TEMPLATE.replace(/\{\{TITLE\}\}/g, title)
        }
    ];
};

export const PROMPT_TITLES = {
    prompt1: {
        title: "Prompt 1: Giriş",
        description: "İlk 2000 kelime - Tanım, hukuki dayanak, 18 başlıklı içindekiler tablosu, ilk 6 bölüm"
    },
    prompt2: {
        title: "Prompt 2: Gelişme",
        description: "Orta 2000 kelime - Prosedürler, belgeler, masraflar, içtihatlar (Bölüm 7-14)"
    },
    prompt3: {
        title: "Prompt 3: Sonuç",
        description: "Son 2000 kelime - Güncel gelişmeler, SSS, sonuç (Bölüm 15-18)"
    },
    prompt4: {
        title: "Prompt 4: Metadata",
        description: "WordPress SEO verileri - Rank Math için hazır format"
    }
};
