function componentMarkup(n){
  const {w,h}=n,fill=n.fillNone?'none':n.fill,accent=n.accent;
  const dash=n.strokeDash==='dashed'?'8 5':n.strokeDash==='dotted'?'2 4':'none';
  const rect=(x,y,width,height,color=fill,border=n.stroke,sw=n.strokeWidth,radius=n.radius)=>`<rect x="${x}" y="${y}" width="${Math.max(0,width)}" height="${Math.max(0,height)}" rx="${Math.min(radius,Math.max(0,height/2))}" fill="${color}" stroke="${border}" stroke-width="${sw}" stroke-dasharray="${dash}"/>`;
  const line=(x1,y1,x2,y2,color=n.stroke,sw=Math.max(1,n.strokeWidth))=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${dash}"/>`;
  const text=(content,x,y,width=w-x,size=n.fontSize,color=n.color,align='left',weight=n.fontWeight)=>`<g transform="translate(${x},${y})">${textMarkup({...n,align,color,fontWeight:weight},content,{width:Math.max(1,width),size})}</g>`;
  const circle=(x,y,r,color=fill,border=n.stroke,sw=n.strokeWidth)=>`<circle cx="${x}" cy="${y}" r="${Math.max(0,r)}" fill="${color}" stroke="${border}" stroke-width="${sw}"/>`;
  const icon=(key,x,y,size=20,color=n.color)=>`<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[key].paths}</svg>`;
  const parts=n.text.split('\n'),mid=Math.max(0,(h-n.fontSize*1.4)/2);
  const panel=()=>rect(n.strokeWidth/2,n.strokeWidth/2,w-n.strokeWidth,h-n.strokeWidth);
  switch(n.type){
    case 'vline':return line(w/2,0,w/2,h);
    case 'triangle':return `<polygon points="${w/2},${n.strokeWidth} ${w-n.strokeWidth},${h-n.strokeWidth} ${n.strokeWidth},${h-n.strokeWidth}" fill="${fill}" stroke="${n.stroke}" stroke-width="${n.strokeWidth}"/>`;
    case 'diamond':return `<polygon points="${w/2},${n.strokeWidth} ${w-n.strokeWidth},${h/2} ${w/2},${h-n.strokeWidth} ${n.strokeWidth},${h/2}" fill="${fill}" stroke="${n.stroke}" stroke-width="${n.strokeWidth}"/>`;
    case 'arrowline':return line(0,h/2,w-2,h/2)+line(w-14,h/2-8,w-2,h/2)+line(w-14,h/2+8,w-2,h/2);
    case 'frame':case 'pill':return panel();
    case 'outlineButton':case 'tag':case 'badge':return panel()+text(n.text,10,mid,Math.max(1,w-20),n.fontSize,n.color,n.align);
    case 'avatar':return `<ellipse cx="${w/2}" cy="${h/2}" rx="${w/2}" ry="${h/2}" fill="${fill}" stroke="${n.stroke}" stroke-width="${n.strokeWidth}"/>`+text(n.text,0,mid,w,n.fontSize,n.color,'center');
    case 'searchbox':return panel()+icon('search',14,h/2-10)+text(n.text,44,mid,w-58,n.fontSize,n.color,n.align);
    case 'select':return panel()+text(n.text,14,mid,w-53,n.fontSize,n.color,n.align)+icon('down',w-34,h/2-10);
    case 'textarea':return panel()+text(n.text,14,12,w-28,n.fontSize,n.color,n.align)+line(w-18,h-8,w-8,h-18)+line(w-12,h-8,w-8,h-12);
    case 'checkbox':case 'radio':{
      const size=Math.min(21,h-4),y=(h-size)/2;let shape=n.type==='checkbox'?rect(2,y,size,size,n.checked?accent:fill,n.checked?accent:n.stroke,1.5,4):circle(2+size/2,h/2,size/2,fill,n.checked?accent:n.stroke,1.5);
      if(n.checked)shape+=n.type==='checkbox'?icon('check',4,y+2,size-4,'#ffffff'):circle(2+size/2,h/2,size/4,accent,accent,0);
      return shape+text(n.text,size+14,mid,w-size-16,n.fontSize,n.color,n.align);
    }
    case 'toggle':{
      const height=Math.min(25,h-4),width=height*1.8,y=(h-height)/2;
      return rect(0,y,width,height,n.checked?accent:'#cbd5e1','none',0,height/2)+circle(n.checked?width-height/2:height/2,h/2,height/2-3,'#ffffff','none',0)+text(n.text,width+12,mid,w-width-12,n.fontSize,n.color,n.align);
    }
    case 'slider':return rect(8,h/2-3,w-16,6,'#e3e9f1','none',0,3)+rect(8,h/2-3,(w-16)*n.value/100,6,accent,'none',0,3)+circle(8+(w-16)*n.value/100,h/2,8,'#ffffff',accent,2);
    case 'progress':return text(n.text,0,0,w,n.fontSize,n.color,n.align)+rect(0,h-9,w,7,'#e3e9f1','none',0,4)+rect(0,h-9,w*n.value/100,7,accent,'none',0,4);
    case 'navbar':{
      const items=parts.slice(1,7),brand=Math.min(240,w*.28),available=w-brand-32,slot=available/Math.max(1,items.length);
      return panel()+text(parts[0]||'品牌名称',22,mid,brand-34,n.fontSize,n.color,'left',Math.max(n.fontWeight,600))+items.map((item,i)=>text(item,brand+i*slot,mid,slot,n.fontSize,i===0?accent:n.color,'center')).join('');
    }
    case 'sidebar':{
      const items=parts.slice(1,9),rowHeight=Math.min(48,(h-82)/Math.max(1,items.length));
      return panel()+text(parts[0]||'工作空间',20,23,w-40,n.fontSize,n.color,'left',600)+items.map((item,i)=>rect(12,72+i*rowHeight,w-24,rowHeight-4,i===0?'#e8eefb':'none','none',0,5)+text(item,26,72+i*rowHeight+(rowHeight-n.fontSize*1.4)/2,w-48,n.fontSize,i===0?accent:n.color)).join('');
    }
    case 'tabs':{
      const items=parts.slice(0,8),slot=w/Math.max(1,items.length);
      return line(0,h-2,w,h-2)+line(0,h-2,slot,h-2,accent,3)+items.map((item,i)=>text(item,i*slot,mid,slot,n.fontSize,i===0?accent:n.color,'center',i===0?600:n.fontWeight)).join('');
    }
    case 'breadcrumbs':{
      const items=parts.slice(0,8),slot=w/Math.max(1,items.length);
      return items.map((item,i)=>text(item,i*slot,mid,slot-16,n.fontSize,i===items.length-1?n.color:'#94a3b8')+(i<items.length-1?text('/',(i+1)*slot-18,mid,15,n.fontSize,'#b8c4d4'):'' )).join('');
    }
    case 'pagination':{
      const items=['‹',...parts.slice(0,7),'›'],slot=w/items.length;
      return items.map((item,i)=>rect(i*slot+2,2,slot-4,h-4,i===1?accent:fill,i===1?accent:n.stroke,1,5)+text(item,i*slot,mid,slot,n.fontSize,i===1?'#ffffff':n.color,'center')).join('');
    }
    case 'steps':{
      const items=parts.slice(0,6),slot=w/Math.max(1,items.length);
      return items.map((item,i)=>circle(i*slot+17,17,14,i===0?accent:fill,i===0?accent:n.stroke,1)+text(String(i+1),i*slot+3,5,28,16,i===0?'#ffffff':n.color,'center')+(i<items.length-1?line(i*slot+42,17,(i+1)*slot-8,17):'')+text(item,i*slot,39,slot-12,14)).join('');
    }
    case 'table':{
      const rows=parts.slice(0,9).map(row=>row.split('|').slice(0,6).map(s=>s.trim())),columns=Math.max(1,...rows.map(row=>row.length)),rh=h/Math.max(1,rows.length),cw=w/columns;
      return panel()+rect(1,1,w-2,rh,'#f1f5fa','none',0,0)+rows.map((row,ri)=>line(0,(ri+1)*rh,w,(ri+1)*rh)+Array.from({length:columns},(_,ci)=>`<svg x="${ci*cw+12}" y="${ri*rh+Math.max(4,(rh-n.fontSize*1.4)/2)}" width="${Math.max(1,cw-24)}" height="${Math.max(1,rh-8)}" overflow="hidden">${textMarkup({...n,fontWeight:ri===0?600:n.fontWeight},row[ci]||'',{width:Math.max(1,cw-24)})}</svg>`).join('')).join('');
    }
    case 'list':{
      const items=parts.slice(1,8),rh=(h-56)/Math.max(1,items.length);
      return panel()+text(parts[0]||'列表标题',18,16,w-36,n.fontSize,n.color,'left',600)+items.map((item,i)=>line(16,56+i*rh,w-16,56+i*rh)+circle(30,56+i*rh+rh/2,11,'#e8eef7','none',0)+text(item,55,56+i*rh+Math.max(0,(rh-n.fontSize*1.4)/2),w-73)).join('');
    }
    case 'stat':return panel()+text(parts[0]||'数据指标',20,16,w-40,n.fontSize,'#8b99ac')+text(parts[1]||'12,480',20,h*.36,w-40,n.fontSize*2,n.color,'left',700)+text(parts[2]||'',20,h-32,w-40,Math.max(12,n.fontSize*.8),accent);
    case 'accordion':return panel()+text(parts[0]||'常见问题',16,14,w-52,n.fontSize,n.color,'left',600)+icon('down',w-36,17)+text(parts[1]||'',16,52,w-32,n.fontSize,'#8795a9')+parts.slice(2,6).map((item,i)=>{const y=h*.57+i*(h*.43/Math.max(1,parts.length-2));return line(0,y,w,y)+text(item,16,y+12,w-52)+icon('plus',w-36,y+14);}).join('');
    case 'skeleton':return panel()+circle(36,36,22,'#e7ecf3','none',0)+rect(74,19,w-94,12,'#e7ecf3','none',0,5)+rect(74,42,(w-94)*.6,10,'#edf1f6','none',0,5)+[82,106,130].filter(y=>y<h-12).map((y,i)=>rect(16,y,(w-32)*(i===2?.65:1),10,'#e7ecf3','none',0,5)).join('');
    case 'alert':return panel()+rect(0,0,4,h,accent,'none',0,0)+icon('bell',18,h/2-11,22,accent)+text(n.text,53,mid,w-72,n.fontSize,n.color,n.align);
    case 'modal':return panel()+text(parts[0]||'对话框标题',24,24,w-72,n.fontSize*1.2,n.color,'left',600)+icon('close',w-44,26)+text(parts[1]||'',24,72,w-48,n.fontSize,n.color,n.align)+rect(w-205,h-60,80,36,fill,n.stroke,1,5)+rect(w-113,h-60,89,36,accent,accent,0,5)+text(parts[2]||'取消',w-205,h-54,80,14,n.color,'center')+text(parts[3]||'确认',w-113,h-54,89,14,'#ffffff','center');
    case 'tooltip':return rect(0,0,w,h-10,fill,'none',0,6)+`<path d="M${w/2-8} ${h-11}L${w/2} ${h}L${w/2+8} ${h-11}Z" fill="${fill}"/>`+text(n.text,10,Math.max(0,(h-10-n.fontSize*1.4)/2),w-20,n.fontSize,n.color,n.align);
    default:throw Error('组件缺少绘制方式：'+n.type);
  }
}
