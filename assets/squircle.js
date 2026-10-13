(()=>{function x({topLeftCornerRadius:e,topRightCornerRadius:t,bottomRightCornerRadius:n,bottomLeftCornerRadius:o,width:$,height:c}){let f={topLeft:-1,topRight:-1,bottomLeft:-1,bottomRight:-1},s={topLeft:e,topRight:t,bottomLeft:o,bottomRight:n};return Object.entries(s).sort(([,a],[,i])=>i-a).forEach(([a,i])=>{let r=a,h=T[r],m=Math.min(...h.map(g=>{let u=s[g.corner];if(i===0&&u===0)return 0;let l=f[g.corner],P=g.side==="top"||g.side==="bottom"?$:c;return l>=0?P-f[g.corner]:i/(i+u)*P}));f[r]=m,s[r]=Math.min(i,m)}),{topLeft:{radius:s.topLeft,roundingAndSmoothingBudget:f.topLeft},topRight:{radius:s.topRight,roundingAndSmoothingBudget:f.topRight},bottomLeft:{radius:s.bottomLeft,roundingAndSmoothingBudget:f.bottomLeft},bottomRight:{radius:s.bottomRight,roundingAndSmoothingBudget:f.bottomRight}}}var T={topLeft:[{corner:"topRight",side:"top"},{corner:"bottomLeft",side:"left"}],topRight:[{corner:"topLeft",side:"top"},{corner:"bottomRight",side:"right"}],bottomLeft:[{corner:"bottomRight",side:"bottom"},{corner:"topLeft",side:"left"}],bottomRight:[{corner:"bottomLeft",side:"bottom"},{corner:"topRight",side:"right"}]};function d({cornerRadius:e,cornerSmoothing:t,preserveSmoothing:n,roundingAndSmoothingBudget:o}){let $=(1+t)*e;if(!n){let u=o/e-1;t=Math.min(t,u),$=Math.min($,o)}let c=90*(1-t),f=Math.sin(M(c/2))*e*Math.sqrt(2),s=(90-c)/2,a=e*Math.tan(M(s/2)),i=45*t,r=a*Math.cos(M(i)),h=r*Math.tan(M(i)),m=($-f-r-h)/3,g=2*m;if(n&&$>o){let u=o-h-f-r,l=u/6,P=u-l;m=Math.min(m,P),g=u-m,$=Math.min($,o)}return{a:g,b:m,c:r,d:h,p:$,arcSectionLength:f,cornerRadius:e}}function A({width:e,height:t,topLeftPathParams:n,topRightPathParams:o,bottomLeftPathParams:$,bottomRightPathParams:c}){return`
    M ${e-o.p} 0
    ${b(o)}
    L ${e} ${t-c.p}
    ${E(c)}
    L ${$.p} ${t}
    ${F($)}
    L 0 ${n.p}
    ${S(n)}
    Z
  `.replace(/[\t\s\n]+/g," ").trim()}function b({cornerRadius:e,a:t,b:n,c:o,d:$,p:c,arcSectionLength:f}){return e?p`
    c ${t} 0 ${t+n} 0 ${t+n+o} ${$}
    a ${e} ${e} 0 0 1 ${f} ${f}
    c ${$} ${o}
        ${$} ${n+o}
        ${$} ${t+n+o}`:p`l ${c} 0`}function E({cornerRadius:e,a:t,b:n,c:o,d:$,p:c,arcSectionLength:f}){return e?p`
    c 0 ${t}
      0 ${t+n}
      ${-$} ${t+n+o}
    a ${e} ${e} 0 0 1 -${f} ${f}
    c ${-o} ${$}
      ${-(n+o)} ${$}
      ${-(t+n+o)} ${$}`:p`l 0 ${c}`}function F({cornerRadius:e,a:t,b:n,c:o,d:$,p:c,arcSectionLength:f}){return e?p`
    c ${-t} 0
      ${-(t+n)} 0
      ${-(t+n+o)} ${-$}
    a ${e} ${e} 0 0 1 -${f} -${f}
    c ${-$} ${-o}
      ${-$} ${-(n+o)}
      ${-$} ${-(t+n+o)}`:p`l ${-c} 0`}function S({cornerRadius:e,a:t,b:n,c:o,d:$,p:c,arcSectionLength:f}){return e?p`
    c 0 ${-t}
      0 ${-(t+n)}
      ${$} ${-(t+n+o)}
    a ${e} ${e} 0 0 1 ${f} -${f}
    c ${o} ${-$}
      ${n+o} ${-$}
      ${t+n+o} ${-$}`:p`l 0 ${-c}`}function M(e){return e*Math.PI/180}function p(e,...t){return e.reduce((n,o,$)=>{let c=t[$];return typeof c=="number"?n+o+c.toFixed(4):n+o+(c!=null?c:"")},"")}function y({cornerRadius:e=0,topLeftCornerRadius:t,topRightCornerRadius:n,bottomRightCornerRadius:o,bottomLeftCornerRadius:$,cornerSmoothing:c,width:f,height:s,preserveSmoothing:a=!1}){if(t=t!=null?t:e,n=n!=null?n:e,$=$!=null?$:e,o=o!=null?o:e,t===n&&n===o&&o===$&&$===t){let g=Math.min(f,s)/2,u=Math.min(t,g),l=d({cornerRadius:u,cornerSmoothing:c,preserveSmoothing:a,roundingAndSmoothingBudget:g});return A({width:f,height:s,topLeftPathParams:l,topRightPathParams:l,bottomLeftPathParams:l,bottomRightPathParams:l})}let{topLeft:i,topRight:r,bottomLeft:h,bottomRight:m}=x({topLeftCornerRadius:t,topRightCornerRadius:n,bottomRightCornerRadius:o,bottomLeftCornerRadius:$,width:f,height:s});return A({width:f,height:s,topLeftPathParams:d({cornerSmoothing:c,preserveSmoothing:a,cornerRadius:i.radius,roundingAndSmoothingBudget:i.roundingAndSmoothingBudget}),topRightPathParams:d({cornerSmoothing:c,preserveSmoothing:a,cornerRadius:r.radius,roundingAndSmoothingBudget:r.roundingAndSmoothingBudget}),bottomRightPathParams:d({cornerSmoothing:c,preserveSmoothing:a,cornerRadius:m.radius,roundingAndSmoothingBudget:m.roundingAndSmoothingBudget}),bottomLeftPathParams:d({cornerSmoothing:c,preserveSmoothing:a,cornerRadius:h.radius,roundingAndSmoothingBudget:h.roundingAndSmoothingBudget})})}function B(e){let t=e.offsetWidth,n=e.offsetHeight;if(!t||!n)return;let o=getComputedStyle(e),$=parseFloat(o.borderTopLeftRadius)||16,c=y({width:t,height:n,cornerRadius:$,cornerSmoothing:1,preserveSmoothing:!0});e.style.clipPath=`path('${c}')`}function L(){let e=document.querySelectorAll(".btn-action, .pill");if(!e.length)return;let t=new ResizeObserver(n=>{for(let o of n)B(o.target)});e.forEach(n=>{B(n),t.observe(n)}),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>e.forEach(B))}document.readyState!=="loading"?L():document.addEventListener("DOMContentLoaded",L);})();
