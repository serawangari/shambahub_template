// Simple, dependency-free behavior for search, layout toggle, and deep-linking
const SERVICES = [
  {
    key:'land-rate-clearance',
    name:'Land Rate Clearance',
    desc:'Get official land rate clearance certificates for transactions and compliance.',
    href:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/HomePage', // change to your EB flow
    details:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/HomePage',
    tags:['Finance','Rates','Certificate']
  },
  {
    key:'land-registration',
    name:'Land Registration',
    desc:'Register parcels and update proprietorship records securely.',
    href:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/HomePage',
    details:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/HomePage',
    tags:['Registry','Ownership','Records']
  },
  {
    key:'physical-planning',
    name:'Physical Planning',
    desc:'Submit change-of-use, zoning and development planning applications.',
    href:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/HomePage',
    details:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/HomePage',
    tags:['Planning','Zoning','Development']
  },
  {
    key:'survey-mapping',
    name:'Survey & Mapping',
    desc:'Request professional surveying, mapping and boundary demarcation.',
    href:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/Parcel-Lookup',
    details:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/Parcel-Lookup',
    tags:['Survey','Map','Parcel']
  },
  {
    key:'valuation',
    name:'Valuation',
    desc:'Order valuation reports for loans, insurance or disposals.',
    href:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/HomePage',
    details:'https://experience.arcgis.com/experience/fc7581fef493414f8c3eccffb505e69c/page/HomePage',
    tags:['Valuation','Report']
  }
];

const catalog = document.getElementById('catalog');
const countEl = document.getElementById('count');
const q = document.getElementById('q');
const btnGrid = document.getElementById('btn-grid');
const btnList = document.getElementById('btn-list');

function icon(kind){
  const icons = {
    Finance:'<path d="M4 7h16M4 12h16M4 17h10" stroke-width="2"/>',
    Registry:'<rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"/><path d="M8 8h8M8 12h8M8 16h5" stroke-width="2"/>',
    Planning:'<path d="M4 20V6l8-4 8 4v14" stroke-width="2"/><path d="M12 10v10" stroke-width="2"/><path d="M8 14h8" stroke-width="2"/>',
    Survey:'<circle cx="12" cy="7" r="3" stroke-width="2"/><path d="M6 21l6-10 6 10" stroke-width="2"/>',
    Valuation:'<path d="M12 3v18M5 12h14" stroke-width="2"/>'
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">${icons[kind]||icons.Registry}</svg>`;
}

function render(list){
  catalog.innerHTML = list.map(s => `
    <article class="card" id="svc-${s.key}">
      <div class="icon" aria-hidden="true">${icon(s.tags?.[0]||'Registry')}</div>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="tags">
        ${s.tags?.map(t=>`<span class="tag">${t}</span>`).join('')||''}
      </div>
      <div class="cta">
        <a class="cta-btn" href="${s.href}" target="_top">Start Application</a>
        <a class="link" href="${s.details}" target="_top" aria-label="View details">Details</a>
      </div>
    </article>
  `).join('');
  countEl.textContent = `${list.length} service${list.length!==1?'s':''}`;
}
render(SERVICES);

// search
q.addEventListener('input', (e)=>{
  const term = e.target.value.toLowerCase().trim();
  const list = SERVICES.filter(s => (s.name+' '+s.desc+' '+(s.tags||[]).join(' ')).toLowerCase().includes(term));
  render(list);
});

// layout toggle (grid/list purely visual; grid is default)
btnGrid.addEventListener('click', () => {
  btnGrid.setAttribute('aria-pressed','true');
  btnList.setAttribute('aria-pressed','false');
  document.getElementById('catalog').classList.remove('list');
});
btnList.addEventListener('click', () => {
  btnGrid.setAttribute('aria-pressed','false');
  btnList.setAttribute('aria-pressed','true');
  document.getElementById('catalog').classList.add('list');
});

// small CSS tweak for list view (injected once)
const style = document.createElement('style');
style.textContent = `
  .grid.list{ display:block }
  .grid.list .card{ display:grid; grid-template-columns: 56px 1fr auto; align-items:center; gap:14px; margin-bottom:12px }
  .grid.list .card .cta{ margin-top:0; justify-self:end }
`;
document.head.appendChild(style);

// footer year
document.getElementById('yr').textContent = new Date().getFullYear();

// deep-link highlight ?service=valuation
const params = new URLSearchParams(location.search);
const svc = params.get('service');
if(svc){
  const el = document.getElementById('svc-'+svc);
  if(el){ el.style.outline='3px solid #ffd7a2'; el.scrollIntoView({behavior:'smooth',block:'center'}); }
}

