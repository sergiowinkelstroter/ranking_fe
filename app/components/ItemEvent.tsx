import Image from "next/image";
import { Event } from "../eventos/page";

interface ItemEventProps {
  event: Event;
  oldEvent: boolean;
}

export const ItemEvent = ({ event, oldEvent }: ItemEventProps) => {
  return (
    <a
      href="#"
      className={`relative block ${
        oldEvent ? "opacity-80 cursor-not-allowed" : ""
      } overflow-hidden rounded-lg text-white bg-[#141a3b] p-4 sm:p-6 lg:p-8`}
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-[#141a3b]"></span>

      <div className="flex items-center  sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold sm:text-xl">{event.title}</h3>
        </div>

        <div className="h-16 w-16 rounded-lg bg-gray-400 shadow-sm">
          <Image src="/evento_image.jpg" alt="" width={64} height={64} />
        </div>
      </div>

      <div className="mt-4">
        <p className="max-w-[40ch] text-sm ">{event.description}</p>
      </div>

      <dl className="mt-6 flex justify-around ">
        <div className="flex flex-col-reverse items-center">
          <dt className="text-base font-medium ">Pontos</dt>
          <dd className="text-sm  ">{event.pointsForParticipating}</dd>
        </div>
        <div className="flex flex-col-reverse items-center">
          <dt className="text-base font-medium ">Data e horario</dt>
          <dd className="text-sm ">
            {event.dateOfEvent}, {event.hourOfEvent}
          </dd>
        </div>
      </dl>
    </a>
  );
};
