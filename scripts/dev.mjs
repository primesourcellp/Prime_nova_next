import { spawn } from 'node:child_process';
// Accept the preview host's Vite-style flags while running native Next.js.
const args=process.argv.slice(2).filter(arg=>arg!=='--strictPort').map(arg=>arg==='--host'?'--hostname':arg);
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--webpack',...args],{stdio:'inherit'});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
