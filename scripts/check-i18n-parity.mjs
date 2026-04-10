#!/usr/bin/env node
/**
 * i18n key parity checker
 * Compares the recursive key structure of lib/i18n/en.ts and lib/i18n/bg.ts.
 * Exits 1 if any keys are missing from either side, 0 if clean.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function extractObject(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const startIdx = content.indexOf('{');
  if (startIdx === -1) throw new Error('No object literal found in: ' + filePath);
  const objStr = content.slice(startIdx).replace(/;\s*$/, '').trim();
  try {
    return new Function('return ' + objStr)();
  } catch (e) {
    throw new Error('Failed to evaluate object in ' + filePath + ': ' + e.message);
  }
}

function getLeafPaths(obj, prefix) {
  prefix = prefix || '';
  const paths = [];
  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? prefix + '.' + key : key;
    const val = obj[key];
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      paths.push(...getLeafPaths(val, fullPath));
    } else {
      paths.push(fullPath);
    }
  }
  return paths;
}

const enPath = join(root, 'lib/i18n/en.ts');
const bgPath = join(root, 'lib/i18n/bg.ts');

let enObj, bgObj;

try {
  enObj = extractObject(enPath);
} catch (e) {
  console.error('ERROR: ' + e.message);
  process.exit(1);
}

try {
  bgObj = extractObject(bgPath);
} catch (e) {
  console.error('ERROR: ' + e.message);
  process.exit(1);
}

const enKeys = new Set(getLeafPaths(enObj));
const bgKeys = new Set(getLeafPaths(bgObj));

const missingInBg = [...enKeys].filter(k => !bgKeys.has(k));
const missingInEn = [...bgKeys].filter(k => !enKeys.has(k));

if (missingInBg.length > 0) {
  console.log('');
  console.log(missingInBg.length + ' key(s) MISSING in bg.ts:');
  for (const key of missingInBg) {
    console.log('  MISSING in bg.ts: ' + key);
  }
}

if (missingInEn.length > 0) {
  console.log('');
  console.log(missingInEn.length + ' key(s) MISSING in en.ts:');
  for (const key of missingInEn) {
    console.log('  MISSING in en.ts: ' + key);
  }
}

const totalMismatches = missingInBg.length + missingInEn.length;

if (totalMismatches === 0) {
  console.log('[PASS] i18n parity OK — ' + enKeys.size + ' keys, both locales in sync.');
  process.exit(0);
} else {
  console.log('');
  console.log('[FAIL] i18n parity FAILED — ' + totalMismatches + ' mismatch(es). Fix before building.');
  process.exit(1);
}
