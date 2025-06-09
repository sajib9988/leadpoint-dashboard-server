'use client'

import { useEffect, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { get } from 'http'
import { getAllServices } from '@/service/addservice'
 // service import

interface IService {
  title: string;
  shortDescription: string;
  longDescription: string;
  slug: string;
icon?: string;
 image?: string;
}


const columnHelper = createColumnHelper<IService>()

const columns: ColumnDef<IService, any>[] = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('shortDescription', {
    header: 'Short Description',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('longDescription', {
    header: 'Long Description',
    cell: info => (
      <div className="line-clamp-2">{info.getValue()}</div> // line-clamp to avoid overflow
    ),
  }),
  columnHelper.accessor('slug', {
    header: 'Slug',
    cell: info => <span className="text-sm text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor('icon', {
    header: 'Icon',
    cell: info => info.getValue() ? <img src={info.getValue()} alt="icon" className="w-6 h-6" /> : '—',
  }),
  columnHelper.accessor('image', {
    header: 'Image',
    cell: info => info.getValue() ? <img src={info.getValue()} alt="image" className="w-12 h-12 rounded" /> : '—',
  }),
]

export default function ServiceTable() {
  const [data, setData] = useState<IService[]>([])
  const [loading, setLoading] = useState(true)

useEffect(()=>{
  const fetchData = async ()=>{
       try {
        const res = await getAllServices()
        console.log('res get service', res)
        setData(res.data)
        setLoading(false)
       } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
       }
  }
  fetchData()
},[])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">People Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data}
  
        />
      )}
    </div>
  )
}
