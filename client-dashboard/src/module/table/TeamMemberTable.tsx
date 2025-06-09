'use client'

import { useEffect, useState, useCallback } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'

import { DeleteConfirmModal } from '../modal/DeleteConfirmModal'
import { getAllMember } from '@/service/AddTeamMember'
import { UpdateMemberFormModal } from '../modal/UpdateMemberFormModal'

interface IMember  {
  id: string
  name:string 
  role: string
  bio: string
  socials: string
  avatar: string
}

const columnHelper = createColumnHelper<IMember>()

const TeamMemberTable = () => {
  const [data, setData] = useState<IMember[]>([])
  const [loading, setLoading] = useState(true)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);

  // ✅ Create a refetch function that can be called from anywhere
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getAllMember()
      console.log('res get service', res)
      setData(res.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleEdit = (service: IMember) => {
    setSelectedMember(service);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (service: IMember) => {
    setSelectedMember(service);
    setIsDeleteModalOpen(true);
  };

  // ✅ Handle successful update - refetch data instantly
  const handleUpdateSuccess = () => {
    setIsUpdateModalOpen(false);
    fetchData(); // Instant refetch
  };

  // ✅ Handle successful delete - refetch data instantly
  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    fetchData(); // Instant refetch
  };

  const columns: ColumnDef<IMember, any>[] = [
    columnHelper.accessor('id', {
      header: 'Id',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: info => <div className="line-clamp-2">{info.getValue()}</div>,
    }),
    columnHelper.accessor('bio', {
      header: 'Bio',
      cell: info => <span className="text-sm text-gray-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('socials', {
      header: 'Socials',
      cell: info =><span className="text-sm text-gray-600">{info.getValue()}</span>,
        
 } ),
  
    columnHelper.accessor('avatar', {
      header: 'Avatar',
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
      {selectedMember && (
        <UpdateMemberFormModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onSuccess={handleUpdateSuccess}
          memberId={selectedMember.id}
          initialData={selectedMember}
        />
      )}

      {/* Delete Modal */}
      {selectedMember && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={handleDeleteSuccess}
          memberId={selectedMember.id}
        />
      )}
    </div>
  );
}

export default TeamMemberTable