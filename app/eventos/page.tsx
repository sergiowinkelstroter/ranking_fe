"use client";

import { Navigation } from "../components/Navigation";
import { ItemEvent } from "../components/ItemEvent";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../service/firebase";
import { Loading } from "../components/Loading";
import swal from "sweetalert";

export interface Event {
  id: string;
  title: string;
  description: string;
  pointsForParticipating: number;
  dateOfEvent: string;
  hourOfEvent: string;
  createdAt: string;
}

export default function Eventos() {
  const eventosRef = collection(db, "eventos");
  const [eventos, loading, error] = useCollection(eventosRef);

  const _eventos = eventos?.docs.map((event) => ({
    id: event.id,
    title: event.data().title,
    description: event.data().description,
    pointsForParticipanting: event.data().pointsForParticipanting,
    dateOfEvent: event.data().dateOfEvent,
  }));

  async function deleteEvent(id: string) {
    await deleteDoc(doc(db, "eventos", id))
      .then(() => {
        swal("Bom trabalho!", "Evento excluído com sucesso!", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("Algo de errado aconteceu!", "error");
      });
  }

  return (
    <>
      <Navigation />
      <main className="flex min-h-screen  flex-col items-center justify-between pt-24 md:p-24 ">
        <div className="flex flex-col gap-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {loading && (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            )}
            {_eventos &&
              _eventos.map((event) => (
                <ItemEvent
                  key={event.id}
                  event={event}
                  onDelete={deleteEvent}
                />
              ))}
          </ul>
        </div>
      </main>
    </>
  );
}
