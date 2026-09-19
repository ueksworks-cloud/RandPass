import { useEffect, useRef, useState } from 'react'
import { MAX_LENGTH, MIN_LENGTH, generatePassword } from './password'

const DEFAULT_LENGTH = 12

function App() {
  const [length, setLength] = useState(DEFAULT_LENGTH)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState(() => generatePassword(DEFAULT_LENGTH, false))
  const [copyStatus, setCopyStatus] = useState('')
  const feedbackTimer = useRef<number | undefined>(undefined)

  useEffect(
    () => () => {
      window.clearTimeout(feedbackTimer.current)
    },
    [],
  )

  const generate = () => {
    setPassword(generatePassword(length, includeSymbols))
    setCopyStatus('')
    window.clearTimeout(feedbackTimer.current)
  }

  const copyPassword = async () => {
    window.clearTimeout(feedbackTimer.current)
    try {
      await navigator.clipboard.writeText(password)
      setCopyStatus('コピーしました')
    } catch {
      setCopyStatus('コピーできませんでした')
    }
    feedbackTimer.current = window.setTimeout(() => setCopyStatus(''), 2500)
  }

  return (
    <main className="page-shell">
      <section className="generator-card" aria-labelledby="page-title">
        <header className="card-header">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M7.5 10V7a4.5 4.5 0 0 1 9 0v3M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
              <path d="M12 14v3" />
            </svg>
          </div>
          <div>
            <p className="eyebrow">SECURE · LOCAL · PRIVATE</p>
            <h1 id="page-title">Password Generator</h1>
          </div>
        </header>

        <div className="result-panel" aria-label="生成されたパスワード">
          <p className="result-label">生成されたパスワード</p>
          <output className="password-output">{password}</output>
        </div>

        <div className="settings">
          <div className="setting-heading">
            <label htmlFor="length">文字数</label>
            <output className="length-value" htmlFor="length">
              {length}<span>文字</span>
            </output>
          </div>
          <input
            id="length"
            className="length-slider"
            type="range"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
          />
          <div className="range-labels" aria-hidden="true">
            <span>{MIN_LENGTH}</span>
            <span>{MAX_LENGTH}</span>
          </div>

          <div className="divider" />

          <label className="toggle-row" htmlFor="symbols">
            <span>
              <span className="toggle-title">記号を含める</span>
              <span className="toggle-description">! @ # $ % ^ &amp; * など</span>
            </span>
            <span className="switch">
              <input
                id="symbols"
                type="checkbox"
                checked={includeSymbols}
                onChange={(event) => setIncludeSymbols(event.target.checked)}
              />
              <span className="switch-track" aria-hidden="true" />
            </span>
          </label>
        </div>

        <div className="actions">
          <button className="button button-primary" type="button" onClick={generate}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4" />
            </svg>
            生成
          </button>
          <button className="button button-secondary" type="button" onClick={copyPassword}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="8" y="8" width="11" height="11" rx="2" />
              <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
            コピー
          </button>
        </div>

        <p className="copy-feedback" role="status" aria-live="polite">
          {copyStatus}
        </p>
        <p className="privacy-note">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6L12 3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          パスワードはこの端末内だけで生成され、保存・送信されません
        </p>
      </section>
    </main>
  )
}

export default App
