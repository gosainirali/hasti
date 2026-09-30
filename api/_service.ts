import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export function generateLocalFallback(params: any) {
  const {
    experienceType = 'project',
    title = 'A transformative milestone',
    rawExperience = '',
    organization = '',
    role = '',
    keyMetrics = '',
    keyLearnings = '',
    tone = 'authentic_storyteller',
    authorName = 'Alex Morgan',
  } = params;

  const orgStr = organization ? ` with ${organization}` : '';
  const metricsStr = keyMetrics ? ` (${keyMetrics})` : '';
  const cleanTitle = title || 'A transformative milestone';

  const linkedinContent = `Last weekend I took on a challenge that pushed me far outside my comfort zone${orgStr}.

Here is what really happened behind the scenes:

${rawExperience ? rawExperience.slice(0, 300) : 'We spent days testing ideas, running into unexpected roadblocks, and collaborating intensely.'}

3 things this experience taught me:
1. Progress happens at the edge of uncertainty. When things broke, stepping back saved hours of wasted effort.
2. Collaboration beats solo genius every single time. Shared problem solving unlocked solutions none of us could see alone.
3. Done is better than perfect. Shipping a working iteration taught us 10x more than hypothetical planning.

Big thanks to everyone who supported this${metricsStr}.

What’s one recent experience that challenged the way you approach your work?`;

  const singleTweet = `3 key takeaways from ${cleanTitle}${orgStr}:\n\n1. Overcome friction early\n2. Ship small, test fast\n3. Team leverage > solo grinding\n\nFull breakdown below 👇`;

  const thread = [
    `Last week I dived into ${cleanTitle}${orgStr}. Here is the honest breakdown of what we built, what broke, and what I learned 🧵👇`,
    `The initial goal seemed straightforward, but reality hit hard. We had to rethink our architecture within the first 6 hours.\n\nKey lesson: Don't fall in love with the first design. Adapt to feedback.`,
    `What actually moved the needle:${keyMetrics ? `\n• ${keyMetrics}` : '\n• Ruthless prioritization\n• Direct user testing\n• Tight feedback loops'}`,
    `If you're tackling something similar, my #1 advice: focus on the core value proposition first before adding cosmetic features. Keep building! 🚀`,
  ];

  const instagramCaption = `Reflections from ${cleanTitle} ✨\n\nSometimes the most rewarding projects are the ones where you have no idea how you're going to finish in time.\n\nSwipe through for 5 behind-the-scenes slides on our workflow, biggest hurdles, and final results 👉\n\nSave this post for your next big challenge!`;

  return {
    analysis: {
      coreTheme: cleanTitle,
      keyLessons: [
        'Rapid iteration under tight constraints beats perfectionism',
        'Transparent team communication keeps momentum high during setbacks',
        'Documenting learnings while fresh multiplies long-term value',
      ],
      detectedImpact: [
        keyMetrics || 'Successful execution under high-pressure environment',
        'Deepened domain knowledge and practical problem-solving agility',
      ],
      antiCringeFeedback: 'Avoided generic brag statements; focused on concrete lessons and the actual challenge.',
    },
    posts: {
      linkedin: {
        hook: `Last weekend I took on a challenge that pushed me far outside my comfort zone${orgStr}.`,
        content: linkedinContent,
        takeaways: [
          'Progress happens at the edge of uncertainty',
          'Collaboration beats solo genius',
          'Done is better than perfect',
        ],
        hashtags: ['#GrowthMindset', '#LearningInPublic', '#TechCommunity', '#CareerJourney'],
        suggestedMediaPrompt: 'A crisp photo of your team working at a whiteboard or laptops, or a snapshot of the project dashboard.',
        estimatedReadTime: '1.5 min read',
      },
      twitter: {
        singleTweet,
        thread,
        hashtags: ['#buildinpublic', '#tech', '#learning'],
      },
      instagram: {
        caption: instagramCaption,
        carouselSlides: [
          {
            slideNumber: 1,
            title: cleanTitle,
            bulletPoints: ['What happened', 'The challenge', 'Swipe for breakdown 👉'],
            visualNote: 'Bold minimalist title card with high contrast backdrop.',
          },
          {
            slideNumber: 2,
            title: 'The Starting Obstacle',
            bulletPoints: ['Tight timeline', 'Unknown constraints', 'Initial concept pivot'],
            visualNote: 'Split screen showing before/after architecture sketch.',
          },
          {
            slideNumber: 3,
            title: 'What We Actually Shipped',
            bulletPoints: ['Core MVP functional', 'Key metrics achieved', 'Zero downtime'],
            visualNote: 'Product screenshot or photo of hands-on work.',
          },
          {
            slideNumber: 4,
            title: '3 Biggest Takeaways',
            bulletPoints: ['Validate early', 'Communicate constantly', 'Celebrate the grind'],
            visualNote: 'Clean typography layout with checkmark icons.',
          },
          {
            slideNumber: 5,
            title: 'What’s Next?',
            bulletPoints: ['Follow for the next phase', 'Drop your thoughts in comments', 'Save for later'],
            visualNote: 'Call-to-action slide with author avatar.',
          },
        ],
        hashtags: ['#developerlife', '#hackathon', '#techjourney', '#careergoals', '#buildinpublic', '#codingcommunity'],
        visualStyleSuggestion: 'Modern gradient background with dark mode aesthetic and clean sans-serif typography.',
      },
      threads: {
        content: `Still decompressing from ${cleanTitle}. The biggest surprise? The thing we spent 80% of our worry on turned out to be trivial, while a tiny neglected assumption almost cost us everything.\n\nAnyone else had a project where the unexpected bug taught you the biggest lesson?`,
        conversationalPrompt: 'What’s your biggest "unexpected bug" story?',
      },
      portfolio: {
        title: cleanTitle,
        starMethod: {
          situation: `Participated in ${cleanTitle}${orgStr} targeting high-stakes deliverables.`,
          task: `Led development/execution focusing on technical feasibility, teamwork, and delivery.`,
          action: `Designed modular solutions, tackled roadblocks through quick pivots, and collaborated closely with peers.`,
          result: `Delivered successful outcome${metricsStr}, gaining hands-on expertise in end-to-end execution.`,
        },
        oneParagraphSummary: `Spearheaded hands-on participation in ${cleanTitle}${orgStr}. Rapidly navigated ambiguous constraints and delivered measurable results${metricsStr}, demonstrating resilience, rapid problem-solving, and cross-functional leadership.`,
        bulletPoints: [
          `Navigated end-to-end execution for ${cleanTitle}${orgStr}.`,
          `Employed rapid prototyping and iterative feedback to overcome critical project roadblocks.`,
          `Achieved key milestone: ${keyMetrics || 'Shipped functional deliverable ahead of schedule'}.`,
        ],
        tags: [experienceType, 'Problem Solving', 'Leadership', 'Execution'],
      },
    },
  };
}

