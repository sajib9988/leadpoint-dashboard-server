'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from "sonner";
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
import { useRouter } from 'next/navigation';
import { addService } from '@/service/addservice';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  shortDescription: z.string().min(1, 'Short Description is required'),
  longDescription: z.string().min(1, 'Long Description is required'),
  slug: z.string().min(1, 'Slug is required'),
  icon: z.any().optional(),
  image: z.any().optional()
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export function AddServiceForm() {
  const router = useRouter();

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      shortDescription: '',
      longDescription: '',
      slug: '',
      icon: undefined,
      image: undefined
    }
  });

  const onSubmit = async (data: ServiceFormValues) => {

      console.log("📤 Form Submit Data:", data)
    const formData = new FormData();

    const body = {
      title: data.title,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      slug: data.slug
    };

    formData.append('data', JSON.stringify(body));

    if (data.icon && data.icon.length > 0) {
        //  console.log('Adding icon file:', data.icon[0]);
      formData.append('icon', data.icon[0]);
    }

    if (data.image && data.image.length > 0) {
      // console.log('Adding image file:', data.image[0]);
      formData.append('image', data.image[0]);
    }
console.log("📦 FormData Ready to Send:", formData);
    try {
     const res= await addService(formData);

      console.log("Service created successfully!", res);

      toast.success("Service created successfully!");
      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create service.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Title" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Textarea placeholder="Enter Short Description" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Textarea placeholder="Enter Long Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
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
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="slug... like email-marketing" {...field} />
                  </FormControl>
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
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
