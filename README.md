

https://github.com/cloudflare/deploy.workers.cloudflare.com


curl example:

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"game":{"id":"f59488b9-b159-45b0-ae2e-221648b1aa58","timeout":500},"turn":35,"board":{"height":11,"width":11,"food":[{"x":10,"y":4},{"x":5,"y":5},{"x":4,"y":4},{"x":2,"y":5},{"x":6,"y":2},{"x":4,"y":2},{"x":4,"y":0},{"x":6,"y":6}],"hazards":[],"snakes":[{"id":"acb1e234-918c-421c-9a48-84f254fcf8bd","name":"acb1e234-918c-421c-9a48-84f254fcf8bd","health":66,"body":[{"x":1,"y":9},{"x":1,"y":8},{"x":1,"y":7}],"latency":0,"head":{"x":1,"y":9},"length":3,"shout":"","squad":""}]},"you":{"id":"acb1e234-918c-421c-9a48-84f254fcf8bd","name":"acb1e234-918c-421c-9a48-84f254fcf8bd","health":66,"body":[{"x":1,"y":9},{"x":1,"y":8},{"x":1,"y":7}],"latency":0,"head":{"x":1,"y":9},"length":3,"shout":"","squad":""}}' \
  https://battlesnake.tomhummel.com/
  ```
