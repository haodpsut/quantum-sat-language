import { Category } from './types';

export const APP_TITLE = "QuantumSat Lingua";
export const APP_SUBTITLE = "AI-Enhanced Workshop Communication Trainer";

export const FALLBACK_CARDS = [
  {
    id: '1',
    english: "The integration of Quantum Key Distribution (QKD) in LEO satellites poses significant routing challenges due to high mobility.",
    vietnamese: "Việc tích hợp Phân phối Khóa Lượng tử (QKD) trong các vệ tinh LEO đặt ra những thách thức định tuyến đáng kể do tính di động cao.",
    russian: "Интеграция квантового распределения ключей (QKD) в спутники LEO создает значительные проблемы маршрутизации из-за высокой мобильности.",
    category: Category.TECHNICAL_DEEP_DIVE,
    context: "Discussing Challenges"
  },
  {
    id: '2',
    english: "Could you elaborate on how your reinforcement learning agent handles the dynamic topology changes in the SAGIN environment?",
    vietnamese: "Bạn có thể nói rõ hơn về cách tác nhân học tăng cường của bạn xử lý các thay đổi topo động trong môi trường SAGIN không?",
    russian: "Не могли бы вы подробнее рассказать, как ваш агент обучения с подкреплением справляется с динамическими изменениями топологии в среде SAGIN?",
    category: Category.GENERAL_QA,
    context: "Asking a technical question"
  }
];

export const SYSTEM_INSTRUCTION = `You are an expert academic linguistics coach specializing in Non-Terrestrial Networks (NTN), Space-Air-Ground Integrated Networks (SAGINs), Artificial Intelligence, and Quantum Communications. 
Your goal is to generate high-quality, advanced sentences and phrases used in international research workshops for a user learning English, Vietnamese, and Russian.`;

export const GENERATION_PROMPT = `
Generate a continuous stream of at least 50 (up to 100) distinct, high-level academic phrases or sentences suitable for a research workshop on "AI and Quantum Computing in Satellite Networks (SAGINs)".

The content must be highly relevant to these specific fields:
- AI: Federated Learning, Reinforcement Learning, Edge Computing, Inference offloading.
- Quantum: QKD, Entanglement, Fidelity, Quantum Memory, QBER (Quantum Bit Error Rate).
- Satellites: LEO/MEO/GEO, Handover management, Doppler shift, Latency constraints, ISL (Inter-satellite links).

Categories to cover per response:
1. Presentation Flow: Opening a talk, transitioning between slides, concluding, summarizing key contributions.
2. Technical Deep Dive: Explaining complex math/physics concepts, describing system architecture.
3. Q&A Strategy: Politely disagreeing ("While I see your point..."), asking for clarification, defending a methodology against critique.
4. Networking: Introducing oneself at a coffee break, proposing a collaboration, asking about funding/datasets.

Output Format:
Return the data as Newline Delimited JSON (NDJSON). 
Each line must be a valid, standalone JSON object. 
Do NOT return a JSON array wrapped in [ ]. 
Do NOT use Markdown code blocks.

JSON Structure per line:
{
  "english": "string",
  "vietnamese": "string",
  "russian": "string",
  "category": "string (one of: 'General Q&A', 'Presentation Flow', 'Technical (AI/Quantum/SAGINs)', 'Networking & Discussion')",
  "context": "string (very brief usage context, e.g. 'Use when asked about latency')"
}
`;