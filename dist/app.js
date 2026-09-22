'use strict';
const $ = id => document.getElementById(id);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => crypto.randomUUID ? crypto.randomUUID() : 'el-' + Date.now() + '-' + Math.random().toString(36).slice(2);
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const MAX_CANVAS_WIDTH=4096, MAX_CANVAS_HEIGHT=20000;
const canvasPresets={desktop:[1440,900],tablet:[768,1024],mobile:[390,844],long:[1440,6000]};
function resizeDocument(document,width,height){
  if(!Number.isInteger(width)||!Number.isInteger(height)||width<320||width>MAX_CANVAS_WIDTH||height<240||height>MAX_CANVAS_HEIGHT)throw Error('宽度请输入 320–4096 的整数，高度请输入 240–20000 的整数');
  document.width=width;document.height=height;
}
function pngSize(width,height){
  // ponytail: bounded raster memory; large canvases export a complete image at reduced resolution.
  const factor=Math.min(1,16384/width,16384/height,Math.sqrt(24000000/(width*height)));
  return {width:Math.max(1,Math.floor(width*factor)),height:Math.max(1,Math.floor(height*factor)),scaled:factor<1};
}
const names = {...Object.fromEntries(componentLibrary.map(c=>[c.type,c.name])),icon:'图标'};
const textTypes=new Set(componentLibrary.filter(c=>c.defaults?.text!==undefined).map(c=>c.type));
// A small set of standard outline icon primitives; no icon package is needed.
const icons = {
  home:{name:'首页',paths:'<path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7"/>'},
  search:{name:'搜索',paths:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>'},
  user:{name:'用户',paths:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>'},
  menu:{name:'菜单',paths:'<path d="M4 6h16M4 12h16M4 18h16"/>'},
  heart:{name:'喜欢',paths:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>'},
  settings:{name:'设置',paths:'<circle cx="12" cy="12" r="3"/><path d="m9 3-1 3-3 1-2 4 2 3v4l4 3 3-1 3 1 4-3v-4l2-3-2-4-3-1-1-3z"/>'},
  star:{name:'星标',paths:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>'},
  arrow:{name:'箭头',paths:'<path d="M4 12h16m-6-6 6 6-6 6"/>'}
};
Object.assign(icons,iconLibrary);
function element(type, x, y, extra = {}) {
  const spec=componentLibrary.find(c=>c.type===type);
  if(!spec&&type!=='icon')throw Error('不支持的组件');
  const [w,h]=spec?.size||[40,40];
  return {id:uid(),type,x,y,w,h,text:'',fill:'#ffffff',fillNone:type==='icon',stroke:'#c5ccd7',strokeWidth:type==='icon'?0:1,radius:6,color:'#475569',fontSize:16,fontWeight:400,align:'left',opacity:100,icon:'home',accent:'#5578ee',checked:true,value:50,strokeDash:'solid',...spec?.defaults,...extra};
}
function example() {
  const nodes = [];
  const add = (type,x,y,p) => nodes.push(element(type,x,y,p));
  add('text',64,35,{w:160,h:38,text:'YOUR BRAND',fontSize:21,fontWeight:700,color:'#344154'});
  ['首页','产品','关于我们'].forEach((text,i) => add('text',930+i*110,40,{w:90,h:28,text,fontSize:16,color:'#7d8797'}));
  add('button',1250,28,{w:126,h:42,text:'联系我们',fill:'#ffffff',color:'#536175',stroke:'#bac3d0',radius:5,fontSize:14});
  add('line',64,103,{w:1312,h:1,stroke:'#e0e5ec'});
  add('text',80,188,{w:500,h:27,text:'一个关于你的网站',fontSize:16,color:'#8b97a8'});
  add('text',80,239,{w:580,h:156,text:'把脑中的画面，\n变成你的网页。',fontSize:54,fontWeight:700,color:'#344154'});
  add('text',80,424,{w:490,h:62,text:'在这里放上两行介绍文字。\n先确定位置和比例，再填入真正的内容。',fontSize:19,color:'#8b97a8'});
  add('button',80,529,{w:172,h:52,text:'主要操作',fill:'#475569',radius:5});
  add('button',268,529,{w:160,h:52,text:'次要操作',fill:'#ffffff',color:'#67768a',stroke:'#c5ccd7',radius:5});
  add('image',770,209,{w:590,h:366,text:'产品图片 / 视觉区域',fill:'#f1f3f6',stroke:'#d4dbe5',radius:8,fontSize:17,color:'#99a4b5'});
  add('text',80,664,{w:350,h:40,text:'你想展示的内容',fontSize:25,fontWeight:600,color:'#536175'});
  [80,520,960].forEach((x,i) => {
    add('rect',x,729,{w:400,h:123,fill:'#ffffff',stroke:'#d9dfe8',radius:7});
    add('icon',x+24,754,{w:29,h:29,icon:['star','heart','home'][i],color:'#9aa7b9'});
    add('text',x+72,753,{w:280,h:28,text:['内容卡片一','内容卡片二','内容卡片三'][i],fontSize:18,fontWeight:600,color:'#67768a'});
    add('text',x+72,793,{w:280,h:25,text:'用一句话描述这里的内容',fontSize:14,color:'#a0a9b8'});
  });
  return {version:1,name:'我的网页草图',width:1440,height:900,background:'#ffffff',elements:nodes};
}
function normalize(raw) {
  if (!raw || raw.version!==1 || !Array.isArray(raw.elements) || raw.elements.length>400) throw Error('请选择有效的草图桌 JSON 文件（最多 400 个元素）');
  const number = (v,fallback,min,max) => typeof v==='number' && Number.isFinite(v) ? clamp(v,min,max):fallback;
  const color = (v,fallback) => /^#[0-9a-f]{6}$/i.test(v) ? v : fallback;
  const width=number(raw.width,1440,320,MAX_CANVAS_WIDTH),height=number(raw.height,900,240,MAX_CANVAS_HEIGHT);
  return {version:1,name:String(raw.name||'未命名草图').slice(0,100),width,height,background:color(raw.background,'#ffffff'),elements:raw.elements.map(n => {
    if(!n || !Object.hasOwn(names,n.type))throw Error('草图文件包含不支持的元素');
    const base=element(n.type,0,0);
    return {...base,id:uid(),x:number(n.x,0,0,MAX_CANVAS_WIDTH-16),y:number(n.y,0,0,MAX_CANVAS_HEIGHT-16),w:number(n.w,base.w,n.type==='vline'?1:16,MAX_CANVAS_WIDTH),h:number(n.h,base.h,1,MAX_CANVAS_HEIGHT),text:String(n.text??base.text).slice(0,2000),fill:color(n.fill,base.fill),fillNone:typeof n.fillNone==='boolean'?n.fillNone:base.fillNone,stroke:color(n.stroke,base.stroke),strokeWidth:number(n.strokeWidth,base.strokeWidth,0,12),radius:number(n.radius,base.radius,0,500),color:color(n.color,base.color),fontSize:number(n.fontSize,base.fontSize,8,160),fontWeight:[400,500,600,700].includes(n.fontWeight)?n.fontWeight:400,align:['left','center','right'].includes(n.align)?n.align:base.align,opacity:number(n.opacity,100,0,100),icon:Object.hasOwn(icons,n.icon)?n.icon:'home',accent:color(n.accent,base.accent),checked:typeof n.checked==='boolean'?n.checked:base.checked,value:number(n.value,base.value,0,100),strokeDash:['solid','dashed','dotted'].includes(n.strokeDash)?n.strokeDash:base.strokeDash};
  }).map(n=>({...n,w:Math.min(n.w,MAX_CANVAS_WIDTH-n.x),h:Math.min(n.h,MAX_CANVAS_HEIGHT-n.y)}))};
}
let doc = example();
try { const saved=localStorage.getItem('sketchdesk-document-v1');if(saved)doc=normalize(JSON.parse(saved)); }catch { $('save-status').textContent='未能读取上次草图，已载入示例'; }
let selected=[],history=[],future=[],scale=0.6,showGrid=true,snap=true,drag=null,inlineId=null,pendingConfirm=null,saveTimer,toastTimer,saveFailed=false,propertyEditStarted=false,fitMode='page';
const artboard=$('artboard'),objects=$('objects'),selection=$('selection'),viewport=$('viewport');
const measure=document.createElement('canvas').getContext('2d');
const selectedNodes=()=>doc.elements.filter(n=>selected.includes(n.id));
const state=()=>JSON.stringify(doc);
function checkpoint(){history.push(state());if(history.length>70)history.shift();future=[];updateButtons();}
function persist(){clearTimeout(saveTimer);$('save-status').textContent='正在保存…';saveTimer=setTimeout(()=>{try{localStorage.setItem('sketchdesk-document-v1',state());saveFailed=false;$('save-status').textContent='已保存到此浏览器';}catch{saveFailed=true;$('save-status').textContent='无法自动保存，请保存文件';}},300);}
window.addEventListener('beforeunload',event=>{if(saveFailed){event.preventDefault();event.returnValue='';}else{try{localStorage.setItem('sketchdesk-document-v1',state());}catch{event.preventDefault();event.returnValue='';}}});
function toast(text){$('toast').textContent=text;$('toast').classList.remove('hidden');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.add('hidden'),2800);}
function updateButtons(){ $('undo').disabled=!history.length;$('redo').disabled=!future.length;$('duplicate').disabled=!selected.length;$('delete').disabled=!selected.length; }
function bounds(nodes=selectedNodes()){if(!nodes.length)return null;const x=Math.min(...nodes.map(n=>n.x)),y=Math.min(...nodes.map(n=>n.y));return {x,y,w:Math.max(...nodes.map(n=>n.x+n.w))-x,h:Math.max(...nodes.map(n=>n.y+n.h))-y};}
function textLines(text,width,fontSize,fontWeight){
  measure.font=`${fontWeight} ${fontSize}px "Segoe UI", "Microsoft YaHei", sans-serif`;
  return String(text).split('\n').flatMap(paragraph=>{if(!paragraph)return [''];let lines=[],line='';for(const char of paragraph){if(line&&measure.measureText(line+char).width>width){lines.push(line);line=char;}else line+=char;}lines.push(line);return lines;});
}
function textMarkup(n,text=n.text,{padding=0,y=0,width=n.w,size=n.fontSize,weight=n.fontWeight}={}){
  const lines=textLines(text,Math.max(8,width-padding*2),size,weight),anchor=n.align==='center'?'middle':n.align==='right'?'end':'start',x=n.align==='center'?width/2:n.align==='right'?width-padding:padding;
  return `<text x="${x}" fill="${n.color}" font-family="Segoe UI, Microsoft YaHei, sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${lines.map((line,i)=>`<tspan x="${x}" y="${y+size+(i*size*1.4)}">${escapeHTML(line)}</tspan>`).join('')}</text>`;
}
function nodeMarkup(n){
  const fill=n.fillNone?'none':n.fill,stroke=`stroke="${n.stroke}" stroke-width="${n.strokeWidth}" ${n.strokeDash==='dashed'?'stroke-dasharray="8 5"':n.strokeDash==='dotted'?'stroke-dasharray="2 4"':''}`;
  let markup='';
  if(n.type==='circle')markup=`<ellipse cx="${n.w/2}" cy="${n.h/2}" rx="${Math.max(0,n.w/2-n.strokeWidth/2)}" ry="${Math.max(0,n.h/2-n.strokeWidth/2)}" fill="${fill}" ${stroke}/>`;
  else if(n.type==='line')markup=`<path d="M0 ${n.h/2}H${n.w}" fill="none" ${stroke}/>`;
  else if(['text','heading','paragraph'].includes(n.type))markup=textMarkup(n);
  else if(n.type==='icon')markup=`<svg width="${n.w}" height="${n.h}" viewBox="0 0 24 24" fill="none" stroke="${n.color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[n.icon].paths}</svg>`;
  else if(!['rect','button','input','image','card'].includes(n.type))markup=componentMarkup(n);
  else {
    markup=`<rect x="${n.strokeWidth/2}" y="${n.strokeWidth/2}" width="${Math.max(0,n.w-n.strokeWidth)}" height="${Math.max(0,n.h-n.strokeWidth)}" rx="${n.radius}" fill="${fill}" ${stroke}/>`;
    if(n.type==='image') {
      const cx=n.w/2,cy=n.h/2-19,s=Math.min(32,n.w/4,n.h/4);
      markup+=`<g transform="translate(${cx-s/2},${cy-s/2})" fill="none" stroke="${n.color}" stroke-width="1.5"><rect width="${s}" height="${s}" rx="3"/><circle cx="${s*.7}" cy="${s*.3}" r="${s*.075}"/><path d="M0 ${s*.8} ${s*.3} ${s*.5} ${s*.6} ${s*.8} ${s*.78} ${s*.65} ${s} ${s*.9}"/></g>`+textMarkup(n,n.text,{padding:12,y:cy+s*.7,size:n.fontSize});
    }else if(n.type==='card') {
      markup+=`<rect x="16" y="16" width="${Math.max(0,n.w-32)}" height="${Math.max(8,n.h*.42)}" rx="3" fill="#e9edf3"/>`+textMarkup(n,n.text,{padding:16,y:n.h*.42+28});
    }else if(n.type==='button'||n.type==='input')markup+=textMarkup(n,n.text,{padding:14,y:Math.max(0,(n.h-n.fontSize*1.4)/2)});
  }
  // The transparent hit area makes text, lines and outline icons easy to select.
  return `<g data-id="${n.id}" transform="translate(${n.x},${n.y})" opacity="${n.opacity/100}"><svg width="${n.w}" height="${n.h}" overflow="hidden">${markup}</svg><rect width="${n.w}" height="${Math.max(n.h,8)}" fill="transparent" pointer-events="all"/></g>`;
}
function render(){
  artboard.setAttribute('viewBox',`0 0 ${doc.width} ${doc.height}`);$('canvas-bg').setAttribute('fill',doc.background);$('grid-bg').style.display=showGrid?'':'none';
  objects.innerHTML=doc.elements.map(nodeMarkup).join('');
  $('doc-name').value=doc.name;$('artboard-name').textContent=doc.name;$('canvas-size-label').textContent=`${doc.width} × ${doc.height}`;$('layer-count').textContent=doc.elements.length;
  $('extend-canvas').disabled=doc.height>=MAX_CANVAS_HEIGHT;$('extend-canvas').textContent=doc.height>=MAX_CANVAS_HEIGHT?'已到 20000px 上限':`＋ 延长画布 ${Math.min(1000,MAX_CANVAS_HEIGHT-doc.height)}px`;
  applyScale();renderSelection();renderLayers();updateButtons();
}
function renderSelection(){
  const b=bounds();$('selection-status').textContent=b?`已选择 ${selected.length} 个元素`:`${doc.elements.length} 个元素 · 点击开始编辑`;
  if(!b){selection.innerHTML='';return;}
  const stroke=1.4/scale,handle=7/scale;
  let markup=selectedNodes().map(n=>`<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" fill="none" stroke="#0066cc" stroke-width="${stroke}" pointer-events="none"/>`).join('');
  if(selected.length===1){
    const points={nw:[b.x,b.y],n:[b.x+b.w/2,b.y],ne:[b.x+b.w,b.y],e:[b.x+b.w,b.y+b.h/2],se:[b.x+b.w,b.y+b.h],s:[b.x+b.w/2,b.y+b.h],sw:[b.x,b.y+b.h],w:[b.x,b.y+b.h/2]};
    markup+=Object.entries(points).map(([dir,[x,y]])=>`<rect class="handle" data-dir="${dir}" x="${x-handle/2}" y="${y-handle/2}" width="${handle}" height="${handle}" style="stroke-width:${stroke}"/>`).join('');
    const label=`${Math.round(b.w)} × ${Math.round(b.h)}`,lw=64/scale,lh=20/scale,ly=b.y+b.h+12/scale;
    markup+=`<g pointer-events="none"><rect x="${b.x+b.w/2-lw/2}" y="${ly}" width="${lw}" height="${lh}" rx="${4/scale}" fill="#0066cc"/><text x="${b.x+b.w/2}" y="${ly+14/scale}" fill="white" text-anchor="middle" font-size="${10/scale}" font-family="Segoe UI, sans-serif">${label}</text></g>`;
  }else markup+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="#0066cc" stroke-width="${stroke}" stroke-dasharray="${4/scale}" pointer-events="none"/>`;
  selection.innerHTML=markup;syncPositionFields();
}
function applyScale(){const w=doc.width*scale,h=doc.height*scale;artboard.style.width=w+'px';artboard.style.height=h+'px';$('artboard-wrap').style.width=w+'px';$('artboard-wrap').style.height=h+'px';$('artboard-name').parentElement.style.width=w+'px';$('extend-canvas').parentElement.style.width=w+'px';$('zoom-label').textContent=Math.round(scale*100)+'%';}
function fit(mode='page'){fitMode=mode;const widthScale=(viewport.clientWidth-(innerWidth<700?40:84))/doc.width;scale=clamp(mode==='width'?widthScale:Math.min(widthScale,(viewport.clientHeight-158)/doc.height),.02,1);applyScale();renderSelection();viewport.scrollTo(0,0);}
function zoom(delta){scale=clamp(Math.round((scale+delta)*100)/100,.02,2);applyScale();renderSelection();}
function choose(ids){finishInline();propertyEditStarted=false;selected=ids.filter(id=>doc.elements.some(n=>n.id===id));renderSelection();renderProperties();renderLayers();updateButtons();}
function renderLayers(){ $('layer-list').innerHTML=[...doc.elements].reverse().map(n=>`<button class="layer-row ${selected.includes(n.id)?'selected':''}" data-layer="${n.id}" title="${escapeHTML(n.text||names[n.type])}"><span class="layer-symbol">${({text:'T',rect:'▭',circle:'○',line:'╱',icon:'◇',button:'▰',input:'▱',image:'▧',card:'▤'}[n.type])||'▤'}</span><span>${escapeHTML(n.text|| (n.type==='icon'?icons[n.icon].name:names[n.type]))}</span></button>`).join('')||'<p class="property-help">画布还是空的。<br>从组件库添加第一个元素吧。</p>'; }
function numberField(key,label,value,min=0,max=MAX_CANVAS_HEIGHT){return `<label class="field"><span>${label}</span><div class="field-input"><span>${key.toUpperCase()==='FONTSIZE'?'Aa':({width:'W',height:'H',fontSize:'Aa',radius:'R',strokeWidth:'—',opacity:'%'}[key]||key.toUpperCase())}</span><input data-prop="${key}" type="number" value="${Math.round(value)}" min="${min}" max="${max}" step="1" aria-label="${label}"></div></label>`;}
function colorField(key,label,value){return `<label class="field"><span>${label}</span><div class="field-input"><input type="color" value="${value}" data-prop="${key}" aria-label="${label}"><input data-color-text="${key}" value="${value.toUpperCase()}" maxlength="7" aria-label="${label}色值"></div></label>`;}
function renderProperties(){
  const nodes=selectedNodes(),n=nodes[0];$('property-type').textContent=nodes.length>1?'多个元素':n?names[n.type]:'画布';
  if(!n){$('properties').innerHTML=`<div class="selection-empty"><svg viewBox="0 0 24 24"><path d="m5 3 14 10-7 1-3 7z"/></svg><p>选中画布上的元素，<br>在这里调整位置、尺寸和样式。</p></div><section class="property-section"><h3>画布尺寸</h3><div class="field-grid">${numberField('width','宽度',doc.width,320,MAX_CANVAS_WIDTH)}${numberField('height','高度',doc.height,240)}</div><button data-apply-canvas="true" class="outlined" style="width:100%;margin-bottom:12px">应用尺寸</button><div class="row-buttons"><button data-preset="desktop">桌面</button><button data-preset="mobile">手机</button><button data-preset="long">长网页</button></div><p class="property-help">高度最高 20000px。<br>缩小只裁切显示，不会移动元素。</p></section><section class="property-section"><h3>画布背景</h3>${colorField('background','颜色',doc.background)}</section><p class="property-help">尺寸单位为 px。<br>草图会自动保存在当前浏览器，也可以保存文件后继续编辑。</p><button class="outlined" id="panel-save" style="width:100%">保存草图文件</button>`;return;}
  const single=nodes.length===1;
  $('properties').innerHTML=`${single?`<section class="property-section"><h3>位置与尺寸</h3><div class="field-grid">${numberField('x','横向位置',n.x)}${numberField('y','纵向位置',n.y)}${numberField('w','宽度',n.w,16)}${numberField('h','高度',n.h,n.type==='line'?1:16)}</div></section>`:`<p class="property-help">已选择 ${nodes.length} 个元素。可以一起移动、对齐或调整样式。</p>`}<section class="property-section"><h3>对齐${single?'画布':'所选元素'}</h3><div class="row-buttons">${[['left','左'],['center','中'],['right','右'],['top','顶'],['middle','中'],['bottom','底']].map(([a,t])=>`<button data-align="${a}" title="${({left:'左对齐',center:'水平居中',right:'右对齐',top:'顶部对齐',middle:'垂直居中',bottom:'底部对齐'}[a])}">${t}</button>`).join('')}</div></section>${single&&textTypes.has(n.type)?`<section class="property-section"><h3>文字内容</h3><label class="field"><textarea data-prop="text" aria-label="文字内容" maxlength="2000">${escapeHTML(n.text)}</textarea></label><p class="property-help">多条目组件一行一项；表格用 | 分隔列。</p><div class="field-grid">${numberField('fontSize','字号',n.fontSize,8,160)}<label class="field"><span>字重</span><div class="field-input"><select data-prop="fontWeight" aria-label="字重">${[[400,'常规'],[500,'中等'],[600,'半粗'],[700,'加粗']].map(([v,t])=>`<option value="${v}" ${n.fontWeight===v?'selected':''}>${t}</option>`).join('')}</select></div></label></div><div class="row-buttons">${['left','center','right'].map((a,i)=>`<button data-text-align="${a}" class="${n.align===a?'active':''}">${['左对齐','居中','右对齐'][i]}</button>`).join('')}</div></section>`:''}${single&&n.type==='icon'?`<section class="property-section"><h3>图标</h3><div class="icon-grid">${Object.entries(icons).map(([key,v])=>`<button class="icon-tile" data-change-icon="${key}" title="${v.name}">${iconMarkup(key)}</button>`).join('')}</div></section>`:''}<section class="property-section"><h3>外观</h3>${!['text','heading','paragraph','icon','line','vline','arrowline'].includes(n.type)?colorField('fill','填充',n.fill)+`<label class="field" style="flex-direction:row;align-items:center"><input type="checkbox" data-prop="fillNone" ${n.fillNone?'checked':''}>无填充</label>`:''}${(textTypes.has(n.type)||n.type==='icon')?colorField('color',n.type==='icon'?'图标颜色':'文字颜色',n.color):''}${!['text','heading','paragraph','icon'].includes(n.type)?colorField('stroke','边框颜色',n.stroke):''}<div class="field-grid">${!['text','heading','paragraph','icon'].includes(n.type)?numberField('strokeWidth','边框宽度',n.strokeWidth,0,12):''}${!['text','heading','paragraph','icon','circle','avatar','line','vline','arrowline','triangle','diamond'].includes(n.type)?numberField('radius','圆角',n.radius,0,500):''}${numberField('opacity','不透明度',n.opacity,0,100)}</div></section>${['checkbox','radio','toggle','slider','progress','navbar','sidebar','tabs','steps','pagination','alert','modal','stat'].includes(n.type)?`<section class="property-section"><h3>组件状态</h3>${colorField('accent','强调色',n.accent)}${['checkbox','radio','toggle'].includes(n.type)?`<label class="field" style="flex-direction:row;align-items:center"><input type="checkbox" data-prop="checked" ${n.checked?'checked':''}>选中 / 开启</label>`:''}${['slider','progress'].includes(n.type)?numberField('value','进度百分比',n.value,0,100):''}</section>`:''}${['rect','frame','pill','circle','line','vline','arrowline'].includes(n.type)?`<label class="field"><span>线条样式</span><div class="field-input"><select data-prop="strokeDash" aria-label="线条样式">${[['solid','实线'],['dashed','虚线'],['dotted','点线']].map(([v,t])=>`<option value="${v}" ${n.strokeDash===v?'selected':''}>${t}</option>`).join('')}</select></div></label>`:''}<section class="property-section"><h3>图层顺序</h3><div class="row-buttons"><button data-order="up">上移一层</button><button data-order="down">下移一层</button></div><div class="row-buttons" style="margin-top:6px"><button data-order="front">置顶</button><button data-order="back">置底</button></div></section>`;
}
function syncPositionFields(){const n=selectedNodes()[0];if(!n||selected.length!==1)return;['x','y','w','h'].forEach(key=>{const input=$('properties').querySelector(`[data-prop="${key}"]`);if(input&&document.activeElement!==input)input.value=Math.round(n[key]);});}
function iconMarkup(key){return `<svg class="icon" viewBox="0 0 24 24">${icons[key].paths}</svg>`;}
let libraryFilter='all';
const groupNames={forms:'表单与操作',nav:'导航',content:'内容展示',feedback:'状态与反馈'};
function renderLibrary(){
  const query=$('library-search').value.trim().toLowerCase();
  const components=componentLibrary.filter(c=>(libraryFilter==='all'||libraryFilter===c.group)&&(c.name+c.type+(groupNames[c.group]||'基础')).toLowerCase().includes(query));
  const iconEntries=(libraryFilter==='all'||libraryFilter==='icons')?Object.entries(icons).filter(([key,v])=>(key+v.name+v.keywords+v.group).toLowerCase().includes(query)):[];
  const tiles=items=>items.map(c=>{const n=element(c.type,0,0);return `<button draggable="true" class="component-tile" data-add="${c.type}" aria-label="添加${c.name}" title="添加${c.name}"><span class="component-preview"><svg viewBox="0 0 ${n.w} ${n.h}" width="64" height="30">${nodeMarkup(n)}</svg></span><span>${c.name}</span></button>`;}).join('');
  const basic=components.filter(c=>c.group==='basic'),ui=components.filter(c=>c.group!=='basic');
  $('basic-palette').innerHTML=tiles(basic);
  $('ui-palette').innerHTML=Object.entries(groupNames).map(([key,title])=>{const items=ui.filter(c=>c.group===key);return items.length?`<p class="library-group-title">${title}</p><div class="component-grid">${tiles(items)}</div>`:'';}).join('');
  $('icon-palette').innerHTML=iconEntries.map(([key,v])=>`<button draggable="true" class="icon-tile" data-add="icon" data-icon="${key}" aria-label="添加${v.name}图标" title="${v.name} · ${v.keywords}">${iconMarkup(key)}</button>`).join('');
  [['basic',basic.length],['ui',ui.length],['icon',iconEntries.length]].forEach(([key,count])=>{$(key+'-section').classList.toggle('hidden',!count);$(key+'-count').textContent=count;});
  $('library-empty').classList.toggle('hidden',!!(components.length+iconEntries.length));
}
$('library-search').addEventListener('input',renderLibrary);
document.querySelectorAll('[data-library-filter]').forEach(b=>b.onclick=()=>{libraryFilter=b.dataset.libraryFilter;document.querySelectorAll('[data-library-filter]').forEach(t=>t.classList.toggle('active',t===b));renderLibrary();});
renderLibrary();
function point(event){const r=artboard.getBoundingClientRect();return {x:(event.clientX-r.left)/scale,y:(event.clientY-r.top)/scale};}
function addElement(type,icon,at){
  if(doc.elements.length>=400){toast('最多支持 400 个元素，请先删除一些元素');return;}
  const r=artboard.getBoundingClientRect(),vr=viewport.getBoundingClientRect();
  const pos=at||{x:(Math.max(r.left,vr.left)+Math.min(r.right,vr.right))/2/scale-r.left/scale,y:(Math.max(r.top,vr.top)+Math.min(r.bottom,vr.bottom))/2/scale-r.top/scale};
  const n=element(type,0,0,icon?{icon}:{});n.w=Math.min(n.w,doc.width);n.h=Math.min(n.h,doc.height);n.x=clamp(Math.round((pos.x-n.w/2)/8)*8,0,doc.width-n.w);n.y=clamp(Math.round((pos.y-n.h/2)/8)*8,0,doc.height-n.h);checkpoint();doc.elements.push(n);render();choose([n.id]);persist();$('left-panel').classList.remove('open');
}
$('left-panel').addEventListener('click',e=>{const button=e.target.closest('[data-add]');if(button)addElement(button.dataset.add,button.dataset.icon);const layer=e.target.closest('[data-layer]');if(layer)choose(e.shiftKey?selected.includes(layer.dataset.layer)?selected.filter(id=>id!==layer.dataset.layer):[...selected,layer.dataset.layer]:[layer.dataset.layer]);});
$('left-panel').addEventListener('dragstart',e=>{const b=e.target.closest('[data-add]');if(b){e.dataTransfer.setData('application/sketchdesk',JSON.stringify({type:b.dataset.add,icon:b.dataset.icon}));e.dataTransfer.effectAllowed='copy';}});
artboard.addEventListener('dragover',e=>{if(e.dataTransfer.types.includes('application/sketchdesk')){e.preventDefault();e.dataTransfer.dropEffect='copy';}});
artboard.addEventListener('drop',e=>{e.preventDefault();try{const d=JSON.parse(e.dataTransfer.getData('application/sketchdesk'));if(Object.hasOwn(names,d.type))addElement(d.type,Object.hasOwn(icons,d.icon)?d.icon:undefined,point(e));}catch{toast('无法添加这个元素');}});
artboard.addEventListener('pointerdown',e=>{
  if(e.button!==0)return;finishInline();
  const handle=e.target.closest('[data-dir]'),node=e.target.closest('[data-id]'),p=point(e);
  if(handle&&selected.length===1){drag={mode:'resize',dir:handle.dataset.dir,start:p,nodes:selectedNodes().map(n=>({...n})),started:false};}
  else if(node){const id=node.dataset.id;if(e.shiftKey){choose(selected.includes(id)?selected.filter(v=>v!==id):[...selected,id]);if(!selected.includes(id))return;}else if(!selected.includes(id))choose([id]);drag={mode:'move',start:p,nodes:selectedNodes().map(n=>({...n})),bounds:bounds(),started:false};}
  else{choose([]);return;}
  artboard.focus();
});
artboard.addEventListener('pointermove',e=>{
  if(!drag)return;const p=point(e);let dx=p.x-drag.start.x,dy=p.y-drag.start.y;
  if(!drag.started){if(Math.abs(dx)+Math.abs(dy)<3/scale)return;checkpoint();drag.started=true;artboard.setPointerCapture(e.pointerId);}
  if(drag.mode==='move'){
    const b=drag.bounds;if(snap){dx=Math.round((b.x+dx)/8)*8-b.x;dy=Math.round((b.y+dy)/8)*8-b.y;}dx=clamp(dx,-b.x,Math.max(0,doc.width-b.w)-b.x);dy=clamp(dy,-b.y,Math.max(0,doc.height-b.h)-b.y);
    drag.nodes.forEach(start=>{const n=doc.elements.find(v=>v.id===start.id);n.x=Math.round(start.x+dx);n.y=Math.round(start.y+dy);});
  }else{
    const start=drag.nodes[0],n=doc.elements.find(v=>v.id===start.id),dir=drag.dir;let left=start.x,top=start.y,right=start.x+start.w,bottom=start.y+start.h,minH=n.type==='line'?1:16;
    const quant=v=>snap?Math.round(v/8)*8:Math.round(v);
    if(dir.includes('w'))left=clamp(quant(start.x+dx),0,right-16);
    if(dir.includes('e'))right=clamp(quant(start.x+start.w+dx),left+16,Math.max(left+16,doc.width));
    if(dir.includes('n'))top=clamp(quant(start.y+dy),0,bottom-minH);
    if(dir.includes('s'))bottom=clamp(quant(start.y+start.h+dy),top+minH,Math.max(top+minH,doc.height));
    Object.assign(n,{x:left,y:top,w:right-left,h:bottom-top});
  }
  objects.innerHTML=doc.elements.map(nodeMarkup).join('');renderSelection();
});
function finishDrag(){if(drag?.started){renderLayers();persist();}drag=null;}
artboard.addEventListener('pointerup',finishDrag);artboard.addEventListener('pointercancel',finishDrag);artboard.addEventListener('lostpointercapture',finishDrag);
artboard.addEventListener('dblclick',e=>{const node=e.target.closest('[data-id]');if(!node)return;const n=doc.elements.find(v=>v.id===node.dataset.id);if(!textTypes.has(n.type))return;choose([n.id]);inlineId=n.id;const t=$('inline-text');t.value=n.text;Object.assign(t.style,{left:n.x*scale+'px',top:n.y*scale+'px',width:Math.max(n.w*scale,140)+'px',height:Math.max(n.h*scale,55)+'px',fontSize:Math.max(n.fontSize*scale,14)+'px',fontWeight:n.fontWeight,color:n.color==='#ffffff'?'#334155':n.color,textAlign:n.align});t.classList.remove('hidden');t.focus();t.select();});
function finishInline(cancel=false){if(!inlineId)return;const n=doc.elements.find(n=>n.id===inlineId),t=$('inline-text');if(n&&!cancel&&n.text!==t.value){checkpoint();n.text=t.value.slice(0,2000);objects.innerHTML=doc.elements.map(nodeMarkup).join('');renderLayers();persist();}inlineId=null;t.classList.add('hidden');}
$('inline-text').addEventListener('blur',()=>{finishInline();renderProperties();});
$('inline-text').addEventListener('keydown',e=>{if(e.key==='Escape'){finishInline(true);artboard.focus();}else if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){finishInline();renderProperties();artboard.focus();}});
function changeProperty(key,value,record=true){
  const n=selectedNodes();if(record)checkpoint();
  if(!n.length){if(key==='background'){doc.background=value;$('canvas-bg').setAttribute('fill',value);}}
  else n.forEach(el=>{if(key==='x')el.x=clamp(value,0,Math.max(0,doc.width-el.w));else if(key==='y')el.y=clamp(value,0,Math.max(0,doc.height-el.h));else if(key==='w')el.w=clamp(value,16,Math.max(16,doc.width-el.x));else if(key==='h')el.h=clamp(value,el.type==='line'?1:16,Math.max(el.type==='line'?1:16,doc.height-el.y));else el[key]=value;});
  objects.innerHTML=doc.elements.map(nodeMarkup).join('');renderSelection();renderLayers();persist();
}
$('properties').addEventListener('focusin',()=>{propertyEditStarted=false;});
$('properties').addEventListener('input',e=>{
  const target=e.target,key=target.dataset.prop;
  if(key==='width'||key==='height')return;
  if(key){let value=target.type==='checkbox'?target.checked:target.value;if(target.type==='number'){if(target.value==='')return;value=Number(value);if(!Number.isFinite(value))return;value=clamp(value,Number(target.min),Number(target.max));}else if(key==='fontWeight')value=Number(value);changeProperty(key,value,!propertyEditStarted);propertyEditStarted=true;if(target.type==='color'){const text=$('properties').querySelector(`[data-color-text="${key}"]`);if(text)text.value=value.toUpperCase();}}
});
$('properties').addEventListener('change',e=>{
  const target=e.target;
  if(target.type==='number'){const nodes=selectedNodes(),key=target.dataset.prop;if(key&&key!=='width'&&key!=='height')target.value=Math.round(nodes.length?nodes[0][key]:doc[key]);}
  const ck=target.dataset.colorText;if(ck){const value=target.value;if(/^#[0-9a-f]{6}$/i.test(value)){changeProperty(ck,value);renderProperties();}else{toast('请输入六位十六进制颜色，例如 #475569');renderProperties();}}
});
function alignNodes(mode){const nodes=selectedNodes();if(!nodes.length)return;checkpoint();const b=nodes.length===1?{x:0,y:0,w:doc.width,h:doc.height}:bounds();nodes.forEach(n=>{if(mode==='left')n.x=b.x;if(mode==='center')n.x=b.x+(b.w-n.w)/2;if(mode==='right')n.x=b.x+b.w-n.w;if(mode==='top')n.y=b.y;if(mode==='middle')n.y=b.y+(b.h-n.h)/2;if(mode==='bottom')n.y=b.y+b.h-n.h;n.x=Math.max(0,Math.round(n.x));n.y=Math.max(0,Math.round(n.y));});render();persist();}
function orderNodes(mode){if(!selected.length)return;checkpoint();const included=n=>selected.includes(n.id);if(mode==='front')doc.elements=[...doc.elements.filter(n=>!included(n)),...doc.elements.filter(included)];else if(mode==='back')doc.elements=[...doc.elements.filter(included),...doc.elements.filter(n=>!included(n))];else if(mode==='up'){for(let i=doc.elements.length-2;i>=0;i--)if(included(doc.elements[i])&&!included(doc.elements[i+1]))[doc.elements[i],doc.elements[i+1]]=[doc.elements[i+1],doc.elements[i]];}else{for(let i=1;i<doc.elements.length;i++)if(included(doc.elements[i])&&!included(doc.elements[i-1]))[doc.elements[i],doc.elements[i-1]]=[doc.elements[i-1],doc.elements[i]];}render();persist();}
$('properties').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.align)alignNodes(b.dataset.align);
  if(b.dataset.textAlign){changeProperty('align',b.dataset.textAlign);renderProperties();}
  if(b.dataset.changeIcon){changeProperty('icon',b.dataset.changeIcon);renderProperties();}
  if(b.dataset.order)orderNodes(b.dataset.order);
  if(b.dataset.preset)resizeCanvas(...canvasPresets[b.dataset.preset]);
  if(b.dataset.applyCanvas)resizeCanvas(Number($('properties').querySelector('[data-prop="width"]').value),Number($('properties').querySelector('[data-prop="height"]').value));
  if(b.id==='panel-save')saveFile();
});
function remove(){if(!selected.length)return;checkpoint();doc.elements=doc.elements.filter(n=>!selected.includes(n.id));selected=[];render();renderProperties();persist();}
function duplicate(){const nodes=selectedNodes();if(!nodes.length)return;if(doc.elements.length+nodes.length>400){toast('最多支持 400 个元素');return;}checkpoint();const copies=nodes.map(n=>({...n,id:uid(),x:clamp(n.x+24,0,Math.max(0,doc.width-n.w)),y:clamp(n.y+24,0,Math.max(0,doc.height-n.h))}));doc.elements.push(...copies);selected=copies.map(n=>n.id);render();renderProperties();persist();}
function undo(){finishInline();if(!history.length)return;future.push(state());doc=JSON.parse(history.pop());selected=[];render();renderProperties();persist();}
function redo(){finishInline();if(!future.length)return;history.push(state());doc=JSON.parse(future.pop());selected=[];render();renderProperties();persist();}
$('undo').onclick=undo;$('redo').onclick=redo;$('duplicate').onclick=duplicate;$('delete').onclick=remove;
document.addEventListener('keydown',e=>{
  if(e.target.closest('input,textarea,select')||document.querySelector('dialog[open]'))return;
  const cmd=e.ctrlKey||e.metaKey,key=e.key.toLowerCase();
  if(cmd&&key==='z'){e.preventDefault();e.shiftKey?redo():undo();return;}
  if(cmd&&key==='y'){e.preventDefault();redo();return;}
  if(cmd&&key==='s'){e.preventDefault();saveFile();return;}
  if(cmd&&key==='d'){e.preventDefault();duplicate();return;}
  if(cmd&&key==='a'){e.preventDefault();choose(doc.elements.map(n=>n.id));return;}
  if(key==='delete'||key==='backspace'){e.preventDefault();remove();return;}
  if(key==='escape'){choose([]);$('left-panel').classList.remove('open');$('right-panel').classList.remove('open');return;}
  if(['arrowleft','arrowright','arrowup','arrowdown'].includes(key)&&selected.length){e.preventDefault();checkpoint();const step=e.shiftKey?10:1,b=bounds();let dx=key==='arrowleft'?-step:key==='arrowright'?step:0,dy=key==='arrowup'?-step:key==='arrowdown'?step:0;dx=clamp(dx,-b.x,Math.max(0,doc.width-b.w)-b.x);dy=clamp(dy,-b.y,Math.max(0,doc.height-b.h)-b.y);selectedNodes().forEach(n=>{n.x+=dx;n.y+=dy;});render();persist();}
});
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-tab]').forEach(t=>t.classList.toggle('active',t===b));$('components-pane').classList.toggle('hidden',b.dataset.tab!=='components');$('layers-pane').classList.toggle('hidden',b.dataset.tab!=='layers');});
$('toggle-grid').onclick=()=>{showGrid=!showGrid;$('toggle-grid').classList.toggle('active',showGrid);$('toggle-grid').setAttribute('aria-pressed',showGrid);$('grid-bg').style.display=showGrid?'':'none';};
$('toggle-snap').onclick=()=>{snap=!snap;$('toggle-snap').classList.toggle('active',snap);$('toggle-snap').setAttribute('aria-pressed',snap);};
$('zoom-in').onclick=()=>zoom(.1);$('zoom-out').onclick=()=>zoom(-.1);$('zoom-fit').onclick=()=>fit('page');$('zoom-width').onclick=()=>fit('width');
viewport.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();zoom(e.deltaY>0?-.05:.05);}},{passive:false});
$('toggle-components').onclick=()=>{$('left-panel').classList.toggle('open');$('right-panel').classList.remove('open');};
$('toggle-properties').onclick=()=>{$('right-panel').classList.toggle('open');$('left-panel').classList.remove('open');};
function resizeCanvas(width,height){
  const size={};try{resizeDocument(size,width,height);}catch(error){toast(error.message);return false;}
  if(doc.width===width&&doc.height===height)return true;
  finishInline();checkpoint();const widthChanged=width!==doc.width;Object.assign(doc,size);render();renderProperties();if(widthChanged)fit('width');persist();toast(`画布已更新为 ${width} × ${height}px`);return true;
}
$('canvas-settings').onclick=()=>{finishInline();$('canvas-width').value=doc.width;$('canvas-height').value=doc.height;$('canvas-dialog').showModal();};
$('close-canvas').onclick=$('cancel-canvas').onclick=()=>$('canvas-dialog').close();
$('canvas-size-form').onsubmit=e=>{e.preventDefault();if(resizeCanvas(Number($('canvas-width').value),Number($('canvas-height').value)))$('canvas-dialog').close();};
document.querySelectorAll('[data-canvas-preset]').forEach(b=>b.onclick=()=>{[$('canvas-width').value,$('canvas-height').value]=canvasPresets[b.dataset.canvasPreset];});
$('add-height').onclick=()=>{$('canvas-height').value=Math.min(MAX_CANVAS_HEIGHT,Math.max(240,Number($('canvas-height').value)||doc.height)+1000);};
$('extend-canvas').onclick=()=>resizeCanvas(doc.width,Math.min(MAX_CANVAS_HEIGHT,doc.height+1000));
$('doc-name').addEventListener('change',e=>{checkpoint();doc.name=e.target.value.trim().slice(0,100)||'未命名草图';render();persist();});
function askReplace(title,action){finishInline();pendingConfirm=action;$('confirm-title').textContent=title;$('confirm-dialog').showModal();}
$('new-canvas').onclick=()=>askReplace('新建空白草图？',()=>{doc={version:1,name:'未命名草图',width:1440,height:900,background:'#ffffff',elements:[]};});
$('load-example').onclick=()=>askReplace('载入网页示例？',()=>{doc=example();});
$('cancel-confirm').onclick=()=>{$('confirm-dialog').close();pendingConfirm=null;};
$('accept-confirm').onclick=()=>{checkpoint();pendingConfirm?.();pendingConfirm=null;selected=[];render();renderProperties();fit();persist();$('confirm-dialog').close();$('left-panel').classList.remove('open');};
function download(blob,extension){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=(doc.name.replace(/[<>:"/\\|?*]/g,'_')||'草图')+extension;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function saveFile(){finishInline();download(new Blob([JSON.stringify(doc,null,2)],{type:'application/json'}),'.json');toast('草图文件已下载，可用“打开”继续编辑');}
$('save-file').onclick=saveFile;$('open-file').onclick=()=>$('file-input').click();
$('file-input').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>3*1024*1024)throw Error('文件过大，请选择小于 3MB 的草图文件');const incoming=normalize(JSON.parse(await file.text()));askReplace('打开这份草图？',()=>{doc=incoming;});}catch(error){toast(error.message||'无法读取草图文件');}e.target.value='';};
async function exportPNG(){
  finishInline();const b=$('export-png');b.disabled=true;const old=b.textContent;b.textContent='导出中…';
  try {
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${doc.width}" height="${doc.height}" viewBox="0 0 ${doc.width} ${doc.height}"><rect width="100%" height="100%" fill="${doc.background}"/>${doc.elements.map(nodeMarkup).join('')}</svg>`;
    const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
    try{const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(Error('图片生成失败'));image.src=url;});const c=document.createElement('canvas'),size=pngSize(doc.width,doc.height);c.width=size.width;c.height=size.height;const context=c.getContext('2d');if(!context)throw Error('画布过大，无法生成图片');context.drawImage(image,0,0,c.width,c.height);const blob=await new Promise(resolve=>c.toBlob(resolve,'image/png'));if(!blob)throw Error('图片导出失败');download(blob,'.png');toast(size.scaled?`已导出完整长图 ${c.width} × ${c.height}px（大画布按比例缩小）`:'已导出 PNG 图片（不包含网格和选择框）');}finally{URL.revokeObjectURL(url);}
  }catch(error){toast(error.message);}finally{b.disabled=false;b.textContent=old;}
}
$('export-png').onclick=exportPNG;$('brief-image').onclick=exportPNG;
[['open-mobile',()=>$('file-input').click()],['save-mobile',saveFile],['export-mobile',exportPNG]].forEach(([id,action])=>{$(id).onclick=()=>{document.querySelector('.file-menu').open=false;action();};});
function brief(){return `请根据附带的网页草图图片和下面的布局参数实现前端页面。\n\n页面：${doc.name}\n验收视口：${doc.width} × ${doc.height} px\n画布背景：${doc.background}\n坐标原点：页面左上角。以下 x、y、宽、高均为 px。元素按从底层到顶层排列。\n\n${doc.elements.map((n,i)=>`${i+1}. ${names[n.type]}${n.type==='icon'?'（'+icons[n.icon].name+'）':''}${n.text?'，内容：'+JSON.stringify(n.text):''}\n   x=${n.x}, y=${n.y}, 宽=${n.w}, 高=${n.h}；填充=${n.fillNone?'透明':n.fill}；边框=${n.strokeWidth}px ${n.stroke}；圆角=${n.radius}px；不透明度=${n.opacity}%；线条样式=${n.strokeDash}${["checkbox","radio","toggle"].includes(n.type)?"；状态="+(n.checked?"选中 / 开启":"未选中 / 关闭"):""}${["slider","progress"].includes(n.type)?"；进度="+n.value+"%":""}${componentLibrary.find(c=>c.type===n.type)?.group!=="basic"?"；强调色="+n.accent:""}${(textTypes.has(n.type)||n.type==='icon')?`；颜色=${n.color}；字号=${n.fontSize}px；字重=${n.fontWeight}；文字对齐=${({left:'左',center:'居中',right:'右'}[n.align])}`:''}`).join('\n\n')}\n\n实施要求：\n1. 先复述页面区域、对齐关系和宽度比例，列出不确定的地方。\n2. 按草图实现布局，不增加图中没有的区块、装饰或动画。\n3. 坐标用于表达目标排版；实现时优先用 Flex / Grid 和合理容器结构，避免把整个网页做成固定绝对定位。\n4. 图片占位区域先保留占位，图标使用对应语义的常用线框图标。草图中的文字是示例时，先保留文字供我替换。\n5. 在指定视口下截图，对比区域位置、比例、间距和字体，再修正差异。\n6. 多条目组件的换行分别表示标题和条目，表格中 | 分隔列；表单组件在草图中仅表示布局。\n7. 移动端适配保留内容层级和阅读顺序；不明确的交互行为向我询问。`;}
$('ai-brief').onclick=()=>{finishInline();$('brief-text').value=brief();$('brief-dialog').showModal();};$('close-brief').onclick=()=>$('brief-dialog').close();
$('copy-brief').onclick=async()=>{try{await navigator.clipboard.writeText($('brief-text').value);toast('布局说明已复制，附上草图图片一起发送给 AI');}catch{$('brief-text').focus();$('brief-text').select();toast('已选中说明，请按 Ctrl / ⌘ + C 复制');}};
let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>fit(fitMode),150);});
render();renderProperties();requestAnimationFrame(()=>fit(doc.height>doc.width*1.5?'width':'page'));
