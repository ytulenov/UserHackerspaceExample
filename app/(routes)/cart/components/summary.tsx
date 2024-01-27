"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { Product, Productvalue } from "@/types";

import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
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
    .min(1)
    .regex(/^[A-Za-z]+$/, {
      message: "Invalid first name. Please enter only letters.",
    }),
  lastname: z
    .string()
    .min(1)
    .regex(/^[A-Za-z]+$/, {
      message: "Invalid last name. Please enter only letters.",
    }),
  studentid: z.string().refine((value) => /^\d{6,10}$/.test(value), {
    message: "Invalid student ID. Please enter exactly 8 digits.",
  }),
  phone: z
    .string()
    .min(1)
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Invalid phone number. Please enter a valid phone number.",
    }),
  personalemail: z
    .string().optional()
    .refine(
      (value) =>
        !value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/i.test(value),
      {
        message: "Invalid personal email. Please enter a valid email address.",
      }
    )
    .optional(),
  studentemail: z
    .string()
    .min(1)
    .regex(/^[^\s@]+@.*ubc(\..*)*$/i, {
      message: "Invalid UBC email. Please enter a valid email address.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface FormProps {
  initialData?: FormValues | null;
}


const Summary: React.FC<FormProps> = ({ initialData}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      firstname: "",
      lastname: "",
      studentid: "",
      phone: "",
      personalemail: "",
      studentemail: "",
    },
  });
  const searchParams = useSearchParams();
  const [successDisplayed, setSuccessDisplayed] = useState(false);
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;


    if (searchParams.get("success")  && !successDisplayed ) {
      setTimeout(() => {
        if (isMounted) {
          const confirm = searchParams.get("confirm");
          toast.success("Booking completed!");
          router.refresh();
          router.push(`/confirmation/${confirm}`);
          removeAll();
          setSuccessDisplayed(true);
        }
      }, 10); // Adjust the delay as needed
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }

    return () => {
      isMounted = false;
    };
  }, [searchParams, removeAll, router, successDisplayed]);

  //const totalPrice = items.reduce((total, item) => {
    //const itemTotal = item.values.reduce((acc, value) => {
      //return acc + Number(value.price);
    //}
    //, 0);

    //return total + itemTotal;
  //}, 0);

  const totalPrice = items.reduce((total, item) => {
    //const itemTotal = item.values.reduce((acc, value) => {
      //return acc + Number(value.price) * value.quantity;
    //}, 0);
    console.log(item)
    
    return total + Number(item.productPrice)*Number(item.productQuantity);
  }, 0);

  const onCheckout = async (data: FormValues) => {
    try {
      if (!form.formState.isValid) {
        toast.error("Please fill in all required fields.");
        return;
      }
      setLoading(true);
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          formData: {
            firstname: data.firstname,
            lastname: data.lastname,
            studentid: data.studentid,
            phone: data.phone,
            personalemail: data.personalemail,
            studentemail: data.studentemail,
            /*addressline1: data.addressline1,
          addressline2: data.addressline2,
          postal: data.postal,
          city: data.city,
          province: data.province,
          country: data.country,*/
          },
          productIds: items.map((item) => ({
            id: item.id,
            productValueId: item.productValueId,
            productIndex: item.productIndex,
            productQuantity: item.productQuantity,
            productPrice: item.productPrice,
          })), //const productIds = items.flatMap((item) => item.values.map((value) => value.id));
        }
      );
      window.location = response.data.url;
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onConfirmHandler = async () => {
    try {
      await onCheckout(form.getValues());
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-grey-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirmHandler}
        loading={loading}
      />
      <div className="text-center">
      <h2 className="text-lg font-medium  text-red-700">
          WARNING!
        </h2>
        <h2 className="text-md font-medium  text-red-500">
          Hackerspace doesn't offer delivery or refunds
        </h2>
        <h2 className="text-lg pt-2 font-medium  text-blue-700">
          Follow Instructions Carefully!
        </h2>
        <h2 className="text-md font-medium  text-blue-500">
          In order to purchase any product you have to book it on this website.
          Once you filled in the form, you can book it by pressing checkout
          button. this website doesnt allow to make purchases therefore, in
          order to receive the item you have to go to HackerSpace Club in EME
          building. there you will have access to POS terminal and receive the
          product immediately.
        </h2>
        
      </div>
      <h2 className="text-lg mt-6 border-t pt-4 font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">
          Personal Information
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onCheckout)}
            className="space-y-4 w-full"
          >
            <div className="grid grid-cols-2 gap-x-4 justify-center items-center">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="type..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.firstname?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="type..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.lastname?.message}</FormMessage>                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols ">
              <FormField
                control={form.control}
                name="studentid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Id</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="12345678"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.studentid?.message}</FormMessage>     
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number </FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="+1" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.phone?.message}</FormMessage>     
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols ">
              <FormField
                control={form.control}
                name="personalemail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Email (optional)</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="@com" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.personalemail?.message}</FormMessage>     
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols">
              <FormField
                control={form.control}
                name="studentemail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UBC Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="@student.ubc.ca"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.studentemail?.message}</FormMessage>     
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      <Button
        className="w-full mt-6"
        type="submit"
        disabled={items.length === 0}
        onClick={() => setOpen(true)}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
