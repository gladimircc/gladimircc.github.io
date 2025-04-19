// gerar-arvore.mjs
import fs from 'node:fs';
import path from 'node:path';
import { globby } from 'globby';

const IGNORED_FILES = ['index.html', 'files.json', 'gerar-arvore.js', 'gerar-arvore.mjs', 'package.json', 'package-lock.json'];

function buildTree(basePath, entries) {
  const tree = [];

  for (const entry of entries) {
    const relativePath = path.relative(basePath, entry);
    const parts = relativePath.split(path.sep);
    insertEntry(tree, parts, entry);
  }

  return tree;
}

function insertEntry(tree, parts, fullPath) {
  const name = parts[0];

  if (parts.length === 1) {
    const stat = fs.statSync(fullPath);
    const item = {
      name,
      path: fullPath.replace(/\\/g, '/'),
      type: stat.isDirectory() ? 'folder' : 'file'
    };
    if (!tree.find(e => e.name === name)) tree.push(item);
    return;
  }

  let folder = tree.find(e => e.name === name && e.type === 'folder');
  if (!folder) {
    folder = { name, path: path.join(...parts.slice(0, -1)).replace(/\\/g, '/'), type: 'folder', children: [] };
    tree.push(folder);
  }

  insertEntry(folder.children, parts.slice(1), fullPath);
}

(async () => {
  const entries = await globby(['**/*', '!**/node_modules/**', '!**/.git/**', '!.github/**'], { onlyFiles: false });

  const filteredEntries = entries.filter(entry => {
    const base = path.basename(entry).toLowerCase();
    return !IGNORED_FILES.includes(base);
  });

  const fullPaths = filteredEntries.map(p => path.resolve(p));
  const tree = buildTree(process.cwd(), fullPaths);

  fs.writeFileSync('files.json', JSON.stringify(tree, null, 2));
  console.log('✅ Arquivo files.json gerado com sucesso!');
})();
