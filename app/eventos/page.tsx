import { eventos } from "@/conteudo/eventos";
import { Navigation } from "../components/Navigation";
import { ItemEvent } from "../components/ItemEvent";

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
  const eventosOrdenados = eventos.sort((a, b) => {
    return (
      new Date(a.dateOfEvent).getTime() - new Date(b.dateOfEvent).getTime()
    );
  });

  let dataAtual = new Date();

  const eventosComDatasFuturas = eventosOrdenados.filter((evento) => {
    return new Date(evento.dateOfEvent) >= dataAtual;
  });

  let eventosComDatasPassadas = eventos.filter((objeto) => {
    return new Date(objeto.dateOfEvent).getTime() < dataAtual.getTime();
  });

  return (
    <>
      <Navigation />
      <main className="flex min-h-screen  flex-col items-center justify-between p-24 ">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">Próximos eventos:</h2>
          <ul className="grid grid-cols-3 gap-4">
            {eventosComDatasFuturas.map((event) => (
              <ItemEvent key={event.id} event={event} oldEvent={false} />
            ))}
          </ul>
        </div>
        <div className="mt-8 w-full flex flex-col gap-4">
          <h2 className="text-xl">Eventos passados:</h2>
          <ul className="grid grid-cols-3 gap-4">
            {eventosComDatasPassadas.map((event) => (
              <ItemEvent key={event.id} event={event} oldEvent />
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
