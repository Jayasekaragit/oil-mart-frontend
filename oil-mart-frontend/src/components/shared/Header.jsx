import React from "react";
import { HiChatAlt, HiOutlineBell, HiOutlineSearch } from "react-icons/hi";
import { Menu, Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-white h-16 px-4 justify-between flex items-center ">
      <div className="relative">
          <HiOutlineSearch fontSize={20} className="text-gray-50 absolute top1/2 translate-y-1/2 p--4"/>
        <input 
          type="text"
          placeholder="Search..."
          className=" pr-4  text-sm focus:outline-none active:outline-none h-10 w-[24rem] rounded-sm px-4 bg-slate-600 "
        />
      </div>
      
      <div className="flex items-center px-3">

      <Popover className="relative px-3">
          <>
          <PopoverButton className=" p-3 rounded-sm inline-flex text-gray-700 hover:text-opacity-100 focus:outline-none">
            <span>Pasindu Jayasekara</span>
          </PopoverButton>
         

          </>
          <Transition className="bg-slate-500 "
             enter="transition ease-out duration-200"
             enterFrom="opacity-0 translate-y-1"
             enterTo="opacity-100 translate-y-0"
             leave="transition ease-in duration-150"
             leaveFrom="opacity-100 translate-y-0"
             leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom"
              className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 [--anchor-gap:var(--spacing-5)]"
            >
              <div className="p-3 bg-slate-500">
                <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
                  <p className="font-semibold text-white"><Link className="text-white hover:text-black" to={"/signup"}>SignOut</Link></p>
              
    
                </a>
                <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
                <p className="font-semibold text-white"><Link className="text-white hover:text-black" to={"/products"}>Your Profile</Link></p>
                </a>
            
              </div>
            </PopoverPanel>
          </Transition>
    </Popover>
    

          <HiChatAlt fontSize={24} className=""/>
          <HiOutlineBell fontSize={24}/> 

      </div>
    </div>
  );
}
