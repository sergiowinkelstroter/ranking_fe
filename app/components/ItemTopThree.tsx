"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import { auth } from "../service/firebase";
import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Dropdown, DropdownItem } from "./DropDown";
import Image from "next/image";

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
    <div className="w-[350px] md:w-full bg-[#141a3b] text-white rounded-md mt-2 flex justify-between p-2 items-center ">
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
          <h2 className="text-lg md:text-xl text-white">{team.title}</h2>

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
          <Dropdown
            position="bottom-right"
            header
            items={[
              <DropdownItem key={1} onClick={handleDelete}>
                <Trash />
              </DropdownItem>,
              <DropdownItem key={2} onClick={handleEdit}>
                <Pencil />
              </DropdownItem>,
              <DropdownItem key={3} onClick={handleAddPoints}>
                <Plus />
              </DropdownItem>,
            ]}
          >
            <div className="flex justify-center items-center p-2">
              <Image
                src="/assets/svg/three-dots-white.svg"
                alt=""
                className="float-right text-white"
                width={14}
                height={14}
              />
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
