const app=document.getElementById('app');

const countries=[
  {code:'JP',name:'Japanisch',flag:'🇯🇵',accent:'#ffd735',hello:'こんにちは、みなさん！',romaji:'Konnichiwa, minasan!',scene:'⛩️ 🌸 🗻'},
  {code:'FR',name:'Französisch',flag:'🇫🇷',accent:'#4d8cff',hello:'Bonjour tout le monde !',romaji:'Comment allez-vous ?',scene:'🗼 🥐 ☕'},
  {code:'IN',name:'Hindi',flag:'🇮🇳',accent:'#ff9c2a',hello:'नमस्ते दोस्तों!',romaji:'Namaste doston!',scene:'🪷 🛕 🧘'},
  {code:'CN',name:'Chinesisch',flag:'🇨🇳',accent:'#ff4141',hello:'大家好！',romaji:'Dàjiā hǎo!',scene:'🐉 🏮 🏯'},
  {code:'IT',name:'Italienisch',flag:'🇮🇹',accent:'#45d488',hello:'Ciao a tutti!',romaji:'Come state?',scene:'🏛️ 🍕 🛵'},
  {code:'KR',name:'Koreanisch',flag:'🇰🇷',accent:'#a56cff',hello:'안녕하세요!',romaji:'Annyeonghaseyo!',scene:'🌃 🎤 🥢'}
];
let state={screen:'home',country:0,speed:1.25,playing:true,tv:0,points:2850,challenge:false};
const icon={home:'⌂',read:'▤',map:'◎',lessons:'▥',profile:'◯'};

