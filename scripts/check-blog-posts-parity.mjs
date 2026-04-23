#!/usr/bin/env node
/**
 * Blog posts i18n parity checker
 * Compares the top-level slug keys exported by lib/i18n/blog-posts-en.ts and
 * lib/i18n/blog-posts-bg.ts, and verifies that each matched post has the
 * expected shape (title, date, author, category, intro, sections array).
 * Exits 1 if any slug is missing from either side or any required field is
 * missing; exits 0 when both locales are in sync.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const REQUIRED_POST_FIELDS = ['title', 'date', 'author', 'category', 'intro', 'sections'];

function getPropertyKey(prop) {
  if (!prop.name) return null;
  if (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) || ts.isNoSubstitutionTemplateLiteral(prop.name)) {
    return prop.name.text;
  }
  return null;
}

function collectPostSlugsAndFields(filePath, exportName) {
  const content = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const posts = new Map();

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const hasExport = statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!hasExport) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== exportName) continue;
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
      for (const prop of declaration.initializer.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const slug = getPropertyKey(prop);
        if (!slug) continue;
        if (!ts.isObjectLiteralExpression(prop.initializer)) continue;
        const fields = new Set();
        for (const inner of prop.initializer.properties) {
          if (!ts.isPropertyAssignment(inner) && !ts.isShorthandPropertyAssignment(inner)) continue;
          const key = getPropertyKey(inner);
          if (key) fields.add(key);
        }
        posts.set(slug, fields);
      }
      return posts;
    }
  }
  throw new Error(`Could not find exported object '${exportName}' in ${filePath}`);
}

const enPath = join(root, 'lib/i18n/blog-posts-en.ts');
const bgPath = join(root, 'lib/i18n/blog-posts-bg.ts');

let enPosts, bgPosts;
try {
  enPosts = collectPostSlugsAndFields(enPath, 'blogPostsEn');
  bgPosts = collectPostSlugsAndFields(bgPath, 'blogPostsBg');
} catch (err) {
  console.error('ERROR: ' + err.message);
  process.exit(1);
}

const enSlugs = new Set(enPosts.keys());
const bgSlugs = new Set(bgPosts.keys());

const missingInBg = [...enSlugs].filter((s) => !bgSlugs.has(s));
const missingInEn = [...bgSlugs].filter((s) => !enSlugs.has(s));

const fieldIssues = [];
for (const slug of enSlugs) {
  if (!bgSlugs.has(slug)) continue;
  for (const field of REQUIRED_POST_FIELDS) {
    if (!enPosts.get(slug).has(field)) fieldIssues.push(`${slug}.en missing '${field}'`);
    if (!bgPosts.get(slug).has(field)) fieldIssues.push(`${slug}.bg missing '${field}'`);
  }
}

let failed = false;
if (missingInBg.length > 0) {
  failed = true;
  console.log('');
  console.log(missingInBg.length + ' slug(s) MISSING in blog-posts-bg.ts:');
  for (const slug of missingInBg) console.log('  MISSING in bg: ' + slug);
}
if (missingInEn.length > 0) {
  failed = true;
  console.log('');
  console.log(missingInEn.length + ' slug(s) MISSING in blog-posts-en.ts:');
  for (const slug of missingInEn) console.log('  MISSING in en: ' + slug);
}
if (fieldIssues.length > 0) {
  failed = true;
  console.log('');
  console.log(fieldIssues.length + ' required-field issue(s):');
  for (const issue of fieldIssues) console.log('  FIELD: ' + issue);
}

if (!failed) {
  console.log('[PASS] blog posts parity OK  ' + enSlugs.size + ' slugs, both locales in sync.');
  process.exit(0);
} else {
  console.log('');
  console.log('[FAIL] blog posts parity FAILED. Fix before shipping.');
  process.exit(1);
}
