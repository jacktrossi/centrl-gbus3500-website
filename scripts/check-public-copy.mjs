import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const skipDirs = new Set(['node_modules', '.git', 'scripts', 'dist', 'public']);
const exts = new Set(['.html', '.css', '.js', '.ts', '.tsx', '.svg', '.txt', '.xml', '.md', '.toml']);

const rules = [
  [/gbus/i, 'course code'],
  [/ole miss/i, 'school name'],
  [/coursework/i, 'coursework'],
  [/simulation/i, 'simulation'],
  [/five-year founder/i, 'program name'],
  [/five year founder/i, 'program name'],
  [/brand score/i, 'internal score'],
  [/\bswot\b/i, 'swot'],
  [/cal\.com/i, 'cal.com'],
  [/\barr\b/, 'ARR'],
  [/mentor feedback/i, 'mentor feedback'],
  [/\$73/, 'internal finance'],
  [/73\s?m/i, 'internal finance'],
  [/contribution margin/i, 'internal finance'],
  [/variable cost/i, 'internal finance'],
  [/lorem ipsum/i, 'placeholder copy'],
  [/\belevate\b/i, 'banned hype'],
  [/\bseamless\b/i, 'banned hype'],
  [/\bunleash\b/i, 'banned hype'],
  [/\u2014/, 'em dash'],
  [/\u2013/, 'en dash'],
  [/\bstrand\b/i, 'reference brand'],
  [/font-weight:\s*900/, 'ultra bold'],
  [/font-family:[^;]*inter/i, 'Inter'],
  [/font-family:[^;]*roboto/i, 'Roboto'],
];

const hits = [];
const fontRules = rules.filter(([, label]) => label === 'Inter' || label === 'Roboto' || label === 'ultra bold');
const copyRules = rules.filter((rule) => !fontRules.includes(rule));

function walk(dir, activeRules) {
  for (const entry of readdirSync(dir)) {
    if (skipDirs.has(entry) || entry === 'assets') continue;
    const full = path.join(dir, entry);
    const info = statSync(full);
    if (info.isDirectory()) {
      walk(full, activeRules);
      continue;
    }
    if (!exts.has(path.extname(entry))) continue;
    const text = readFileSync(full, 'utf8');
    text.split('\n').forEach((line, index) => {
      for (const [rule, label] of activeRules) {
        if (rule.test(line)) {
          const sample = line.trim().slice(0, 180);
          hits.push(`${path.relative(root, full)}:${index + 1} [${label}] ${sample}`);
        }
      }
    });
  }
}

walk(root, rules);
walk(path.join(root, 'public'), copyRules);
walk(path.join(root, 'dist'), copyRules);

if (hits.length) {
  console.error('Public copy check failed:\n' + hits.join('\n'));
  process.exit(1);
}

console.log('Public copy check passed.');
