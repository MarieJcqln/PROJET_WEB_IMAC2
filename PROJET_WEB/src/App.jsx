import Card from './components/Card';
import { useState, useMemo,useEffect } from "react";
import Data from "./Data.js";
import get_items from "./services/api.js";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [scientistSortBy, setScientistSortBy] = useState(localStorage.getItem("scientistSortBy") ||"dates");
  const [items, setItems] = useState([]);

  //Mettre en state le tableau, éviter de recharger le tableau plusieurs fois
  //get_items();

  //Local Storage
  useEffect(() => {
    localStorage.setItem("search", search)
  }, [search])

  useEffect(() => {
    localStorage.setItem("scientistSortBy", scientistSortBy)
  }, [scientistSortBy])

  useEffect(() => {
    const fetchItems = async () => {
      const data = await get_items();
      setItems(data);
    }
    fetchItems();
    //localStorage.setItem("items", items)
  }, [])

  // Filtrage et tri des scientifiques
  const filteredScientistData = useMemo(() => {
    let result = items.filter((scientist) =>
      scientist.name.toLowerCase().includes(search.toLowerCase()) ||
      scientist.domain.toLowerCase().includes(search.toLowerCase()) // Recherche aussi par domaine
    );

    result = result.slice().sort((a, b) => {
      if (scientistSortBy === "dates") {
        return (a.dates || 0) - (b.dates || 0);
      } else if (scientistSortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.domain.localeCompare(b.domain); // Tri par domaine
      }
    });

    return result;
  }, [search, scientistSortBy,items]);

  return (
    <div>
    <div id="title"><h1>Science Center</h1></div>
      

      {/* Recherche et tri */}
      <div id="gallery-options">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scientists or domains"
        />
        <label htmlFor="scientist-sort">Sort by:</label>
        <select
          id="scientist-sort"
          value={scientistSortBy}
          onChange={(e) => setScientistSortBy(e.target.value)}
        >
          <option value="dates">Dates</option>
          <option value="name">Name</option>
          <option value="domain">Domain</option>
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
