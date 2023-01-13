curl -X GET "http://localhost:8081/infogzip"

autocannon -c 100 -d 20 "http://localhost:8081/infogzip"