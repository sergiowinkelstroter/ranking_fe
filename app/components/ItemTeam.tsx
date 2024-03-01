import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import { auth } from "../service/firebase";
import { Team } from "./ItemTopThree";
import { Pencil, Plus, Trash } from "lucide-react";

interface ItemTeamProps {
  team: Team;
  onDelete: (id: string) => void;
  onEdit: (team: Team) => void;
  onAddPoints: (team: Team) => void;
}

export const ItemTeam = ({
  team,
  onDelete,
  onAddPoints,
  onEdit,
}: ItemTeamProps) => {
  const [user, loading, error] = useAuthState(auth);
  function handleDelete() {
    if (user) {
      swal({
        title: "Tem certeza que deseja excluir?",
      }).then((result) => {
        if (result) {
          onDelete(team.id);
        }
      });
    } else {
      return null;
    }
  }

  function handleEdit() {
    onEdit(team);
  }

  function handleAddPoints() {
    onAddPoints(team);
  }

  function handleAddProfileImage() {
    swal({
      title: "Adicionar imagem de perfil?",
    });
  }

  return (
    <div className="w-full opacity-65  text-white rounded-md mt-2 flex justify-between p-4  items-center ">
      <div className="flex gap-4 ">
        <span className="text-lg"> {team.posicao}</span>
        <div className="flex justify-center items-center rounded-full bg-gray-400 w-[35px] h-[35px] hover:opacity-50">
          {/* {team.profileImage} */}
          {user && (
            <button
              onClick={handleAddProfileImage}
              className="hidden hover:flex"
            >
              <Pencil />
            </button>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl text-white">{team.title}</h1>

          <div className="flex gap-2 text-xs text-gray-300">
            {team.participantes}
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <span className="text-xs text-gray-300">
          Pontos: <span className="text-lg text-white">{team.pontos}</span>
        </span>
        {user && (
          <>
            <button onClick={handleDelete} className="text-lg text-white">
              <Trash />
            </button>
            <button onClick={handleEdit} className="text-lg text-white">
              <Pencil />
            </button>
            <button onClick={handleAddPoints} className="text-lg text-white">
              <Plus />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
