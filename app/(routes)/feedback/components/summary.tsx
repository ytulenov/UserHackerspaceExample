"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import { toast } from "react-hot-toast";

import { useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const formSchema = z.object({
  firstname: z
    .string()
    .refine(
      (value) => {
        const trimmedValue = value.trim();
        return trimmedValue === "" || /^[A-Za-z]+( *?$)/.test(trimmedValue);
      },
      {
        message:
          "Invalid first name. Please enter only one name that consists of letters.",
      }
    )
    .optional(),
  lastname: z
    .string()
    .refine(
      (value) => {
        const trimmedValue = value.trim();
        return trimmedValue === "" || /^[A-Za-z]+( *?$)/.test(trimmedValue);
      },
      {
        message:
          "Invalid last name. Please enter only one name that consists letters.",
      }
    )
    .optional(),
  studentid: z
    .string()
    .refine((value) => value === "" || /^\d{8}$/.test(value), {
      message: "Invalid student ID. Please enter exactly 8 digits.",
    })
    .optional(),
  ordernumber: z
    .string()
    .refine((value) => value === "" || /^\d{8}$/.test(value), {
      message: "Invalid order number. Please enter exactly 8 digits.",
    })
    .optional(),
  phone: z
    .string()
    .refine(
      (value) => {
        const trimmedValue = value.trim();
        return trimmedValue === "" || /^\+?[1-9]\d{1,14}$/.test(trimmedValue);
      },
      {
        message: "Invalid phone number. Please enter a valid phone number.",
      }
    )
    .optional(),
  email: z
    .string()
    .refine(
      (value) =>
        !value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/i.test(value),
      {
        message: "Invalid personal email. Please enter a valid email address.",
      }
    ),
  feedbackIn: z
    .string()
    .min(15, {
      message:
        "Invalid input. Please enter your feedback here with a minimum of 15 characters.",
    })
    .max(1000),
});

type FormValues = z.infer<typeof formSchema>;

interface FormProps {
  initialData?: FormValues | null;
}

const Summary: React.FC<FormProps> = ({ initialData }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      firstname: "",
      lastname: "",
      studentid: "",
      phone: "",
      email: "",
      ordernumber: "",
      feedbackIn: "",
    },
  });
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [successToastDisplayed, setSuccessToastDisplayed] = useState(false);
  const characterCount = form.watch("feedbackIn")?.length || 0;

  useEffect(() => {
    let isMounted = true;

    const successParam = searchParams.get("success");

    if (successParam && !successToastDisplayed) {
      setTimeout(() => {
        if (isMounted) {
          const toastId = toast.success("Thank you for your feedback!");
          setSuccessToastDisplayed(true);
        }
      }, 10); // Adjust the delay as needed
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }

    return () => {
      isMounted = false;
    };
  }, [searchParams, successToastDisplayed]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (!form.formState.isValid) {
        toast.error("Please fill in your email");
        return;
      }
      setLoading(true);
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback`,
        {
          formData: {
            firstname: data.firstname,
            lastname: data.lastname,
            studentid: data.studentid,
            phone: data.phone,
            email: data.email,
            ordernumber: data.ordernumber,
            feedbackIn: data.feedbackIn,
          },
        }
      );
      window.location = response.data.url;
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-grey-50 px-4 py-6 sm:p-6 lg:col-span-12 lg:mt-0 lg:p-8 justify-center items-center">
      <h2 className="text-md font-medium  text-green-500">
        Here at the hackerspace, we value your feedback!
      </h2>
      <div className="mt-6 space-y-4"></div>
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-medium text-gray-900">
          Personal Information
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <div className="grid grid-cols-2 gap-x-4 justify-center items-center">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name [Optional]</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="type..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name [Optional]</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="type..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 justify-center items-center">
              <FormField
                control={form.control}
                name="studentid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID [Optional]</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="12345678"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ordernumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Number (If Applicable)</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="12345678"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 justify-center items-center">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number [Optional]</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="+1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Personal or UBC)</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="@com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols ">
              <FormField
                control={form.control}
                name="feedbackIn"
                render={({ field }) => (
                  <FormItem>
                    <h2 className="text-xl font-medium text-gray-900">
                      Feedback
                    </h2>
                    <FormControl>
                      <textarea
                        className="resize-none border rounded-md p-2 w-full h-40 overflow-y-auto"
                        disabled={loading}
                        placeholder="type..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={`text-xs ${
                characterCount < 15 || characterCount > 1000
                  ? "text-red-500"
                  : "text-gray-500"
              } justify-left`}
            >
              Character Count: {characterCount}/1000
            </div>
          </form>
        </Form>
      </div>
      <Button onClick={form.handleSubmit(onSubmit)} className="w-full mt-6">
        Submit
      </Button>
    </div>
  );
};

export default Summary;
