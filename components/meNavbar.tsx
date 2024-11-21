/* eslint-disable prettier/prettier */
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { User } from "@nextui-org/user";

import { ThemeSwitch } from "@/components/theme-switch";

export const MeNavbar = ()=>{
    return (
        <Navbar maxWidth="2xl">
            <NavbarBrand>
                <p className="font-bold text-inherit">NoTodo</p> 
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitch />

                </NavbarItem>
                <NavbarItem>
                    <User avatarProps={{
                        src:"https://static.wikia.nocookie.net/deathbattle/images/5/55/Portrait.jonathanjoestar.png/revision/latest?cb=20220411214847"
                        ,size:"md"
                    }}
                    description="Regular User"
                    name="Jonathan Joestar"
                    />

                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}