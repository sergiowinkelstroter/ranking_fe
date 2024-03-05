import Image from "next/image";
import { Event } from "../eventos/page";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../service/firebase";
import swal from "sweetalert";
import { Dropdown, DropdownItem } from "./DropDown";
import { insert } from "../service/photo";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "./ModalUploading";

interface ItemEventProps {
  event: Event;
  onDelete: (id: string) => void;
}

export const ItemEvent = ({ event, onDelete }: ItemEventProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [uploading, setUploading] = useState(false);
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);

  function handleDelete() {
    if (user) {
      swal({
        title: "Tem certeza que deseja excluir?",
        text: "O evento e os seus registros serão excluídos permanentemente!",
        icon: "warning",
        buttons: ["Cancelar", "Excluir"],
      }).then((result) => {
        if (result) {
          onDelete(event.id);
        }
      });
    } else {
      return null;
    }
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File;

    if (file && file.size > 0) {
      setUploading(true);
      const result = await insert(file, event.id);
      const eventRef = doc(db, "eventos", event.id);
      await updateDoc(eventRef, {
        image: result,
      })
        .then(() => {
          setUploading(false);
          setOpen(false);
          swal("Bom trabalho!", "Imagem enviada com sucesso!", "success");
        })
        .catch((error) => {
          setUploading(false);
          swal("Algo de errado aconteceu!", error, "error");
        });
    }
  };

  return (
    <div
      className={`relative w-[350px] md:w-[400px] block overflow-hidden rounded-lg text-white bg-[#141a3b] p-4 `}
    >
      <div className="flex flex-col sm:flex-row items-center sm:justify-around sm:gap-4">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-lg font-bold sm:text-xl">{event.title}</h2>
        </div>

        <div className=" rounded-lg bg-white shadow-sm m-4">
          <Image
            src={
              event.imageUrl ? `${event.imageUrl}` : "/logo-conquistadores.png"
            }
            alt=""
            width={96}
            height={96}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="max-w-[40ch] text-sm text-center"> {event.description}</p>
      </div>

      <dl className="mt-6 flex  sm:flex-row justify-around ">
        <div className="flex flex-col-reverse items-center sm:mb-0">
          <dt className="text-base font-medium ">Pontos</dt>
          <dd className="text-sm ">{event.pointsForParticipanting}</dd>
        </div>
        <div className="flex flex-col-reverse items-center">
          <dt className="text-base font-medium ">Data</dt>
          <dd className="text-sm ">{event.dateOfEvent}</dd>
        </div>
      </dl>
      {user && (
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <div className="absolute top-2 right-2 hover:cursor-pointer">
            <Dropdown
              position="bottom-right"
              header
              items={[
                <DropdownItem key={1}>
                  <Dialog.Trigger>Editar banner</Dialog.Trigger>
                </DropdownItem>,
                <DropdownItem key={2} onClick={handleDelete}>
                  Excluir evento
                </DropdownItem>,
              ]}
            >
              <div className=" flex justify-center items-center p-2">
                <Image
                  src="/assets/svg/three-dots-white.svg"
                  alt=""
                  className="float-right text-white"
                  width={14}
                  height={14}
                />
              </div>
            </Dropdown>
          </div>
          <Modal onEditar={handleFormSubmit} onLoading={uploading} />
        </Dialog.Root>
      )}
    </div>
  );
};
