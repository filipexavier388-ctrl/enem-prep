'use client'
import { useState, useEffect } from 'react'

const AREAS = [
  {
    id: 'ling', name: 'Linguagens', cor: '#5b8fff',
    topicos: [
      { id: 'l1', nome: 'Interpretação de texto', prio: 'Alta', desc: 'Tese, argumento e intenção do autor em gêneros variados', prof: 'Prof. Noslen' },
      { id: 'l2', nome: 'Coesão e coerência', prio: 'Alta', desc: 'Conectivos, retomadas pronominais e progressão temática', prof: 'Prof. Noslen' },
      { id: 'l3', nome: 'Regência verbal e nominal', prio: 'Média', desc: 'Verbos de regência dupla e uso de preposição', prof: 'Prof. Noslen' },
      { id: 'l4', nome: 'Concordância verbal/nominal', prio: 'Média', desc: 'Casos especiais de sujeito composto e coletivos', prof: 'Prof. Noslen' },
      { id: 'l5', nome: 'Funções da linguagem', prio: 'Alta', desc: 'Referencial, emotiva, poética, fática, conativa, metalinguística', prof: 'Prof. Noslen' },
      { id: 'l6', nome: 'Variação linguística', prio: 'Alta', desc: 'Registros formal, informal, regional e histórico', prof: 'Prof. Noslen' },
      { id: 'l7', nome: 'Intertextualidade', prio: 'Alta', desc: 'Paródia, citação, alusão', prof: 'Prof. Noslen' },
      { id: 'l8', nome: 'Modernismo', prio: 'Alta', desc: 'Características estéticas, ruptura com o parnasianismo', prof: 'Descomplica' },
      { id: 'l9', nome: 'Realismo / Naturalismo', prio: 'Alta', desc: 'Crítica social, determinismo, Machado de Assis', prof: 'Descomplica' },
      { id: 'l10', nome: 'Redação — estrutura', prio: 'Alta', desc: 'Introdução, desenvolvimento, conclusão', prof: 'Daniela Garcia' },
      { id: 'l11', nome: 'Proposta de intervenção', prio: 'Alta', desc: 'Agente + ação + modo + finalidade', prof: 'Daniela Garcia' },
      { id: 'l12', nome: 'Repertório sociocultural', prio: 'Alta', desc: 'Filosofia, sociologia, dados — como usar', prof: 'Daniela Garcia' },
    ],
  },
  {
    id: 'hum', name: 'Ciências Humanas', cor: '#34d399',
    topicos: [
      { id: 'h1', nome: 'Era Vargas e Brasil República', prio: 'Alta', desc: 'Proclamação, coronelismo, tenentismo, Era Vargas', prof: 'Débora Aladim' },
      { id: 'h2', nome: 'Ditadura militar (1964–1985)', prio: 'Alta', desc: 'AI-5, milagre econômico, abertura política', prof: 'Parabólica' },
      { id: 'h3', nome: 'Redemocratização / CF 1988', prio: 'Alta', desc: 'Diretas Já, constituinte, avanços de direitos', prof: 'Parabólica' },
      { id: 'h4', nome: '2ª Guerra Mundial', prio: 'Alta', desc: 'Totalitarismo, nazismo, consequências globais', prof: 'Parabólica' },
      { id: 'h5', nome: 'Guerra Fria', prio: 'Alta', desc: 'Bipolaridade, corrida armamentista', prof: 'Parabólica' },
      { id: 'h6', nome: 'Geopolítica contemporânea', prio: 'Alta', desc: 'Blocos econômicos, BRICS, conflitos recentes', prof: 'Descomplica' },
      { id: 'h7', nome: 'Urbanização brasileira', prio: 'Alta', desc: 'Metropolização, periferização, déficit habitacional', prof: 'Descomplica' },
      { id: 'h8', nome: 'Problemas ambientais globais', prio: 'Alta', desc: 'Aquecimento global, desmatamento, recursos hídricos', prof: 'Descomplica' },
      { id: 'h9', nome: 'Contrato social e Estado', prio: 'Alta', desc: 'Rousseau, Locke, Hobbes', prof: 'Parabólica' },
      { id: 'h10', nome: 'Movimentos sociais', prio: 'Alta', desc: 'Feminismo, LGBTQIA+, MST, direitos civis', prof: 'Parabólica' },
      { id: 'h11', nome: 'Trabalho e capitalismo', prio: 'Alta', desc: 'Marx, alienação, mais-valia, precarização', prof: 'Parabólica' },
      { id: 'h12', nome: 'Globalização e desigualdade', prio: 'Alta', desc: 'Fluxos de capital, migração, IDH', prof: 'Descomplica' },
    ],
  },
  {
    id: 'nat', name: 'Ciências da Natureza', cor: '#a78bfa',
    topicos: [
      { id: 'n1', nome: 'Ecologia', prio: 'Alta', desc: 'Cadeias alimentares, biomas, ciclos biogeoquímicos', prof: 'Samuel Cunha' },
      { id: 'n2', nome: 'Genética mendeliana', prio: 'Alta', desc: 'Leis de Mendel, heredogramas, dominância', prof: 'Samuel Cunha' },
      { id: 'n3', nome: 'Genética molecular', prio: 'Alta', desc: 'DNA, RNA, síntese proteica, biotecnologia', prof: 'Samuel Cunha' },
      { id: 'n4', nome: 'Evolução', prio: 'Alta', desc: 'Darwin, neodarwinismo, especiação', prof: 'Paulo Jubilut' },
      { id: 'n5', nome: 'Funções orgânicas', prio: 'Alta', desc: 'Hidrocarbonetos, álcoois, ácidos, ésteres', prof: 'Larissa Campos' },
      { id: 'n6', nome: 'Estequiometria', prio: 'Alta', desc: 'Mol, massa molar, rendimento de reação', prof: 'Felipe Sobis' },
      { id: 'n7', nome: 'Reações orgânicas', prio: 'Alta', desc: 'Combustão, adição, substituição, saponificação', prof: 'Larissa Campos' },
      { id: 'n8', nome: 'Cinemática', prio: 'Alta', desc: 'MRU, MRUV, gráficos de movimento', prof: 'Prof. Boaro' },
      { id: 'n9', nome: 'Leis de Newton', prio: 'Alta', desc: 'Força resultante, 1ª, 2ª, 3ª lei, atrito', prof: 'Prof. Boaro' },
      { id: 'n10', nome: 'Circuitos elétricos', prio: 'Alta', desc: 'Lei de Ohm, série, paralelo, potência', prof: 'Prof. Boaro' },
      { id: 'n11', nome: 'Energia e trabalho', prio: 'Alta', desc: 'Energia potencial, cinética, conservação', prof: 'Prof. Boaro' },
      { id: 'n12', nome: 'Eletroquímica', prio: 'Média', desc: 'Pilhas, eletrólise, oxidação e redução', prof: 'Larissa Campos' },
    ],
  },
  {
    id: 'mat', name: 'Matemática', cor: '#fb923c',
    topicos: [
      { id: 'm1', nome: 'Função do 1º grau', prio: 'Alta', desc: 'Gráfico, zeros, taxa de variação', prof: 'Prof. Ferretto' },
      { id: 'm2', nome: 'Função do 2º grau', prio: 'Alta', desc: 'Vértice, raízes, gráfico, otimização', prof: 'Prof. Ferretto' },
      { id: 'm3', nome: 'Função exponencial', prio: 'Alta', desc: 'Crescimento/decrescimento, juros compostos', prof: 'Prof. Ferretto' },
      { id: 'm4', nome: 'Função logarítmica', prio: 'Alta', desc: 'Propriedades, equações logarítmicas', prof: 'Prof. Ferretto' },
      { id: 'm5', nome: 'Geometria plana', prio: 'Alta', desc: 'Áreas de triângulo, quadriláteros, círculo', prof: 'Prof. Ferretto' },
      { id: 'm6', nome: 'Geometria espacial', prio: 'Alta', desc: 'Volume de prisma, cilindro, cone, esfera', prof: 'Prof. Ferretto' },
      { id: 'm7', nome: 'Trigonometria', prio: 'Alta', desc: 'Seno, cosseno, tangente, lei dos senos', prof: 'Prof. Ferretto' },
      { id: 'm8', nome: 'Probabilidade', prio: 'Alta', desc: 'Espaço amostral, eventos independentes', prof: 'Prof. Ferretto' },
      { id: 'm9', nome: 'Estatística descritiva', prio: 'Alta', desc: 'Média, mediana, moda, desvio, gráficos', prof: 'Prof. Ferretto' },
      { id: 'm10', nome: 'Juros simples e compostos', prio: 'Alta', desc: 'Taxa, tempo, montante', prof: 'Prof. Ferretto' },
      { id: 'm11', nome: 'Porcentagem e desconto', prio: 'Alta', desc: 'Aumento/desconto sucessivo, markup', prof: 'Prof. Ferretto' },
      { id: 'm12', nome: 'Análise combinatória', prio: 'Média', desc: 'Permutação, combinação, arranjo', prof: 'Prof. Ferretto' },
    ],
  },
]
const PRIO_CORES = { Alta: '#16a34a', Média: '#d97706', Baixa: '#dc2626' }
const PRIO_BG = { Alta: '#f0fdf4', Média: '#fffbeb', Baixa: '#fef2f2' }
const LETRAS = ['A', 'B', 'C', 'D', 'E']

