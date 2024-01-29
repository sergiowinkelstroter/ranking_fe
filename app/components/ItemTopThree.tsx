import { Team2 } from "../page";

interface ItemTeamProps {
  team: Team2;
}

export const ItemTopThree = ({ team }: ItemTeamProps) => {
  return (
    <div className="w-full bg-[#141a3b] text-white rounded-md mt-2 flex justify-between p-4 items-center ">
      <div className="flex gap-4 ">
        <span className="text-2xl">
          <span className="text-lg">#</span>
          {team.posicao}
        </span>
        <div className="flex rounded-full bg-gray-400 w-[35px] h-[35px]">
          {team.profileImage}
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl text-white">{team.username}</h2>

          <div className="flex gap-2 text-xs text-gray-300">
            {team.namesDuo.map((name) => (
              <span className="" key={name}>
                {name};
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <span className="text-xs text-gray-300">
          Pontos: <span className="text-lg text-white">{team.points}</span>
        </span>
      </div>
    </div>
  );
};
