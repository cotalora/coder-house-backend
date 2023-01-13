curl -X GET "http://localhost:8081/infogzip"

artillery quick --count 10 -n 50 "http://localhost:8081/infogzip" > artillery_info.txt