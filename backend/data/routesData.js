// Define routes
const routes = {
  R1: [
    [12.9716, 77.5946],
    [12.9724, 77.5955],
    [12.9731, 77.5961],
    [12.9740, 77.5968],
    [12.9750, 77.5975],
    [12.9760, 77.5980],
  ],
  R2: [
    [12.9700, 77.5920],
    [12.9707, 77.5930],
    [12.9712, 77.5938],
    [12.9720, 77.5943],
    [12.9730, 77.5949],
  ],
};

// Initialize buses
let buses = [
  { id: "BUS-101", routeId: "R1", idx: 0, speedKmph: 20 },
  { id: "BUS-102", routeId: "R1", idx: 3, speedKmph: 18 },
  { id: "BUS-201", routeId: "R2", idx: 1, speedKmph: 22 },
];

// Initialize bus positions
buses.forEach((b) => {
  const r = routes[b.routeId];
  b.lat = r[b.idx][0];
  b.lng = r[b.idx][1];
  b.timestamp = Date.now();
});

module.exports = { routes, buses };
