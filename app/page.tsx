"use client";

import { ItemTeam } from "./components/ItemTeam";
import { ItemTopThree, Team } from "./components/ItemTopThree";
import { Navigation } from "./components/Navigation";
import { db } from "./service/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Loading } from "./components/Loading";
import swal from "sweetalert";

export default function Home() {
  const equipesRef = collection(db, "equipes");
  const [teams, loading, error] = useCollection(equipesRef);

  const teamsComPosicao = teams?.docs.map((team, index) => ({
    posicao: 0,
    title: team.data().title,
    id: team.id,
    participantes: team.data().Participantes,
    pontos: team.data().Pontos,
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
                    <ItemTopThree
                      key={team.id}
                      team={team}
                      onDelete={deleteTeam}
                      onEdit={editTeam}
                      onAddPoints={addPointsAndTeams}
                    />
                  );
                } else {
                  return (
                    <ItemTeam
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
