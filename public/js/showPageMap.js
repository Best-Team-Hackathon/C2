mapboxgl.accessToken = mapToken;
// console.log(campground.geometry);
// MAP OBJECT
const projectCords = projects.map(project=>project.geometry.coordinates)
let avgLng = 0 
let avgLat = 0
projectCords.forEach(p=>{
    avgLng += p[0]
    avgLat += p[1]
})
avgLat = avgLat/projectCords.length
avgLng = avgLng/projectCords.length
// Marker of each project
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [avgLng, avgLat], // starting position [lng, lat]
  zoom: 5, // starting zoom
});
projects.forEach(project => {
    
    new mapboxgl.Marker({ color: "red" })
      .setLngLat(project.geometry.coordinates)
      .addTo(map);
});