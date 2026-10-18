document.addEventListener('DOMContentLoaded',async()=>{
 const grid=document.getElementById('allProductsGrid'),empty=document.getElementById('emptyProducts'),count=document.getElementById('resultsCount'),search=document.getElementById('searchInput'),sort=document.getElementById('sortSelect');
 grid.innerHTML='<p class="summary-note">جاري تحميل المنتجات...</p>';
 await productsReady;
 const params=new URLSearchParams(location.search);let category=params.get('category')||'all';search.value=params.get('q')||'';
 const radios=[...document.querySelectorAll('input[name="category"]')];radios.forEach(r=>r.checked=r.value===category);if(!radios.some(r=>r.checked)){category='all';radios[0].checked=true}
 function draw(){
  const q=search.value.trim();
  let list=PRODUCTS.filter(p=>(category==='all'||p.category===category)&&(!q||(p.name+' '+p.categoryName).includes(q)));
  if(sort.value==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'ar'));else list.sort((a,b)=>Number(b.featured)-Number(a.featured));
  grid.innerHTML=list.map(productCard).join('');
  empty.textContent=PRODUCTS_FAILED?'تعذر تحميل المنتجات الآن. حدّث الصفحة بعد قليل.':'لا توجد منتجات مطابقة. جرّب تغيير البحث أو القسم.';
  empty.hidden=list.length>0;count.textContent=`${list.length} منتجات`;
 }
 radios.forEach(r=>r.addEventListener('change',()=>{category=r.value;draw()}));search.addEventListener('input',draw);sort.addEventListener('change',draw);draw();
});
