const base='https://walidvoyages-13332-default-rtdb.firebaseio.com/public';
export async function loadCollection(name){
 try {const controller=new AbortController();const t=setTimeout(()=>controller.abort(),6000);
 const r=await fetch(`${base}/${name}.json`,{signal:controller.signal});clearTimeout(t);
 if(!r.ok) return []; const v=await r.json();
 return Object.entries(v||{}).filter(([,x])=>x && typeof x==='object').map(([id,x])=>({id,...x})).filter(x=>x.published!==false);
 } catch {return [];}
}
export function slugify(x){return String(x||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80)}
