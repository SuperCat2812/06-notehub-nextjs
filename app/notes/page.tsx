import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

async function App() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, query: "" }],
    queryFn: () => fetchNotes({ page: 1, search: "" }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default App;
