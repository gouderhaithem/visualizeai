import MobileNav from '@/components/shared/MobileNav'
import SideBare from '@/components/shared/SideBar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='root'>
            <SideBare />
            <MobileNav />
            <div className="root-container">
                <div className="wrapper">
                    {children}
                </div>
            </div>

        </div>
    )
}

export default layout