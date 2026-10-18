const SB_URL='https://qnhomguqjgbbxesoezzg.supabase.co';
const SB_KEY='sb_publishable_SDc0yBR-J7q7FfMFKYAJxQ_VcgQtoTy';
const CAT_NAMES={cups:'أكواب وأغطية',sugar:'السكر والتقليب',straws:'الشاليموه',paper:'المناديل والورقيات',takeaway:'التعبئة والتيك أواي'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function sbFetch(path,opts={}){return fetch(SB_URL+'/rest/v1/'+path,{...opts,headers:{apikey:SB_KEY,'Content-Type':'application/json',...(opts.headers||{})}})}

let PRODUCTS=[],PRODUCTS_FAILED=false;
const productsReady=sbFetch('products?select=*&active=eq.true&order=created_at.asc')
 .then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})
 .then(rows=>{PRODUCTS=rows.map(p=>({id:p.id,name:p.name,category:p.category,categoryName:CAT_NAMES[p.category]||p.category,price:Number(p.price),featured:!!p.featured,art:p.category}))})
 .catch(e=>{console.error(e);PRODUCTS_FAILED=true});

const money=n=>`${Number(n).toLocaleString('en-US')} ج.م`;
function getCart(){try{return JSON.parse(localStorage.getItem('propack_cart')||'[]')}catch(e){return []}}
function saveCart(cart){localStorage.setItem('propack_cart',JSON.stringify(cart));updateCartCount()}
function updateCartCount(){const count=getCart().reduce((s,i)=>s+i.qty,0);document.querySelectorAll('#cartCount').forEach(el=>el.textContent=count)}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;let c=getCart();let item=c.find(x=>x.id===id);if(item)item.qty++;else c.push({id,qty:1});saveCart(c);const btn=document.querySelector(`[data-add="${id}"]`);if(btn){const old=btn.textContent;btn.textContent='✓ تمت الإضافة';setTimeout(()=>btn.textContent=old,1100)}}
function changeQty(id,delta){let c=getCart();let item=c.find(x=>x.id===id);if(item)item.qty+=delta;c=c.filter(x=>x.qty>0);saveCart(c);return c}
function removeFromCart(id){saveCart(getCart().filter(x=>x.id!==id))}
function cartDetails(){return getCart().map(i=>({...PRODUCTS.find(p=>p.id===i.id),qty:i.qty})).filter(p=>p.id)}
function cartTotal(){return cartDetails().reduce((s,p)=>s+p.price*p.qty,0)}
function artHTML(p){let inside='';if(p.art==='cups')inside='<i class="draw-cup"><b>PRO<br>PACK</b></i>';if(p.art==='sugar')inside='<div class="draw-sachets"><i>SUGAR</i><i>SUGAR</i><i>SUGAR</i></div>';if(p.art==='straws')inside='<div class="draw-straws"><i></i><i></i><i></i><i></i></div>';if(p.art==='paper')inside='<div class="draw-napkins"><i></i><i></i><i></i></div>';if(p.art==='takeaway')inside='<div class="draw-box">TAKE<br>AWAY</div>';return `<div class="product-art art-${esc(p.art)}">${p.featured?'<span class="badge">اختيار مميز</span>':''}${inside}<small>PRO PACK • HORECA SUPPLIES</small></div>`}
function productCard(p){const id=esc(p.id);return `<article class="product-card">${artHTML(p)}<div class="product-details"><span class="product-cat">${esc(p.categoryName)}</span><h3>${esc(p.name)}</h3><div class="price-line"><strong>${money(p.price)}</strong><small>سعر تقديري</small></div><div class="product-actions"><button class="add-cart" data-add="${id}" onclick="addToCart('${id}')">أضف إلى السلة +</button><button class="details-btn" title="تفاصيل" onclick="alert('تواصل مع الشركة لتأكيد المقاس والكمية والسعر النهائي.')">⋯</button></div></div></article>`}
document.addEventListener('DOMContentLoaded',()=>{updateCartCount();const form=document.getElementById('globalSearch');if(form){form.addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('searchInput').value.trim();location.href='products.html'+(q?'?q='+encodeURIComponent(q):'')})}document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear())});
