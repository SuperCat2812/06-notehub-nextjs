"use client";
import NoteDetailsClient from "@/components/NoteDetailsClient/NoteDetailsClient";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loading from "../../loading";
import ErrorRoute from "./error";
import NoteDetailsClientPage from "./NoteDetails.client";

export default function NoteDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  if (isLoading) return <Loading />;
  if (error) if (error || !note) return <ErrorRoute error={error} />;
  return note && <NoteDetailsClientPage note={note} />;
}
