"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


type Member = { id: number; name: string };

export default function CouncilRoom({ code }: { code: string }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    // 1. initial load
    supabase.from("members").select("id, name").eq("council_code", code)
      .then(({ data }) => setMembers(data ?? []));

    // 2. live updates
    const channel = supabase
      .channel(`council-${code}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "members", filter: `council_code=eq.${code}` },
        (payload) => setMembers((prev) => [...prev, payload.new as Member])
      )
      .subscribe();

    // 3. cleanup
    return () => { supabase.removeChannel(channel); };
  }, [code]);

 async function join() {
    const { error } = await supabase.from("members").insert({ council_code: code, name });
    if (error) alert(error.message);
  }

  return (
    <div>
      <h1>Council {code}</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      <button className="btn btn-primary" onClick={join}>Join</button>
      <ul>{members.map((m) => <li key={m.id}>{m.name}</li>)}</ul>
    </div>
  );
}