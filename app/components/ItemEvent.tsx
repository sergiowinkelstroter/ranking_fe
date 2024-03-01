import Image from "next/image";
import { Event } from "../eventos/page";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../service/firebase";
import swal from "sweetalert";

interface ItemEventProps {
  event: {
    id: string;
    title: any;
    description: any;
    pointsForParticipanting: any;
    dateOfEvent: any;
  };
  onDelete: (id: string) => void;
}

export const ItemEvent = ({ event, onDelete }: ItemEventProps) => {
  const [user, loading, error] = useAuthState(auth);
  function handleDelete() {
    if (user) {
      swal({
        title: "Tem certeza que deseja excluir?",
      }).then((result) => {
        if (result) {
          onDelete(event.id);
        }
      });
    } else {
      return null;
    }
  }

  return (
    <a
      onClick={handleDelete}
      href="#"
      className={`relative block overflow-hidden rounded-lg text-white bg-[#141a3b] p-4 `}
    >
      <div className="flex items-center  sm:flex sm:justify-around sm:gap-4">
        <div>
          <h2 className="text-lg font-bold sm:text-xl">{event.title}</h2>
        </div>

        <div className="h-24 w-24 rounded-lg bg-gray-400 shadow-sm m-4">
          <Image src="/logo_conquistadores.jpg" alt="" width={96} height={96} />
        </div>
      </div>

      <div className="mt-4">
        <p className="max-w-[40ch] text-sm ">{event.description}</p>
      </div>

      <dl className="mt-6 flex justify-around ">
        <div className="flex flex-col-reverse items-center">
          <dt className="text-base font-medium ">Pontos</dt>
          <dd className="text-sm  ">{event.pointsForParticipanting}</dd>
        </div>
        <div className="flex flex-col-reverse items-center">
          <dt className="text-base font-medium ">Data</dt>
          <dd className="text-sm ">{event.dateOfEvent}</dd>
        </div>
      </dl>
    </a>
  );
};
