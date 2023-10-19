// EmpService.ts
import http from "../utils/http-common"; // axios 통신
import IDept from "../types/IEmp";      // IDept 임포트
import IEmp from "../types/IEmp";

// 화살표함수 단축키 : nfn
/** 전체 조회 요청 */
const getAll = () => {
    // 조회요청 : .get("/url")
    // 사용법 : http.get<리턴타입>("url")
    return http.get<Array<IEmp>>("/emp");
}

/** 상세조회(1건조회) 요청 : 기본키 */
const get = (eno: any) => {
    return http.get<IEmp>(`/emp/${eno}`);
}

/** 저장요청 */
const create = (data: IEmp) => {
    return http.post<IEmp>("/emp", data);
}

/** 수정요청 : 기본키, 객체 */
const update = (eno: any, data: IEmp) => {
    return http.put<any>(`/emp/${eno}`, data);
}

/** 삭제요청 : 기본키 */
const remove = (eno: any) => {
    return http.delete<any>(`/emp/deletion/${eno}`);
}

/** 부서명 검색 함수 */
const findByEname = (ename: string) => {
    return http.get<Array<IEmp>>(`/emp?ename=${ename}`);
}

const EmpService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByEname
}

export default EmpService;