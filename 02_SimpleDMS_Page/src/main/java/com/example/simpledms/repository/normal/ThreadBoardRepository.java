package com.example.simpledms.repository.normal;

import com.example.simpledms.model.dto.normal.ThreadBoardDto;
import com.example.simpledms.model.entity.normal.ReplyBoard;
import com.example.simpledms.model.entity.normal.ThreadBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName : com.example.simpledms.repository.normal
 * fileName : ThreadBoardRepository
 * author : GGG
 * date : 2023-10-27
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-27         GGG          최초 생성
 */
@Repository
public interface ThreadBoardRepository extends JpaRepository<ThreadBoard, Integer> {
    //    계층형 쿼리(Connect by)
    @Query(value = "SELECT tid           AS tid  " +
            "     , LPAD('⤵', (LEVEL-1))|| subject   AS subject  " +
            "     , main_text     AS mainText  " +
            "     , writer        AS writer  " +
            "     , views         AS views  " +
            "     , tgroup        AS tgroup  " +
            "     , tparent       AS tparent  " +
            "FROM TB_THREAD_BOARD  " +
            "WHERE subject LIKE '%'|| :subject ||'%'  " +
            "AND   DELETE_YN = 'N'  " +
            "START WITH tparent = 0     " +
            "CONNECT BY PRIOR tid = tparent   " +
            "ORDER SIBLINGS BY tgroup DESC", nativeQuery = true)
    Page<ThreadBoardDto> selectByConnectByPage(
            @Param("subject") String subject,
            Pageable pageable
    );

    //  게시물 저장 함수 : 최초 생성 (board_group(그룹번호), board_parent(부모번호))
    //    => board_group(부모번호 == 자식번호(bid)), board_parent(0(최초생성), 부모번호)
    //  todo: JPA insert 문 직접 작성 (dml: 테이블 데이터 변경, 트랜잭션을 동반)
    //    ==> @Transactional(트랜잭션을 동반), @Modifying(테이블 데이터 변경)
    @Transactional
    @Modifying
    @Query(value = " INSERT INTO TB_THREAD_BOARD " +
            "VALUES(sq_thread_board.nextval, :#{#threadBoard.subject}, " +
            ":#{#threadBoard.mainText}, " +
            ":#{#threadBoard.writer}, " +
            "0,sq_thread_board.CURRVAL, 0, 'N', " +
            "            TO_CHAR(SYSDATE,'YYYY-MM-DD HH24:MI:SS'), NULL, NULL)", nativeQuery = true)
    int insertByBoard(@Param("threadBoard") ThreadBoard threadBoard);

    //    게시물 + 답변글 2개 삭제 함수 : 소프트 삭제 (update 문 직접 작성)
    @Transactional
    @Modifying
    @Query(value = "UPDATE TB_THREAD_BOARD " +
            "SET DELETE_YN = 'Y' " +
            "  , DELETE_TIME = TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') " +
            "WHERE TGROUP = :tgroup", nativeQuery = true)
    int removeAllBytGroup(@Param("tgroup") int tgroup);
}