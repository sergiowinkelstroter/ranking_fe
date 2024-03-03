"use client";

import { ItemTeam, Team } from "./components/ItemTeam";
import { Navigation } from "./components/Navigation";
import { db } from "./service/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Loading } from "./components/Loading";
import swal from "sweetalert";
import { ContentOptions } from "sweetalert/typings/modules/options/content";
import { useEffect, useRef } from "react";

export default function Home() {
  const equipesRef = collection(db, "equipes");
  const [teams, loading, error] = useCollection(equipesRef);

  const teamsComPosicao = teams?.docs.map((team, index) => ({
    posicao: 0,
    title: team.data().title,
    id: team.id,
    participantes: team.data().Participantes,
    pontos: team.data().Pontos,
    color: team.data().color,
  }));

  teamsComPosicao && teamsComPosicao.sort((a, b) => b.pontos - a.pontos);

  teamsComPosicao &&
    teamsComPosicao.forEach((team, index) => {
      team.posicao = index + 1;
    });

  async function deleteTeam(id: string) {
    await deleteDoc(doc(db, "equipes", id))
      .then(() => {
        swal("Bom trabalho!", "Equipe excluída com sucesso!", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("Algo de errado aconteceu!", "error");
      });
  }

  async function editTeam(team: Team) {
    swal({
      text: "Nome da equipe",
      content: {
        element: "input",
        attributes: {
          placeholder: "Nome da equipe",
          type: "text",
          value: team.title,
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
            value: team.participantes,
          },
        },
        buttons: ["Cancelar", "Editar"],
      }).then((names) => {
        if (!names) throw null;

        const teamRef = doc(db, "equipes", team.id);
        updateDoc(teamRef, {
          title: title,
          Participantes: names,
        })
          .then(() => {
            swal("Bom trabalho!", "Equipe editada com sucesso!", "success");
          })
          .catch((err) => {
            console.log(err);
            swal("Algo de errado aconteceu!", "error");
          });
      });
    });
  }

  function addPointsAndTeams(team: Team) {
    swal({
      text: "Adicione pontos a equipe",
      content: {
        element: "input",
        attributes: {
          placeholder: "Adicione pontos a equipe",
          type: "text",
          value: team.pontos,
        },
      },
      buttons: ["Cancelar", "Editar"],
    }).then((points) => {
      if (!points) throw null;

      const teamRef = doc(db, "equipes", team.id);
      updateDoc(teamRef, {
        Pontos: points,
      })
        .then(() => {
          swal("Bom trabalho!", "Pontos adicionados com sucesso!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Algo de errado aconteceu!", "error");
        });
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
      { value: "bg-gray-100", text: "Cinza Claro" },
      { value: "bg-red-100", text: "Vermelho Claro" },
      { value: "bg-yellow-100", text: "Amarelo Claro" },
      { value: "bg-green-100", text: "Verde Claro" },
      { value: "bg-blue-100", text: "Azul Claro" },
      { value: "bg-indigo-100", text: "Índigo Claro" },
      { value: "bg-purple-100", text: "Roxo Claro" },
      { value: "bg-pink-100", text: "Rosa Claro" },
      { value: "bg-gray-200", text: "Cinza Claro 2" },
      { value: "bg-red-200", text: "Vermelho Claro 2" },
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

  function handleEditColorTeams(team: Team) {
    let selectedColor = "";
    selectElementRef.current?.classList.remove("hidden");
    swal({
      text: "Editar cor da equipe",
      content: { element: selectElementRef.current },
      buttons: ["Cancelar", "Editar"],
    }).then((color) => {
      if (!color) throw null;

      const teamRef = doc(db, "equipes", team.id);
      updateDoc(teamRef, {
        color: selectedColor,
      })
        .then(() => {
          swal("Bom trabalho!", "Cor adicionados com sucesso!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Algo de errado aconteceu!", "error");
        });
    });
    selectElementRef.current?.addEventListener("change", (event) => {
      selectedColor = (event.target as HTMLSelectElement).value;
    });
  }

  return (
    <>
      <Navigation />
      <main className="flex min-h-screen  flex-col items-center justify-between pt-24  md:p-24 ">
        <div className="md:w-2/3">
          <ul>
            {loading && (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            )}
            {teamsComPosicao &&
              teamsComPosicao.map((team, index) => {
                if (index < 3) {
                  return (
                    <ItemTeam
                      key={team.id}
                      team={team}
                      onDelete={deleteTeam}
                      onEdit={editTeam}
                      onAddPoints={addPointsAndTeams}
                      onEditColor={handleEditColorTeams}
                      topThree
                    />
                  );
                } else {
                  return (
                    <ItemTeam
                      topThree={false}
                      onEditColor={handleEditColorTeams}
                      key={team.id}
                      team={team}
                      onDelete={deleteTeam}
                      onAddPoints={addPointsAndTeams}
                      onEdit={editTeam}
                    />
                  );
                }
              })}
          </ul>
        </div>
      </main>
    </>
  );
}
