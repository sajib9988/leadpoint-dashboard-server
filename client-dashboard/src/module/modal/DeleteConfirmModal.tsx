'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteService } from '@/service/addservice';
import { deleteMember } from '@/service/AddTeamMember';

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // ✅ Add success callback
  memberId?: string;
  serviceId?: string;
};

export function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  memberId, 
  serviceId 
}: DeleteConfirmModalProps) {
  const handleDelete = async () => {
    try {
      if (memberId) {
        await deleteMember(memberId);
        toast.success('Member deleted successfully!');
      } else if (serviceId) {
        await deleteService(serviceId);
        toast.success('Service deleted successfully!');
      } else {
        throw new Error('No ID provided');
      }
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      toast.error('Failed to delete');
      console.error('Error deleting:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this {memberId ? 'member' : 'service'}?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}