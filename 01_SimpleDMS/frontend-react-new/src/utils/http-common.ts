import axios from "axios";

// TODO : baseURL: "http://스프링 ip 주소:스프링port/공통url"
// react <-> springboot : json 객체(통신) 
export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json"
  }
});
