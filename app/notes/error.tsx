"use client";
type Props = {
  error: Error;
};
export default function ErrorRoute({ error }: Props) {
  <p>Could not fetch the list of notes. {error.message}</p>;
}
