import Card from './components/Card';
import { useState, useMemo,useEffect } from "react";
//import Data from "./Data.js";
import getItems from "./services/api.js";
import "./App.css";

const romanToArabic = (roman) => {
  const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let num = 0;
  let prevValue = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const value = romanMap[roman[i]];
    if (value < prevValue) {
      num -= value;
    } else {
      num += value;
    }
    prevValue = value;
  }
  return num;
};

const domains = [
  "Technology",
  "Mathematics",
  "Astronomy",
  "Inventor",
  "Nuclear Physics",
  "Chemistry",
  "Physics",
  "Biology",
  "Computer science"
];


export default function App() {
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [scientistSortBy, setScientistSortBy] = useState(localStorage.getItem("scientistSortBy") ||"dates");
  const [items, setItems] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");


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
    let result = items;

  // Filtrage par recherche
  if (search) {
    result = result.filter((scientist) =>
      scientist.name.toLowerCase().includes(search.toLowerCase()) ||
      scientist.domain.toLowerCase().includes(search.toLowerCase())
    );  }

    // Filtrage par domaine sélectionné
  if (selectedDomain) {
    result = result.filter(
      (scientist) => scientist.domain.toLowerCase() === selectedDomain.toLowerCase()
    );
  }

    // Tri
  result = result.slice().sort((a, b) => {
    if (scientistSortBy === "dates") {
      const extractYear = (dateString) => {
        if (!dateString) return 0;

        if (dateString.includes("BC")) {
          const bcYear = dateString.match(/\d+/);
          const romanMatch = dateString.match(/[IVXLCDM]+/);
          const year = bcYear ? parseInt(bcYear[0]) : romanMatch ? romanToArabic(romanMatch[0]) * 100 : 10000;
          return -year;
        }

        if (dateString.includes("century")) {
          const centuryMatch = dateString.match(/\d+/);
          const romanMatch = dateString.match(/[IVXLCDM]+/);
          const century = centuryMatch ? parseInt(centuryMatch[0]) : romanMatch ? romanToArabic(romanMatch[0]) : 0;
          return (century - 1) * 100 + 50;
        }

        const years = dateString.match(/\d+/g);
        return years ? parseInt(years[0]) : 0;
      };

      const yearA = extractYear(a.dates);
      const yearB = extractYear(b.dates);
      return yearA - yearB;

    } else if (scientistSortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.domain.localeCompare(b.domain);
    }
    });

    return result;
  }, [search, scientistSortBy, selectedDomain, items]);

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

        <label htmlFor="domain-filter">Filter by domain:</label>
<select
  id="domain-filter"
  value={selectedDomain}
  onChange={(e) => setSelectedDomain(e.target.value)}
>
  <option value="">All domains</option>
  {domains.map((domain) => (
    <option key={domain} value={domain}>
      {domain}
    </option>
  ))}
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
