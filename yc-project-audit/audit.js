#!/usr/bin/env node
/**
 * YC 项目审计脚本
 * 用法：node audit.js <项目目录>
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const projectDir = args[0] || process.cwd();

console.log('🔍 YC 项目审计');
console.log(`📍 项目目录: ${projectDir}`);
console.log('---\n');

// 第一步：读取关键文件
const readmePath = path.join(projectDir, 'README.md');
const packageJsonPath = path.join(projectDir, 'package.json');

const hasReadme = fs.existsSync(readmePath);
const hasPackageJson = fs.existsSync(packageJsonPath);

let readme = '';
let packageJson = null;

if (hasReadme) {
  readme = fs.readFileSync(readmePath, 'utf-8');
}
if (hasPackageJson) {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
}

// 第二步：生成审计报告
console.log('## 第一轮：The CEO（商业怀疑者）\n');

if (!hasReadme) {
  console.log('❌ 致命伤 0：没有 README.md，连你想做什么都不知道');
} else {
  const hasBusinessModel = readme.toLowerCase().includes('pricing') || 
                           readme.toLowerCase().includes('business') ||
                           readme.toLowerCase().includes('revenue') ||
                           readme.toLowerCase().includes('付费');
  
  if (!hasBusinessModel) {
    console.log('❌ 致命伤 1：没有商业模式——你打算怎么赚钱？');
  }
  
  const hasTargetUser = readme.toLowerCase().includes('user') || 
                        readme.toLowerCase().includes('客户') ||
                        readme.toLowerCase().includes('target');
  
  if (!hasTargetUser) {
    console.log('❌ 致命伤 2：没有明确的目标用户——你在为谁做产品？');
  }
}

console.log('\n## 第二轮：The CTO（技术审计者）\n');

if (!hasPackageJson) {
  console.log('❌ 致命伤 3：没有 package.json，技术栈未知');
} else {
  const deps = Object.keys(packageJson.dependencies || {});
  const devDeps = Object.keys(packageJson.devDependencies || {});
  const allDeps = [...deps, ...devDeps];
  
  const hasHeavyFramework = allDeps.some(d => 
    d.includes('kubernetes') || d.includes('k8s') || 
    d.includes('graphql') || d.includes('redis') ||
    d.includes('postgres') || d.includes('mongodb')
  );
  
  if (hasHeavyFramework && !hasReadme) {
    console.log('❌ 致命伤 4：技术栈过度工程——用重型框架做 MVP，没必要');
  }
}

console.log('\n## 第三轮：The Product Engineer（产品测试者）\n');

console.log('🤔 提示：这一轮需要你手动模拟用户视角');
console.log('   - 用户路径有几步？');
console.log('   - 有没有伪需求功能？');
console.log('   - 核心价值清晰吗？');

console.log('\n---\n');
console.log('## 行动建议');
console.log('\n1. 先补全 README.md，说清楚：给谁用、解决什么问题、怎么赚钱');
console.log('2. 技术栈越简单越好——MVP 不需要考虑扩展性');
console.log('3. 砍掉一半功能，只留最核心的那个');
console.log('\n记住：克制是美德。少就是多。');
