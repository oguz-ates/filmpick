import Image from "next/image";

export default function Home() {
  return (

  

    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1>
      Welcome to CineConsensus!
    </h1>
      CineConsensus will help your Couch Council decide what movie to watch today.
      <div className= "mt-8 flex flex-col gap-4 sm:flex-row">
      <button className="btn btn-primary">Create new Couch Council</button>
      <button className="btn btn-primary">Enter existing Couch Council</button>
      </div>
    </div>
  );
}
