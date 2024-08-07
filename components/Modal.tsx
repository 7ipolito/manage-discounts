/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { TypeDiscount } from "../enums/types.enum";
import { Button } from "./Button";
import * as Dialog from "@radix-ui/react-dialog";
import { Discount } from "../types/DiscountProps";
import * as Input from "./Form/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { twMerge } from "tailwind-merge";
import { schemaEditDiscount } from "utils/schemaEditDiscount";
import { useSidebar } from "../hooks/useSidebar";
import { useDiscount } from "../hooks/useDiscount";
import { useModal } from "../hooks/useModal";

type ModalProps = { discountSelected: Discount };
const Modal = ({ discountSelected }: ModalProps) => {
  const [discountEditable, setDiscountEditable] = useState(false);

  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaEditDiscount),
  });

  const { updateDiscount } = useDiscount();
  const { closeModal } = useModal();

  const onSubmit = async (data: any) => {
    const newData = {
      id: discountSelected.id,
      ...data,
    };
    toggleSidebar();
    updateDiscount(newData);

    closeModal();
  };

  return (
    <div className="h-64 overflow-y-auto">
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[90vh] w-[90vw] max-w-[659px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none sm:top-[45%]">
          <form
            id="form-edit-discount"
            className=" flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex justify-center">
              <Dialog.Title className="text-[16px] font-medium">
                Details of product
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
                onClick={() => closeModal()}
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
            <Dialog.Description
              className={
                !discountEditable ? "flex flex-row justify-between" : ""
              }
            >
              <div className=" flex w-full items-center justify-center px-4">
                <img
                  src={discountSelected.image}
                  width={isSidebarOpen ? 70 : 200}
                  alt="Imagem"
                />
              </div>
              <div className="pt-4">
                {discountSelected.type == TypeDiscount.PERCENTUAL &&
                  (!discountEditable ? (
                    <p className="text-2xl font-medium text-grey-primary">
                      {discountSelected.percentDiscount}% OFF
                    </p>
                  ) : (
                    <div>
                      <Input.Root className="mb-2">
                        <input
                          {...register("percentDiscount")}
                          name="percentDiscount"
                          id="percentDiscount"
                          type="text"
                          defaultValue={discountSelected.percentDiscount}
                          className="flex-1  border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                        />
                      </Input.Root>
                      <span className=" text-red-500">
                        {errors.percentDiscount?.message}
                      </span>
                    </div>
                  ))}

                {discountSelected.type == TypeDiscount.LEVEMAISPAGUEMENOS &&
                  (!discountEditable ? (
                    <p className="text-2xl font-medium text-grey-primary">
                      Buy {discountSelected.take} pay {discountSelected.pay}
                    </p>
                  ) : (
                    <div>
                      <div className="flex flex-row">
                        <Input.Root className="mb-2 ">
                          <input
                            {...register("take")}
                            name="take"
                            id="take"
                            type="number"
                            placeholder="Value of 'leve'"
                            defaultValue={discountSelected.take}
                            className="flex-1  border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                          />
                        </Input.Root>
                      </div>
                      <span className=" text-red-500">
                        {errors.take?.message}
                      </span>
                      <div>
                        <Input.Root className="mb-2 ">
                          <input
                            {...register("pay")}
                            name="pay"
                            id="pay"
                            type="number"
                            placeholder="Value of 'pague'"
                            defaultValue={discountSelected.pay}
                            className="flex-1  border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                          />
                        </Input.Root>
                      </div>

                      <span className=" text-red-500">
                        {errors.pay?.message}
                      </span>
                    </div>
                  ))}
                {!discountEditable ? (
                  <p className="text-xl text-grey-primary">
                    {discountSelected.title}
                  </p>
                ) : (
                  <div>
                    <Input.Root className="mb-2">
                      <input
                        {...register("title")}
                        name="title"
                        id="title"
                        type="text"
                        defaultValue={discountSelected.title}
                        className="flex-1  border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                      />
                    </Input.Root>
                    <span className=" text-red-500">
                      {errors.title?.message}
                    </span>
                  </div>
                )}
                {!discountEditable ? (
                  <p className="text-sm text-grey-primary">
                    {discountSelected.description}
                  </p>
                ) : (
                  <div className="mb-2">
                    <textarea
                      {...register("description")}
                      name="description"
                      id="description"
                      defaultValue={discountSelected.description}
                      className={twMerge(
                        "mb-2 flex min-h-[120px] w-full resize-y items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400",
                        "focus-within:blue-hover focus-within:border-blue-primary focus-within:ring-4 dark:focus-within:border-violet-500 dark:focus-within:ring-violet-500/10",
                      )}
                    />
                    <span className=" text-red-500">
                      {errors.description?.message}
                    </span>
                  </div>
                )}

                {discountSelected.type == TypeDiscount.DEPOR ||
                discountSelected.type == TypeDiscount.PERCENTUAL ? (
                  <div>
                    {discountSelected.type == TypeDiscount.DEPOR && <p>de</p>}

                    {!discountEditable ? (
                      <p className="text-2xl font-medium text-grey-secondary line-through">
                        ${discountSelected.price}
                      </p>
                    ) : (
                      <div>
                        <Input.Root className="mb-2">
                          <input
                            {...register("price")}
                            name="price"
                            id="price"
                            type="number"
                            placeholder="Normal price"
                            defaultValue={discountSelected.price}
                            className="flex-1  border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                          />
                        </Input.Root>
                        <span className="  text-red-500">
                          {errors.price?.message}
                        </span>
                      </div>
                    )}

                    <div></div>
                    {discountSelected.type == TypeDiscount.DEPOR && (
                      <span>por</span>
                    )}
                    {!discountEditable ? (
                      <p className="text-2xl font-medium text-grey-secondary">
                        ${discountSelected.priceWithDiscount}
                      </p>
                    ) : (
                      <div>
                        <Input.Root className="mb-2">
                          <input
                            {...register("priceWithDiscount")}
                            name="priceWithDiscount"
                            id="priceWithDiscount"
                            type="number"
                            placeholder="Price with discount"
                            defaultValue={discountSelected.priceWithDiscount}
                            className="flex-1  border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                          />
                        </Input.Root>
                        <span className=" text-red-500">
                          {errors.priceWithDiscount?.message}
                        </span>
                      </div>
                    )}
                  </div>
                ) : !discountEditable ? (
                  <p className="text-2xl font-medium text-grey-secondary">
                    $ {discountSelected.price}
                  </p>
                ) : (
                  <div>
                    <Input.Root className="mb-2">
                      <input
                        {...register("price")}
                        name="price"
                        id="price"
                        type="number"
                        placeholder="Price with discount"
                        defaultValue={discountSelected.price}
                        className="flex-1  border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400"
                      />
                    </Input.Root>
                    <span className=" text-red-500">
                      {errors.price?.message}
                    </span>
                  </div>
                )}
              </div>
            </Dialog.Description>

            <div className="flex justify-end pb-5">
              <div className="flex w-full justify-between gap-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={(event) => {
                    event.preventDefault();
                    setDiscountEditable(!discountEditable);
                    toggleSidebar();
                  }}
                >
                  {discountEditable ? "Cancel" : "Edit"}
                </Button>

                {!discountEditable ? (
                  <Dialog.Close asChild>
                    <Button className="w-full" onClick={() => closeModal()}>
                      Close
                    </Button>
                  </Dialog.Close>
                ) : (
                  <Button
                    className="w-full"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    form="form-edit-discount"
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </div>
  );
};

export default Modal;
