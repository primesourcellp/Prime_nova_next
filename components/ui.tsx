import Link from 'next/link';
import { ArrowUpRight, Code2, Smartphone, Layers3, Cloud, Users, BriefcaseBusiness, Building2, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
const icons = {code:Code2,phone:Smartphone,layers:Layers3,cloud:Cloud,users:Users,briefcase:BriefcaseBusiness,building:Building2};
export function Icon({name,className=''}:{name:string;className?:string}) {const Component=icons[name as keyof typeof icons] || Sparkles;return <Component className={className} size={24} strokeWidth={1.6} aria-hidden="true"/>}
export function Brand(){return <Link href="/" className="brand" aria-label="Primenova home"><span className="brand-symbol">✳</span><span>prime<span className="font-normal">nova</span><sup>®</sup></span></Link>}
export function Button({children,href,secondary=false}:{children:ReactNode;href:string;secondary?:boolean}){return <Link href={href} className={`button ${secondary?'button-secondary':''}`}>{children}<ArrowUpRight size={18} aria-hidden="true"/></Link>}
export function Eyebrow({children}:{children:ReactNode}){return <p className="eyebrow">{children}</p>}
export function PageIntro({label,title,accent,description}:{label:string;title:string;accent:string;description:string}) {return <section className="shell pt-16 pb-10 md:pt-24 md:pb-14"><Eyebrow>{label}</Eyebrow><h1 className="page-title">{title}<br/><span className="text-teal">{accent}</span></h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p></section>}
export function CTA(){return <section className="shell py-16 md:py-24"><div className="cta-panel"><div><Eyebrow>YOUR NEXT CHAPTER</Eyebrow><h2 className="section-title">Let’s build<br className="md:hidden"/> what’s next<span className="text-teal">.</span></h2><p className="mt-4 text-muted">A better experience starts with a conversation.</p></div><Button href="/contact/">Start a conversation</Button></div></section>}
