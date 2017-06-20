# accolade
A naive skill algorithm wrapped in Node


Your only option for testing stuff atm:

```
npm run dev-start
curl -XPOST 'http://localhost:5000/rate' -H "Content-Type: application/json" -X POST -d '{"teams": [[{"id": 1, "skill": 120},{"id": 2, "skill": 105}],[{"id": 3, "skill": 100},{"id": 4, "skill": 90}]]}'
```
