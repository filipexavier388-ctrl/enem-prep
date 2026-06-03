'use client'
import { useState, useEffect } from 'react'

const AREAS = [
  { id: 'ling', name: 'Linguagens', cor: '#5b8fff', topicos: [
    { id: 'l1', nome: 'Interpretação de texto', prio: 'Alta', desc: 'Tese, argumento e intenção do autor', prof: 'Prof. Noslen' },
    { id: 'l2', nome: 'Coesão e coerência', prio: 'Alta', desc: 'Conectivos e progressão temática', prof: 'Prof. Noslen' },
    { id: 'l3', nome: 'Regência verbal e nominal', prio: 'Média', desc: 'Verbos de regência dupla e preposição', prof: 'Prof. Noslen' },
    { id: 'l4', nome: 'Concordância verbal/nominal', prio: 'Média', desc: 'Sujeito composto e coletivos', prof: 'Prof. Noslen' },
    { id: 'l5', nome: 'Funções da linguagem', prio: 'Alta', desc: 'Referencial, emotiva, poética, fática', prof: 'Prof. Noslen' },
    { id: 'l6', nome: 'Variação linguística', prio: 'Alta', desc: 'Registros formal, informal, regional', prof: 'Prof. Noslen' },
    { id: 'l7', nome: 'Intertextualidade', prio: 'Alta', desc: 'Paródia, citação, alusão', prof: 'Prof. Noslen' },
    { id: 'l8', nome: 'Modernismo', prio: 'Alta', desc: 'Ruptura com o parnasianismo', prof: 'Descomplica' },
    { id: 'l9', nome: 'Realismo/Naturalismo', prio: 'Alta', desc: 'Machado de Assis, crítica social', prof: 'Descomplica' },
    { id: 'l10', nome: 'Redação — estrutura', prio: 'Alta', desc: 'Introdução, desenvolvimento, conclusão', prof: 'Daniela Garcia' },
    { id: 'l11', nome: 'Proposta de intervenção', prio: 'Alta', desc: 'Agente, ação, modo, finalidade', prof: 'Daniela Garcia' },
    { id: 'l12', nome: 'Repertório sociocultural', prio: 'Alta', desc: 'Filosofia e sociologia na redação', prof: 'Daniela Garcia' },
  ]},
  { id: 'hum', name: 'Ciências Humanas', cor: '#34d399', topicos: [
    { id: 'h1', nome: 'Era Vargas e Brasil República', prio: 'Alta', desc: 'Coronelismo, tenentismo, Era Vargas', prof: 'Débora Aladim' },
    { id: 'h2', nome: 'Ditadura militar 1964–1985', prio: 'Alta', desc: 'AI-5, milagre econômico, abertura', prof: 'Parabólica' },
    { id: 'h3', nome: 'Redemocratização CF 1988', prio: 'Alta', desc: 'Diretas Já e constituinte', prof: 'Parabólica' },
    { id: 'h4', nome: '2ª Guerra Mundial', prio: 'Alta', desc: 'Totalitarismo, nazismo, consequências', prof: 'Parabólica' },
    { id: 'h5', nome: 'Guerra Fria', prio: 'Alta', desc: 'Bipolaridade e corrida armamentista', prof: 'Parabólica' },
    { id: 'h6', nome: 'Geopolítica contemporânea', prio: 'Alta', desc: 'Blocos econômicos e BRICS', prof: 'Descomplica' },
    { id: 'h7', nome: 'Urbanização brasileira', prio: 'Alta', desc: 'Metropolização e periferização', prof: 'Descomplica' },
    { id: 'h8', nome: 'Problemas ambientais', prio: 'Alta', desc: 'Aquecimento global e desmatamento', prof: 'Descomplica' },
    { id: 'h9', nome: 'Contrato social e Estado', prio: 'Alta', desc: 'Rousseau, Locke, Hobbes', prof: 'Parabólica' },
    { id: 'h10', nome: 'Movimentos sociais', prio: 'Alta', desc: 'Feminismo, MST, direitos civis', prof: 'Parabólica' },
    { id: 'h11', nome: 'Trabalho e capitalismo', prio: 'Alta', desc: 'Marx, alienação, mais-valia', prof: 'Parabólica' },
    { id: 'h12', nome: 'Globalização e desigualdade', prio: 'Alta', desc: 'Fluxos de capital e IDH', prof: 'Descomplica' },
  ]},
  { id: 'nat', name: 'Ciências da Natureza', cor: '#a78bfa', topicos: [
    { id: 'n1', nome: 'Ecologia', prio: 'Alta', desc: 'Cadeias alimentares e biomas', prof: 'Samuel Cunha' },
    { id: 'n2', nome: 'Genética mendeliana', prio: 'Alta', desc: 'Leis de Mendel e heredogramas', prof: 'Samuel Cunha' },
    { id: 'n3', nome: 'Genética molecular', prio: 'Alta', desc: 'DNA, RNA e síntese proteica', prof: 'Samuel Cunha' },
    { id: 'n4', nome: 'Evolução', prio: 'Alta', desc: 'Darwin e neodarwinismo', prof: 'Paulo Jubilut' },
    { id: 'n5', nome: 'Funções orgânicas', prio: 'Alta', desc: 'Hidrocarbonetos, álcoois, ésteres', prof: 'Larissa Campos' },
    { id: 'n6', nome: 'Estequiometria', prio: 'Alta', desc: 'Mol, massa molar, rendimento', prof: 'Felipe Sobis' },
    { id: 'n7', nome: 'Reações orgânicas', prio: 'Alta', desc: 'Combustão, adição, substituição', prof: 'Larissa Campos' },
    { id: 'n8', nome: 'Cinemática', prio: 'Alta', desc: 'MRU, MRUV, gráficos de movimento', prof: 'Prof. Boaro' },
    { id: 'n9', nome: 'Leis de Newton', prio: 'Alta', desc: 'Força resultante e atrito', prof: 'Prof. Boaro' },
    { id: 'n10', nome: 'Circuitos elétricos', prio: 'Alta', desc: 'Ohm, série, paralelo, potência', prof: 'Prof. Boaro' },
    { id: 'n11', nome: 'Energia e trabalho', prio: 'Alta', desc: 'Energia cinética e conservação', prof: 'Prof. Boaro' },
    { id: 'n12', nome: 'Eletroquímica', prio: 'Média', desc: 'Pilhas, eletrólise, redox', prof: 'Larissa Campos' },
  ]},
  { id: 'mat', name: 'Matemática', cor: '#fb923c', topicos: [
    { id: 'm1', nome: 'Função do 1º grau', prio: 'Alta', desc: 'Gráfico, zeros, taxa de variação', prof: 'Prof. Ferretto' },
    { id: 'm2', nome: 'Função do 2º grau', prio: 'Alta', desc: 'Vértice, raízes, otimização', prof: 'Prof. Ferretto' },
    { id: 'm3', nome: 'Função exponencial', prio: 'Alta', desc: 'Crescimento e juros compostos', prof: 'Prof. Ferretto' },
    { id: 'm4', nome: 'Função logarítmica', prio: 'Alta', desc: 'Propriedades e equações', prof: 'Prof. Ferretto' },
    { id: 'm5', nome: 'Geometria plana', prio: 'Alta', desc: 'Áreas de triângulo e círculo', prof: 'Prof. Ferretto' },
    { id: 'm6', nome: 'Geometria espacial', prio: 'Alta', desc: 'Volume de prisma, cone, esfera', prof: 'Prof. Ferretto' },
    { id: 'm7', nome: 'Trigonometria', prio: 'Alta', desc: 'Seno, cosseno, tangente', prof: 'Prof. Ferretto' },
    { id: 'm8', nome: 'Probabilidade', prio: 'Alta', desc: 'Espaço amostral e eventos', prof: 'Prof. Ferretto' },
    { id: 'm9', nome: 'Estatística descritiva', prio: 'Alta', desc: 'Média, mediana, moda, gráficos', prof: 'Prof. Ferretto' },
    { id: 'm10', nome: 'Juros simples e compostos', prio: 'Alta', desc: 'Taxa, tempo, montante', prof: 'Prof. Ferretto' },
    { id: 'm11', nome: 'Porcentagem e desconto', prio: 'Alta', desc: 'Desconto sucessivo e markup', prof: 'Prof. Ferretto' },
    { id: 'm12', nome: 'Análise combinatória', prio: 'Média', desc: 'Permutação, combinação, arranjo', prof: 'Prof. Ferretto' },
  ]},
]

