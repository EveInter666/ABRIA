const screens={
  login:{src:'assets/login.webp',type:'portrait',label:'Login'},
  language:{src:'assets/language.webp',type:'portrait',label:'Sprachauswahl'},
  home:{src:'assets/home.webp',type:'portrait',label:'Teleprompter'},
  record:{src:'assets/record.webp',type:'portrait',label:'Record Mode'},
  upload:{src:'assets/upload.webp',type:'portrait',label:'PDF / Upload'},
  lessons:{src:'assets/lessons.webp',type:'portrait',label:'Lessons'},
  profile:{src:'assets/profile.webp',type:'portrait',label:'Profil'},
  map:{src:'assets/map.webp',type:'landscape',label:'World Map'},
  'friends-map':{src:'assets/friends-map.webp',type:'landscape',label:'Friends Map'},
  'party-map':{src:'assets/party-map.webp',type:'landscape',label:'Party Map'},
  'orbit-chat':{src:'assets/orbit-chat.webp',type:'landscape',label:'Orbit Chat'},
  tv:{src:'assets/tv.webp',type:'landscape',label:'Abria TV'},
  talent:{src:'assets/talent.webp',type:'landscape',label:'Talent Mode'},
  wonders:{src:'assets/wonders.webp',type:'landscape',label:'Wonders Collection'}
};
const phone=document.getElementById('phone'), screenImage=document.getElementById('screenImage'), landscape=document.getElementById('landscapeFrame'), landscapeImage=document.getElementById('landscapeImage'), drawer=document.getElementById('drawer'), toast=document.getElementById('toast'), dock=document.getElementById('dock'), hotspots=document.getElementById('hotspots');
let current='home', previous='home';
function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),1200)}
function setActive(key){dock.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.go===key || (key==='record'&&b.dataset.go==='record')))}
function renderHotspots(key){hotspots.innerHTML=''; if(key!=='home')return;
  const hs=[
    ['record',5,33,90,47,'Öffne Record Mode'],
    ['lessons',60,85,18,12,'Öffne Lessons'],
    ['profile',79,85,18,12,'Öffne Profil']
  ];
  hs.forEach(([go,x,y,w,h,title])=>{const b=document.createElement('button');b.className='hotspot';b.dataset.go=go;b.title=title;b.style.cssText=`left:${x}%;top:${y}%;width:${w}%;height:${h}%`;hotspots.appendChild(b);});
}
function go(key){if(!screens[key])return;previous=current;current=key;drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');const s=screens[key];
  if(s.type==='landscape'){phone.classList.add('hidden');landscape.classList.remove('hidden');landscapeImage.src=s.src;dock.classList.add('hidden');}
  else{landscape.classList.add('hidden');phone.classList.remove('hidden');dock.classList.remove('hidden');screenImage.src=s.src;renderHotspots(key);setActive(key);}
  history.replaceState(null,'',`#${key}`);showToast(s.label);
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)go(b.dataset.go)});
document.getElementById('menuBtn').onclick=()=>{drawer.classList.add('open');drawer.setAttribute('aria-hidden','false')};
document.getElementById('closeDrawer').onclick=()=>{drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true')};
drawer.addEventListener('click',e=>{if(e.target===drawer){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true')}});
document.getElementById('backFab').onclick=()=>go(previous==='map'||screens[previous]?.type==='landscape'?'home':previous);
document.getElementById('modeBtn').onclick=()=>showToast('Abria Demo · Visual Prototype');
window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(drawer.classList.contains('open'))document.getElementById('closeDrawer').click();else if(!landscape.classList.contains('hidden'))go('home')}});
const start=location.hash.slice(1);go(screens[start]?start:'home');