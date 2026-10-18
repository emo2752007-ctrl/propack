document.addEventListener('DOMContentLoaded',async()=>{
 const grid=document.getElementById('featuredGrid');if(!grid)return;
 grid.innerHTML='<p class="summary-note">جاري تحميل المنتجات...</p>';
 await productsReady;
 let featured=PRODUCTS.filter(p=>p.featured);if(!featured.length)featured=PRODUCTS.slice();
 if(!featured.length){grid.innerHTML=`<p class="summary-note">${PRODUCTS_FAILED?'تعذر تحميل المنتجات الآن. حدّث الصفحة بعد قليل.':'لا توجد منتجات حاليًا.'}</p>`;return}
 let start=0;
 function draw(){const n=Math.min(4,featured.length),list=[];for(let i=0;i<n;i++)list.push(featured[(start+i)%featured.length]);grid.innerHTML=list.map(productCard).join('')}
 draw();
 document.getElementById('nextProducts')?.addEventListener('click',()=>{start=(start+1)%featured.length;draw()});
 document.getElementById('prevProducts')?.addEventListener('click',()=>{start=(start-1+featured.length)%featured.length;draw()});
});
