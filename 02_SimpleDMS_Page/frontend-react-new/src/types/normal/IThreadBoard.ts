export default interface IThreadBoard {
    tid?: any | null,
    subject: string,
    mainText: string,
    writer: string,
    views: number,
    tGroup: any | null,
    tParent: any | null
}

// TID         NUMBER NOT NULL
//         CONSTRAINT PK_THREAD_BOARD PRIMARY KEY, --게시판번호
//     SUBJECT     VARCHAR2(256), --제목
//     MAIN_TEXT   VARCHAR2(255), --내용
//     WRITER      VARCHAR2(255), --작성자
//     VIEWS       NUMBER DEFAULT 0, --조회수
//     TGROUP      NUMBER, --트리구조 최상위 부모 노드(부모가 있을 경우 : 부모번호, 없을 경우 : 자신의 게시판번호)
//     TPARENT     NUMBER, 