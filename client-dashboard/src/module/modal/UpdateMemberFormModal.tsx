'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Image from 'next/image';
import { updateMember } from '@/service/AddTeamMember';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const socialSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL'),
});

const memberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().min(1, 'Bio is required'),
  socials: z.array(socialSchema).min(1, 'At least one social link is required'),
  avatar: z.any().optional(),
});

export type MemberFormValues = z.infer<typeof memberSchema>;

type UpdateMemberFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  memberId: string;
  initialData: MemberFormValues;
};

export function UpdateMemberFormModal({
  isOpen,
  onClose,
  onSuccess,
  memberId,
  initialData,
}: UpdateMemberFormModalProps) {

const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socials',
  });

const onSubmit = async (data: MemberFormValues) => {
  setIsSubmitting(true); // Start loading

  const formData = new FormData();
  formData.append(
    'data',
    JSON.stringify({
      name: data.name,
      role: data.role,
      bio: data.bio,
      socials: Array.isArray(data.socials) ? data.socials : [],
    })
  );

  if (data.avatar && data.avatar instanceof File) {
    formData.append('avatar', data.avatar);
  }

  try {
    await updateMember(memberId, formData);
    toast.success("Member updated successfully!");
    form.reset();
    router.push("/");
    router.refresh();
    onSuccess?.();
    onClose();
  } catch (err) {
    toast.error('Failed to update team member');
    console.error('Error updating member:', err);
  } finally {
    setIsSubmitting(false); // Stop loading
  }
};


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Update Team Member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Two-column layout */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left column: Form fields */}
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter role" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Enter bio" rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <label className="font-medium">Social Links</label>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3">
                      <FormField
                        control={form.control}
                        name={`socials.${index}.platform`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Platform (e.g. Facebook)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`socials.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="URL (https://...)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="destructive" onClick={() => remove(index)}>
                        ✕
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => append({ platform: '', url: '' })}
                    variant="outline"
                    className="ml-2"
                  >
                    + Add Social Link
                  </Button>
                </div>
              </div>

              {/* Right column: Avatar input and preview */}
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {initialData.avatar && typeof initialData.avatar === 'string' && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">Current Avatar</p>
                    <Image
                      src={initialData.avatar}
                      alt="Avatar Preview"
                      width={192}
                      height={192}
                      className="w-48 h-48 rounded object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
             {isSubmitting ? "Updating..." : "Update Member"}

              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}