/* VideoZone24 — demo video catalogue (Creative Commons sample videos).
   Ad slots are empty placeholders: paste your Adsterra banner code
   inside the .ad-slot divs in index.html / watch.html */

const VIDEOS = [
  {id:"v1", title:"মজার কার্টুন: বড় খরগোশের কাণ্ড", cat:"কার্টুন", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", dur:"9:56", views:"১২ লাখ", likes:"৮৫ হাজার"},
  {id:"v2", title:"স্বপ্নের হাতি — অ্যানিমেশন শর্ট ফিল্ম", cat:"কার্টুন", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", dur:"10:53", views:"৮ লাখ", likes:"৫২ হাজার"},
  {id:"v3", title:"আগুন নিয়ে স্টান্ট — দেখুন চমক", cat:"ট্রেন্ডিং", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", dur:"0:15", views:"২৩ লাখ", likes:"১.৪ লাখ"},
  {id:"v4", title:"পালানোর দৃশ্য — অ্যাকশন ক্লিপ", cat:"ট্রেন্ডিং", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", dur:"0:15", views:"১৯ লাখ", likes:"১.১ লাখ"},
  {id:"v5", title:"হাসির মুহূর্ত — ফানি কম্পিলেশন", cat:"ফানি", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", dur:"1:00", views:"৩১ লাখ", likes:"২.২ লাখ"},
  {id:"v6", title:"জয়রাইড — মজার রাইড ভিডিও", cat:"ফানি", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", dur:"0:15", views:"১৫ লাখ", likes:"৯৮ হাজার"},
  {id:"v7", title:"মেল্টডাউন মুহূর্ত — ভাইরাল ক্লিপ", cat:"টিকটক", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", dur:"0:15", views:"২৭ লাখ", likes:"১.৯ লাখ"},
  {id:"v8", title:"সিনটেল — ফ্যান্টাসি শর্ট ফিল্ম", cat:"মুভি ক্লিপ", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", dur:"14:48", views:"৯ লাখ", likes:"৬৭ হাজার"},
  {id:"v9", title:"টিয়ার্স অফ স্টিল — সাই-ফাই শর্ট", cat:"মুভি ক্লিপ", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", dur:"12:14", views:"৭ লাখ", likes:"৪৯ হাজার"},
  {id:"v10", title:"গাড়ি রিভিউ — Volkswagen GTI", cat:"টেক", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4", dur:"10:53", views:"৫ লাখ", likes:"৩১ হাজার"},
  {id:"v11", title:"কম বাজেটে সেরা গাড়ি কোনটি?", cat:"টেক", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", dur:"9:00", views:"৬ লাখ", likes:"৩৮ হাজার"},
  {id:"v12", title:"অফরোড অ্যাডভেঞ্চার — Subaru", cat:"ট্রাভেল", src:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", dur:"9:54", views:"৪ লাখ", likes:"২৬ হাজার"},
];

const CATS = ["সব","ট্রেন্ডিং","ফানি","কার্টুন","মুভি ক্লিপ","টেক","ট্রাভেল","টিকটক"];

const thumb = id => `https://picsum.photos/seed/${id}/640/360`;

function cardHTML(v){
  return `<div class="card" onclick="location.href='watch.html?v=${v.id}'">
    <div class="thumb"><img loading="lazy" src="${thumb(v.id)}" alt=""><span class="dur">${v.dur}</span></div>
    <div class="card-body"><div class="card-title">${v.title}</div>
    <div class="card-meta"><span>👁 ${v.views}</span><span>👍 ${v.likes}</span></div></div>
  </div>`;
}

/* ---------- index page ---------- */
function initIndex(){
  const catsEl = document.getElementById('cats');
  const grid = document.getElementById('grid');
  const searchInput = document.getElementById('searchInput');
  let activeCat = "সব", query = "";

  catsEl.innerHTML = CATS.map(c =>
    `<button class="cat${c==="সব"?" active":""}" data-cat="${c}">${c}</button>`).join('');

  catsEl.addEventListener('click', e => {
    const b = e.target.closest('.cat'); if(!b) return;
    activeCat = b.dataset.cat;
    catsEl.querySelectorAll('.cat').forEach(x => x.classList.toggle('active', x===b));
    render();
  });
  searchInput.addEventListener('input', () => { query = searchInput.value.trim(); render(); });

  function render(){
    const list = VIDEOS.filter(v =>
      (activeCat==="সব" || v.cat===activeCat) &&
      (!query || v.title.includes(query)));
    if(!list.length){ grid.innerHTML = `<div class="empty">কোনো ভিডিও পাওয়া যায়নি</div>`; return; }
    let html = "";
    list.forEach((v,i) => {
      html += cardHTML(v);
      // In-feed ad slot after every 6 cards
      if((i+1)%6===0) html += `<div class="ad-slot in-feed" style="grid-column:1/-1"><span><span class="ad-label">বিজ্ঞাপন</span><br><!-- ADSTERRA: এখানে আপনার ব্যানার কোড বসান --></span></div>`;
    });
    grid.innerHTML = html;
  }
  render();
}

/* ---------- watch page ---------- */
function initWatch(){
  const id = new URLSearchParams(location.search).get('v');
  const v = VIDEOS.find(x => x.id===id) || VIDEOS[0];
  document.getElementById('player').src = v.src;
  document.getElementById('wTitle').textContent = v.title;
  document.getElementById('wMeta').innerHTML =
    `<span>👁 ${v.views} ভিউ</span><span>👍 ${v.likes} লাইক</span><span>📁 ${v.cat}</span>`;
  document.title = v.title + " — VideoZone24";
  document.getElementById('related').innerHTML =
    VIDEOS.filter(x => x.id!==v.id).slice(0,8).map(r =>
      `<div class="rel-item" onclick="location.href='watch.html?v=${r.id}'">
        <div class="thumb"><img loading="lazy" src="${thumb(r.id)}" alt=""><span class="dur">${r.dur}</span></div>
        <div><div class="card-title">${r.title}</div>
        <div class="card-meta"><span>👁 ${r.views}</span></div></div>
      </div>`).join('');
}

/* ---------- theme ---------- */
function initTheme(){
  const btn = document.getElementById('themeBtn');
  const saved = localStorage.getItem('vz-theme');
  if(saved) document.documentElement.setAttribute('data-theme', saved);
  const paint = () => btn.textContent =
    document.documentElement.getAttribute('data-theme')==="light" ? "🌙" : "☀️";
  paint();
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme')==="light" ? "" : "light";
    if(next) document.documentElement.setAttribute('data-theme', next);
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('vz-theme', next);
    paint();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  if(document.getElementById('grid')) initIndex();
  if(document.getElementById('player')) initWatch();
});
