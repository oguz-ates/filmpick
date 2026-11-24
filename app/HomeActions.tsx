"use client";  //

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function HomeActions() {
    const router = useRouter();
    const[joinCode, setJoinCode] = useState("");
    const[error, setError] = useState("");

    async function createCouncil() {
        const code = Math.random().toString(36).slice(2,8).toUpperCase();
        const{error}=await
        supabase.from("councils").insert({code});
        if(error) return setError(error.message);
            router.push(`/council/${code}`);  //2 councils could in theory get the same code. It should be rare enoough with 6 chars
    }

    async function joinCouncil() {
        const code = joinCode.trim().toUpperCase();
        const {data}=await
    supabase.from("councils").select("code").eq("code",code).maybeSingle();
        if(!data) return setError("No Council with that code");
        router.push(`/council/${code}`);
    }
    return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <button className="btn btn-primary" onClick={createCouncil}>Create new Couch Council</button>
      <input value={joinCode} onChange={(e) => setJoinCode(e.target.value)} placeholder="Code" />
      <button className="btn btn-secondary" onClick={joinCouncil}>Enter existing Couch Council</button>
      {error && <p>{error}</p>}
    </div>
  );
}
