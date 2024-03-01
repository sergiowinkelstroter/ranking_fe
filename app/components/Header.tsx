"use client";

import Image from "next/image";
import { auth, db } from "../service/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { Dropdown, DropdownItem } from "./DropDown";
import { ContentOptions } from "sweetalert/typings/modules/options/content";
import Link from "next/link";

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

  const selectElementRef = useRef<HTMLSelectElement>({} as HTMLSelectElement);

  useEffect(() => {
    const selectElement = document.createElement("select");
    selectElement.setAttribute("placeholder", "Cor da equipe");
    selectElement.classList.add("hidden");

    // Adicione as opções ao select
    const options = [
      { value: "bg-black", text: "Preto" },
      { value: "bg-gray-500", text: "Cinza" },
      { value: "bg-red-500", text: "Vermelho" },
      { value: "bg-yellow-500", text: "Amarelo" },
      { value: "bg-green-500", text: "Verde" },
      { value: "bg-blue-500", text: "Azul" },
      { value: "bg-indigo-500", text: "Índigo" },
      { value: "bg-purple-500", text: "Roxo" },
      { value: "bg-pink-500", text: "Rosa" },
      { value: "bg-white", text: "Branco" },
    ];

    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      selectElement.appendChild(optionElement);
    });

    // Adicione o select ao DOM
    document.body.appendChild(selectElement);

    // Armazene o selectElement no ref
    if (selectElementRef.current) {
      selectElementRef.current = selectElement;
    }

    // Limpeza: remova o select do DOM quando o componente for desmontado
    return () => {
      if (selectElementRef.current) {
        document.body.removeChild(selectElementRef.current);
      }
    };
  }, []);

  function handleModalAddTeam() {
    let selectedColor = "";
    selectElementRef.current?.classList.remove("hidden");

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
          buttons: ["Cancelar", "Próximo"],
        }).then((points) => {
          if (!points) throw null;

          swal({
            text: "Cor da equipe",
            content: { element: selectElementRef.current }, // Use selectElementRef.current
            buttons: ["Cancelar", "Criar"],
          }).then((result) => {
            if (result && selectedColor !== "") {
              addTeam(title, names, points, selectedColor);
            }
          });

          selectElementRef.current?.addEventListener("change", (event) => {
            selectedColor = (event.target as HTMLSelectElement).value;
          });
        });
      });
    });
  }

  async function addTeam(
    title: string,
    names: string,
    points: string,
    color: string
  ) {
    await setDoc(doc(db, "equipes", uuid()), {
      title: title,
      Participantes: names,
      Pontos: points,
      color: color,
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
      <header className="relative flex gap-4 justify-center md:justify-between items-center bg-white/95 px-6 p-2 ">
        <Image src="/logo_conquistadores.png" width={50} height={50} alt="" />
        <h1 className="text-lg md:text-2xl text-[#1c2453] font-bold uppercase m-2 ">
          {" "}
          Jovens Conquistadores
        </h1>
        <div></div>
      </header>
    );
  } else {
    return (
      <header className="relative flex justify-between items-center bg-white/95 px-6 p-2 ">
        <div className="flex gap-4">
          <Link href={"/"}>
            <Image
              src="/logo_conquistadores.png"
              width={50}
              height={50}
              alt=""
            />
          </Link>
          <h1 className="text-lg md:text-2xl text-[#1c2453] font-bold uppercase m-2 ">
            {" "}
            Jovens Conquistadores
          </h1>
        </div>

        {user && (
          <>
            <div className="md:hidden">
              <Dropdown
                position="bottom-right"
                header
                items={[
                  <DropdownItem key={1} onClick={handleModalAddTeam}>
                    Criar Equipe
                  </DropdownItem>,
                  <DropdownItem key={2} onClick={handleModalAddEvent}>
                    Criar Evento
                  </DropdownItem>,
                  <DropdownItem key={3} onClick={SignOut}>
                    Sair
                  </DropdownItem>,
                ]}
              >
                <div className="flex justify-center items-center p-2">
                  <Image
                    src="/assets/svg/three-dots-black.svg"
                    alt=""
                    className="float-right text-white"
                    width={14}
                    height={14}
                  />
                </div>
              </Dropdown>
            </div>
            <div className="hidden md:flex gap-2 text-sm">
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
          </>
        )}
      </header>
    );
  }
};
