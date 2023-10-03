import React from 'react'
import { NavItemsPrivate } from '../interface/nav-items/NavItemsPrivate'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'


const SideBar: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className='sidebar'>
            {NavItemsPrivate.map((item) => (
                <Button
                    key={item.id}
                    startIcon={<item.icon />}
                    onClick={() => navigate(item.route)}>
                    {item.label}
                </Button>
            ))}
        </div>
    )
}

export default SideBar