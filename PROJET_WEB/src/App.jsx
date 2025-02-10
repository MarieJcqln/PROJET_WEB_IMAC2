import Card from './components/Card';
import { useState, useMemo } from "react";
import Data from "./Data.js";

export default function App() {
  const [search, setSearch] = useState("");
  const [scientistSortBy, setScientistSortBy] = useState("dates");

  // Filtrage et tri des scientifiques
  const filteredScientistData = useMemo(() => {
    let result = Data.filter((scientist) =>
      scientist.name.toLowerCase().includes(search.toLowerCase())
    );

    result = result.slice().sort((a, b) => {
      if (scientistSortBy === "dates") {
        return (a.dates || 0) - (b.dates || 0);
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [search, scientistSortBy]);

  return (
    <div>
      <h1>Science Center</h1>

      {/* Recherche et tri */}
      <div id="gallery-options">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scientists"
        />
        <label htmlFor="scientist-sort">Sort by:</label>
        <select
          id="scientist-sort"
          value={scientistSortBy}
          onChange={(e) => setScientistSortBy(e.target.value)}
        >
          <option value="dates">Dates</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Affichage des scientifiques filtrés */}
      <div id="gallery">
        {filteredScientistData.map((scientist) => (
          <Card
            key={scientist.id}
            name={scientist.name}
            dates={scientist.dates}
            domain={scientist.domain}
            pictureUrl={scientist.pictureUrl}
          />
        ))}
      </div>
    </div>
  );
}
