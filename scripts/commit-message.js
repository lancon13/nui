#!/usr/bin/env node
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */

const { execSync, spawn } = require('child_process')
const fs = require('fs')
const readline = require('readline')

const CONFIG = {
    model: 'qwen2.5-coder:7b',
    endpoint: 'http://192.168.10.200:11434/v1/chat/completions',
    maxRetries: 3
}

/**
 * Validates that the first line matches: type(scope): description
 * or type: description
 */
function validateHeader(msg) {
    const header = msg.split('\n')[0]
    // Pattern: type(optional-scope): description
    const pattern = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.*\))?: .+/
    return pattern.test(header)
}

function cleanMessage(msg) {
    return msg
        .replace(/\*\*/g, '')
        .replace(/###/g, '')
        .replace(/`/g, '')
        .replace(/^commit message:/i, '')
        .trim()
}

async function fetchCommitMessage(diff) {
    const response = await fetch(CONFIG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: CONFIG.model,
            messages: [
                {
                    role: 'system',
                    content: `You are a git assistant. Generate a Conventional Commit (v1.0.0).
                    Format:
                    <type>(<scope>): <description>

                    <body>

                    - <bullet points>

                    Allowed types: feat, fix, docs, style, refactor, perf, test, build, ci, chore.
                    No markdown, no bolding, no conversational filler.`
                },
                { role: 'user', content: `Diff:\n${diff.substring(0, 8000)}` }
            ],
            stream: false
        })
    })

    const data = await response.json()
    return cleanMessage(data.choices[0].message.content)
}

async function main() {
    let diff = ''
    try {
        diff = execSync('git diff --cached').toString()
    } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', '❌ Error: Not a git repository.')
        return
    }

    if (!diff) {
        console.log('\x1b[33m%s\x1b[0m', '⚠️ No staged changes.')
        return
    }

    let commitMsg = ''
    let isValid = false
    let attempts = 0

    while (!isValid && attempts < CONFIG.maxRetries) {
        attempts++
        console.log('\x1b[36m%s\x1b[0m', `🔍 Generating message (Attempt ${attempts}/${CONFIG.maxRetries})...`)

        commitMsg = await fetchCommitMessage(diff)
        isValid = validateHeader(commitMsg)

        if (!isValid) {
            console.log('\x1b[31m%s\x1b[0m', `⚠️ Header failed validation. Retrying...`)
        }
    }

    if (!isValid) {
        console.log('\x1b[31m%s\x1b[0m', '❌ Failed to generate a valid header after multiple attempts.')
        console.log('Last output received:\n', commitMsg)
        process.exit(1)
    }

    console.log(
        `\n\x1b[32m✨ Validated Message:\x1b[0m\n\x1b[90m--------------------------------------------\x1b[0m\n${commitMsg}\n\x1b[90m--------------------------------------------\x1b[0m\n`
    )

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    console.log('\x1b[33mSelect an action:\x1b[0m')
    console.log('1. Commit immediately\n2. Copy to clipboard\n3. Save to file\n4. Cancel')

    rl.question('\nChoose (1-4): ', choice => {
        if (choice === '1') {
            const proc = spawn('git', ['commit', '-F', '-'])
            proc.stdin.write(commitMsg)
            proc.stdin.end()
            proc.on('exit', () => console.log('✅ Committed!'))
        } else if (choice === '2') {
            const cmd = process.platform === 'darwin' ? 'pbcopy' : 'xclip -sel clip'
            const proc = spawn(cmd.split(' ')[0], cmd.split(' ').slice(1))
            proc.stdin.write(commitMsg)
            proc.stdin.end()
            console.log('📋 Copied.')
        } else if (choice === '3') {
            fs.writeFileSync('commit-msg.txt', commitMsg)
            console.log('💾 Saved.')
        }
        rl.close()
    })
}

main()
