'use strict';
const $=s=>document.querySelector(s), count=139, ratio=396.85/453.543;
let book, current=0, ready=false;
const assetVersion='hq20261028';
const initialPage=new URLSearchParams(location.hash.slice(1)).get('page')||1;
const path=n=>`assets/${String(n).padStart(3,'0')}.webp?v=${assetVersion}`;
const nodes=Array.from({length:count},(_,i)=>{let p=document.createElement('div');p.className='sheet';p.dataset.n=i+1;let img=document.createElement('img');img.alt=`作品集 PDF 第 ${i+1} 页`;img.dataset.src=path(i+1);img.draggable=false;img.addEventListener('error',()=>{let b=document.createElement('button');b.className='error';b.textContent='图片未能加载，点击重试';b.onclick=()=>{b.remove();img.src=path(i+1)};p.append(b)});p.append(img);p.ondblclick=()=>{$('#detail img').src=path(i+1);$('#detail').showModal()};return p});
function load(i){for(let n=Math.max(0,i-3);n<Math.min(count,i+6);n++){let img=nodes[n].querySelector('img');if(!img.src)img.src=img.dataset.src}}
function dimensions(){let s=$('#stage');let h=Math.min(s.clientHeight,(s.clientWidth-8)/(ratio*2));return{width:h*ratio,height:h}}
function update(){current=book.getCurrentPageIndex();load(current);$('#page').value=current+1;$('#prev').disabled=current===0;$('#next').disabled=current>=count-2;$('#mode').textContent='双页阅读 · 跨页无间隙';$('#status').textContent=current===0?'封面':`PDF ${current+1}–${Math.min(current+2,count)} / 139`;history.replaceState(null,'',`#page=${current+1}`)}
function go(n){n=Math.min(count,Math.max(1,Number(n)||1));load(n-1);book.turnToPage(n-1);update()}
try{if(!window.St)throw Error('翻页组件未加载');let d=dimensions();book=new St.PageFlip($('#book'),{width:d.width,height:d.height,size:'fixed',showCover:true,usePortrait:false,drawShadow:true,maxShadowOpacity:.32,flippingTime:850,mobileScrollSupport:true,swipeDistance:25,clickEventForward:true});book.on('flip',update);book.on('changeOrientation',()=>{if(ready)update()});load(0);book.loadFromHTML(nodes);ready=true;$('#loading').hidden=true;go(initialPage);let timer;window.addEventListener('resize',()=>{clearTimeout(timer);timer=setTimeout(()=>{let n=current,d=dimensions();Object.assign(book.getSettings(),{width:d.width,height:d.height,minWidth:d.width,maxWidth:d.width,minHeight:d.height,maxHeight:d.height});Object.assign($('#book').style,{minWidth:2*d.width+'px',minHeight:d.height+'px',maxWidth:2*d.width+'px',width:2*d.width+'px'});book.getUI().setOrientationStyle('landscape');book.update();book.turnToPage(n);update()},160)});}catch(e){$('#loading').textContent='无法打开翻页组件，请刷新页面。'+e.message}
$('#prev').onclick=()=>book.flipPrev();$('#next').onclick=()=>book.flipNext();$('#jump').onsubmit=e=>{e.preventDefault();go($('#page').value)};
document.addEventListener('keydown',e=>{if(e.target.matches('input')||document.querySelector('dialog[open]'))return;if(e.key==='ArrowRight'){e.preventDefault();book.flipNext()}if(e.key==='ArrowLeft'){e.preventDefault();book.flipPrev()}if(e.key==='Home')go(1);if(e.key==='End')go(count)});
$('#full').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{$('#status').textContent='此浏览器暂不支持全屏，请使用横屏阅读。'}};
$('#index').onclick=()=>{$('#drawer').showModal();$('#index').setAttribute('aria-expanded','true')};$('#close').onclick=()=>$('#drawer').close();$('#drawer').onclose=()=>$('#index').setAttribute('aria-expanded','false');$('#detail-close').onclick=()=>$('#detail').close();
for(let n=1;n<=count;n++){let b=document.createElement('button');b.innerHTML=`<img loading="lazy" src="assets/t${String(n).padStart(3,'0')}.webp?v=hq20261028" alt="第 ${n} 页缩略图"><span>${String(n).padStart(3,'0')} ${n===1?' / COVER':''}</span>`;b.onclick=()=>{go(n);$('#drawer').close()};$('#thumbs').append(b)}
window.addEventListener('hashchange',()=>go(new URLSearchParams(location.hash.slice(1)).get('page')));



