import * as Dialog from "@radix-ui/react-dialog";
import { FormEvent, useState } from "react";
import { insert } from "../service/photo";
import { doc, updateDoc } from "firebase/firestore";
import { Loading } from "./Loading";
import { db } from "../service/firebase";

interface ModalData {
  onLoading: boolean;
  onEditar: (e: FormEvent<HTMLFormElement>) => void;
}

export function Modal({ onLoading, onEditar }: ModalData) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/20 animate-overlayShow fixed inset-0" />
      <Dialog.Content className=" data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[80vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          Editar banner
        </Dialog.Title>
        <form
          method="POST"
          onSubmit={(e) => onEditar(e)}
          className="flex flex-col my-5 gap-1"
        >
          <input type="file" name="image" />
          <input
            type="submit"
            value="Enviar"
            className="bg-[#141a3b] text-white mt-8 p-1 rounded-md cursor-pointer hover:opacity-70"
          />
          {onLoading && (
            <div className="flex justify-center items-center mt-2">
              <Loading />
            </div>
          )}
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
