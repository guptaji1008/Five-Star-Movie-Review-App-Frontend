import React from 'react'

export default function FormInput({name, placeholder, label, className, ...rest}) {
    return (
        <div>
            <div className={`flex flex-col-reverse space-y-6 ${className}`}>
                <input id={name} name={name}
                    className='bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-white focus:border-black py-2 px-4 dark:text-white text-black peer transition' placeholder={placeholder}
                    {...rest} />
                <label htmlFor={name} className='font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-black transition self-start'>{label}</label>
            </div>
        </div>
    )
}
