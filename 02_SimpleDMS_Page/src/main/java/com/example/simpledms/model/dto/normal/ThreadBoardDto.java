package com.example.simpledms.model.dto.normal;

import org.springframework.stereotype.Repository;

/**
 * packageName : com.example.simpledms.model.dto.normal
 * fileName : ThreadBoardDto
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
public interface ThreadBoardDto {
    //    속성 x -> getter 함수
    public Integer getTid();
    public String getSubject();
    public String getMainText();
    public String getWriter();
    public Integer getViews();
    public Integer getTgroup();
    public Integer getTparent();
}