"use client"

import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import { signIn } from "next-auth/react"

export default function GitHubSignInButton(){
    return (
        <Button onClick={()=>signIn('github')} variant="outline" size="icon">
            <GithubIcon></GithubIcon>
        </Button>
    )
    
}