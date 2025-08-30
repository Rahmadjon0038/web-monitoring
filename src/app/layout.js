import React from 'react'
import './index.css'
import Navbar from '@/componets/Navbar'
import { Providers } from './providers'
function layout({ children }) {

    return (
        <html>
            <body>
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}

export default layout