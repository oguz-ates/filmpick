import { Suspense } from "react";
import CouncilRoom from "./CouncilRoom";

export default function Page({ params }: PageProps<"/council/[code]">) {
  return (
    <Suspense fallback={<p>Loading council…</p>}>
      <Room params={params} />
    </Suspense>
  );
}

async function Room({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <CouncilRoom code={code} />;
}