"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (debouncedQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery)}`);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        setDebouncedQuery(query);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <form onSubmit={handleSearch} className="mb-4 text-gray-500">
      <input
        type="text"
        placeholder="Digite o produto que procura e prescione o botão 'Enter'"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
