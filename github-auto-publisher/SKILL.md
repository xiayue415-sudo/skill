---
name: github-auto-publisher
description: 自动发布 skill 到 GitHub。当用户说"上传"、"同步到 GitHub"、"发布新 skill"、"push to github"等关键词时，自动将 skill-for-claude 目录的内容提交并推送到 GitHub。无需手动操作，安静后台执行，完成后返回 GitHub 仓库链接。
---

# GitHub Auto Publisher

自动将 skill 发布到 GitHub 的 skill。

## 什么时候使用

当用户说以下内容时使用：
- "上传"
- "同步到 GitHub"
- "发布新 skill"
- "push to github"
- "git push"
- "提交到 GitHub"
- "更新 GitHub"

## 工作流程

### 1. 检查环境

首先确认：
- `skill-for-claude/` 目录存在
- 该目录是一个 Git 仓库
- Git 配置正确（user.name 和 user.email）

### 2. 执行 Git 操作

在 `skill-for-claude/` 目录下执行：

```bash
git add .
git commit -m "Auto update by OpenClaw - $(date +"%Y-%m-%d %H:%M")"
git push origin main
```

### 3. 处理结果

**成功时：**
- 返回成功消息
- 提供 GitHub 仓库链接：https://github.com/xiayue415-sudo/skill-for-cluade

**失败时：**
- 明确指出失败原因
- 提供解决建议

## 输出格式

### 成功时

```
✅ 成功发布到 GitHub！

🚀 已完成：
- git add .
- git commit -m "Auto update by OpenClaw"
- git push origin main

🔗 查看你的仓库：
https://github.com/xiayue415-sudo/skill-for-cluade
```

### 失败时

```
❌ 发布失败

原因：[具体错误信息]

建议：
- [解决建议1]
- [解决建议2]
```

## 注意事项

- 只操作 `skill-for-claude/` 目录
- 安静执行，不要输出太多中间过程
- 如果没有新内容（nothing to commit），也要告知用户
- 不要泄露任何敏感信息（如 token、密码等）
