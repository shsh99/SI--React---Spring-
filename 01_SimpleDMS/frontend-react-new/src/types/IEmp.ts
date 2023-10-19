// 자바의 모델클래스와 유사
// 인터페이스 : 속성에 자료형을 미리 지정하는 것
export default interface IEmp {
    eno?: any | null,
    ename: string | number, // 아예 모르겠다 하면 any | null
    job : string,
    manager : any | null,
    hiredate : any | null,
    salary : any | null,
    commission : any | null,
    dno : any | null
}