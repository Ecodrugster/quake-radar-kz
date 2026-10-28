export const haversineKm=(a,b)=>{const R=6371,rad=x=>x*Math.PI/180,dLat=rad(b.lat-a.lat),dLon=rad(b.lon-a.lon);const x=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(x));};
export const magClass=m=>m<3?'micro':m<4?'minor':m<5?'light':m<6?'moderate':m<7?'strong':'major';
export const normalizeQuake=(f,city)=>{const [lon,lat,depth]=f.geometry.coordinates;return{id:f.id,mag:f.properties.mag??0,place:f.properties.place||'Неизвестное место',time:f.properties.time,lat,lon,depthKm:depth??0,distance:city?haversineKm(city,{lat,lon}):0};};
export const sortQuakes=(xs,key='time')=>[...xs].sort((a,b)=>key==='mag'?b.mag-a.mag:key==='distance'?a.distance-b.distance:b.time-a.time);
export const formatAlmaty=t=>new Intl.DateTimeFormat('ru-RU',{timeZone:'Asia/Almaty',day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(t).replace(',','');
