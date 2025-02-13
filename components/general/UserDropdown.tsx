import React from 'react'
import Link from 'next/link'
import { signOut } from '@/app/utils/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import { ChevronDown, Heart, Layers2, LogOut } from 'lucide-react'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger, 
    DropdownMenuGroup 
} from '../ui/dropdown-menu'

interface iAppProps {
    email: string;
    image: string;
    name: string;
}

const UserDropdown = ({ email, image, name }: iAppProps) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                <Avatar>
                    <AvatarImage src={image} alt="Profile image" />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="ms-2 opacity-60"
                    aria-hidden="true"
                />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuLabel className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                    {name}
                </span>
                <span className="truncate text-xs font-normal text-muted-foreground">
                    {email}
                </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link href="/favorites">
                        <Heart
                            size={16}
                            strokeWidth={2}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>Saved Jobs</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/my-jobs">
                        <Layers2
                            size={16}
                            strokeWidth={2}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>My Job Listings</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <form
                    action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" });
                    }}
                >
                    <button type="submit" className="w-full flex items-center gap-2">
                        <LogOut
                            size={16}
                            strokeWidth={2}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>Logout</span>
                    </button>
                </form>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown