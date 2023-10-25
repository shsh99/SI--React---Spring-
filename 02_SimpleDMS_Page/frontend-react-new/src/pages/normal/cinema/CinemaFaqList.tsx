import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TitleCom from '../../../components/common/TitleCom';
import ICinemaFaq from '../../../types/normal/ICinemaFaq';
import CinemaFaqService from '../../../services/normal/CinemaFaqService';
import { Link } from 'react-router-dom';

function CinemaFaqList() {

  // 변수 정의
  // faq 배열 변수
  const [cinemaFaq, setCinemaFaq] = useState<Array<ICinemaFaq>>([]);
  // 검색어 변수
  const [searchQuestion, setSearchQuestion] = useState<string>("");

  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수
  // todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)
  const pageSizes = [3, 6, 9];

  // todo: 함수 정의
  useEffect(() => {
    retrieveCinemaFaq(); // 전체 조회
  }, [page, pageSize]);

  //   전체조회 함수
  const retrieveCinemaFaq = () => {
    CinemaFaqService.getAll(searchQuestion, page - 1, pageSize) // 벡엔드 전체조회요청
      .then((response: any) => {
        const { cinemaFaq, totalPages } = response.data;
        setCinemaFaq(cinemaFaq);
        setCount(totalPages);
        console.log("response", response.data);

      })
      .catch((e: Error) => {
        // 벡엔드 실패시 실행됨
        console.log(e);
      })
  };

  //  검색어 수동 바인딩 함수
  const onChangeSearchQuestion = (e: any) => {
    setSearchQuestion(e.target.value);
  };

  // todo: handlePageSizeChange(공통) : pageSize 값 변경시 실행되는 함수
  //  select 태그 수동 바인딩 : 화면값 -> 변수에 저장
  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value); // 1페이지당 개수저장(3,6,9)
    setPage(1); // 현재페이지번호 : 1로 강제설정
  }

  //  todo: Pagination 수동 바인딩(공통)
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  }
  return (
    <>
      {/* 제목 start */}
      <TitleCom title="Cinema Faq List" />
      {/* 제목 end */}

      {/* search start */}
      <div className="row mb-5 justify-content-center">
        <div className="col-12 w-50 input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Question"
            value={searchQuestion}
            onChange={onChangeSearchQuestion}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveCinemaFaq}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* search end */}

      {/* page start */}
      <div className="mt-3">
        {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
      {/* page end */}

      <div className="col-md-12">
        {/* accodian start */}
        <div className="accordion" id="accordionExample">
          {cinemaFaq &&
            cinemaFaq.map((data, index) => (
              <div className="accordion-item" key={data.cfno}>
                <h2 className="accordion-header" id={"heading" + index}>
                  <button
                    className={
                      index == 0
                        ? "accordion-button"
                        : "accordion-button collapsed"
                    }
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#collapse" + index}
                    aria-expanded={index == 0 ? "true" : "false"}
                    aria-controls={"collapse" + index}
                  >
                    {data.question}
                  </button>
                </h2>
                <div
                  id={"collapse" + index}
                  className={
                    index == 0
                      ? "accordion-collapse collapse show"
                      : "accordion-collapse collapse"
                  }
                  aria-labelledby={"heading" + index}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {data.answer}
                    <Link to={"/cinema-faq/" + data.cfno}>
                      <span className="badge bg-success ms-2">Edit</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* accodian end */}
      </div>
    </>
  )
}

export default CinemaFaqList;