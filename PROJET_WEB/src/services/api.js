//fonction de récupération des data
export default async function get_items(){
    const response = await fetch("http://localhost:5000/items")
if (response.status == 200) {
const data = await response.json()
console.log(data);

return data
} else {
new Error(response.statusText)
}

}
