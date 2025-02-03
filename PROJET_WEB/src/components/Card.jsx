import "./Card.css"

//import Card from './components/DogCard';
//import './App.css'

export default function Card({name, dates, domain, pictureUrl}) {
  return(
    //<h2>Bonjour {name}</h2>
    
    <div id="woman-card">
      <img
        id="presentation-picture"
        src={pictureUrl}
        alt={name}
      />
      <div id="description">
        <h3>{name}</h3>
        <p className="description-line">Dates : {dates}</p>
        <p className="description-line">Main Domain : {domain}</p>
      </div>
    </div>
  )
  
}