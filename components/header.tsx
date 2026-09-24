'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import {navigation} from '@/lib/content';
import {Brand} from './ui';
export default function Header(){const pathname=usePathname();const [open,setOpen]=useState(false);return <header className="site-header"><div className="shell flex h-22 items-center justify-between gap-6"><Brand/><nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">{navigation.map(item=><Link key={item.href} className="nav-link" href={item.href} aria-current={pathname.replace(/\/$/,'')===item.href.replace(/\/$/,'')?'page':undefined}>{item.label}</Link>)}</nav><Link href="/contact/" className="button hidden! lg:inline-flex!">Let’s talk <ArrowUpRight size={18}/></Link><button type="button" className="menu-button md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<Menu size={23}/>}</button></div>{open&&<nav id="mobile-nav" className="mobile-nav md:hidden" aria-label="Mobile navigation" onKeyDown={e=>{if(e.key==='Escape')setOpen(false)}}>{navigation.map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)} aria-current={pathname.replace(/\/$/,'')===item.href.replace(/\/$/,'')?'page':undefined}>{item.label}</Link>)}</nav>}</header>}
