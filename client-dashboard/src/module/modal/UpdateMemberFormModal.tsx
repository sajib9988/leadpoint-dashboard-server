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

import Image from 'next/image';
import { updateMember } from '@/service/AddTeamMember';

const memberSchema = z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    bio: z.string().min(1),
    socials: z.string().min(1),
    avatar: z.any().optional(),
});

export type MemberFormValues = z.infer<typeof memberSchema>;




type UpdateServiceFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void; // ✅ Add success callback
    memberId: string;
    initialData: MemberFormValues;
};

export function UpdateMemberFormModal({
    isOpen,
    onClose,
    onSuccess,
    memberId,
    initialData
}: UpdateServiceFormModalProps) {

    const form = useForm<MemberFormValues>({
        resolver: zodResolver(memberSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: MemberFormValues) => {
        const formData = new FormData();

        formData.append(
            'data',
            JSON.stringify({
                name: data.name,
                role: data.role,
                bio: data.bio,
                socials: data.socials,
            })
        );

        if (data.avatar && data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0]);
        }

        try {
            await updateMember(memberId, formData);
            toast.success('Team member updated successfully!');
            onSuccess?.();
        } catch (err) {
            toast.error('Failed to update team member');
            console.error('Error updating member:', err);
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
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
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
                                            <FormControl><Input {...field} /></FormControl>
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
                                            <FormControl><Textarea {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="socials"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Socials</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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
                                                    onChange={(e) =>
                                                        field.onChange(e.target.files && e.target.files[0] ? [e.target.files[0]] : [])
                                                    }
                                                />
                                            </FormControl>
                                            {initialData.avatar && typeof initialData.avatar === 'string' && (
                                                <Image
                                                    src={initialData.avatar}
                                                    alt="Avatar Preview"
                                                    width={96}
                                                    height={96}
                                                    className="w-24 h-24 mt-2 rounded"
                                                />
                                            )}
                                            {initialData.avatar && typeof initialData.avatar !== 'string' && (
                                                <Image
                                                    src={URL.createObjectURL(initialData.avatar[0])}
                                                    alt="Avatar Preview"
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