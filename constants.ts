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
Your goal is to generate high-quality, advanced sentences and phrases used in international research workshops.`;

export const GENERATION_PROMPT = `
Generate 50 distinct, high-level academic phrases or sentences suitable for a research workshop on "AI and Quantum Computing in Satellite Networks (SAGINs)".

Topics to cover:
1. Presentation flow (opening, transitioning, concluding).
2. Technical explanations (specifically mentioning terms like QKD, Entanglement, Federated Learning, LEO/GEO, Latency, Doppler shift, Beamforming).
3. Q&A interaction (politely disagreeing, asking for clarification, defending a thesis).
4. Networking (introducing oneself, proposing collaboration).

Output Format:
Return the data as Newline Delimited JSON (NDJSON). 
Each line must be a valid, standalone JSON object. 
Do NOT return a JSON array wrapped in [ ]. 
Do NOT use Markdown code blocks (like \`\`\`json). 
Just raw JSON objects separated by newlines.

JSON Structure per line:
{
  "english": "string",
  "vietnamese": "string",
  "russian": "string",
  "category": "string (one of: 'General Q&A', 'Presentation Flow', 'Technical (AI/Quantum/SAGINs)', 'Networking & Discussion')",
  "context": "string (brief usage context)"
}
`;