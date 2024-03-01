"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import { auth } from "../service/firebase";
import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";

export interface Team {
  posicao: number;
  title: any;
  id: string;
  participantes: any;
  pontos: any;
}

interface ItemTeamProps {
  team: Team;
  onDelete: (id: string) => void;
  onEdit: (team: Team) => void;
  onAddPoints: (team: Team) => void;
}

type FileInfo = {
  name: string;
  previewSrc: string | ArrayBuffer | null;
};

export const ItemTopThree = ({
  team,
  onDelete,
  onEdit,
  onAddPoints,
}: ItemTeamProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [fileInfos, setFileInfos] = useState<FileInfo[]>([]);
  function handleDelete() {
    swal({
      title: "Tem certeza que deseja excluir?",
    }).then((result) => {
      if (result) {
        onDelete(team.id);
      }
    });
  }

  function handleEdit() {
    onEdit(team);
  }

  function handleAddPoints() {
    onAddPoints(team);
  }

  const ACCEPTED_EXTS = ["png", "jpeg", "jpg"];

  function handleAddProfileImage() {}

  return (
    <div className="w-full bg-[#141a3b] text-white rounded-md mt-2 flex justify-between p-4 items-center ">
      <div className="flex gap-4 ">
        <span className="text-2xl">
          <span className="text-lg">#</span>
          {team.posicao}
        </span>
        <div className="flex justify-center items-center rounded-full bg-gray-400 w-[35px] h-[35px] hover:opacity-60">
          {/* {team.profileImage} */}
          {user && (
            <button
              onClick={handleAddProfileImage}
              className="opacity-0 hover:opacity-100"
            >
              <Pencil size={14} />
            </button>
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl text-white">{team.title}</h2>

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