const PC = { Alta:'#16a34a', Média:'#d97706', Baixa:'#dc2626' }
const PB = { Alta:'#f0fdf4', Média:'#fffbeb', Baixa:'#fef2f2' }
const LT = ['A','B','C','D','E']
export default function App() {
  const [user, setUser] = useState(null)
  const [iu, setIu] = useState('')
  const [ip, setIp] = useState('')
  const [err, setErr] = useState('')
  const [area, setArea] = useState('ling')
  const [done, setDone] = useState({})
  const [modal, setModal] = useState(null)
  const [qs, setQs] = useState(null)
  const [ans, setAns] = useState({})
  const [rev, setRev] = useState(false)

  useEffect(() => {
    if (user) {
      const s = localStorage.getItem('p_' + user)
      if (s) setDone(JSON.parse(s))
    }
  }, [user])

  const save = (d) => localStorage.setItem('p_' + user, JSON.stringify(d))
  const login = () => {
    if ((iu === 'enem' && ip === '1234') || (iu === 'admin' && ip === 'admin')) {
      setUser(iu); setErr('')
    } else setErr('Usuário ou senha incorretos.')
  }
  const logout = () => { setUser(null); setDone({}); setIu(''); setIp('') }
  const open = (a, t) => { setModal({a,t}); setQs(null); setAns({}); setRev(false) }
  const close = () => { setModal(null); setQs(null); setAns({}); setRev(false) }
  const mark = (id, v=true) => { const d={...done,[id]:v}; setDone(d); save(d); close() }

  const gerar = async () => {
    setQs('loading')
    try {
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({topic: modal.t.nome, desc: modal.t.desc})
      })
      const d = await r.json()
      setQs(d.questions)
    } catch(e) {
      setQs(null)
      alert('Erro ao gerar questões.')
    }
  }

  const total = AREAS.reduce((a,ar) => a + ar.topicos.length, 0)
  const conc = Object.values(done).filter(Boolean).length
  const ar = AREAS.find(a => a.id === area)

  const bg = '#0a0c10', sf = '#12151c', sf2 = '#1a1e28', bd = '#252a38', tx = '#e8eaf0', mt = '#6b7280'
  const inp = {width:'100%',padding:'10px 12px',background:bg,border:'1px solid '+bd,borderRadius:8,color:tx,fontSize:14,boxSizing:'border-box',outline:'none'}
  const card = {background:sf,border:'1px solid '+bd,borderRadius:12,padding:'12px 14px'}

  if (!user) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:bg,fontFamily:'system-ui'}}>
      <div style={{width:340,background:sf,border:'1px solid '+bd,borderRadius:20,padding:36}}>
        <div style={{fontSize:24,fontWeight:700,color:tx,marginBottom:4}}>ENEM<span style={{color:'#5b8fff'}}>Prep</span></div>
        <div style={{color:mt,fontSize:13,marginBottom:24}}>Questões com IA · 5 meses · 2h/dia</div>
        <div style={{marginBottom:12}}>
          <div style={{fontSize:11,color:mt,marginBottom:4,textTransform:'uppercase',letterSpacing:'0.08em'}}>Usuário</div>
          <input value={iu} onChange={e=>setIu(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} style={inp}/>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:mt,marginBottom:4,textTransform:'uppercase',letterSpacing:'0.08em'}}>Senha</div>
          <input type="password" value={ip} onChange={e=>setIp(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} style={inp}/>
        </div>
        <button onClick={login} style={{width:'100%',padding:12,background:'#5b8fff',color:'#fff',border:'none',borderRadius:8,fontSize:14,fontWeight:600,cursor:'pointer'}}>Entrar →</button>
        {err && <div style={{color:'#f87171',fontSize:12,textAlign:'center',marginTop:8}}>{err}</div>}
        <div style={{fontSize:11,color:mt,textAlign:'center',marginTop:12}}>
          Demo: <span style={{color:'#5b8fff',fontFamily:'monospace'}}>enem</span> / <span style={{color:'#5b8fff',fontFamily:'monospace'}}>1234</span>
        </div>
      </div>
    </div>
  )
