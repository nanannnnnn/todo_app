"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const router = useRouter();
	function onClickAvatar() {
		router.push("/profile");
	}
	return (
		<div className="bg-black text-white p-2 flex items-center">
			<Avatar className="ml-auto" onClick={onClickAvatar}>
				<AvatarImage
					src={
						isLoggedIn ? "https://github.com/shadcn.png" : "/unknownuser.png"
					}
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</div>
	);
}
