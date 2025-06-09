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
import { useRouter } from 'next/navigation';
import { deleteService } from '@/service/addservice';


type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
};

export function DeleteConfirmModal({ isOpen, onClose, serviceId }: DeleteConfirmModalProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteService(serviceId);
      toast.success('Service deleted successfully!');
      onClose();
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this service?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
