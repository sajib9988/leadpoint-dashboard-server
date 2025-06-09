'use client'

import { useEffect, useState } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { getAllServices } from '@/service/addservice'
import { UpdateServiceFormModal } from '../modal/UpdateServiceFormModal'
import { DeleteConfirmModal } from '../modal/DeleteConfirmModal'


interface IService {
  title: string
  shortDescription: string
  longDescription: string
  slug: string
  icon?: string
  image?: string
}

const columnHelper = createColumnHelper<IService>()

const ServiceTable = () => {
  const [data, setData] = useState<IService[]>([])
  const [loading, setLoading] = useState(true)
    const [services, setServices] = useState<IService[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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
  }, [])

const handleEdit = (service: IService) => {
  setSelectedService(service);
  setIsUpdateModalOpen(true);
};

const handleDelete = (service: IService) => {
  setSelectedService(service);
  setIsDeleteModalOpen(true);
};


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
      cell: info => <div className="line-clamp-2">{info.getValue()}</div>,
    }),
    columnHelper.accessor('slug', {
      header: 'Slug',
      cell: info => <span className="text-sm text-gray-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('icon', {
      header: 'Icon',
      cell: info =>
        info.getValue() ? (
          <img src={info.getValue()} alt="icon" className="w-6 h-6" />
        ) : (
          '—'
        ),
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: info =>
        info.getValue() ? (
          <img src={info.getValue()} alt="image" className="w-12 h-12 rounded" />
        ) : (
          '—'
        ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="px-4 py-1 text-sm text-white font-bold bg-green-500 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className="px-2 py-1 text-sm text-white bg-red-500 rounded font-bold hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ]

return (
  <div className="max-w-6xl mx-auto mt-6">
    <h1 className="text-2xl font-bold mb-4">Service Table</h1>
    {loading ? <p>Loading...</p> : <DataTable columns={columns} data={data} />}

    {/* Update Modal */}
    {selectedService && (
      <UpdateServiceFormModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        serviceId={selectedService.slug}
        initialData={selectedService}
      />
    )}

    {/* Delete Modal */}
    {selectedService && (
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        serviceId={selectedService.slug}
      />
    )}
  </div>
);

}

export default ServiceTable
