import React from 'react'
import NavBar from './NavBar'

const Layout: React.FC = ({ children, check }: any) => {
  return (
    <div className='wrapper'>
      <React.Fragment>
        {check && <NavBar />}
        <div className='content'>
          {children}
        </div>
      </React.Fragment>
    </div>

  )
}

export default Layout