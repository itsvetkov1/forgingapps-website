#!/usr/bin/env node
/**
 * i18n key parity checker
 * Compares the recursive key structure of lib/i18n/en.ts and lib/i18n/bg.ts.
 * Exits 1 if any keys are missing from either side, 0 if clean.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function getStringLiteralInitializer(node, filePath) {
  if (ts.isStringLiteral(node.initializer) || ts.isNoSubstitutionTemplateLiteral(node.initializer)) {
    return node.initializer.text;
  }

  throw new Error(`Export ${node.name.getText()} in ${filePath} is not a string literal constant`);
}

function loadExportedStringConstants(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const exportsMap = new Map();

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const hasExport = statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
    if (!hasExport) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;
      exportsMap.set(declaration.name.text, getStringLiteralInitializer(declaration, filePath));
    }
  }

  return exportsMap;
}

function buildImportedStringMap(sourceFile, filePath) {
  const importsMap = new Map();

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    if (!statement.importClause?.namedBindings || !ts.isNamedImports(statement.importClause.namedBindings)) continue;

    const specifier = statement.moduleSpecifier.text;
    if (!specifier.startsWith('.')) continue;

    const importedFile = resolve(dirname(filePath), `${specifier}.ts`);
    const exportedStrings = loadExportedStringConstants(importedFile);

    for (const element of statement.importClause.namedBindings.elements) {
      const importedName = (element.propertyName ?? element.name).text;
      const localName = element.name.text;
      const value = exportedStrings.get(importedName);
      if (typeof value !== 'string') {
        throw new Error(`Could not resolve imported string constant ${importedName} from ${importedFile}`);
      }
      importsMap.set(localName, value);
    }
  }

  return importsMap;
}

function getPropertyName(node, importedStrings) {
  if (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) || ts.isNumericLiteral(node.name)) {
    return node.name.text;
  }

  if (ts.isComputedPropertyName(node.name)) {
    const expression = node.name.expression;

    if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
      return expression.text;
    }

    if (ts.isIdentifier(expression)) {
      const resolved = importedStrings.get(expression.text);
      if (typeof resolved === 'string') return resolved;
      throw new Error(`Unsupported computed property identifier: ${expression.text}`);
    }
  }

  throw new Error('Unsupported property key kind: ' + ts.SyntaxKind[node.name.kind]);
}

function collectLeafPathsFromObject(node, importedStrings, prefix = '') {
  const paths = [];

  for (const property of node.properties) {
    if (ts.isSpreadAssignment(property)) {
      throw new Error('Spread properties are not supported in i18n parity objects.');
    }

    if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) {
      throw new Error('Unsupported object member kind: ' + ts.SyntaxKind[property.kind]);
    }

    const key = getPropertyName(property, importedStrings);
    const fullPath = prefix ? `${prefix}.${key}` : key;

    if (ts.isPropertyAssignment(property) && ts.isObjectLiteralExpression(property.initializer)) {
      paths.push(...collectLeafPathsFromObject(property.initializer, importedStrings, fullPath));
      continue;
    }

    paths.push(fullPath);
  }

  return paths;
}

function extractLeafPaths(filePath, exportName) {
  const content = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const importedStrings = buildImportedStringMap(sourceFile, filePath);

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;

    const hasExport = statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
    if (!hasExport) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== exportName) continue;
      if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) {
        throw new Error(`Export ${exportName} is not an object literal in ${filePath}`);
      }
      return collectLeafPathsFromObject(declaration.initializer, importedStrings);
    }
  }

  throw new Error(`Could not find exported object '${exportName}' in ${filePath}`);
}

const enPath = join(root, 'lib/i18n/en.ts');
const bgPath = join(root, 'lib/i18n/bg.ts');

let enLeafPaths, bgLeafPaths;

try {
  enLeafPaths = extractLeafPaths(enPath, 'en');
} catch (e) {
  console.error('ERROR: ' + e.message);
  process.exit(1);
}

try {
  bgLeafPaths = extractLeafPaths(bgPath, 'bg');
} catch (e) {
  console.error('ERROR: ' + e.message);
  process.exit(1);
}

const enKeys = new Set(enLeafPaths);
const bgKeys = new Set(bgLeafPaths);

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
