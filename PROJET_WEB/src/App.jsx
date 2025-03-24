import Card from './components/Card';
import { useState, useMemo,useEffect } from "react";
//import Data from "./Data.js";
import getItems from "./services/api.js";
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
      const data = await getItems();
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
        const extractYear = (dateString) => {
          if (!dateString) return 0;
          
          // Gestion des cas "XIII BC", "IV century AD"
          if (dateString.includes("BC")) {
            const bcYear = dateString.match(/\d+/); // Récupère l'année
            return bcYear ? -parseInt(bcYear[0]) : -10000; // Les BC doivent être négatifs
          }
          if (dateString.includes("century")) {
            const century = dateString.match(/\d+/); // Ex: "IV century AD"
            return century ? (parseInt(century[0]) - 1) * 100 + 50 : 0; // Approximation au milieu du siècle
          }
    
          // Cas classique "1867 - 1934"
          const years = dateString.match(/\d+/g);
          return years ? parseInt(years[0]) : 0; // On prend l'année de naissance
        };
    
        const yearA = extractYear(a.dates);
        const yearB = extractYear(b.dates);
    
        return yearA - yearB;

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
