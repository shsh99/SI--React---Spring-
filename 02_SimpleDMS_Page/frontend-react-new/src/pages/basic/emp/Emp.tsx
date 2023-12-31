import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import IEmp from '../../../types/basic/IEmp';
import EmpService from '../../../services/basic/EmpService';
import TitleCom from '../../../components/common/TitleCom';

function Emp() {
    // 전체조회 페이지에서 전송한 기본키(dno)
    const { eno } = useParams();
    // 강제페이지 이동 함수
    let navigate = useNavigate();

    // 객체 초기화(상세조회 : 기본키 있음)
    const initialEmp = {
        eno: "",
        ename: "",
        job: "",
        manager: "",
        hiredate: "",
        salary: "",
        commission: "",
        dno: "",
    };

    // 수정될객체
    const [emp, setEmp] = useState<IEmp>(initialEmp);
    // 화면에 수정 성공에 메세지 찍기 변수
    const [message, setMessage] = useState<string>("");

    // 상세조회 함수
    const getEmp = (eno: string) => {
        EmpService.get(eno)         // 벡엔드로 상세조회 요청
            .then((response: any) => {
                setEmp(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // 화면이 뜰때 실행되는 이벤트 + dno 값이 바뀌면 실행
    useEffect(() => {
        if (eno) getEmp(eno);
    }, [eno]);

    // input 태그 수동 바인딩
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEmp({ ...emp, [name]: value });
    };

    // 수정 함수
    const updateEmp = () => {
        EmpService.update(emp.eno, emp) // 벡엔드로 수정요청
            .then((response: any) => {
                console.log(response.data);
                setMessage("The dept was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    // 삭제함수
    const deleteEmp = () => {
        EmpService.remove(emp.eno) // 벡엔드로 삭제요청
            .then((response: any) => {
                console.log(response.data);
                // 페이지 이동
                navigate("/emp");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <>
            {/* 제목 start */}
            <TitleCom title="Emp Detail" />
            {/* 제목 end */}

            <>
                {emp ? (
                    <div className="col-6 mx-auto">
                        <form>
                            <div className="row g-3 align-items-center mb-3">
                                <div className="col-3">
                                    <label htmlFor="ename" className="col-form-label">
                                        Ename
                                    </label>
                                </div>

                                <div className="col-9">
                                    <input
                                        type="text"
                                        id="ename"
                                        required
                                        className="form-control"
                                        value={emp.ename}
                                        onChange={handleInputChange}
                                        placeholder="ename"
                                        name="ename"
                                    />
                                </div>
                            </div>

                            <div className="row g-3 align-items-center mb-3">
                                <div className="col-3">
                                    <label htmlFor="job" className="col-form-label">
                                        job
                                    </label>
                                </div>

                                <div className="col-9">
                                    <input
                                        type="text"
                                        id="job"
                                        required
                                        className="form-control"
                                        value={emp.job}
                                        onChange={handleInputChange}
                                        placeholder="job"
                                        name="job"
                                    />
                                </div>
                                <div className="row g-3 align-items-center mb-3">
                                    <div className="col-3">
                                        <label htmlFor="manager" className="col-form-label">
                                            manager
                                        </label>
                                    </div>

                                    <div className="col-9">
                                        <input
                                            type="text"
                                            id="manager"
                                            required
                                            className="form-control"
                                            value={emp.manager}
                                            onChange={handleInputChange}
                                            placeholder="manager"
                                            name="manager"
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 align-items-center mb-3">
                                    <div className="col-3">
                                        <label htmlFor="hiredate" className="col-form-label">
                                            hiredate
                                        </label>
                                    </div>

                                    <div className="col-9">
                                        <input
                                            type="text"
                                            id="hiredate"
                                            required
                                            className="form-control"
                                            value={emp.hiredate}
                                            onChange={handleInputChange}
                                            placeholder="hiredate"
                                            name="hiredate"
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 align-items-center mb-3">
                                    <div className="col-3">
                                        <label htmlFor="salary" className="col-form-label">
                                            salary
                                        </label>
                                    </div>

                                    <div className="col-9">
                                        <input
                                            type="text"
                                            id="salary"
                                            required
                                            className="form-control"
                                            value={emp.salary}
                                            onChange={handleInputChange}
                                            placeholder="salary"
                                            name="salary"
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 align-items-center mb-3">
                                    <div className="col-3">
                                        <label htmlFor="commission" className="col-form-label">
                                            commission
                                        </label>
                                    </div>

                                    <div className="col-9">
                                        <input
                                            type="text"
                                            id="commission"
                                            required
                                            className="form-control"
                                            value={emp.commission}
                                            onChange={handleInputChange}
                                            placeholder="commission"
                                            name="commission"
                                        />
                                    </div>
                                </div>
                                <div className="row g-3 align-items-center mb-3">
                                    <div className="col-3">
                                        <label htmlFor="dno" className="col-form-label">
                                            dno
                                        </label>
                                    </div>

                                    <div className="col-9">
                                        <input
                                            type="text"
                                            id="dno"
                                            required
                                            className="form-control"
                                            value={emp.dno}
                                            onChange={handleInputChange}
                                            placeholder="dno"
                                            name="dno"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="row g-3 mt-3 mb-3">
                            <button
                                onClick={deleteEmp}
                                className="btn btn-outline-danger ms-3 col"
                            >
                                Delete
                            </button>

                            <button
                                type="submit"
                                onClick={updateEmp}
                                className="btn btn-outline-success ms-2 col"
                            >
                                Update
                            </button>
                        </div>

                        {message && (
                            <p className="alert alert-success mt-3 text-center">{message}</p>
                        )}
                    </div>
                ) : (
                    <div className="col-6 mx-auto">
                        <br />
                        <p>Please click on a Emp...</p>
                    </div>
                )}
            </>
        </>
    );
}

export default Emp