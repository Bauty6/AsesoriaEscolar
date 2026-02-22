const fs = require('fs');

const filePath = '/Users/bauty.6/asesoriaescolar/src/components/Formularioasesoria.jsx';
const content = fs.readFileSync(filePath, 'utf8');

let braces = 0;
let parens = 0;
let brackets = 0;

let stack = [];

for (let i = 0; i < content.length; i++) {
    const char = content[i];

    // Simple check ignoring strings/comments for now (imperfect but helpful)
    // To follow properly we'd need a parser, but let's see if count is off.

    if (char === '{') {
        braces++;
        stack.push({ char, index: i, line: content.substring(0, i).split('\n').length });
    } else if (char === '}') {
        braces--;
        if (stack.length > 0 && stack[stack.length - 1].char === '{') {
            stack.pop();
        } else {
            console.log(`Unexpected } at line ${content.substring(0, i).split('\n').length}`);
        }
    } else if (char === '(') {
        parens++;
        stack.push({ char, index: i, line: content.substring(0, i).split('\n').length });
    } else if (char === ')') {
        parens--;
        if (stack.length > 0 && stack[stack.length - 1].char === '(') {
            stack.pop();
        } else {
            console.log(`Unexpected ) at line ${content.substring(0, i).split('\n').length}`);
        }
    } else if (char === '[') {
        brackets++;
        stack.push({ char, index: i, line: content.substring(0, i).split('\n').length });
    } else if (char === ']') {
        brackets--;
        if (stack.length > 0 && stack[stack.length - 1].char === '[') {
            stack.pop();
        } else {
            console.log(`Unexpected ] at line ${content.substring(0, i).split('\n').length}`);
        }
    }
}

console.log(`Braces: ${braces}`);
console.log(`Parens: ${parens}`);
console.log(`Brackets: ${brackets}`);

if (stack.length > 0) {
    console.log("Unclosed items:");
    stack.forEach(s => console.log(`${s.char} at line ${s.line}`));
}
