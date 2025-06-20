'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { addTeamMember } from '@/service/AddTeamMember';


const socialSchema = z.object({
  platform: z.string().min(1),
  url: z.string().url()
});

const memberSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),

  socials: z.array(socialSchema),
  avatar: z.any()
});

type TeamFormValues = z.infer<typeof memberSchema>;

export function TeammemberForm() {
  const form = useForm<TeamFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      id: '',
      name: '',
      role: '',
      bio: '',

      socials: [{ platform: '', url: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socials'
  });

  const router = useRouter();

  const onSubmit = async (data: TeamFormValues) => {
    const formData = new FormData();

    const body = {
      id: data.id,
      name: data.name,
      role: data.role,
      bio: data.bio,
     
      socials: data.socials
    };

    if (data.avatar && data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0]);
    }

    formData.append('data', JSON.stringify(body));

  const res=   await addTeamMember(formData);
  console.log('ress', res);

    toast.success('Team member created successfully!');
    form.reset();
    router.push('/dashboard/add-team-member');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left side */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
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
                    <Input placeholder="Enter Role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

       
          </div>

          {/* Right side */}
          <div className="space-y-4">
           <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dynamic Socials */}
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
        </div>

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <Button type="submit" className="mt-4 w-full text-2xl">
          Submit
        </Button>
      </form>
    </Form>
  );
}
