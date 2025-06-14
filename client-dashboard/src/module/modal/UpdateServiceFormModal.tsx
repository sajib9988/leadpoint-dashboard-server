'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateService } from '@/service/addservice';
import Image from 'next/image';

const serviceSchema = z.object({
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescription: z.string().min(1),
  slug: z.string().min(1),
  icon: z.any().optional(),
  image: z.any().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;

type UpdateServiceFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // ✅ Add success callback
  serviceId: string;
  initialData: ServiceFormValues;
};

export function UpdateServiceFormModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  serviceId, 
  initialData 
}: UpdateServiceFormModalProps) {
  
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: ServiceFormValues) => {
    const formData = new FormData();

    formData.append('data', JSON.stringify({
      title: data.title,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      slug: data.slug,
    }));

    if (data.icon && data.icon.length > 0) formData.append('icon', data.icon[0]);
    if (data.image && data.image.length > 0) formData.append('image', data.image[0]);

    try {
      await updateService(serviceId, formData);
      toast.success('Service updated successfully!');
      
      // ✅ Call success callback to trigger refetch
      if (onSuccess) {
        onSuccess();
      } else {
        onClose(); // Fallback if no success callback
      }
    } catch (err) {
      toast.error('Failed to update service');
      console.error('Error updating service:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Update Service</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className='flex justify-between items-start space-x-4'>
              <div className="flex-1 space-y-4"> 
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Long Description</FormLabel>
                      <FormControl><Textarea {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={e => field.onChange(e.target.files && e.target.files[0] ? [e.target.files[0]] : [])}
                        />
                      </FormControl>
                      {initialData.icon && typeof initialData.icon === 'string' && (
                        <Image
                          src={initialData.icon}
                          alt="Icon Preview"
                          width={48}
                          height={48}
                          className="w-12 h-12 mt-2"
                        />
                      )}
                      {initialData.icon && typeof initialData.icon !== 'string' && (
                        <Image
                          src={URL.createObjectURL(initialData.icon[0])}
                          alt="Icon Preview"
                          width={48}
                          height={48}
                          className="w-12 h-12 mt-2"
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={e => field.onChange(e.target.files && e.target.files[0] ? [e.target.files[0]] : [])}
                        />
                      </FormControl>
                      {initialData.image && typeof initialData.image === 'string' && (
                        <Image
                          src={initialData.image}
                          alt="Image Preview"
                          width={96}
                          height={96}
                          className="w-24 h-24 mt-2 rounded"
                        />
                      )}
                      {initialData.image && typeof initialData.image !== 'string' && (
                        <Image
                          src={URL.createObjectURL(initialData.image[0])}
                          alt="Image Preview"
                          width={96}
                          height={96}
                          className="w-24 h-24 mt-2 rounded"
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Update Service
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}