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

// Base instructions for format
const BASE_FORMAT_INSTRUCTION = `
Output Format:
Return the data as Newline Delimited JSON (NDJSON). 
Each line must be a valid, standalone JSON object.
Do NOT return a JSON array. 
Do NOT use Markdown code blocks.

JSON Structure per line:
{
  "english": "string",
  "vietnamese": "string",
  "russian": "string",
  "category": "string (one of: 'General Q&A', 'Presentation Flow', 'Technical (AI/Quantum/SAGINs)', 'Networking & Discussion')",
  "context": "string (very brief usage context)"
}
`;

// Parallel Prompt 1: Soft Skills & Flow
export const PROMPT_FLOW_NETWORKING = `
Generate 20 distinct academic phrases focusing ONLY on:
1. Presentation Flow: Opening a talk, transitioning slides, summarizing contributions, handling interruptions.
2. Networking & Discussion: Introducing research interests, proposing collaboration, asking about datasets/funding.
3. General Q&A: Politely disagreeing, asking for clarification.
Start generating immediately.
${BASE_FORMAT_INSTRUCTION}
`;

// Parallel Prompt 2: Technical AI & Satellites
export const PROMPT_TECH_AI_SAT = `
Generate 20 distinct advanced sentences focusing ONLY on:
1. AI in Satellites: Federated Learning, Edge Computing, Inference Offloading, Reinforcement Learning for routing.
2. Satellite Networks (NTN/SAGINs): LEO/MEO/GEO constellation management, Doppler shift, Handover, Latency constraints.
Start generating immediately.
${BASE_FORMAT_INSTRUCTION}
`;

// Parallel Prompt 3: Technical Quantum & Security
export const PROMPT_TECH_QUANTUM = `
Generate 20 distinct advanced sentences focusing ONLY on:
1. Quantum Communications: QKD (Quantum Key Distribution), Entanglement, Fidelity, Quantum Memory, QBER.
2. Security & Physics: Optical links, atmospheric turbulence, beam divergence, secure key rates.
Start generating immediately.
${BASE_FORMAT_INSTRUCTION}
`;
