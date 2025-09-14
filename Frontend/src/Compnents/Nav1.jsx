import React from "react";
import '../App.css'
import { Link } from "react-router-dom";
import { Facebook,Twitter,Instagram,Youtube, } from 'lucide-react';
function Nav1(){
    return (
        <>
            {/* // top green portion  */}
            <div className=" hidden lg:flex bg-gray-900 h-10 justify-between pt-2 pl-15 pr-15 flex-wrap mb-2 pb-2">
                <div className="flex gap-8">
                    <Link className="text-gray-400 font-serif">Showroom</Link>
                    <Link className="text-gray-400 font-serif">Custom Work</Link>
                    <Link className="text-gray-400 font-serif">Gift Card</Link>
                </div>
                 <div className="flex gap-5 pt-1 ">
                    <a className="text-gray-400 " href="">
                        <Facebook className="h-5"/> 
                        </a>
                    <a className="text-gray-400" href="">
                        <Twitter className="h-5"/> 
                        </a>
                    <a className="text-gray-400" href="">
                        <Instagram className="h-5"/>
                        </a>
                    <a className="text-gray-400" href="">
                        <Youtube className="h-5"/>
                         </a>
                </div>
            </div>
        </>
    )
}

export default Nav1;