export async function handleGeneratePosts(req: any, res: any) {
  const {
    experienceType = 'project',
    title = '',
    rawExperience = '',
    role = '',
    organization = '',
    keyMetrics = '',
    keyLearnings = '',
    mentorsOrTeam = '',
    tone = 'authentic_storyteller',
    conceptAngle = 'balanced',
    customPrompt = '',
    authorName = 'Alex Morgan',
    authorTitle = 'Software Engineer & Builder',
  } = req.body || {};

  if (!rawExperience && !title) {
    return res.status(400).json({ error: 'Please provide an experience description or title.' });
  }

  const fallbackData = () =>
    generateLocalFallback({
      experienceType,
      title: title || 'My Recent Experience',
      rawExperience,
      role,
      organization,
      keyMetrics,
      keyLearnings,
      tone,
      conceptAngle,
      authorName,
      authorTitle,
    });

  if (!apiKey) {
    return res.json(fallbackData());
  }

  const systemInstruction = `You are BeaconPost's master social media copywriter and career storytelling strategist.
Your mission is to convert a user's real experience (workshop, seminar, hackathon, internship, college event, project, competition, volunteering activity, conference, certification, or achievement) into AUTHENTIC, compelling, high-converting social media posts across platforms.

STRICT ANTI-CRINGE & AUTHENTICITY PRINCIPLES:
1. Ban cliches: Absolutely NEVER start with "I am thrilled/humbled/excited to announce...", "Proud to share...", "Humbled to be selected...", or "Another feather in the cap".
2. Hook early: The first 1-2 lines must create curiosity, share a counter-intuitive insight, state a surprising number, or describe an in-media-res moment of struggle or learning.
3. Show the messy middle: Highlight the actual problem faced, a bug at 3 AM, confusion during a workshop, or what almost went wrong before the victory. True authenticity wins high engagement.
4. Specificity over platitudes: Use real tools, real numbers, concrete anecdotes instead of vague buzzwords.
5. Credit others: Mention mentors, teammates, or speakers organically.
6. Platform Native Rules:
   - LinkedIn: Clean line breaks (every 1-2 sentences), bold hook, readable spacing, bulleted takeaways with subtle symbols, genuine professional vulnerability, 3-5 relevant industry hashtags at the bottom.
   - X (Twitter): 1 punchy standalone tweet (< 280 characters) PLUS a 4-tweet thread with storytelling flow (Hook -> Obstacle -> Breakthrough/Tech -> Big takeaway + CTA).
   - Instagram: Visual-first caption with friendly emoji accents, clear spacing, carousel slide breakdown (5 slides with Slide title, 2-3 bullets, and visual composition idea), plus 15 curated hashtags.
   - Threads: Conversational, casual, behind-the-scenes, community question at the end to invite replies.
   - Portfolio (STAR method): Situation, Task, Action, Result bulleted summary + 1 executive paragraph ideal for resume or GitHub README.`;

  const promptText = `
EXPERIENCE DETAILS:
- Category / Type: ${experienceType}
- Title / Headline: ${title || 'Unspecified Experience'}
- Organization / Host / College / Company: ${organization || 'N/A'}
- User's Role / Participation: ${role || 'Participant'}
- Raw Experience Description & Notes:
"""${rawExperience}"""
- Key Metrics / Scale / Results: ${keyMetrics || 'None specified'}
- Key Learnings & Takeaways: ${keyLearnings || 'Not explicitly highlighted'}
- Mentors / Teammates / People to thank: ${mentorsOrTeam || 'None specified'}
- Selected Tone: ${tone}
- Concept Angle / Focus: ${conceptAngle}
${customPrompt ? `- Custom Angle / User Directive: "${customPrompt}"` : ''}
- Author Name: ${authorName}
- Author Headline: ${authorTitle}

Generate a comprehensive JSON response containing authentic posts for LinkedIn, Twitter/X, Instagram, Threads, and Portfolio.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.OBJECT,
              properties: {
                coreTheme: { type: Type.STRING },
                keyLessons: { type: Type.ARRAY, items: { type: Type.STRING } },
                detectedImpact: { type: Type.ARRAY, items: { type: Type.STRING } },
                antiCringeFeedback: { type: Type.STRING },
              },
              required: ['coreTheme', 'keyLessons', 'detectedImpact', 'antiCringeFeedback'],
            },
            posts: {
              type: Type.OBJECT,
              properties: {
                linkedin: {
                  type: Type.OBJECT,
                  properties: {
                    hook: { type: Type.STRING },
                    content: { type: Type.STRING },
                    takeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
                    hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                    suggestedMediaPrompt: { type: Type.STRING },
                    estimatedReadTime: { type: Type.STRING },
                  },
                  required: ['hook', 'content', 'takeaways', 'hashtags', 'suggestedMediaPrompt', 'estimatedReadTime'],
                },
                twitter: {
                  type: Type.OBJECT,
                  properties: {
                    singleTweet: { type: Type.STRING },
                    thread: { type: Type.ARRAY, items: { type: Type.STRING } },
                    hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['singleTweet', 'thread', 'hashtags'],
                },
                instagram: {
                  type: Type.OBJECT,
                  properties: {
                    caption: { type: Type.STRING },
                    carouselSlides: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          slideNumber: { type: Type.INTEGER },
                          title: { type: Type.STRING },
                          bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                          visualNote: { type: Type.STRING },
                        },
                        required: ['slideNumber', 'title', 'bulletPoints', 'visualNote'],
                      },
                    },
                    hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                    visualStyleSuggestion: { type: Type.STRING },
                  },
                  required: ['caption', 'carouselSlides', 'hashtags', 'visualStyleSuggestion'],
                },
                threads: {
                  type: Type.OBJECT,
                  properties: {
                    content: { type: Type.STRING },
                    conversationalPrompt: { type: Type.STRING },
                  },
                  required: ['content', 'conversationalPrompt'],
                },
                portfolio: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    starMethod: {
                      type: Type.OBJECT,
                      properties: {
                        situation: { type: Type.STRING },
                        task: { type: Type.STRING },
                        action: { type: Type.STRING },
                        result: { type: Type.STRING },
                      },
                      required: ['situation', 'task', 'action', 'result'],
                    },
                    oneParagraphSummary: { type: Type.STRING },
                    bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['title', 'starMethod', 'oneParagraphSummary', 'bulletPoints', 'tags'],
                },
              },
              required: ['linkedin', 'twitter', 'instagram', 'threads', 'portfolio'],
            },
          },
          required: ['analysis', 'posts'],
        },
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    }
    throw new Error('Empty model response');
  } catch (err: any) {
    console.warn('Gemini temporary error, serving synthesized fallback:', err.message);
    return res.json(fallbackData());
  }
}

export async function handleRefinePost(req: any, res: any) {
  const { platform, currentContent, instruction } = req.body || {};

  if (!currentContent || !instruction) {
    return res.status(400).json({ error: 'currentContent and instruction are required' });
  }

  if (!apiKey) {
    return res.json({
      refinedContent: `${currentContent}\n\n[Refined with instruction: ${instruction}]`,
      changesMade: `Applied "${instruction}" to draft.`,
    });
  }

  const prompt = `Refine this ${platform} social post according to this instruction: "${instruction}".
Keep the formatting native to ${platform}. Avoid cringe humblebrag expressions. Return JSON with 'refinedContent' and 'changesMade'.

Current Post:
"""
${currentContent}
"""`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            refinedContent: { type: Type.STRING },
            changesMade: { type: Type.STRING },
          },
          required: ['refinedContent', 'changesMade'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error refining post:', error);
    return res.json({
      refinedContent: `${currentContent}\n\n[Refined: ${instruction}]`,
      changesMade: `Adapted tone for ${platform}`,
    });
  }
}

export async function handleSuggestHooks(req: any, res: any) {
  const { title = '', rawExperience = '', platform = 'linkedin' } = req.body || {};

  const defaultHooks = [
    { type: 'contrarian', text: `Most people assume ${title || 'this experience'} was smooth. In reality, hour 14 almost broke us.` },
    { type: 'metric_first', text: `36 hours, 0 sleep, and 1 prototype that actually worked.` },
    { type: 'story', text: `At 2:45 AM, our main API endpoint failed. Here's what we did next.` },
    { type: 'vulnerable', text: `I used to dread stepping outside my comfort zone. Last week proved me wrong.` },
    { type: 'question', text: `What's the hardest lesson you learned in your first major project? Mine came fast.` },
  ];

  if (!apiKey) {
    return res.json({ hooks: defaultHooks });
  }

  const prompt = `Generate 5 distinctly different opening hooks for a ${platform} post about this experience:
Title: ${title}
Context: ${rawExperience}

Rules:
- No "I am excited to share" or "Thrilled to announce".
- Hooks should hook readers in the first sentence.
- Return JSON with a list of hooks with 'type' (story | contrarian | metric_first | vulnerable | question) and 'text'.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hooks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  text: { type: Type.STRING },
                },
                required: ['type', 'text'],
              },
            },
          },
          required: ['hooks'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{"hooks":[]}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error suggesting hooks:', error);
    return res.json({ hooks: defaultHooks });
  }
}