return (
    <div style={{minHeight:'100vh',background:bg,color:tx,fontFamily:'system-ui'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',height:52,background:sf,borderBottom:'1px solid '+bd,position:'sticky',top:0,zIndex:100}}>
        <div style={{fontSize:16,fontWeight:700}}>ENEM<span style={{color:'#5b8fff'}}>Prep</span></div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <span style={{fontSize:12,color:mt}}>👤 {user}</span>
          <button onClick={logout} style={{padding:'5px 12px',background:'transparent',border:'1px solid '+bd,borderRadius:8,color:mt,cursor:'pointer',fontSize:12}}>Sair</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'220px 1fr',minHeight:'calc(100vh - 52px)'}}>
        <div style={{background:sf,borderRight:'1px solid '+bd,padding:'12px 0'}}>
          {AREAS.map(a => {
            const c = a.topicos.filter(t=>done[t.id]).length
            const ativo = a.id === area
            return <div key={a.id} onClick={()=>setArea(a.id)} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',cursor:'pointer',borderLeft:ativo?`3px solid ${a.cor}`:'3px solid transparent',background:ativo?'rgba(91,143,255,0.08)':'transparent',color:ativo?a.cor:mt,fontSize:13}}>
              <div style={{width:7,height:7,borderRadius:'50%',background:a.cor,flexShrink:0}}/>
              <span style={{flex:1}}>{a.name}</span>
              <span style={{fontSize:10,fontFamily:'monospace',background:sf2,padding:'1px 5px',borderRadius:3}}>{c}/{a.topicos.length}</span>
            </div>
          })}
        </div>
        <div style={{padding:'24px 28px',overflowY:'auto',maxHeight:'calc(100vh - 52px)'}}>
          <div style={{fontSize:20,fontWeight:700,marginBottom:4}}>{ar.name}</div>
          <div style={{color:mt,fontSize:13,marginBottom:20}}>Clique em um tópico para gerar questões com IA</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:24}}>
            {[
              {l:'Progresso',v:Math.round(conc/total*100)+'%',s:`${conc} de ${total}`,c:ar.cor},
              {l:'Esta área',v:`${ar.topicos.filter(t=>done[t.id]).length}/${ar.topicos.length}`,s:'concluídos',c:tx},
              {l:'Alta prioridade',v:AREAS.reduce((a,x)=>a+x.topicos.filter(t=>t.prio==='Alta').length,0),s:'no total',c:'#34d399'},
              {l:'Restantes',v:total-conc,s:'por estudar',c:'#fb923c'},
            ].map((s,i)=>(
              <div key={i} style={card}>
                <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'0.08em',color:mt,marginBottom:4}}>{s.l}</div>
                <div style={{fontSize:20,fontWeight:700,fontFamily:'monospace',color:s.c}}>{s.v}</div>
                <div style={{fontSize:11,color:mt,marginTop:2}}>{s.s}</div>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:10}}>
            {ar.topicos.map(t=>(
              <div key={t.id} onClick={()=>open(ar,t)} style={{background:sf,border:done[t.id]?'1px solid rgba(52,211,153,0.4)':'1px solid '+bd,borderRadius:12,padding:'14px 16px',cursor:'pointer',position:'relative'}}>
                {done[t.id]&&<div style={{position:'absolute',top:10,right:12,color:'#34d399',fontWeight:700}}>✓</div>}
                <div style={{display:'inline-block',fontSize:10,fontWeight:600,padding:'2px 7px',borderRadius:4,marginBottom:8,background:PB[t.prio],color:PC[t.prio]}}>{t.prio}</div>
                <div style={{fontSize:13,fontWeight:600,marginBottom:4,color:tx,lineHeight:1.4}}>{t.nome}</div>
                <div style={{fontSize:12,color:mt,lineHeight:1.5}}>{t.desc}</div>
                <div style={{fontSize:11,color:ar.cor,marginTop:8,opacity:0.85}}>▶ {t.prof}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modal&&(
        <div onClick={e=>e.target===e.currentTarget&&close()} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:200,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:24,overflowY:'auto'}}>
          <div style={{width:'100%',maxWidth:640,background:sf2,border:'1px solid '+bd,borderRadius:18,overflow:'hidden',margin:'auto'}}>
            <div style={{padding:'18px 22px 14px',borderBottom:'1px solid '+bd}}>
              <div style={{fontSize:11,color:modal.a.cor,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:4}}>{modal.a.name}</div>
              <div style={{fontSize:18,fontWeight:700,color:tx,marginBottom:4}}>{modal.t.nome}</div>
              <div style={{fontSize:13,color:mt}}>{modal.t.desc}</div>
            </div>
            <div style={{padding:'18px 22px'}}>
              {qs===null&&(
                <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                  <button onClick={gerar} style={{padding:'10px 16px',background:'#5b8fff',color:'#fff',border:'none',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>✦ Gerar questões com IA</button>
                  <button onClick={()=>mark(modal.t.id,!done[modal.t.id])} style={{padding:'10px 16px',background:'transparent',border:'1px solid '+bd,color:mt,borderRadius:8,fontSize:13,cursor:'pointer'}}>{done[modal.t.id]?'↩ Marcar pendente':'✓ Marcar estudado'}</button>
                </div>
              )}
              {qs==='loading'&&(
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:32,color:mt}}>
                  <div style={{width:32,height:32,border:'2px solid '+bd,borderTopColor:'#5b8fff',borderRadius:'50%',animation:'spin 0.8s linear infinite',marginBottom:10}}/>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  Gerando questões…
                </div>
              )}
              {Array.isArray(qs)&&qs.map((q,qi)=>(
                <div key={qi}>
                  {qi>0&&<hr style={{border:'none',borderTop:'1px solid '+bd,margin:'16px 0'}}/>}
                  <div style={{fontSize:11,color:mt,fontFamily:'monospace',marginBottom:6}}>QUESTÃO {qi+1}/{qs.length}</div>
                  <div style={{fontSize:14,fontWeight:500,lineHeight:1.6,marginBottom:12,color:tx}}>{q.question}</div>
                  {q.options.map((opt,oi)=>{
                    const sel=ans[qi]===oi, correct=rev&&oi===q.correct, wrong=rev&&sel&&oi!==q.correct
                    return <div key={oi} onClick={()=>!rev&&setAns(p=>({...p,[qi]:oi}))}
                      style={{display:'flex',gap:8,padding:'10px 12px',background:correct?'rgba(52,211,153,0.1)':wrong?'rgba(248,113,113,0.1)':sel?'rgba(91,143,255,0.1)':bg,border:`1px solid ${correct?'#34d399':wrong?'#f87171':sel?'#5b8fff':bd}`,borderRadius:8,cursor:'pointer',alignItems:'flex-start',marginBottom:6}}>
                      <span style={{fontFamily:'monospace',fontSize:12,fontWeight:600,color:correct?'#34d399':wrong?'#f87171':sel?'#5b8fff':mt,minWidth:16}}>{LT[oi]}</span>
                      <span style={{fontSize:13,color:tx,lineHeight:1.5}}>{opt}</span>
                    </div>
                  })}
                  {rev&&q.explanation&&<div style={{fontSize:12,color:mt,marginTop:8,padding:'8px 10px',background:bg,borderRadius:6,lineHeight:1.5}}>💡 {q.explanation}</div>}
                </div>
              ))}
              {Array.isArray(qs)&&!rev&&qs.every((_,qi)=>ans[qi]!==undefined)&&(
                <button onClick={()=>setRev(true)} style={{marginTop:16,padding:'10px 16px',background:'#5b8fff',color:'#fff',border:'none',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>Ver gabarito</button>
              )}
              {Array.isArray(qs)&&rev&&(()=>{
                const c=qs.filter((q,qi)=>ans[qi]===q.correct).length
                const p=Math.round(c/qs.length*100)
                return <div style={{marginTop:16,padding:14,background:bg,border:'1px solid '+bd,borderRadius:10}}>
                  <div style={{fontSize:20,fontWeight:700,fontFamily:'monospace',color:p>=80?'#34d399':p>=60?'#fbbf24':'#f87171'}}>{c}/{qs.length} corretas</div>
                  <div style={{fontSize:12,color:mt,marginTop:4}}>{p>=80?'🎉 Ótimo!':p>=60?'📚 Revise os erros.':'🔁 Revise o conteúdo.'}</div>
                </div>
              })()}
            </div>
            <div style={{padding:'12px 22px',borderTop:'1px solid '+bd,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <button onClick={close} style={{padding:'6px 12px',background:'transparent',border:'1px solid '+bd,borderRadius:8,color:mt,fontSize:13,cursor:'pointer'}}>✕ Fechar</button>
              {rev&&<button onClick={()=>mark(modal.t.id)} style={{padding:'8px 16px',background:'#34d399',color:'#000',border:'none',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer'}}>✓ Concluído</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
