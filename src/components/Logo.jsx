import React from 'react'

const Logo = ({ size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Location pin shape - Yellow C shape for CampusCrave */}
      <circle cx="20" cy="20" r="18" fill="#F4D03F" />
      {/* C shape */}
      <path
        d="M20 8C14 8 10 12 10 18C10 24 14 28 20 28C22 28 24 27 25 26L23 24C22 25 21 25 20 25C16 25 13 22 13 18C13 14 16 11 20 11C21 11 22 11 23 12L25 10C24 9 22 8 20 8Z"
        fill="#2D2D2D"
      />
    </svg>
  )
}

export default Logo


