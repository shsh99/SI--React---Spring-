export default interface ICinemaFaq {
    cfno?: any | null,
    question: string,
    answer: string,
    sortOrder: number | string,

}

{/* 연습5) cinema faq 전체조회 기능을 구현하세요.
              (단, 화면에 아코디언으로 보여주세요)
              프론트 - ICinemaFaq.ts (타입 : schema.sql )
                      CinemaFaqService.ts (axios 공통 crud 함수)
                      CinemaFaqList.tsx (전체조회)
                      App.tsx (메뉴 달기 : /cinema-faq)
              벡엔드 - 모델 엔티티 : CinemaFaq
                      CinemaFaqRepository
                      CinemaFaqService
                      CinemaFaqController
           */}