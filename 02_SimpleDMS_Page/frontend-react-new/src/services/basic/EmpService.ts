// axios 공통함수 : 백엔드 연동
import IEmp from "../../types/basic/IEmp";
import http from "../../utils/http-common";

// 전체 조회 + like 검색(paging 기능: page(현재페이지), size(1페이지당개수))
const getAll = (ename:string, page:number, size:number) => {
  return http.get<Array<IEmp>>(`/basic/emp?ename=${ename}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (eno:any) => {
  return http.get<IEmp>(`/basic/emp/${eno}`);
};

// 저장 함수
const create = (data:IEmp) => {
  return http.post<IEmp>("/basic/emp", data);
};

// 수정 함수
const update = (eno:any, data:IEmp) => {
  return http.put<any>(`/basic/emp/${eno}`, data);
};

// 삭제 함수
const remove = (eno:any) => {
  return http.delete<any>(`/basic/emp/deletion/${eno}`);
};

const EmpService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default EmpService;