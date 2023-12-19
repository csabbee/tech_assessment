import { readdir } from 'node:fs/promises'
import path from 'path'

void (async () => {
  try {
    const files = await readdir('./src', { recursive: true })
    const testFiles = files.filter((fileName) => fileName.includes('test.ts'))
    await Promise.all(
      testFiles.map((fileName) => {
        const filePath = path.resolve(__dirname, 'src', fileName)
        return import(filePath)
      })
    )
  } catch (e) {
    console.log('error')
  }
})()
