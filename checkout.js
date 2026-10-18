document.addEventListener('DOMContentLoaded',async()=>{
 const list=document.getElementById('checkoutItems'),msg=document.getElementById('checkoutMessage'),form=document.getElementById('checkoutForm');
 list.innerHTML='<p class="summary-note">جاري تحميل السلة...</p>';
 await productsReady;
 function drawSummary(){
  const items=cartDetails();
  list.innerHTML=items.length?items.map(p=>`<div class="summary-row"><span>${esc(p.name)} × ${p.qty}</span><b>${money(p.price*p.qty)}</b></div>`).join(''):'<p class="summary-note">السلة فارغة. <a href="products.html">تصفح المنتجات</a></p>';
  document.getElementById('checkoutTotal').textContent=money(cartTotal());
 }
 drawSummary();
 form.addEventListener('submit',async e=>{
  e.preventDefault();
  const items=cartDetails();
  if(!items.length){msg.textContent='أضف منتجات للسلة أولًا.';return}
  const btn=form.querySelector('button[type=submit]');btn.disabled=true;msg.textContent='جاري إرسال الطلب...';
  const id=crypto.randomUUID();
  const val=k=>document.getElementById(k).value.trim();
  const order={id,full_name:val('fullName'),phone:val('phone'),email:val('email')||null,city:val('city'),address:val('address'),notes:val('notes')||null,items:items.map(p=>({name:p.name,qty:p.qty,price:p.price})),total:cartTotal(),status:'new'};
  try{
   const r=await sbFetch('orders',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(order)});
   if(!r.ok)throw new Error(r.status);
   msg.innerHTML=`تم استلام طلبك رقم <b>${id.slice(0,8).toUpperCase()}</b>. سنتواصل معك لتأكيد السعر النهائي والتوصيل.`;
   localStorage.removeItem('propack_cart');updateCartCount();form.reset();drawSummary();
  }catch(err){console.error(err);msg.textContent='تعذر إرسال الطلب. حاول مرة أخرى أو تواصل مع الشركة.'}
  btn.disabled=false;
 });
});