function nav(active){
  const items=[['home','Home'],['read','Lesen'],['map','Map'],['lessons','Lessons'],['profile','Profil']];
  return '<nav class="bottom-nav">'+items.map(([k,l])=>'<button data-go="'+k+'" class="'+(active===k?'active':'')+'"><span>'+icon[k]+'</span><small>'+l+'</small></button>').join('')+'</nav>';
}
function drawer(){
  return '<aside class="drawer" id="drawer"><div class="drawer-card"><div class="drawer-head"><strong>Abria Modules</strong><button id="closeDrawer">×</button></div><div class="module-grid">'+[
    ['login','Login'],['language','Sprachauswahl'],['home','Teleprompter'],['upload','PDF / Upload'],['lessons','Lessons'],['profile','Profil'],['map','World Map'],['friends','Friends Map'],['party','Party Session'],['orbit','Orbit Chat'],['tv','Abria TV'],['talent','Talent Mode'],['wonders','Wonders']
  ].map(([k,l])=>'<button data-go="'+k+'">'+l+'</button>').join('')+'</div><p>Interactive Abria Demo · UI-System basierend auf den Chat-Blueprints.</p></div></aside>';
}
function layout(body,opts={}){
  const active=opts.active||'home',wide=opts.wide||false;
  return '<div class="app-shell '+(wide?'wide':'')+'"><header class="app-top"><button class="logo" data-go="home"><span class="logo-mark">▶</span><span>Abria</span></button><button class="module-btn" id="moduleBtn">☰</button></header><main class="view">'+body+'</main>'+nav(active)+drawer()+'</div>';
}
function home(){
  const c=countries[state.country];
  const body='<section class="hero"><div class="brand-lockup"><div class="big-logo"><span>▶</span> Abria</div><div class="tagline">SPEAK, AND IT APPEARS ✦</div></div><div class="country-switch" style="--accent:'+c.accent+'"><button id="prevCountry">‹</button><div>'+c.flag+' '+c.name+'</div><button id="nextCountry">›</button></div><div class="world-scene" style="--accent:'+c.accent+'"><div class="scene-icons">'+c.scene+'</div></div><div class="teleprompter"><div class="tele-head"><span class="live-dot">● LIVE</span><span>00:12 / 02:45</span></div><div class="prompt-line">'+c.hello+'</div><div class="roman">'+c.romaji+'</div><div class="prompt-line active-line">'+(state.country===0?'わたしはユウキです。':'Speak naturally. Keep the flow.')+'</div><div class="roman gold">'+(state.country===0?'Watashi wa Yūki desu.':'Follow the rhythm and pronunciation.')+'</div><div class="prompt-line small">'+(state.country===0?'きょうはてんきがいいですね！':'One sentence at a time.')+'</div><div class="controls"><button id="micBtn">🎙</button><button id="minusSpeed">−</button><button class="play" id="playBtn">'+(state.playing?'Ⅱ':'▶')+'</button><button id="plusSpeed">+</button><button class="speed" id="speedBtn">'+state.speed.toFixed(2)+'x</button></div></div><div class="quick-row"><button data-go="upload">📄 Eigener Text</button><button data-go="tv">📺 Abria TV</button><button data-go="party">👥 Party</button></div></section>';
  return layout(body,{active:'read'});
}
function login(){
  return layout('<section class="center-card login-card"><div class="big-logo"><span>▶</span> Abria</div><div class="tagline">SPEAK, AND IT APPEARS</div><h1>Welcome to Abria</h1><p>Start your language journey.</p><button class="auth"> Continue with Apple</button><button class="auth">G Continue with Google</button><button class="auth">✉ Continue with E-Mail</button><small>By continuing you agree to Terms & Privacy.</small></section>');
}
function language(){
  const cards=countries.map((c,i)=>'<button class="lang-card '+(i===state.country?'selected':'')+'" data-country="'+i+'" style="--accent:'+c.accent+'"><span class="flag">'+c.flag+'</span><strong>'+c.name+'</strong><span>'+c.scene+'</span></button>').join('');
  return layout('<section class="language-page"><div class="big-logo"><span>▶</span> Abria</div><h1>Choose your language</h1><div class="lang-carousel">'+cards+'</div><button class="primary" data-go="home">Continue</button></section>');
}
function upload(){
  return layout('<section class="stack"><h1>Dein Content → dein Teleprompter</h1><div class="upload-zone"><div>＋</div><h2>Datei hinzufügen</h2><p>PDF · Audio · Bild · Website · YouTube · kopierter Text</p></div><div class="source-grid">'+['📄 PDF','🎧 Audio','🖼 Bild','🌐 Website','▶ YouTube','📋 Text'].map(x=>'<button>'+x+'</button>').join('')+'</div><div class="input-card"><label>Text eingeben</label><textarea placeholder="Japanischen Text hier eingeben..."></textarea><div><button>Einfügen</button><button class="primary">Generieren</button></div></div></section>',{active:'read'});
}
function lessons(){
  const groups=[
    ['BASICS','🍋',[['Begrüssen','こんにちは / おはよう'],['Vorstellen','わたしはユミです。'],['Herkunft','スイスからきました。']]],
    ['CONVERSATION STARTER','🗣️',[['Einfache Fragen','これはなんですか？'],['Antworten','はい / いいえ / わかりません']]],
    ['NUMBERS & TIME','🕒',[['Zahlen 1–20','いち、に、さん、…'],['Uhrzeit','なんじですか？']]],
    ['FOOD & SURVIVAL','🍱',[['Essen bestellen','___ をください'],['Restaurant Basics','おいしい！']]],
    ['GRAMMAR LITE','✍️',[['Partikel','は・が・を'],['Satzbau','Subject → Object → Verb']]]
  ];
  const html=groups.map(([name,em,rows])=>'<div class="lesson-group"><h2>'+em+' '+name+'</h2>'+rows.map(([a,b])=>'<button class="lesson-row"><div><strong>'+a+'</strong><small>'+b+'</small></div><span>›</span></button>').join('')+'</div>').join('');
  return layout('<section class="stack lessons"><div class="section-head"><div><span>🇯🇵 JAPANESE</span><h1>Absolute Beginner</h1></div><div class="xp">N5 · 75%</div></div>'+html+'</section>',{active:'lessons'});
}
function profile(){
  const vids=['🇯🇵 Speak It','🇫🇷 French Quiz','🇮🇳 Hindi Flow','🏆 Challenge','📺 Abria TV','🌍 Map Run'];
  return layout('<section class="profile"><div class="avatar">YK</div><h1>@youngkhemet</h1><div class="premium">✦ Premium Member</div><div class="stats"><div><strong>238</strong><span>Follower</span></div><div><strong>65</strong><span>Folgen</span></div><div><strong>456</strong><span>XP</span></div></div><div class="badges"><div>🔥 117 Tage</div><div>🎥 346 Videos</div><div>🌍 4 Länder</div></div><div class="profile-tabs"><button class="active">Videos</button><button>Challenges</button><button>Wonders</button></div><div class="video-grid">'+vids.map(x=>'<div>'+x+'</div>').join('')+'</div></section>',{active:'profile'});
}
function mapBase(mode='world'){
  const titles={world:'WORLD LANGUAGE MAP',friends:'FRIENDS MAP',party:'PARTY SESSION · JAPAN',orbit:'ORBIT CHAT · JAPAN'};
  const friendNodes=mode==='friends'||mode==='party'||mode==='orbit';
  const pins=countries.map((c,i)=>'<button class="pin p'+i+'" style="--accent:'+c.accent+'"><span>'+c.flag+'</span><small>'+c.code+'</small></button>').join('');
  const friends=friendNodes?'<div class="friend-node f1"><b>Tarek</b><small>+450 XP</small></div><div class="friend-node f2"><b>Carla</b><small>10 Day Streak</small></div><div class="friend-node f3"><b>Dani</b><small>Lesson 5</small></div>':'';
  const rings=(mode==='party'||mode==='orbit')?'<div class="orbit-ring r1"></div><div class="orbit-ring r2"></div>':'';
  const waves=mode==='orbit'?'<div class="wave w1"></div><div class="wave w2"></div><div class="wave w3"></div>':'';
  return '<section class="map-page"><div class="map-title"><div class="big-logo"><span>▶</span>Abria</div><h1>'+titles[mode]+'</h1></div><div class="globe"><div class="earth-grid"></div>'+pins+friends+rings+waves+'</div><div class="map-panel"><h2>🇯🇵 Japan</h2><div class="progress"><i style="width:72%"></i></div><div class="map-actions"><button data-go="lessons">Lessons</button><button data-go="party">Challenges</button><button data-go="tv">TV</button></div></div></section>';
}
function mapScreen(mode='world'){return layout(mapBase(mode),{active:'map',wide:true});}
function party(){
  const members=['Tarek','Simon','Carla','Nadine','Sana','Alex','Ines','Dani','Mika','Leo'];
  const wall=members.map((n,i)=>'<button class="video-tile"><div class="person p'+(i%5)+'">🙂</div><span>'+n+'</span></button>').join('');
  const body='<section class="call-page"><div class="call-head"><div class="big-logo"><span>▶</span>Abria</div><h1>Party Session · Japanese Study Group</h1><div class="points">'+state.points.toLocaleString()+' Group Points</div></div><div class="call-layout"><div class="video-wall">'+wall+'</div><aside class="challenge-panel"><h2>JOIN CHALLENGE</h2><p>Translate the sentence:</p><div class="jp">今日はどんな感じですか?</div><button id="challengeBtn" class="primary">'+(state.challenge?'✓ Completed · +450':'Complete Challenge')+'</button><div class="answers"><span>✓ Dani</span><span>✓ Tarek</span><span>✓ Nadine</span></div></aside></div></section>';
  return layout(body,{wide:true});
}
function tv(){
  const cards=countries.map((c,i)=>'<button class="tv-card '+(i===state.tv?'selected':'')+'" data-tv="'+i+'" style="--accent:'+c.accent+'"><div class="studio"><div class="anchor">🧑‍💼</div><div class="studio-scene">'+c.scene+'</div></div><strong>'+c.flag+' '+c.code+' TV</strong><small>'+c.hello+'</small></button>').join('');
  const c=countries[state.tv];
  return layout('<section class="tv-page"><div class="tv-head"><div class="big-logo"><span>▶</span>Abria <em>TV</em></div><span class="live">LIVE · 24/7</span></div><div class="tv-carousel">'+cards+'</div><div class="now-playing" style="--accent:'+c.accent+'"><div class="anchor big">🧑‍💼</div><div><span>NOW ON AIR</span><h1>'+c.flag+' '+c.name+'</h1><p>'+c.hello+'<br>'+c.romaji+'</p><button class="primary">Join Live</button></div></div><div class="frequency"><b>FREQUENCY</b><div>'+countries.map((x,i)=>'<button data-tv="'+i+'" class="'+(i===state.tv?'on':'')+'">'+x.flag+'</button>').join('')+'</div></div></section>',{wide:true});
}
function talent(){
  const studios=[['🇯🇵','Japan Studio','⛩️'],['🇫🇷','France Studio','🗼'],['🇮🇳','India Studio','🛕'],['🌐','Classic News','📰'],['🇰🇷','Korea Neon','🌃'],['🎌','Anime Classroom','🏫']];
  return layout('<section class="stack talent"><div class="section-head"><div><span>ABRIA</span><h1>Talent Mode</h1></div><div class="xp">XP 126,800</div></div><h2>Select your studio</h2><div class="studio-grid">'+studios.map(([f,n,s],i)=>'<button class="studio-card '+(i===1?'selected':'')+'"><div>'+s+'</div><strong>'+f+' '+n+'</strong><small>Host live shows · earn XP</small></button>').join('')+'</div><button class="primary">Start Talent Mode</button></section>',{wide:true});
}
function wonders(){
  const list=[['Pyramids of Giza','△'],['Hanging Gardens','🌿'],['Colossus of Rhodes','🗿'],['Lighthouse of Alexandria','🗼'],['Mausoleum','🏛️'],['Temple of Artemis','🏺'],['Statue of Zeus','⚡']];
  return layout('<section class="wonders"><div class="section-head"><div><span>ANCIENT 7</span><h1>Abria Wonders Collection</h1></div><div class="xp">XP 126,800</div></div><div class="wonder-grid">'+list.map(([n,e],i)=>'<button class="wonder '+(i<4?'unlocked':'')+'"><div>'+e+'</div><strong>'+n+'</strong><small>'+(i<4?'UNLOCKED · +5K XP':'LOCKED')+'</small></button>').join('')+'</div><div class="babel"><div class="tower">▱<br>▱▱<br>▱▱▱</div><div><span>GRAND COLLECTION REWARD</span><h2>Tower of Babel</h2><p>Collect all 14 Wonder Badges.</p><div class="progress"><i style="width:42%"></i></div></div></div></section>',{wide:true});
}
function screen(){
  const s=state.screen;
  if(s==='login')return login();
  if(s==='language')return language();
  if(s==='upload')return upload();
  if(s==='lessons')return lessons();
  if(s==='profile')return profile();
  if(s==='map')return mapScreen('world');
  if(s==='friends')return mapScreen('friends');
  if(s==='orbit')return mapScreen('orbit');
  if(s==='party')return party();
  if(s==='tv')return tv();
  if(s==='talent')return talent();
  if(s==='wonders')return wonders();
  return home();
}
function render(){app.innerHTML=screen();bind();}
function bind(){
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{state.screen=b.dataset.go;location.hash=state.screen;render()});
  const m=document.getElementById('moduleBtn'),d=document.getElementById('drawer'),c=document.getElementById('closeDrawer');
  if(m&&d)m.onclick=()=>d.classList.add('open');
  if(c&&d)c.onclick=()=>d.classList.remove('open');
  if(d)d.onclick=e=>{if(e.target===d)d.classList.remove('open')};
  document.querySelectorAll('[data-country]').forEach(b=>b.onclick=()=>{state.country=+b.dataset.country;render()});
  const prev=document.getElementById('prevCountry'),next=document.getElementById('nextCountry');
  if(prev)prev.onclick=()=>{state.country=(state.country+countries.length-1)%countries.length;render()};
  if(next)next.onclick=()=>{state.country=(state.country+1)%countries.length;render()};
  const play=document.getElementById('playBtn'); if(play)play.onclick=()=>{state.playing=!state.playing;render()};
  const minus=document.getElementById('minusSpeed'),plus=document.getElementById('plusSpeed');
  if(minus)minus.onclick=()=>{state.speed=Math.max(.5,state.speed-.25);render()};
  if(plus)plus.onclick=()=>{state.speed=Math.min(2.5,state.speed+.25);render()};
  document.querySelectorAll('[data-tv]').forEach(b=>b.onclick=()=>{state.tv=+b.dataset.tv;render()});
  const cb=document.getElementById('challengeBtn'); if(cb)cb.onclick=()=>{if(!state.challenge){state.challenge=true;state.points+=450}render()};
}
window.onhashchange=()=>{const h=location.hash.slice(1);if(h){state.screen=h;render()}};
const initial=location.hash.slice(1);if(initial)state.screen=initial;render();
