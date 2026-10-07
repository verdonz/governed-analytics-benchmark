export type ContextMode = 'raw' | 'documented' | 'governed';
export type AgentResponse = { answer?: unknown; metric?: string; sql?: string; evidence?: string[]; reasoningSummary?: string; permissionDecision?: 'allow' | 'deny' | 'aggregate' };
export type PromptRecord = { benchmarkVersion: string; datasetVersion: string; questionId: string; question: string; contextMode: ContextMode; context: string; responseSchema: string; modelSettings: { temperature: number; maxTokens: number }; };
export type EvaluatedResult = { questionId: string; category: string; score: number; components: Record<string, number>; failures: string[]; response: AgentResponse; expected: unknown; };
