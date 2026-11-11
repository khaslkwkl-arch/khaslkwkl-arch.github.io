<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تطبيقي التجريبي</title>
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#0f4c4a">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="icon-192.png">
<style>
:root{--bg:#faf9f5;--ink:#1b1f1e;--muted:#5d6664;--teal:#0f4c4a;--line:#dcdad0;--card:#fff}
@media (prefers-color-scheme:dark){:root{--bg:#12191a;--ink:#eef0ed;--muted:#a3adaa;--teal:#6fc4bd;--line:#2b3638;--card:#1a2324}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:"Segoe UI",Tahoma,"Noto Naskh Arabic",Arial,sans-serif;line-height:1.7}
main{max-width:560px;margin:0 auto;padding:28px 18px 48px}
h1{font-size:1.9rem;margin:0 0 6px;color:var(--teal)}
p.sub{margin:0 0 22px;color:var(--muted)}
input[type=search]{width:100%;font:inherit;padding:13px 16px;border:2px solid var(--line);border-radius:12px;background:var(--card);color:var(--ink)}
input[type=search]:focus{outline:3px solid var(--teal);border-color:transparent}
ul{list-style:none;margin:18px 0 0;padding:0}
li{padding:14px 4px;border-bottom:1px solid var(--line)}
li b{display:block}
li span{color:var(--muted);font-size:.95rem}
#empty{display:none;margin-top:18px;color:var(--muted)}
button{font:inherit;margin-top:26px;padding:12px 22px;border:0;border-radius:12px;background:var(--teal);color:#fff;cursor:pointer;display:none}
@media (prefers-color-scheme:dark){button{color:#0b1213}}
button:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
</style>
</head>
<body>
<main>
  <h1>تطبيقي التجريبي</h1>
  <p class="sub">اكتب كلمة في الخانة للبحث في القائمة.</p>
  <input type="search" id="q" placeholder="ابحث هنا" aria-label="بحث" autocomplete="off">
  <ul id="list"></ul>
  <p id="empty">ما لقينا نتيجة. جرب كلمة ثانية.</p>
  <button id="install" type="button">تثبيت التطبيق</button>
</main>
<script>
const items=[
 ["ما هو التطبيق التجريبي","صفحة بسيطة نتأكد بيها أن الرفع والتثبيت يشتغلون."],
 ["كيف يتثبت على أندرويد","من قائمة الكروم اختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية."],
 ["كيف يتثبت على الآيفون","افتحه بـ Safari ثم زر المشاركة ثم إضافة إلى الشاشة الرئيسية."],
 ["هل يشتغل بدون إنترنت","إي، بعد أول فتح تنحفظ الصفحة ويشتغل حتى بدون نت."],
 ["كيف أغيّر المحتوى","نبدّل القائمة هذي بمحتوى فكرتك الحقيقية."]
];
const list=document.getElementById('list'),q=document.getElementById('q'),empty=document.getElementById('empty');
function norm(s){return s.replace(/[\u064B-\u0652\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').toLowerCase()}
function render(){
  const t=norm(q.value.trim());
  const r=items.filter(([a,b])=>norm(a+' '+b).includes(t));
  list.innerHTML='';
  r.forEach(([a,b])=>{const li=document.createElement('li');const x=document.createElement('b');x.textContent=a;const y=document.createElement('span');y.textContent=b;li.append(x,y);list.append(li)});
  empty.style.display=r.length?'none':'block';
}
q.addEventListener('input',render);render();
let ev;const btn=document.getElementById('install');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();ev=e;btn.style.display='inline-block'});
btn.addEventListener('click',async()=>{if(!ev)return;ev.prompt();await ev.userChoice;ev=null;btn.style.display='none'});
window.addEventListener('appinstalled',()=>{btn.style.display='none'});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
</script>
</body>
</html>
