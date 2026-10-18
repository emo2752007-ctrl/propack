document.addEventListener('DOMContentLoaded',async()=>{
 const root=document.getElementById('cartPage');
 root.innerHTML='<p class="summary-note">جاري تحميل السلة...</p>';
 await productsReady;
 function draw(){const items=cartDetails();if(!items.length){root.innerHTML='<div class="empty-cart"><div class="empty-icon">🛒</div><h2>سلة التسوق فارغة</h2><p>ابدأ بإضافة المنتجات التي تحتاجها لمشروعك.</p><a class="btn btn-blue" href="products.html">تصفح المنتجات ←</a></div>';return}
 root.innerHTML=`<div class="cart-layout"><section class="cart-items">${items.map(p=>`<div class="cart-item">${artHTML(p)}<div><h3>${esc(p.name)}</h3><p>${esc(p.categoryName)}</p><div class="qty-control"><button data-minus="${esc(p.id)}">−</button><span>${p.qty}</span><button data-plus="${esc(p.id)}">+</button><button class="remove-item" data-remove="${esc(p.id)}">حذف</button></div></div><div class="cart-item-price">${money(p.price*p.qty)}</div></div>`).join('')}</section><aside class="cart-summary"><h3>ملخص الطلب</h3><div class="summary-row"><span>عدد الوحدات</span><b>${items.reduce((s,p)=>s+p.qty,0)}</b></div><div class="summary-row"><span>قيمة المنتجات التقديرية</span><b>${money(cartTotal())}</b></div><div class="summary-row"><span>الشحن</span><b>يُحدد لاحقًا</b></div><div class="summary-row summary-total"><span>الإجمالي التقديري</span><b>${money(cartTotal())}</b></div><p class="summary-note">السعر تقديري، ويتم تأكيد السعر النهائي والتوافر قبل تجهيز الطلب.</p><a class="btn btn-blue" href="checkout.html">تابع إلى بيانات الاستلام ←</a><a class="btn btn-outline" href="products.html" style="width:100%;margin-top:8px">متابعة التسوق</a></aside></div>`;
 root.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>{changeQty(b.dataset.plus,1);draw()});root.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>{changeQty(b.dataset.minus,-1);draw()});root.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{removeFromCart(b.dataset.remove);draw()});
 }
 draw();
});