export default function App() {
  const [user, setUser] = useState(null)
  const [inputUser, setInputUser] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [areaAtiva, setAreaAtiva] = useState('ling')
  const [done, setDone] = useState({})
  const [modal, setModal] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [answers, setAnswers] = useState({})
  const [revealed, setRevealed] = useState(false)
  const USERS = { enem: '1234', admin: 'admin' }

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`progress_${user}`)
      if (saved) setDone(JSON.parse(saved))
    }
  }, [user])

  function salvarProgresso(novosDone) {
    if (user) localStorage.setItem(`progress_${user}`, JSON.stringify(novosDone))
  }
  function login() {
    if (USERS[inputUser] === inputPass) { setUser(inputUser); setLoginErr('') }
    else setLoginErr('Usuário ou senha incorretos.')
  }
  function logout() { setUser(null); setDone({}); setInputUser(''); setInputPass('') }
  function abrirTopico(area, topico) { setModal({ area, topico }); setQuestions(null); setAnswers({}); setRevealed(false) }
  function fecharModal() { setModal(null); setQuestions(null); setAnswers({}); setRevealed(false) }

  async function gerarQuestoes() {
    if (!modal) return
    setQuestions('loading')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: modal.topico.nome, desc: modal.topico.desc }),
      })
      const data = await res.json()
      setQuestions(data.questions)
    } catch (e) {
      setQuestions(null)
      alert('Erro ao gerar questões.')
    }
  }

  function responder(qi, oi) { if (!revealed) setAnswers(prev => ({ ...prev, [qi]: oi })) }
  function marcarConcluido(topicoId, valor = true) {
    const novos = { ...done, [topicoId]: valor }
    setDone(novos); salvarProgresso(novos); fecharModal()
  }

  const totalTopicos = AREAS.reduce((a, ar) => a + ar.topicos.length, 0)
  const totalConcluidos = Object.values(done).filter(Boolean).length
  const area = AREAS.find(a => a.id === areaAtiva)

  if (!user) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0c10',fontFamily:'system-ui'}}>
      <div style={{width:360,background:'#12151c',border:'1px solid #252a38',borderRadius:20,padding:'36px'}}>
        <div style={{fontSize:24,fontWeight:700,color:'#e8eaf0',marginBottom:4}}>ENEM<span style={{color:'#5b8fff'}}>Prep</span></div>
        <div style={{color:'#6b7280',fontSize:13,marginBottom:24}}>Questões com IA · 5 meses · 2h/dia</div>
        <div style={{marginBottom:12}}>
          <div style={{fontSize:11,color:'#6b7280',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.08em'}}>Usuário</div>
          <input value={inputUser} onChange={e=>setInputUser(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()}
            style={{width:'100%',padding:'10px 12px',background:'#0a0c10',border:'1px solid #252a38',borderRadius:8,color:'#e8eaf0',fontSize:14,boxSizing:'border-box'}} />
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:'#6b7280',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.08em'}}>Senha</div>
          <input type="password" value={inputPass} onChange={e=>setInputPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()}
            style={{width:'100%',padding:'10px 12px',background:'#0a0c10',border:'1px solid #252a38',borderRadius:8,color:'#e8eaf0',fontSize:14,boxSizing:'border-box'}} />
        </div>
        <button onClick={login} style={{width:'100%',padding:12,background:'#5b8fff',color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:600,cursor:'pointer'}}>Entrar →</button>
        {loginErr && <div style={{color:'#f87171',fontSize:12,textAlign:'center',marginTop:8}}>{loginErr}</div>}
        <div style={{fontSize:11,color:'#6b7280',textAlign:'center',marginTop:12}}>Demo: <span style={{color:'#5b8fff',fontFamily:'monospace'}}>enem</span> / <span style={{color:'#5b8fff',fontFamily:'monospace'}}>1234</span></div>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#0a0c10',color:'#e8eaf0',fontFamily:'system-ui'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',height:52,background:'#12151c',borderBottom:'1px solid #252a38',position:'sticky',top:0,zIndex:100}}>
        <div style={{fontSize:16,fontWeight:700}}>ENEM<span style={{color:'#5b8fff'}}>Prep</span></div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <span style={{fontSize:12,color:'#6b7280'}}>👤 {user}</span>
          <button onClick={logout} style={{padding:'5px 12px',background:'transparent',border:'1px solid #252a38',borderRadius:8,color:'#6b7280',cursor:'pointer',fontSize:12}}>Sair</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'220px 1fr',minHeight:'calc(100vh - 52px)'}}>
        <div style={{background:'#12151c',borderRight:'1px solid #252a38',padding:'12px 0'}}>
          {AREAS.map(a => {
            const concl = a.topicos.filter(t=>done[t.id]).length
            const ativo = a.id === areaAtiva
            return <div key={a.id} onClick={()=>setAreaAtiva(a.id)}
              style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',cursor:'pointer',borderLeft:ativo?`3px solid ${a.cor}`:'3px solid transparent',background:ativo?'rgba(91,143,255,0.08)':'transparent',color:ativo?a.cor:'#6b7280',fontSize:13}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:a.cor,flexShrink:0}}/>
              <span style={{flex:1}}>{a.name}</span>
              <span style={{fontSize:10,fontFamily:'monospace',background:'#1a1e28',padding:'1px 5px',borderRadius:3}}>{concl}/{a.topicos.length}</span>
            </div>
          })}
        </div>
        <div style={{padding:'24px 28px',overflowY:'auto',maxHeight:'calc(100vh - 52px)'}}>
          <div style={{fontSize:20,fontWeight:700,marginBottom:4}}>{area.name}</div>
          <div style={{color:'#6b7280',fontSize:13,marginBottom:20}}>Clique em um tópico para gerar questões com IA</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:24}}>
            {[
              {l:'Progresso geral',v:`${Math.round(totalConcluidos/totalTopicos*100)}%`,s:`${totalConcluidos} de ${totalTopicos}`,c:area.cor},
              {l:'Esta área',v:`${area.topicos.filter(t=>done[t.id]).length}/${area.topicos.length}`,s:'concluídos',c:'#e8eaf0'},
              {l:'Alta prioridade',v:AREAS.reduce((a,ar)=>a+ar.topicos.filter(t=>t.prio==='Alta').length,0),s:'no total',c:'#34d399'},
              {l:'Restantes',v:totalTopicos-totalConcluidos,s:'por estudar',c:'#fb923c'},
            ].map((s,i)=>(
              <div key={i} style={{background:'#12151c',border:'1px solid #252a38',borderRadius:12,padding:'12px 14px'}}>
                <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'0.08em',color:'#6b7280',marginBottom:4}}>{s.l}</div>
                <div style={{fontSize:20,fontWeight:700,fontFamily:'monospace',color:s.c}}>{s.v}</div>
                <div style={{fontSize:11,color:'#6b7280',marginTop:2}}>{s.s}</div>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:10}}>
            {area.topicos.map(t=>(
              <div key={t.id} onClick={()=>abrirTopico(area,t)}
                style={{background:'#12151c',border:done[t.id]?'1px solid rgba(52,211,153,0.35)':'1px solid #252a38',borderRadius:12,padding:'14px 16px',cursor:'pointer',position:'relative'}}>
                {done[t.id]&&<div style={{position:'absolute',top:10,right:12,color:'#34d399',fontWeight:700}}>✓</div>}
                <div style={{display:'inline-block',fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:4,marginBottom:8,background:PRIO_BG[t.prio],color:PRIO_CORES[t.prio]}}>{t.prio}</div>
                <div style={{fontSize:13,fontWeight:600,marginBottom:4,color:'#e8eaf0',lineHeight:1.4}}>{t.nome}</div>
                <div style={{fontSize:12,color:'#6b7280',lineHeight:1.5}}>{t.desc}</div>
                <div style={{fontSize:11,color:area.cor,marginTop:8,opacity:0.85}}>▶ {t.prof}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal&&(
        <div onClick={e=>e.target===e.currentTarget&&fecharModal()} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:200,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:24,overflowY:'auto'}}>
          <div style={{width:'100%',maxWidth:640,background:'#1a1e28',border:'1px solid #252a38',borderRadius:18,overflow:'hidden',margin:'auto'}}>
            <div style={{padding:'18px 22px 14px',borderBottom:'1px solid #252a38'}}>
              <div style={{fontSize:11,color:modal.area.cor,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>{modal.area.name}</div>
              <div style={{fontSize:18,fontWeight:700,color:'#e8eaf0',marginBottom:4}}>{modal.topico.nome}</div>
              <div style={{fontSize:13,color:'#6b7280'}}>{modal.topico.desc}</div>
            </div>
            <div style={{padding:'18px 22px'}}>
              {questions===null&&(
                <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                  <button onClick={gerarQuestoes} style={{padding:'10px 16px',background:'#5b8fff',color:'#fff',border:'none',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>✦ Gerar questões com IA</button>
                  <button onClick={()=>marcarConcluido(modal.topico.id,!done[modal.topico.id])} style={{padding:'10px 16px',background:'transparent',border:'1px solid #252a38',color:'#6b7280',borderRadius:8,fontSize:13,cursor:'pointer'}}>
                    {done[modal.topico.id]?'↩ Marcar pendente':'✓ Marcar estudado'}
                  </button>
                </div>
              )}
              {questions==='loading'&&(
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:32,color:'#6b7280'}}>
                  <div style={{width:32,height:32,border:'2px solid #252a38',borderTopColor:'#5b8fff',borderRadius:'50%',animation:'spin 0.8s linear infinite',marginBottom:10}}/>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  Gerando questões…
                </div>
              )}
              {Array.isArray(questions)&&questions.map((q,qi)=>(
                <div key={qi}>
                  {qi>0&&<hr style={{border:'none',borderTop:'1px solid #252a38',margin:'16px 0'}}/>}
                  <div style={{fontSize:11,color:'#6b7280',fontFamily:'monospace',marginBottom:6}}>QUESTÃO {qi+1}/{questions.length}</div>
                  <div style={{fontSize:14,fontWeight:500,lineHeight:1.6,marginBottom:12,color:'#e8eaf0'}}>{q.question}</div>
                  {q.options.map((opt,oi)=>{
                    const sel=answers[qi]===oi
                    const correct=revealed&&oi===q.correct
                    const wrong=revealed&&sel&&oi!==q.correct
                    return <div key={oi} onClick={()=>responder(qi,oi)}
                      style={{display:'flex',gap:8,padding:'10px 12px',background:correct?'rgba(52,211,153,0.1)':wrong?'rgba(248,113,113,0.1)':sel?'rgba(91,143,255,0.1)':'#0a0c10',border:`1px solid ${correct?'#34d399':wrong?'#f87171':sel?'#5b8fff':'#252a38'}`,borderRadius:8,cursor:'pointer',alignItems:'flex-start',marginBottom:6}}>
                      <span style={{fontFamily:'monospace',fontSize:12,fontWeight:600,color:correct?'#34d399':wrong?'#f87171':sel?'#5b8fff':'#6b7280',minWidth:16}}>{LETRAS[oi]}</span>
                      <span style={{fontSize:13,color:'#e8eaf0',lineHeight:1.5}}>{opt}</span>
                    </div>
                  })}
                  {revealed&&q.explanation&&<div style={{fontSize:12,color:'#6b7280',marginTop:8,padding:'8px 10px',background:'#0a0c10',borderRadius:6,lineHeight:1.5}}>💡 {q.explanation}</div>}
                </div>
              ))}
              {Array.isArray(questions)&&!revealed&&questions.every((_,qi)=>answers[qi]!==undefined)&&(
                <button onClick={()=>setRevealed(true)} style={{marginTop:16,padding:'10px 16px',background:'#5b8fff',color:'#fff',border:'none',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>Ver gabarito</button>
              )}
              {Array.isArray(questions)&&revealed&&(()=>{
                const corretas=questions.filter((q,qi)=>answers[qi]===q.correct).length
                const pct=Math.round(corretas/questions.length*100)
                const cor=pct>=80?'#34d399':pct>=60?'#fbbf24':'#f87171'
                return <div style={{marginTop:16,padding:14,background:'#0a0c10',border:'1px solid #252a38',borderRadius:10}}>
                  <div style={{fontSize:20,fontWeight:700,fontFamily:'monospace',color:cor}}>{corretas}/{questions.length} corretas</div>
                  <div style={{fontSize:12,color:'#6b7280',marginTop:4}}>{pct>=80?'🎉 Ótimo!':pct>=60?'📚 Bom, revise os erros.':'🔁 Revise o conteúdo.'}</div>
                </div>
              })()}
            </div>
            <div style={{padding:'12px 22px',borderTop:'1px solid #252a38',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <button onClick={fecharModal} style={{padding:'6px 12px',background:'transparent',border:'1px solid #252a38',borderRadius:8,color:'#6b7280',fontSize:13,cursor:'pointer'}}>✕ Fechar</button>
              {revealed&&<button onClick={()=>marcarConcluido(modal.topico.id)} style={{padding:'8px 16px',background:'#34d399',color:'#000',border:'none',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>✓ Concluído</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
