"use client";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const updateQuery = useDebouncedCallback((query) => {
    setQuery(query);
    setPage(1);
  }, 300);
  const { data } = useQuery({
    queryKey: ["note", { page, query }],
    queryFn: () => fetchNotes({ page, search: query }),
    enabled: true,
    placeholderData: keepPreviousData,
  });
  const notes = data?.notes || [];
  const totalPage = data?.totalPages || 1;
  const [onModal, setOnModal] = useState(false);
  const openModal = () => {
    setOnModal(true);
  };
  const closeModal = () => {
    setOnModal(false);
  };
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            query={query}
            updateQuery={updateQuery}
          />

          <button
            type="button"
            onClick={openModal}
            className={css.button}>
            Create Note
          </button>
        </header>
        {totalPage > 1 && (
          <Pagination
            handlePageClick={handleChangePage}
            pageCount={totalPage}
            currentPage={page}
          />
        )}
        {onModal && (
          <Modal onClose={closeModal}>
            <NoteForm closeModal={closeModal} />
          </Modal>
        )}
        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
      ;
    </>
  );
}
