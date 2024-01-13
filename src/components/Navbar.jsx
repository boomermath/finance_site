import '@fontsource/paytone-one'
import '@fontsource/forum'

import {useEffect, useState} from "react";
import arrow from "../assets/arrow.svg?raw"


const navLinks = [{name: "Home", href: "/"}, {
    name: "About", links: [{name: "Advisors", href: "/about"}, {name: "Contact", href: "/contact"},],
}, {
    name: "Chapters", links: [{name: "Join a program", href: "/program"}, {name: "Start a chapter", href: "/new"},],
}, {name: "Partner", href: "/partner"}];

const runIf = (f, c) => {
    if (c) {
        f();
    }
}

function Link({link}) {
    return <a href={link.href}>{link.name}</a>
}

function DropdownLink({index, link, linkActive, onLinkActive}) {
    const [linkShow, setLinkShow] = useState(false);

    useEffect(() => {
        if (linkActive === index) {
            setLinkShow(true);
        } else {
            setLinkShow(false);
        }
    }, [linkActive])

    return (
        <div
            className="cursor-pointer"
            onMouseLeave={_ => onLinkActive(-1)}
        >
            <a onClick={_ => onLinkActive(s => (s === -1 ? index : -1))}
               onMouseEnter={_ => onLinkActive(index)} className="inline-flex" href={link.href}>
                <span>{link.name}</span>
                <div className="inline-flex p-2">
                    {link.links && <div dangerouslySetInnerHTML={{__html: arrow}}
                                        className={`w-[10px] h-[10px] duration-150 text-2xl ${linkShow ? "" : "rotate-180"}`}/>}
                </div>
            </a>
            <div className="text-lg">
                {link.links && <div
                    style={{opacity: linkShow ? "100%" : "0%", visibility: linkShow ? "visible" : "hidden"}}
                    className={`transition-[opacity] duration-300 flex fixed min-w-fit flex-col align-middle`}>
                    {link?.links.map((dl, i) => <a key={i} href={dl.href}>{dl.name}</a>)}
                </div>}
            </div>
        </div>)
}

function DesktopNavbar() {
    const [linkActive, setLinkActive] = useState(-1);

    return (<header
        className={`group flex fixed w-full bg-amber-100 p-4 shadow-2xl transition-[padding] duration-300 ${linkActive !== -1 ? "pb-16" : ""}`}>
        <div className="flex flex-1 justify-start items-center ">
            <a className="font-paytone text-3xl" href="/">
                {"Youth Finance USA".split("").map((c, i) => <span
                    className={`transition-all ${i % 2 === 0 ? "group-hover:animate-flash-green" : "group-hover:animate-flash-yellow"}`}
                    style={{animationDelay: `${100 + i * 50}ms`}}>{c}</span>)}
            </a>
        </div>
        <nav className="flex flex-1 ml-auto text-xl justify-center items-center space-x-5 font-forum mt-2.5">
            {navLinks.map((l, i) => (l.links ?
                <DropdownLink key={i} index={i} link={l} linkActive={linkActive} onLinkActive={setLinkActive}/> :
                <Link key={i} link={l}/>)
            )}
        </nav>
        <a
            className="text-white flex flex-1 items-center justify-end"
            href="#">
            <span className="pr-6 pl-6 pt-2 pb-2 rounded-md bg-black">Sign up</span>
        </a>
    </header>)
}


export function Navbar() {
    return <DesktopNavbar/>
}