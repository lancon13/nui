#!/usr/bin/env node
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-require-imports */

const { execSync } = require('child_process')
const fs = require('fs')
const readline = require('readline')

const CONFIG = {
    model: 'qwen2.5-coder:7b',
    endpoint: 'http://192.168.10.200:11434/v1/chat/completions'
}

async function main() {
    // 1. Get the Git Diff
    let diff = ''
    try {
        diff = execSync('git diff --cached').toString()
    } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', '❌ Error: Not a git repository or git not found.')
        return
    }

    if (!diff) {
        console.log('\x1b[33m%s\x1b[0m', "⚠️ No staged changes. Run 'git add' first.")
        return
    }

    console.log('\x1b[36m%s\x1b[0m', `🔍 Analyzing changes with ${CONFIG.model}...`)

    // 2. Call LLM (Using standard fetch - available in Node 18+ and Bun)
    try {
        const response = await fetch(CONFIG.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a git assistant. Generate a Conventional Commit (v1.0.0) message. Return ONLY the message string (e.g., feat(ui): add button). No markdown, no explanations.'
                    },
                    { role: 'user', content: `Diff:\n${diff.substring(0, 5000)}` }
                ],
                stream: false
            })
        })

        const data = await response.json()
        const commitMsg = data.choices[0].message.content.trim().replace(/^["']|["']$/g, '')

        console.log(`\n\x1b[32m✨ Suggested Message:\x1b[0m\n${commitMsg}\n`)

        // 3. Interactive Menu using Readline (Node/Bun compatible)
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        console.log('\x1b[33mSelect an action:\x1b[0m')
        console.log('1. Commit immediately')
        console.log('2. Display & Copy to clipboard')
        console.log('3. Save to commit-msg.txt')
        console.log('4. Cancel')

        rl.question('\nChoose (1-4): ', choice => {
            switch (choice.trim()) {
                case '1':
                    execSync(`git commit -m "${commitMsg}"`)
                    console.log('✅ Committed successfully.')
                    break
                case '2':
                    const copyCmd = process.platform === 'darwin' ? 'pbcopy' : 'xclip -sel clip'
                    try {
                        // Using a shell pipe to copy to clipboard
                        const proc = require('child_process').spawn(copyCmd.split(' ')[0], copyCmd.split(' ').slice(1))
                        proc.stdin.write(commitMsg)
                        proc.stdin.end()
                        console.log(`\nMessage: ${commitMsg}`)
                        console.log('📋 Copied to clipboard.')
                    } catch (e) {
                        console.log(`\nMessage: ${commitMsg}\n(Clipboard copy failed, install xclip/pbcopy)`)
                    }
                    break
                case '3':
                    fs.writeFileSync('commit-msg.txt', commitMsg)
                    console.log('💾 Saved to commit-msg.txt')
                    break
                default:
                    console.log('👋 Cancelled.')
                    break
            }
            rl.close()
        })
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `❌ Connection failed:`, error.message)
        process.exit(1)
    }
}

main()
