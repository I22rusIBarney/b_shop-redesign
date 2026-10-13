import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './demo.css'

type View = 'support' | 'chat' | 'admin'

function Demo() {
  const [view, setView] = useState<View>('support')
  const [tab, setTab] = useState<'open' | 'history'>('open')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState([
    { author: 'them', text: 'Здравствуйте! Чем можем помочь?', time: '00:41' },
    { author: 'me', text: 'На iPhone подключение иногда обрывается.', time: '00:42' },
    { author: 'them', text: 'Понял. Напишите, пожалуйста, какое приложение используете.', time: '00:42' },
  ])

  function send() {
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [...current, { author: 'me', text, time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) }])
    setDraft('')
  }

  return (
    <main className="demo-page">
      <div className="demo-notice"><span className="demo-dot" /> ДЕМО-РЕЖИМ · только тестовые данные · API отключён</div>
      <header className="demo-header">
        <div className="demo-brandmark">Б</div>
        <div className="grow"><div className="demo-brand">BobrGO</div><div className="muted small">Личный кабинет · предпросмотр</div></div>
        <span className="badge accent">UI preview</span>
      </header>

      <div className="demo-switch" role="tablist" aria-label="Выбор экрана">
        <button className={view === 'support' ? 'on' : ''} onClick={() => setView('support')}>Поддержка</button>
        <button className={view === 'chat' ? 'on' : ''} onClick={() => setView('chat')}>Чат</button>
        <button className={view === 'admin' ? 'on' : ''} onClick={() => setView('admin')}>Админка</button>
      </div>

      {view === 'support' && <section className="demo-content stack lg">
        <div className="spread"><div><div className="muted small">ЛИЧНЫЙ КАБИНЕТ</div><h1>Поддержка</h1></div><span className="demo-round-icon">✦</span></div>
        <div className="card demo-ticket-summary">
          <div className="spread"><span className="badge ok">Есть ответ</span><span className="muted tiny">обновлено 2 мин назад</span></div>
          <h2>Не подключается на iPhone</h2>
          <p className="muted small">#1048 · Последнее сообщение от поддержки</p>
          <button className="btn block" onClick={() => setView('chat')}>Открыть обращение <span aria-hidden="true">→</span></button>
        </div>
        <div className="card">
          <div className="card-title"><h2>Мои обращения</h2><span className="badge">2</span></div>
          <div className="chips"><button className={tab === 'open' ? 'chip on' : 'chip'} onClick={() => setTab('open')}>Открытые</button><button className={tab === 'history' ? 'chip on' : 'chip'} onClick={() => setTab('history')}>История</button></div>
          {tab === 'open' ? <button className="demo-list-item" onClick={() => setView('chat')}><span className="demo-list-icon">↗</span><span className="grow"><b>Не подключается на iPhone</b><span className="muted tiny">#1048 · 2 мин назад</span></span><span className="demo-chevron">›</span></button> : <div className="demo-empty">Закрытых обращений пока нет</div>}
          {tab === 'open' && <button className="demo-list-item" onClick={() => setView('chat')}><span className="demo-list-icon">✓</span><span className="grow"><b>Вопрос по подписке</b><span className="muted tiny">#1043 · вчера</span></span><span className="demo-chevron">›</span></button>}
        </div>
        <button className="btn block" onClick={() => setView('chat')}>＋ Новое обращение</button>
        <p className="muted tiny center">Это демонстрация внешнего вида. Кнопки работают только внутри макета.</p>
      </section>}

      {view === 'chat' && <section className="demo-content stack">
        <button className="demo-back" onClick={() => setView('support')}>← Все обращения</button>
        <div><div className="muted small">ОБРАЩЕНИЕ #1048</div><h1>Не подключается на iPhone</h1><div className="row"><span className="badge ok">Открыто</span><span className="muted tiny">Ответ обычно в течение часа</span></div></div>
        <div className="card demo-chat-card"><div className="spread"><b>Переписка</b><span className="badge">Демо</span></div><div className="demo-messages">{messages.map((m, i) => <div className={'msg ' + m.author} key={i}><div className="meta">{m.author === 'me' ? 'Вы' : 'Поддержка'} · {m.time}</div>{m.text}</div>)}</div><div className="demo-composer"><textarea className="input" rows={2} placeholder="Напишите сообщение…" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} /><button className="btn" onClick={send} disabled={!draft.trim()}>Отправить ↑</button></div></div>
        <p className="muted tiny center">Сообщения остаются только в этой вкладке и никуда не отправляются.</p>
      </section>}

      {view === 'admin' && <section className="demo-content stack lg demo-admin">
        <div><div className="muted small">ПАНЕЛЬ ОПЕРАТОРА</div><h1>Обращения</h1></div>
        <div className="kpis"><div className="kpi"><span className="kpi-label">Открытые</span><b>12</b><span className="kpi-sub delta up">+2 сегодня</span></div><div className="kpi"><span className="kpi-label">Ждут ответа</span><b>4</b><span className="kpi-sub muted">требуют внимания</span></div></div>
        <div className="card"><div className="spread"><h2>Последние обращения</h2><span className="badge accent">Демо-данные</span></div>
          {[['Не подключается на iPhone','Алексей · @alex_demo','2 мин назад','Открыто','ok'],['Вопрос по подписке','Мария · @maria_demo','18 мин назад','Ожидает','warn'],['Оплата не прошла','Иван · @ivan_demo','1 ч назад','Открыто','ok']].map((t) => <button className="demo-admin-row" key={t[0]} onClick={() => setView('chat')}><span className="grow"><b>{t[0]}</b><span className="muted tiny">{t[1]}</span><span className="muted tiny">{t[2]}</span></span><span className={'badge ' + t[4]}>{t[3]}</span></button>)}
        </div>
        <p className="muted tiny center">Вымышленные записи. Здесь нет доступа к реальным клиентам или тикетам.</p>
      </section>}

      <nav className="demo-bottom-nav" aria-label="Демо-навигация"><button onClick={() => setView('support')} className={view === 'support' ? 'active' : ''}><span>⌂</span>Главная</button><button onClick={() => setView('support')}><span>▣</span>Подписка</button><button onClick={() => setView('support')} className={view === 'support' || view === 'chat' ? 'active' : ''}><span>◌</span>Поддержка</button><button onClick={() => setView('admin')} className={view === 'admin' ? 'active' : ''}><span>⚙</span>Профиль</button></nav>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<Demo />)
