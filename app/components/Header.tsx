"use client";

import Image from "next/image";
import { auth, db } from "../service/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";

export const Header = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  function SignOut() {
    signOut(auth)
      .then(() => {
        toast.success("Logout feito com sucesso!");
      })
      .catch((error) => {
        toast.error("Algo de errado aconteceu! Tente novamente!");
      });
  }

  function handleModalAddTeam() {
    swal({
      text: "Nome da equipe",
      content: {
        element: "input",
        attributes: {
          placeholder: "Nome da equipe",
          type: "text",
        },
      },
      buttons: ["Cancelar", "Próximo"],
    }).then((title) => {
      if (!title) throw null;
      swal({
        text: "Nomes dos componentes",
        content: {
          element: "input",
          attributes: {
            placeholder: "Nomes que compõe a equipe",
            type: "text",
          },
        },
        buttons: ["Cancelar", "Próximo"],
      }).then((names) => {
        if (!names) throw null;
        swal({
          text: "Pontos da equipe",
          content: {
            element: "input",
            attributes: {
              placeholder: "Pontos da equipe",
              type: "text",
            },
          },
          buttons: ["Cancelar", "Criar"],
        }).then((points) => {
          if (!points) throw null;
          addTeam(title, names, points);
        });
      });
    });
  }

  async function addTeam(title: string, names: string, points: string) {
    await setDoc(doc(db, "equipes", uuid()), {
      title: title,
      Participantes: names,
      Pontos: points,
    })
      .then(() => {
        swal("Bom trabalho!", "Equipe criada com sucesso!", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("Algo de errado aconteceu!", "error");
      });
  }

  function handleModalAddEvent() {
    swal({
      text: "Nome do Evento",
      content: {
        element: "input",
        attributes: {
          placeholder: "Nome do evento",
          type: "text",
        },
      },
      buttons: ["Cancelar", "Próximo"],
    }).then((title) => {
      if (!title) throw null;
      swal({
        text: "Descrição do Evento",
        content: {
          element: "input",
          attributes: {
            placeholder: "Descrição do evento",
            type: "text",
          },
        },
        buttons: ["Cancelar", "Próximo"],
      }).then((desc) => {
        if (!desc) throw null;
        swal({
          text: "Pontos do evento",
          content: {
            element: "input",
            attributes: {
              placeholder: "Pontos do evento",
              type: "text",
            },
          },
          buttons: ["Cancelar", "Próximo"],
        }).then((points) => {
          if (!points) throw null;
          swal({
            text: "Data do evento",
            content: {
              element: "input",
              attributes: {
                placeholder: "Data do evento",
                type: "text",
              },
            },
            buttons: ["Cancelar", "Criar"],
          }).then((date) => {
            if (!date) throw null;
            addEvent(title, desc, points, date);
          });
        });
      });
    });
  }

  async function addEvent(
    title: string,
    desc: string,
    points: string,
    date: string
  ) {
    console.log(title, desc, points, date);
    await setDoc(doc(db, "eventos", uuid()), {
      title: title,
      description: desc,
      pointsForParticipanting: points,
      dateOfEvent: date,
    })
      .then(() => {
        swal("Bom trabalho!", "Evento criado com sucesso!", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("Algo de errado aconteceu!", "error");
      });
  }

  if (!user) {
    return (
      <header className="relative flex justify-between items-center bg-white/95 px-6 p-2 ">
        <Image src="/logo_conquistadores.jpg" width={50} height={50} alt="" />
        <h1 className="text-2xl text-[#1c2453] font-bold uppercase m-2 ">
          {" "}
          Ministério jovem Conquistadores
        </h1>
        <div></div>
      </header>
    );
  } else {
    return (
      <header className="relative flex justify-between items-center bg-white/95 px-6 p-2 ">
        <div className="flex gap-4">
          <Image src="/logo_conquistadores.jpg" width={50} height={50} alt="" />
          <h1 className="text-2xl text-[#1c2453] font-bold uppercase m-2 ">
            {" "}
            Ministério jovem Conquistadores
          </h1>
        </div>

        {user && (
          <div className="flex gap-2 text-sm">
            <button
              onClick={handleModalAddTeam}
              className="bg-[#1c2453]  p-2 rounded-md text-white hover:opacity-90 "
            >
              Criar Equipe
            </button>
            <button
              onClick={handleModalAddEvent}
              className="bg-[#1c2453]  p-2 rounded-md text-white hover:opacity-90 "
            >
              Criar Evento
            </button>
            <button
              onClick={SignOut}
              className="bg-[#1c2453] w-[100px] p-2 rounded-md text-white hover:opacity-90"
            >
              Sair
            </button>
          </div>
        )}
      </header>
    );
  }
};
