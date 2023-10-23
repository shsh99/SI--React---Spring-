// 자바의 모델클래스와 유사
// 인터페이스 : 속성에 자료형을 미리 지정하는 것
export default interface IDept {
    dno?: any | null,
    dname: string | number, // 아예 모르겠다 하면 any | null
    loc : string
}