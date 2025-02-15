'use client'

import React from 'react'

interface PaginationComponentProps {
    totalPages: number;
    currentPage: number;
}

const PaginationContent = ({ totalPages, currentPage }: PaginationComponentProps) => {
  return (
    <div>PaginationContent</div>
  )
}

export default PaginationContent