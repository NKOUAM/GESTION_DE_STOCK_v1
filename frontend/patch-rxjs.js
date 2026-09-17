const fs = require('fs');
const path = require('path');

const esmDir = path.join(__dirname, 'node_modules/rxjs/dist/esm5');
let count = 0;

function patchFile(filePath) {
  const before = fs.readFileSync(filePath, 'utf8');
  const after = before.replace(/(from\s+["'])(\.\.?\/[^"']+)(["'])/g, (m, p1, imp, p3) => {
    if (imp.endsWith('.js') || imp.endsWith('.json')) return m;
    const dir = path.dirname(filePath);
    if (fs.existsSync(path.join(dir, imp + '.js'))) return p1 + imp + '.js' + p3;
    if (fs.existsSync(path.join(dir, imp, 'index.js'))) return p1 + imp + '/index.js' + p3;
    return m;
  });
  if (after !== before) {
    fs.writeFileSync(filePath, after);
    count++;
  }
}

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.js')) patchFile(full);
  }
}

walk(esmDir);
console.log('Fichiers patchés : ' + count);
