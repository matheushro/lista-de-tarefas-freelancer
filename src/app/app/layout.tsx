import { PropsWithChildren } from "react";
import { MainSidebar } from "./_componentes/main-sidebar";
import { auth } from '@/services/auth'

export default async function Layout({children}: PropsWithChildren){
    const session = await auth()

    return (
        <div className="grid grid-cols-[16rem_1fr] gap-4">
            <MainSidebar user={session?.user} />
            <main>
                {children}
            </main>
        </div>
    )
}