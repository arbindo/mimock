export default {
  name: "Starfleet search mock",
  description: "Mock for starfleet search api",
  route: "/search",
  statusCode: "200",
  httpMethod: "POST",
  queryParams: "version=1.0&shouldRemove=true",
  requestHeader: '{"location": "London"}',
  responseContentType: "application/json",
  shouldDoExactHeaderMatching: "false",
  requestBody: '{"galaxy": "unknown","shipName": "x-wing"}',
  requestBodyType: "application/json",
  expectedTextResponse: `
  {
      "name": "X-wing",
      "model": "T-65 X-wing",
      "manufacturer": "Incom Corporation",
      "cost_in_credits": "149999",
      "length": "12.5",
      "max_atmosphering_speed": "1050",
      "crew": "1",
      "passengers": "0",
      "cargo_capacity": "110",
      "consumables": "1 week",
      "hyperdrive_rating": "1.0",
      "MGLT": "100",
      "starship_class": "Starfighter",
      "image": "http://localhost:8080/starwars/images/6/60/Xwing-SWB.jpg/revision/latest/scale-to-width-down/2000?cb=20160704070524"
  }
  `,
  responseHeaders: '{"traceid": "2dwed3ea33ecc"}',
};
