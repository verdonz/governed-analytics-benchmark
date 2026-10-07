import { spawn } from 'node:child_process';
import { PromptRecord, AgentResponse } from './types.js';
export async function runCommand(command: string, prompt: PromptRecord): Promise<AgentResponse> {
  return await new Promise((resolve, reject) => {
    const child = spawn(command, { shell: true, stdio: ['pipe', 'pipe', 'pipe'] }); let output = ''; let error = '';
    child.stdout.on('data', (chunk) => { output += chunk; }); child.stderr.on('data', (chunk) => { error += chunk; });
    child.on('error', reject); child.on('close', (code) => { if (code !== 0) reject(new Error(error || `Command exited ${code}`)); else { try { resolve(JSON.parse(output)); } catch { reject(new Error('Command runner returned malformed JSON')); } } });
    child.stdin.end(JSON.stringify(prompt));
  });
}
