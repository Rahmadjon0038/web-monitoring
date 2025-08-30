import React from 'react'
import './index.css'
import Navbar from '@/componets/Navbar'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import { RoleProvider } from '@/context/userContext'
function layout({ children }) {

    return (
        <html>
            <body>
                <Providers>
                    <RoleProvider>
                        <Toaster />
                        <Navbar />
                        {children}
                    </RoleProvider>
                </Providers>
            </body>
        </html>
    )
}

export default layout