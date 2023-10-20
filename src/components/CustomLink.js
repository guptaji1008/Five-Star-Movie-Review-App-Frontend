import React from 'react'
import { Link } from 'react-router-dom'

export default function CustomLink({ to, children, className }) {
    return (
        <Link
            to={to}
            className={`dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-black transition ${className}`}
        >
            {children}
        </Link>
    )
}
