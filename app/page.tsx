import { teams } from "@/conteudo/teams";
import { ItemTeam } from "./components/ItemTeam";
import { ItemTopThree } from "./components/ItemTopThree";
import { Navigation } from "./components/Navigation";

export type Team = Team2[];

export interface Team2 {
  id: string;
  username: string;
  namesDuo: string[];
  points: number;
  profileImage: string;
  numberPhone: string;
  createdAt: string;
  posicao: number;
}

export default function Home() {
  const teamsComPosicao = teams.map((team, index) => ({
    ...team,
    posicao: index + 1,
  }));

  return (
    <>
      <Navigation />
      <main className="flex min-h-screen  flex-col items-center justify-between p-24 ">
        <div className="w-2/3">
          <ul>
            {teamsComPosicao.map((team, index) => {
              if (index < 3) {
                return <ItemTopThree key={team.id} team={team} />;
              } else {
                return <ItemTeam key={team.id} team={team} />;
              }
            })}
          </ul>
        </div>
      </main>
    </>
  );
}
