import Card from './components/Card';
import Data from "./Data.js";
//import './App.css'

export default function App() {
  return (
    <div>
      <h1>Science Center</h1>
      <div id="gallery">
        {Data.map((scientist) => (
          <Card
            key={scientist.id}
            name = {scientist.name}
            dates = {scientist.dates}
            domain = {scientist.domain}
            pictureUrl = {scientist.pictureUrl}
            
          />))}
          </div>
      {/* <Card
      name="Marie"/>
      <Card
      name="Laurine"/>
 */}
      {/* <Card
      name = "Hedy Lamarr "
      dates = "1914 - 2000"
      domain = "Technology"
      pictureUrl = "https://cdn.pixabay.com/photo/2013/05/15/00/44/hedy-lamarr-111272_1280.jpg"
      />

      <Card
      name = "Hypatie"
      dates = "355 - 415"
      domain = "Mathematics, Astronomy, Inventor"
      pictureUrl = "https://curiokids.net/wp-content/uploads/2019/12/Hypatie_curiokids.jpg.webp"
      />

      <Card
      name = "Marie Curie"
      dates = "1867 - 1934"
      domain = "Nuclear Physics, Chemistry"
      pictureUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mariecurie.jpg/791px-Mariecurie.jpg"
      />

      <Card
      name = "Rosalind Franklin"
      dates = "1920 - 1958"
      domain = "Chemistry, Physics, Biology "
      pictureUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Rosalind_Franklin.jpg/499px-Rosalind_Franklin.jpg?20180422194635"
      />

      <Card
      name = "Ada Lovelace"
      dates = "1815 - 1852"
      domain = "Mathematics, Computer science "
      pictureUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ada_Lovelace_1838.jpg/481px-Ada_Lovelace_1838.jpg"
      />

      <Card
      name = "Jane Goodall"
      dates = "1934 - "
      domain = "Ethology, Anthropology "
      pictureUrl = "https://st2.depositphotos.com/5326338/11438/i/450/depositphotos_114384144-stock-photo-primatologist-dr-jane-goodall.jpg"
      />

      <Card
      name = "Tapputi-Belet-ekalle"
      dates = "XIII BC "
      domain = "Chemistry "
      pictureUrl = "https://deathscent.com/wp-content/uploads/2022/06/ekwnr8rwnrwz-1-e1655660244452.jpg"
      />

      <Card
      name = "Théano"
      dates = "VI BC"
      domain = "Philosophy, Mathematics"
      pictureUrl = ""
      /> */}

    </div>
  );
}