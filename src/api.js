const usgs = 'https://earthquake.usgs.gov/fdsnws/event/1/';
const params = (f, extra={}) => new URLSearchParams({format:'geojson',latitude:f.lat,longitude:f.lon,maxradiuskm:f.radius,minmagnitude:f.minMagnitude,starttime:f.start,endtime:f.end,orderby:'time',...extra});
export async function searchCity(name, signal){ const q=new URLSearchParams({name,count:5,language:'ru',format:'json'}); const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?${q}`,{signal}); if(!r.ok) throw Error('Не удалось найти город'); return (await r.json()).results||[]; }
export async function countQuakes(f,signal){const r=await fetch(`${usgs}count?${params(f)}`,{signal}); if(!r.ok) throw Error('USGS не принял фильтры'); return await r.json();}
export async function getQuakes(f,signal,offset=1){const r=await fetch(`${usgs}query?${params(f,{limit:200,offset})}`,{signal}); if(r.status===204)return {features:[]}; if(!r.ok)throw Error('Не удалось загрузить выборку'); return await r.json();}
