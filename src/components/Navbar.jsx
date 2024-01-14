import '@fontsource/paytone-one'
import '@fontsource/forum'
import '@fontsource-variable/inter'

import {useEffect, useState} from "react";
import arrow from "../assets/arrow.svg?raw"
import {isDesktop} from "react-device-detect";

const navLinks = [{name: "Home", href: "/"}, {
    name: "About", links: [{name: "Advisors", href: "/about"}, {name: "Contact", href: "/contact"},],
}, {
    name: "Chapters", links: [{name: "Join a program", href: "/program"}, {name: "Start a chapter", href: "/new"},],
}, {name: "Partner", href: "/partner"}];


function Arrow({rotate}) {
    return (<div dangerouslySetInnerHTML={{__html: arrow}}
                 style={{transform: rotate ? "rotate(0deg)" : "rotate(180deg)"}}
                 className="w-[10px] h-[10px] duration-150 text-2xl rotate-180"/>)
}

function FullNavLink({link}) {
    return <a className="hover:underline" href={link.href}>{link.name}</a>
}

function FullDropdownLink({index, link, linkActive, onLinkActive}) {
    const [linkShow, setLinkShow] = useState(false);

    useEffect(() => {
        if (linkActive === index) {
            setLinkShow(true);
        } else {
            setLinkShow(false);
        }
    }, [linkActive])

    return (<div
        className="cursor-pointer"
        onMouseLeave={_ => onLinkActive(-1)}
    >
        <div onClick={_ => onLinkActive(s => (s === -1 ? index : -1))}
             onMouseEnter={_ => {
                 if (isDesktop) {
                     onLinkActive(index)
                 }
             }}
             className="inline-flex">
            <span>{link.name}</span>
            <div className="inline-flex p-2">
                <Arrow rotate={linkShow}/>
            </div>
        </div>
        <div className="text-lg">
            {link.links && <div
                style={{opacity: linkShow ? "100%" : "0%", visibility: linkShow ? "visible" : "hidden"}}
                className={`transition-[opacity] duration-300 flex flex-col fixed align-middle`}>
                {link?.links.map((dl, i) => <a className="hover:underline" key={i} href={dl.href}>{dl.name}</a>)}
            </div>}
        </div>
    </div>)
}

function MobileDropdownLink({link}) {
    const [display, setDisplay] = useState(false);
    return (<div className="flex flex-col items-center justify-center cursor-pointer">
        <div onClick={_ => setDisplay(s => !s)} className="flex items-center select-none">
            <span>{link.name}</span>
            <div className="inline-flex p-2">
                <Arrow rotate={display}/>
            </div>
        </div>
        <div style={{display: display ? "" : "none"}} className="text-center text-2xl flex flex-col mt-1">
            {link?.links.map((l, i) => <div key={i}>
                <FullNavLink link={l}/>
            </div>)}
        </div>
    </div>);
}

function FullSizeNavbar() {
    const [linkActive, setLinkActive] = useState(-1);

    return (<header
        style={{paddingBottom: linkActive !== -1 ? "64px" : ""}}
        className="group flex fixed w-full bg-white p-4 shadow-2xl transition-[padding] duration-300">
        <div className="flex flex-1 justify-start items-center">
            <a className="font-paytone md:text-2xl lg:text-3xl" href="/">
                {"Youth Finance USA".split("").map((c, i) => <span
                    key={i}
                    className={`transition-all group-hover:animate-strobe`}
                    style={{animationDelay: `${100 + i * 50}ms`}}>{c}</span>)}
            </a>
        </div>
        <nav className="flex flex-1 ml-auto text-xl justify-center items-center space-x-5 font-forum mt-2.5">
            {navLinks.map((l, i) => (<div key={i}>
                {l.links ? <FullDropdownLink index={i} link={l} linkActive={linkActive}
                                             onLinkActive={setLinkActive}/> : <FullNavLink link={l}/>}
            </div>))}
        </nav>
        <div className="text-white md:flex flex-1 items-center justify-end">
            <a href=""
               className="pr-6 font-inter pl-6 pt-2 pb-2 rounded-md border-2 border-red-500 text-red-500 hover:text-white hover:bg-red-500">Join</a>
        </div>
    </header>);
}

function MobileNavbar() {
    const [display, setDisplay] = useState(false);

    return (<header className="w-full fixed bg-white p-4 shadow-2xl">
        <div className="flex justify-between">
            <a className="font-paytone text-2xl">YFUSA</a>
            <div className="flex flex-1"></div>
            <div onClick={() => setDisplay(d => !d)} className="mt-0.5">
                <div
                    className={`w-7 h-1 bg-black m-1 duration-200 ${display ? "rotate-45 translate-y-2" : ""}`}></div>
                <div className={`w-7 h-1 bg-black m-1 ${display ? "hidden" : ""}`}></div>
                <div
                    className={`w-7 h-1 bg-black m-1 duration-200 ${display ? "-rotate-45" : ""}`}></div>
            </div>
        </div>
        <nav style={{paddingBottom: display ? "100vh" : ""}}
             className="font-forum transition-[padding] duration-500 h-0">
            <div className="transition-[opacity, margin-top] text-center"
                 style={{
                     opacity: display ? "100%" : "0%",
                     transitionDuration: display ? "500ms" : "100ms",
                     marginTop: display ? "32px" : ""
                 }}>
                {navLinks.map((nl, i) => <div key={i} className="text-4xl p-2">
                    {nl.links ? <MobileDropdownLink link={nl}/> : <FullNavLink link={nl}/>}
                </div>)}
            </div>
        </nav>
    </header>)
}

function SkeletonLoadingNavbar() {
    return (<div className="flex w-full bg-white p-4 shadow-2xl"></div>)
}

export function Navbar() {
    const [isMobileNav, setMobileNav] = useState(null);

    useEffect(() => {
        const runMediaQuery = () => setMobileNav(!window.matchMedia("(min-width: 768px)").matches);

        runMediaQuery();
        window.addEventListener("resize", runMediaQuery);
    }, [isMobileNav])

    return (isMobileNav == null ? <SkeletonLoadingNavbar/> : isMobileNav ? <MobileNavbar/> : <FullSizeNavbar/>);
}