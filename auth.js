document.addEventListener('DOMContentLoaded',()=>{
 const tabs=[...document.querySelectorAll('.auth-tab')],login=document.getElementById('loginForm'),register=document.getElementById('registerForm');
 const show=isLogin=>{login.hidden=!isLogin;register.hidden=isLogin;login.style.display=isLogin?'':'none';register.style.display=isLogin?'none':''};
 show(true);
 tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.toggle('active',x===t));show(t.dataset.tab==='login')}));
 const say=(id,t,ok)=>{const el=document.getElementById(id);el.textContent=t;el.style.color=ok?'#15803d':'#b91c1c'};
 async function auth(path,body){
  const r=await fetch(SB_URL+'/auth/v1/'+path,{method:'POST',headers:{apikey:SB_KEY,'Content-Type':'application/json'},body:JSON.stringify(body)});
  return {ok:r.ok,status:r.status,d:await r.json().catch(()=>({}))};
 }
 function errText(res){
  const c=res.d.error_code||'',m=String(res.d.msg||res.d.error_description||'').toLowerCase();
  if(c==='invalid_credentials'||m.includes('invalid login'))return 'البريد أو كلمة المرور غير صحيحة.';
  if(c==='user_already_exists'||m.includes('already registered'))return 'هذا البريد مسجل بالفعل. سجّل دخولك من التبويب الأول.';
  if(c==='weak_password'||m.includes('password'))return 'كلمة المرور ضعيفة. استخدم 6 خانات أو أكثر.';
  if(c==='email_not_confirmed')return 'أكّد بريدك من الرسالة التي وصلتك أولًا.';
  if(res.status===429||c.includes('rate_limit'))return 'محاولات كثيرة. جرّب بعد قليل.';
  return 'حدث خطأ، حاول مرة أخرى.';
 }
 function startSession(d,fallbackName){
  const email=d.user?.email||'';
  localStorage.setItem('propack_user',JSON.stringify({name:d.user?.user_metadata?.name||fallbackName||email,email,token:d.access_token}));
  setTimeout(()=>location.href='index.html',900);
 }
 login.addEventListener('submit',async e=>{
  e.preventDefault();const btn=login.querySelector('button[type=submit]');btn.disabled=true;say('loginMessage','جاري تسجيل الدخول...',true);
  try{
   const res=await auth('token?grant_type=password',{email:document.getElementById('loginEmail').value.trim(),password:document.getElementById('loginPassword').value});
   if(res.ok&&res.d.access_token){say('loginMessage','تم تسجيل الدخول. جاري تحويلك للمتجر...',true);startSession(res.d)}else say('loginMessage',errText(res),false);
  }catch(_){say('loginMessage','تعذر الاتصال. تأكد من الإنترنت وحاول مرة أخرى.',false)}
  btn.disabled=false;
 });
 register.addEventListener('submit',async e=>{
  e.preventDefault();const btn=register.querySelector('button[type=submit]');
  const name=document.getElementById('registerName').value.trim(),email=document.getElementById('registerEmail').value.trim(),password=document.getElementById('registerPassword').value;
  if(password.length<6){say('registerMessage','كلمة المرور لازم تكون 6 خانات على الأقل.',false);return}
  btn.disabled=true;say('registerMessage','جاري إنشاء الحساب...',true);
  try{
   const res=await auth('signup',{email,password,data:{name}});
   if(res.ok&&res.d.access_token){say('registerMessage','تم إنشاء الحساب. جاري تحويلك للمتجر...',true);startSession(res.d,name)}
   else if(res.ok){say('registerMessage','تم إنشاء الحساب. أكّد بريدك من الرسالة التي وصلتك ثم سجّل دخولك.',true)}
   else say('registerMessage',errText(res),false);
  }catch(_){say('registerMessage','تعذر الاتصال. تأكد من الإنترنت وحاول مرة أخرى.',false)}
  btn.disabled=false;
 });
});
